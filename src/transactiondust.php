<?php
namespace Ademti\Pwe;

class TransactionDust {

	/**
	 * The generated transaction dust amount.
	 *
	 * @var string
	 */
	private $dust_amount;

	/**
	 * Constructor.
	 *
	 * Generate and store a dust amount, or instantiate with the existing one.
	 *
	 * @param int $order_id  The order ID to generate a dust amount for.
	 */
	public function __construct( $order_id ) {
		$dust = get_post_meta( $order_id, '_pwe_dust_amount', true );
		if ( $dust ) {
			$this->dust_amount = $dust;
		} else {
			$this->dust_amount = substr(str_pad($order_id, 3, '0', STR_PAD_LEFT), -3);
			add_post_meta( $order_id, '_pwe_dust_amount', $this->dust_amount );
		}
	}

	/**
	 * Return the dust amount if we're cast to a string.
	 */
	public function __toString() {
		return (string) $this->dust_amount;
	}

	/**
	 * Allow the dust amount to be explicitly returned.
	 */
	public function get() {
		return (string) $this->dust_amount;
	}
}
