<?php

namespace Ademti\Pwe;

use WC_Logger;
use WC_Order;
use WC_Payment_Gateway;
use WC_Admin_Settings;

/**
 * WooCommerce gateway class implementation.
 */
class Gateway extends WC_Payment_Gateway {

	/**
	 * Constructor, set variables etc. and add hooks/filters
	 */
	function __construct() {
		$this->id                   = 'pay-with-ether';
		$this->method_title         = __( 'Pay with Ether', 'pay-with-ether' );
		$this->has_fields           = true;
		$this->supports             = array(
			'products',
		);
		$this->view_transaction_url = 'https://etherscan.io/tx/%s';

		// Load the form fields.
		$this->init_form_fields();

		// Load the settings.
		$this->init_settings();

		// Set the public facing title according to the user's setting.
		$this->title       = $this->settings['title'];
		$this->description = $this->settings['short_description'];

		// Save options from admin forms.
		add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array(
			$this,
			'process_admin_options'
		) );
		add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array(
			$this,
			'verify_api_connection'
		) );

		// Show gateway icon.
		add_filter( 'woocommerce_gateway_icon', array( $this, 'show_icons' ), 10, 2 );

		// Show payment instructions on thank you page.
		add_action( 'woocommerce_thankyou_pay-with-ether', array( $this, 'thank_you_page' ) );
	}

	/**
	 * Output the logo.
	 *
	 * @param string $icon The default WC-generated icon.
	 * @param string $gateway The gateway the icons are for.
	 *
	 * @return string          The HTML for the selected iconsm or empty string if none
	 */
	public function show_icons( $icon, $gateway ) {
		if ( $this->id !== $gateway ) {
			return $icon;
		}
		$img_url = $GLOBALS['pay_with_ether']->base_url . '/img/etherium-icon.png';

		return '<img src="' . esc_attr( $img_url ) . '" width="25" height="25">';
	}

	/**
	 * Tell the user how much their order will cost if they pay by ETH.
	 */
	public function payment_fields() {
		$total    = WC()->cart->total;
		$currency = get_woocommerce_currency();
		try {
			$convertor = new CurrencyConvertor( $currency, 'ETH' );
			$eth_value = $convertor->convert( $total );
			$eth_value = $this->apply_markup( $eth_value );
			// Set the value in the session so we can log it against the order.
			WC()->session->set(
				'pwe_calculated_value',
				array(
					'eth_value' => $eth_value,
					'timestamp' => time(),
				)
			);
			echo '<p class="pwe-eth-pricing-note"><strong>';
			printf( __( 'Payment of %s ETH will be due.', 'pay_with_ether' ), $eth_value );
			echo '</p></strong>';
		} catch ( \Exception $e ) {
			$GLOBALS['pay_with_ether']->log(
				sprintf(
					__( 'Problem performing currency conversion: %s', 'pay_with_ether' ),
					$e->getMessage()
				)
			);
			echo '<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">';
			echo '<ul class="woocommerce-error">';
			echo '<li>';
			_e(
				'Unable to provide an order value in ETH at this time. Please contact support.',
				'pay_with_ether'
			);
			echo '</li>';
			echo '</ul>';
			echo '</div>';
		}
	}

	/**
	 * Checks that not too much time has passed since we quoted them a price.
	 */
	public function validate_fields() {
		$price_info = WC()->session->get( 'pwe_calculated_value' );
		// Prices quoted at checkout must be re-calculated if more than 15
		// minutes have passed.
		$validity_period = apply_filters( 'pwe_checkout_validity_time', 900 );
		if ( $price_info['timestamp'] + $validity_period < time() ) {
			wc_add_notice( __( 'ETH price quote has been updated, please check and confirm before proceeding.', 'pay_with_ether' ), 'error' );

			return false;
		}

		return true;
	}

	/**
	 * Mark up a price by the configured amount.
	 *
	 * @param float $price The price to be marked up.
	 *
	 * @return float         The marked up price.
	 */
	private function apply_markup( $price ) {
		$markup_percent = $this->settings['markup_percent'];
		$markup_percent = ! empty( $markup_percent ) ? $markup_percent : 0;
		$multiplier     = ( $markup_percent / 100 ) + 1;

		return round( $price * $multiplier, 5, PHP_ROUND_HALF_UP );
	}

	/**
	 * Check if we have API access.
	 *
	 * @return  boolean Return true if we have keys.
	 */
	private function have_api_access() {
		$api_verified_at = get_option( 'pwe_api_verified', false );

		return false !== $api_verified_at;
	}

	/**
	 * Get the time that the API was last verified.
	 *
	 * @param boolean $formatted True for a human-formatted date/time, false
	 *                             for a UNIX timestamp.
	 *
	 * @return string              Time.
	 */
	private function get_api_verified_time( $formatted = true ) {
		$api_verified_at = get_option( 'pwe_api_verified', false );
		if ( false === $api_verified_at ) {
			return __( 'Unknown. Please re-verify', 'pay_with_ether' );
		}
		if ( $formatted ) {
			return date( _x( 'd M Y, H:i', 'Date format for verification timestamp', 'pay_with_ether' ), $api_verified_at );
		} else {
			return $api_verified_at;
		}
	}

	/**
	 * Initialise Gateway Settings Form Fields
	 */
	function init_form_fields() {
		$this->form_fields                      = array(
			'enabled' => array(
				'title'       => __( 'Enable / disable', 'pay_with_ether' ),
				'label'       => __( 'Enable payment with Ether', 'pay_with_ether' ),
				'type'        => 'checkbox',
				'description' => '',
				'default'     => 'no',
			),
		);
		$this->form_fields['automate_receipts'] = array(
			'title' => __( 'Payment receipt automation', 'pay_with_ether' ),
			'type'  => 'title',
		);
		if ( ! $this->have_api_access() ) {
			$description = '<p><strong>' . __( '<span style="color: #900" class="dashicons dashicons-thumbs-down"></span> Not connected.', 'pay_with_ether' ) . '</strong></p>';
			$description .= '<p>' . sprintf( __( "We can integrate with <a href='%s'>PayWithEther</a>. A service that will seamlessly monitor the Ethereum block-chain and update your orders when payment has been received. If you have an account, we'll automatically verify / re-verify your access when you save your settings.", 'pay_with_ether' ), 'https://www.paywithether.com' ) . '</p><p>' . sprintf( __( "If you don't have an account, you can <a href='%s' target='_blank'>sign up here</a> or enter your API key above.", 'pay_with_ether' ), 'https://www.paywithether.com' ) . '</p>';
		} else {
			$description = '<p><strong>' . __( '<span style="color: #090" class="dashicons dashicons-thumbs-up"></span> Connected.', 'pay_with_ether' ) . '</strong></p><p>' . sprintf( __( 'Last checked at %s', 'pay_with_ether' ), $this->get_api_verified_time() ) . '</p>';
		}
		$this->form_fields['api_key'] = array(
			'title'       => __( 'PayWithEther API Key', 'pay_with_ether' ),
			'type'        => 'text',
			'description' => $description,
		);
		$this->form_fields            += array(
			'basic_settings'      => array(
				'title'       => __( 'Basic settings', 'pay_with_ether' ),
				'type'        => 'title',
				'description' => '',
			),
			'debug'               => array(
				'title'       => __( 'Enable debug mode', 'pay_with_ether' ),
				'label'       => __( 'Enable only if you are diagnosing problems.', 'pay_with_ether' ),
				'type'        => 'checkbox',
				'description' => sprintf( __( 'Log interactions inside <code>%s</code>', 'pay_with_ether' ), wc_get_log_file_path( $this->id ) ),
				'default'     => 'no',
			),
			'title'               => array(
				'title'       => __( 'Title', 'pay_with_ether' ),
				'type'        => 'text',
				'description' => __( 'This controls the name of the payment option that the user sees during checkout.', 'pay_with_ether' ),
				'default'     => __( 'Pay with ETH', 'pay_with_ether' ),
			),
			'short_description'   => array(
				'title'       => __( 'Short description', 'pay_with_ether' ),
				'type'        => 'textarea',
				'description' => __( 'This controls the description of the payment option that the user sees during checkout.', 'pay_with_ether' ),
				'default'     => 'Pay with your Ether (ETH).',
			),
			'your_details'        => array(
				'title'       => __( 'Payment details', 'pay_with_ether' ),
				'type'        => 'title',
				'description' => '',
			),
			'payment_address'     => array(
				'title'       => __( 'Your ethereum address', 'pay_with_ether' ),
				'type'        => 'text',
				'description' => __( 'The ethereum address your customers should send payment to.', 'pay_with_ether' ),
				'default'     => '',
			),
			'payment_description' => array(
				'title'       => __( 'Payment instructions', 'pay_with_ether' ),
				'type'        => 'textarea',
				'description' => __( 'The payment instructions shown to your customers after their order has been placed, and emailed to them when ordering.', 'pay_with_ether' ),
				'default'     => __( 'Please send the payment as per the details below. Ensure these are quoted exactly, otherwise we won\'t be able to reconcile your payment. Data is unnecessary if the payment is exact.', 'pay_with_ether' ),
			),
			'your_details'        => array(
				'title'       => __( 'ETH Pricing', 'pay_with_ether' ),
				'type'        => 'title',
				'description' => '',
			),
			'markup_percent'      => array(
				'title'             => __( 'Mark ETH price up by %', 'pay_with_ether' ),
				'description'       => __( 'To help cover currency fluctuations the plugin can automatically mark up converted rates for you. These are applied as percentage markup, so a 1ETH value with a 1.00% markup will be presented to the customer as 1.01ETH. Enter 0 for no markup.', 'pay_with_ether' ),
				'default'           => '2.0',
				'type'              => 'number',
				'css'               => 'width:100px;',
				'custom_attributes' => array(
					'min'      => - 100,
					'max'      => 100,
					'step'     => 0.5,
					'required' => 'required',
				),
			),
		);
	}

	/**
	 * Do not allow enabling of the gateway without providing a payment address.
	 */
	public function validate_enabled_field( $key, $value ) {
		$post_data = $this->get_post_data();
		if ( $value ) {
			if ( empty( $post_data['woocommerce_pay-with-ether_payment_address'] ) ) {
				WC_Admin_Settings::add_error( 'You must provide an Ethereum address before enabling the gateway' );

				return 'no';
			} else {
				return 'yes';
			}
		}

		return 'no';
	}

	/**
	 * Output the gateway settings page.
	 */
	public function admin_options() {
		?>
        <h3><?php _e( 'Pay with Ether', 'pay_with_ether' ); ?></h3>
        <p><?php echo sprintf( __( 'Your customers will be given instructions about where, and how much to pay. Your orders will be marked as pending when they are placed. Once you\'ve received payment, you can update your orders on the <a href="%s">WooCommerce Orders</a> page.', 'pay_with_ether' ), admin_url( 'edit.php?post_type=shop_order' ) ); ?></p>
        <table class="form-table">
			<?php $this->generate_settings_html(); ?>
        </table><!--/.form-table-->
		<?php
	}

	/**
	 * See if the site can be connected to the auto-verification service.
	 */
	public function verify_api_connection() {
		if ( empty( $this->settings['api_key'] ) ) {
			delete_option( 'pwe_api_verified' );

			return;
		}
		$api_client = new ApiClient( $this->settings['api_key'] );
		$code       = $api_client->post( 'user/auth' );
		$GLOBALS['pay_with_ether']->log( 'Verifying API connection, received code : ' . $code );
		$GLOBALS['pay_with_ether']->log( 'Verifying API connection, received response : ' . print_r( $api_client->get_response_body(), 1 ) );
	}

	/**
	 * Process the payment.
	 *
	 * @param int $order_id The order ID to update.
	 */
	function process_payment( $order_id ) {

		// Load the order.
		$order = new WC_Order( $order_id );

		// Retrieve the ETH value.
		$stored_info = WC()->session->get( 'pwe_calculated_value' );

		// Add order note.
		$order->add_order_note(
			__( 'Order submitted, and payment with ETH requested.', 'pay_with_ether' )
		);

		// Store the ETH amount required against the order.
		$eth_value = $stored_info['eth_value'];

		// Generate a dust amount for validating the payment.
		$dust        = new TransactionDust( $order_id );
		$dust_amount = $dust->get();

		update_post_meta( $order_id, '_pwe_eth_value', $eth_value );
		$order->add_order_note( sprintf(
			__( 'Order value calculated as %f ETH', 'pay_with_ether' ),
			$eth_value
		) );

		// Place the order on hold.
		$order->update_status( 'on-hold', __( 'Awaiting payment.', 'pay_with_ether' ) );

		// Reduce stock levels.
		if ( is_callable( 'wc_reduce_stock_levels' ) ) {
			wc_reduce_stock_levels( $order->get_id() );
		} else {
			$order->reduce_order_stock();
		}

		// Remove cart.
		WC()->cart->empty_cart();

		// Log the order details with the monitoring service if enabled.
		if ( $this->have_api_access() ) {
			$api_client = new ApiClient( $this->settings['api_key'] );
			$tx_ref     = new TransactionReference( $order_id );
			// 3000 seconds = 50 minutes
			$timeout = apply_filters( 'pwe_transaction_timeout', 3000, $order_id );
			$code    = $api_client->post(
				'transaction/create',
				[
					'to'            => $this->settings['payment_address'],
					'callbackUrl'   => home_url(),
					'ethVal'        => $eth_value,
					'reference'     => $tx_ref->get(),
					'dustAmount'    => $dust_amount,
					'timeoutInSecs' => $timeout,
				]
			);
			if ( 200 === $code ) {
				$response = $api_client->get_response_body();
				$response = json_decode( $response );
				$tx_id    = $response->data->txId;
				$order->add_order_note( sprintf(
					__( 'Order details submitted to PayWithEther.com for monitoring. txId %s', 'pay_with_ether' ),
					$tx_id
				) );
				update_post_meta( $order_id, '_pwe_txId', $tx_id );
			} else {
				$order->add_order_note(
					__( 'Order details could not be submitted to PayWithEther.com', 'pay_with_ether' )
				);
			}
			$GLOBALS['pay_with_ether']->log( 'Logging order with monitoring service, received code ' . $code );
			$GLOBALS['pay_with_ether']->log( 'Logging order with monitoring service, received response ' . print_r( $api_client->get_response_body(), 1 ) );
		}

		// Redirect the user to the confirmation page.
		if ( method_exists( $order, 'get_checkout_order_received_url' ) ) {
			$redirect = $order->get_checkout_order_received_url();
		} else {
			if ( is_callable( array( $order, 'get_id' ) ) &&
				 is_callable( array( $order, 'get_order_key' ) ) ) {
				$redirect = add_query_arg( 'key', $order->get_order_key(), add_query_arg( 'order', $order->get_id(), get_permalink( get_option( 'woocommerce_thanks_page_id' ) ) ) );
			} else {
				$redirect = add_query_arg( 'key', $order->order_key, add_query_arg( 'order', $order->id, get_permalink( get_option( 'woocommerce_thanks_page_id' ) ) ) );
			}
		}

		// Return thank you page redirect.
		return array(
			'result'   => 'success',
			'redirect' => $redirect,
		);
	}

	/**
	 * Output the payment information onto the thank you page.
	 *
	 * @param int $order_id The order ID.
	 */
	public function thank_you_page( $order_id ) {
		$order = new WC_Order( $order_id );
		if ( is_callable( array( $order, 'get_meta' ) ) ) {
			$eth_value   = $order->get_meta( '_pwe_eth_value' );
			$dust_amount = $order->get_meta( '_pwe_dust_amount' );
		} else {
			$eth_value   = get_post_meta( $order_id, '_pwe_eth_value', true );
			$dust_amount = get_post_meta( $order_id, '_pwe_dust_amount', true );
		}
		$eth_value_with_dust = $eth_value + $dust_amount;
		$description         = $this->settings['payment_description'];
		$tx_ref              = new TransactionReference( $order_id );

		// Output everything.
		?>
        <section class="pwe-payment-instructions">
            <h2>Pay with Ether</h2>
            <p>
				<?php echo esc_html( $description ); ?>
            </p>
            <p class="pwe-tutorial-link">
                <a target="_blank"
                   href="https://www.paywithether.com/tutorial"><?php _e( 'Tutorial', 'pay_with_ether' ); ?></a>
            </p>
            <ul>
                <li><?php _e( 'Amount', 'pay_by_ether' ); ?>:
                    <strong><?php echo esc_html( $eth_value_with_dust ); ?></strong> ETH
                </li>
                <li><?php _e( 'Address', 'pay_by_ether' ); ?>:
                    <strong><?php echo esc_html( $this->settings['payment_address'] ); ?></strong></li>
                <li><?php _e( 'Data', 'pay_by_ether' ); ?>: <strong><?php echo esc_html( $tx_ref->get() ); ?></strong>
                </li>
            </ul>
			<?php
			if ( apply_filters( 'pwe_pay_with_metamask_button', true ) ) {
			?>
            <div class="pwe-metamask-button">Pay with MetaMask</button>
                <style type="text/css">
                    div.pwe-metamask-button {
                        background-image: url('<?php echo $GLOBALS['pay_with_ether']->base_url . '/img/1_pay_mm_off.png'; ?>');
                    }

                    div.pwe-metamask-button:hover {
                        background-image: url('<?php echo $GLOBALS['pay_with_ether']->base_url . '/img/1_pay_mm_over.png'; ?>');
                    }

                    div.pwe-metamask-button:active {
                        background-image: url('<?php echo $GLOBALS['pay_with_ether']->base_url . '/img/1_pay_mm_off.png'; ?>');
                    }
                </style>
				<?php
				wp_enqueue_script(
					'paywithether',
					$GLOBALS['pay_with_ether']->base_url . "/dist/js/pay-with-ether.js",
					array( 'jquery' ),
					PWE_VERSION
				);
				wp_enqueue_style(
					'paywithether',
					$GLOBALS['pay_with_ether']->base_url . "/css/pay-with-ether.css",
					array(),
					PWE_VERSION
				);
				wp_localize_script(
					'paywithether',
					'pwe',
					[
						'payment_address' => $this->settings['payment_address'],
						'eth_value'       => $eth_value_with_dust,
						'tx_ref'          => $tx_ref->get(),
					]
				);
				}
				?>
        </section>
		<?php
	}
}
