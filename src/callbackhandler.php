<?php

namespace Ademti\Pwe;

use WC_Logger;
use WC_Order;

/**
 * Handle callbacks from PayWithEther.com.
 */
class CallbackHandler {

	/**
	 * The gateway settings.
	 *
	 * @var array
	 */
	private $settings;

	/**
	 * The order ID that the callback relates to. Set during verification.
	 *
	 * @var int
	 */
	private $order_id;

	/**
	 * The extracted callback data.
	 *
	 * @var stdClass
	 */
	private $data = [];

	/**
	 * Constructor. Load & store the settings.
	 */
	public function __construct() {
		$this->settings  = get_option( 'woocommerce_pay-with-ether_settings', false );
	}

	/**
	 * Run to handle a request.
	 */
	public function run() {
		// Clean out any output queued up so far.
		ob_get_clean();
		// Unpack the POST data and check we have all the values we expect.
		$this->extract_data();
		// Verify the data we've received. Exit on failure.
		$this->verify_data();
		// Sned it back to the API to confirm it matches. Exit on failure.
		$this->verify_with_api();
		// If we get here, the callback is valid.
		if ( 'sent' === $this->data->status ) {
			$this->accept_payment();
		} else {
			$this->reject_order();
		}
		header( 'HTTP/1.1 201 Callback received' );
		exit;
	}

	/**
	 * Extracts the data, and checks we have the values we expect.
	 *
	 * Dies if not.
	 */
	private function extract_data() {
		$json = stripslashes( $_POST['pweCallback'] );
		$this->data = json_decode( $json );
		if ( json_last_error() !== JSON_ERROR_NONE ) {
			$this->access_denied( 'JSON error' );
		}
		if ( empty( $this->data->ethVal ) ) {
			$this->access_denied( 'No ethVal' );
		}
		if ( empty( $this->data->txId ) ) {
			$this->access_denied( 'No txId' );
		}
		if ( empty( $this->data->reference ) ) {
			$this->access_denied( 'No reference' );
		}
		if ( empty( $this->data->status ) ) {
			$this->access_denied( 'No status' );
		}
		if ( empty( $this->data->to ) ) {
			$this->access_denied( 'No recipient (to)' );
		}
		if ( empty( $this->data->txHash ) && 'sent' === $this->data->status ) {
			$this->access_denied( 'No transaction hash for successful order.' );
		}
	}

	/**
	 * Reject an order.
	 */
	private function reject_order() {
		$order = new WC_Order( $this->order_id );
		$order->add_order_note(
			__( 'Non-successful payment notification received from PayWithEther.com. Order updated to failed.', 'pay_with_ether' )
		);
		$order->update_status( 'failed', __( 'Non-successful payment notification.', 'pay_with_ether' ) );
	}

	/**
	 * Accept payment for an order.
	 */
	private function accept_payment() {
		// Trigger the emails to be registered and hooked.
		WC()->mailer()->init_transactional_emails();

		$order = new WC_Order( $this->order_id );
		$order->add_order_note(
			sprintf(
				__( 'Successful payment notification received from PayWithEther.com. Transaction hash %s', 'pay_with_ether' ),
				$this->data->txHash
			)
		);
		update_post_meta( $this->order_id, '_transaction_id', $this->data->txHash );
		$order->add_order_note(
			__( 'Order updated to pending.', 'pay_with_ether' )
		);
		$order->payment_complete();
	}

	/**
	 * Callback to the API to verify this request was from them.
	 */
	private function verify_with_api() {
		$api_client = new ApiClient( $this->settings['api_key'] );
		$code = $api_client->post(
			'transaction/success',
			[
				'txId' => $this->data->txId,
			]
		);
		if ( 200 !== $code ) {
			$GLOBALS['pay_with_ether']->log( 'Received code ' . $code . ' when validating callback.' );
			$GLOBALS['pay_with_ether']->log( $api_client->get_response_body() );
			$this->access_denied( 'Could not verify callback with API server' );
		}
	}

	/**
	 * Verify that the data sent matches what we have stored.
	 */
	private function verify_data() {
		if ( $this->data->to !== $this->settings['payment_address'] ) {
			$this->access_denied( 'Invalid receipient' );
		}
		$this->order_id = (int) $this->find_by_tx_ref( $this->data->reference );
		if ( ! $this->order_id ) {
			$this->access_denied( 'Invalid txRef' );
		}
		$eth_value = get_post_meta( $this->order_id, '_pwe_eth_value', true );
		if ( ! $this->compare_amounts( $eth_value, $this->data->ethVal ) ) {
			$this->access_denied( 'Invalid transaction amount' );
		}
		$tx_id = get_post_meta( $this->order_id, '_pwe_txId', true );
		if ( $tx_id !== $this->data->txId ) {
			$this->access_denied( 'Invalid transaction ID (txId)' );
		}
	}

	/**
	 * Compare the two amounts as strings to avoid FP precision issues.
	 *
	 * @param  string $a  Value to compare.
	 * @param  string $b  Value to compare.
	 *
	 * @return bool    True on match, false otherwise.
	 */
	public function compare_amounts( $a, $b ) {
		$a = rtrim( $a, '0' );
		$b = rtrim( $b, '0' );
		return $a === $b;
	}

	/**
	 * Find an order by transaction reference.
	 *
	 * @param string $tx_ref The transaction reference to look for.
	 */
	private function find_by_tx_ref( $tx_ref ) {
		global $wpdb, $table_prefix;
		$sql = "SELECT post_id
		          FROM {$table_prefix}postmeta
				 WHERE meta_key = %s
				   AND meta_value = %s";
		return $wpdb->get_var(
			$wpdb->prepare( $sql, [ '_pwe_tx_ref', $tx_ref ] )
		);
	}

	/**
	 * Throw an access denied message, and die.
	 *
	 * @param string $msg  Additional info to include in the failure.
	 */
	private function access_denied( $msg ) {
		$GLOBALS['pay_with_ether']->log( "Access denied: $msg" );
		header( 'HTTP/1.1 403 Access denied : ' . $msg );
		exit;
	}
}
