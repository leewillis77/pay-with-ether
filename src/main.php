<?php

namespace Ademti\Pwe;

class Main {

	/**
	 * The base URL of the plugin.
	 *
	 * @var string
	 */
	public $base_url;

	/**
	 * Constructor.
	 *
	 * Store variables for use later.
	 *
	 * @param string $base_url  The base URL of the plugin.
	 */
	function __construct( $base_url ) {
		$this->base_url = $base_url;
	}

	/**
	 * Trigger the plugin to run.
	 */
	public function run() {
		add_action( 'plugins_loaded', array( $this, 'on_plugins_loaded' ) );
		add_action( 'init', array( $this, 'on_init' ) );
		add_action( 'woocommerce_email_order_details', array( $this, 'email_content' ), 1, 4 );
	}

	/**
	 * Designed to run actions required at WordPress' init hook.
	 *
	 * Triggers localisation of the plugin.
	 */
	public function on_init() {
		/**
		 * Localise.
		 */
		$locale = apply_filters( 'plugin_locale', get_locale(), 'pay_with_ether' );
		load_textdomain( 'pay_with_ether', WP_LANG_DIR . '/pay-with-ether/pay_with_ether-' . $locale . '.mo' );
		load_plugin_textdomain( 'pay_with_ether', false, basename( dirname( __FILE__ ) ) . '/languages/' );
		if ( isset( $_POST['pweCallback'] ) ) {
			$callback_handler = new CallbackHandler();
			$callback_handler->run();
		}
	}

	/**
	 * Designed to run actions required at WordPress' plugins_loaded hook.
	 *
	 * - Register our gateway with WooCommerce.
	 */
	public function on_plugins_loaded() {
	    if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
			return;
		}
	    add_filter( 'woocommerce_payment_gateways', array( $this, 'add_gateway' ) );
	}

	/**
	 * Add the Gateway to WooCommerce.
	 *
	 * @param array $methods  The current list of gateways.
	 */
	public function add_gateway( $gateways ) {
		$gateways[] = 'Ademti\Pwe\Gateway';
		return $gateways;
	}

	/**
	 * Add payment instructions to the "order on hold" email.
	 */
	public function email_content( $order, $sent_to_admin, $plain_text, $email ) {
		// We only interfere in the order on hold email.
		if ( ! ( $email instanceof \WC_Email_Customer_On_Hold_Order ) ) {
			return;
		}
		$settings  = get_option( 'woocommerce_pay-with-ether_settings', false );
		if ( is_callable( array( $order, 'get_id' ) ) ) {
			$order_id = $order->get_id();
		} else {
			$order_id = $order->id;
		}
		$eth_value = get_post_meta( $order_id, '_pwe_eth_value', true );
		$tx_ref    = new TransactionReference( $order_id );
		if ( false === $settings || false === $eth_value ) {
			return;
		}
		echo '<h2>Payment details</h2>';
		echo esc_html( $settings['payment_description'] );
		?>
		<ul>
			<li><?php _e( 'Amount', 'pay_by_ether' ); ?>: <strong><?php echo esc_html( $eth_value ); ?></strong></li>
			<li><?php _e( 'Address', 'pay_by_ether' ); ?>: <strong><?php echo esc_html( $settings['payment_address'] ); ?></strong></li>
			<li><?php _e( 'Data', 'pay_by_ether' ); ?>: <strong><?php echo esc_html( $tx_ref->get() ); ?></strong></li>
		</ul>
		<?php
	}
}
