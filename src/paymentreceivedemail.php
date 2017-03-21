<?php

namespace Ademti\Pwe;

use \WC_Email;

/**
 * Notification that ETH payment has been received.
 */
class PaymentReceivedEmail extends WC_Email {

	/**
	 * The order payment has been received for.
	 *
	 * @var \WC_Order;
	 */
	private $order;

	/**
	 * Constructor.
	 *
	 * Set email attributes, and defaults.
	 */
	public function __construct() {
		$this->id             = 'pwe_payment_completed';
		$this->title          = __( 'ETH payment completed', 'pay_with_ether' );
		$this->description    = __( 'Notification that payment by ETH has been received.', 'pay_with_ether' );
		$this->heading        = __( 'Payment received', 'pay_with_ether' );
		$this->subject        = __( 'Payment received', 'pay_with_ether' );
		$this->template_html  = 'emails/pwe-payment-received.php';
		$this->template_plain = 'emails/plain/pwe-payment-received.php';
		$this->template_base  = untrailingslashit( $GLOBALS['pay_with_ether']->base_path ) . '/templates/';

		$this->customer_email = true;

		// Trigger this on transition from on hold to either pending, or order
		// complete.
		add_action( 'woocommerce_order_status_on-hold_to_processing_notification', array( $this, 'trigger' ) );
		add_action( 'woocommerce_order_status_on-hold_to_completed_notification', array( $this, 'trigger' ) );

		parent::__construct();
	}

	/**
	 * Trigger the email if required.
	 */
	public function trigger( $order_id ) {

		if ( ! $order_id || ! $this->is_enabled() ) {
			return;
		}
		$this->order = new \WC_Order( $order_id );
		$GLOBALS['pay_with_ether']->log( 'Trigger received for PaymentReceivedEmail' );
		$this->recipient    = is_callable( array( $this->order, 'get_billing_email' ) ) ? $this->order->get_billing_email() : $this->order->billing_email;
		if ( is_callable( array( $this->order, 'get_payment_method' ) ) ) {
			$payment_method = $this->order->get_payment_method();
		} else {
			$payment_method = $this->order->payment_method;
		}
		$GLOBALS['pay_with_ether']->log(
			sprintf( 'Payment method for order %d is %s', $order_id, $payment_method )
		);
		$GLOBALS['pay_with_ether']->log(
			sprintf( 'Recipient is %s', $this->recipient )
		);
		if ( 'pay-with-ether' !== $payment_method ) {
			return;
		}

		$this->find[] = '{order_date}';
		$this->replace[] = date_i18n( woocommerce_date_format(), strtotime( $this->order->order_date ) );

		$this->find[] = '{order_number}';
		$this->replace[] = $this->order->get_order_number();

		$this->send(
			$this->get_recipient(),
			$this->get_subject(),
			$this->get_content(),
			$this->get_headers(),
			$this->get_attachments()
		);
	}

	public function get_content_html() {
		ob_start();
		woocommerce_get_template(
			$this->template_html,
			array(
				'order'         => $this->order,
				'email_heading' => $this->get_heading(),
				'sent_to_admin' => false,
				'plain_text'    => false,
				'email'         => $this,
			),
			'woocommerce',
			$this->template_base
		);
		return ob_get_clean();
	}

	public function get_content_plain() {
		ob_start();
		woocommerce_get_template(
			$this->template_plain,
			array(
				'order'         => $this->order,
				'email_heading' => $this->get_heading(),
				'sent_to_admin' => false,
				'plain_text'    => true,
				'email'         => $this,
			),
		 	'woocommerce',
			$this->template_base
		);
		return ob_get_clean();
	}

	public function init_form_fields() {

		$this->form_fields = array(
			'enabled'    => array(
				'title'   => 'Enable/Disable',
				'type'    => 'checkbox',
				'label'   => 'Enable this email notification',
				'default' => 'yes',
			),
			'subject'    => array(
				'title'       => 'Subject',
				'type'        => 'text',
				'description' => sprintf( 'This controls the email subject line. Leave blank to use the default subject: <code>%s</code>.', $this->subject ),
				'placeholder' => '',
				'default'     => '',
			),
			'heading'    => array(
				'title'       => 'Email Heading',
				'type'        => 'text',
				'description' => sprintf( __( 'This controls the main heading contained within the email notification. Leave blank to use the default heading: <code>%s</code>.' ), $this->heading ),
				'placeholder' => '',
				'default'     => '',
			),
			'email_type' => array(
				'title'       => 'Email type',
				'type'        => 'select',
				'description' => 'Choose which format of email to send.',
				'default'     => 'html',
				'class'       => 'email_type',
				'options'     => array(
					'plain'	    => __( 'Plain text', 'woocommerce' ),
					'html' 	    => __( 'HTML', 'woocommerce' ),
					'multipart' => __( 'Multipart', 'woocommerce' ),
				),
			),
		);
	}
}
