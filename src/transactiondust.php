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
		$this->dust_amount = get_post_meta( $order_id, '_pwe_dust_amount', true );
		if ( $this->dust_amount === '' ) {
			$this->dust_amount = (string) apply_filters(
				'pwe_dust_amount',
				"0.00000"  . substr( str_pad( $order_id, 3, '0', STR_PAD_LEFT ), -3 ),
				$order_id
			);
			add_post_meta( $order_id, '_pwe_dust_amount', $this->dust_amount );
		}
	}

	/**
	 * Return the dust amount if we're cast to a string.
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->dust_amount;
	}

	/**
	 * Allow the dust amount to be explicitly returned.
	 */
	public function get() {
		return $this->dust_amount;
	}
}
