<?php

/*
Plugin Name: Pay With Ether
Plugin URI: https://wordpress.org/pay-with-ether
Description: Payment gateway for accepting payments using Ether. Offers integration with PayWithEther.com for automated payment processing.
Version: 1.4.2
WC requires at least: 4.4
WC tested up to: 5.4
Author: Lee Willis
Author URI: http://plugins.leewillis.co.uk/

Copyright: © 2017-2021 Ademti Software Ltd.
License: GNU General Public License v3.0
License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/

define('PWE_VERSION', '1.4.2');

if ( version_compare( phpversion(), '5.6', '<' ) ) {
	add_action( 'admin_init', 'pwe_plugin_deactivate' );
	add_action( 'admin_notices', 'pwe_plugin_admin_notice' );
	function pwe_plugin_deactivate() {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}
		deactivate_plugins( plugin_basename( __FILE__ ) );
	}
	function pwe_plugin_admin_notice() {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}
		echo '<div class="error"><p><strong>Pay With Ether</strong> requires PHP version 5.6 or above.</p></div>';
		if ( isset( $_GET['activate'] ) ) {
			unset( $_GET['activate'] );
		}
	}
} else {
	// Add autoloaders, and load up the plugin.
	require_once( dirname( __FILE__ ) . '/autoload.php' );
	$GLOBALS['pay_with_ether'] = new \Ademti\Pwe\Main( plugins_url( '', __FILE__ ), plugin_dir_path( __FILE__ ) );
	$GLOBALS['pay_with_ether']->run();
}
