<?php
namespace Ademti\Pwe;

class TransactionReference {

	/**
	 * The generated transaction reference.
	 *
	 * @var string
	 */
	private $tx_ref;

	/**
	 * Constructor.
	 *
	 * Generate and store a tx ref, or instantiate with the existing one.
	 *
	 * @param int $order_id  The order ID to generate a reference for.
	 */
	public function __construct( $order_id ) {
		$reference = get_post_meta( $order_id, '_pwe_tx_ref', true );
		if ( $reference ) {
			$this->tx_ref = $reference;
		} else {
			// Not for cryptographic reasons.
			$this->tx_ref = '0x' . bin2hex( $order_id ) . substr( hash( 'sha256', home_url() ), 0, 6 );
			add_post_meta( $order_id, '_pwe_tx_ref', $this->tx_ref );
		}
	}

	/**
	 * Return the tx ref if we're cast to a string.
	 */
	public function __toString() {
		return (string) $this->tx_ref;
	}

	/**
	 * Allow the tx ref to be explicitly returned.
	 */
	public function get() {
		return (string) $this->tx_ref;
	}
}
