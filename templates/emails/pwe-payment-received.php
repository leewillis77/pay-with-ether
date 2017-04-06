<?php
/**
 * ETH payment received email.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/emails/pwe-payment-received.php.
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'woocommerce_email_header', $email_heading, $email ); ?>

<p><?php printf( __( 'Payment received for order %d', 'pay_with_ether' ), is_callable( array( $order, 'get_id' ) ) ? $order->get_id() : $order->id ); ?></p>

<p><?php _e( "Congratulations. We've received ETH payment for your order. We've included your details below as a reminder of your order.", 'pay-with-ether' ); ?></p>

<?php
/**
 * @hooked WC_Emails::order_details() Shows the order details table.
 * @hooked WC_Emails::order_schema_markup() Adds Schema.org markup.
 * @since 2.5.0
 */
do_action( 'woocommerce_email_order_details', $order, $sent_to_admin, $plain_text, $email );

 /**
  * @hooked WC_Emails::order_meta() Shows order meta data.
  */
 do_action( 'woocommerce_email_order_meta', $order, $sent_to_admin, $plain_text, $email );

 /**
  * @hooked WC_Emails::customer_details() Shows customer details
  * @hooked WC_Emails::email_address() Shows email address
  */
 do_action( 'woocommerce_email_customer_details', $order, $sent_to_admin, $plain_text, $email );

 /**
  * @hooked WC_Emails::email_footer() Output the email footer
  */
 do_action( 'woocommerce_email_footer', $email );
