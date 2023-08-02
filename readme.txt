=== Pay With Ether for WooCommerce ===
Contributors: leewillis77,morelazers,porridj
Tags: e-commerce, payment, crypto, ethereum, ether, woocommerce
Requires at least: 5.4
Tested up to: 6.2
License: GPL v2
Stable tag: 1.4.2

Pay with Ether enables customers to pay with Ether on your WooCommerce store.

== Description ==

**Note:** This plugin will be closed and no longer maintained or supported from 29th September 2023

Pay with Ether enables customers to pay with Ether on your WooCommerce store. Your customers will be offered
the option of paying with Ether at checkout. If they choose that option then they will be quoted a price
in Ether for their order automatically.

After submitting their order they will be given the details of the Ether transaction they should make.

Features:

* Automatically convert order value to Ether at checkout
* Option for adding a percentage mark-up to the converted price
* Ability to add "Pay with Metamask" button to allow easy payment via MetaMask Chrome client.
* Integration with [www.paywithether.com](https://www.paywithether.com) for automatic transaction tracking / reconciliation and order updates

== Installation ==

* Install it as you would any other plugin
* Activate it
* Head over to WooCommerce » Settings » Checkout » Pay With Ether
* Enter your Ethereum address to receive payments, confirm markup % and you're ready to go.

== Changelog ==

= 1.4.2 =
* Dependency updates
* WooCommerce 5.3 / 5.4 compatibility

= 1.4.1 =
* Cache bust JS/CSS

= 1.4.0 =
* Compatibility with updated metamask extension

= 1.3.5 =
* Bump WC Tested to params

= 1 3.4 =
* Fix issue where empty markup setting could generate warnings.

= 1.3.3 =
* WooCommerce compatibility updates.

= 1.3.2 =
* Fix issue where dust amount not included in transaction value in order email. Props @porridj

= 1.3.1 =
* Increase paywithether.com reconciliation timeout to 50 minutes.

= 1.3.0 = 
* Add dust amount to transaction value for easier reconciliation and compatibility with payments which don't hold transaction data.

= 1.2.0 = 
* Swap to running API on standard HTTPS port, instead of a custom port

= 1.1.5 =
* Fix issue where ETH payment instructions were added to all order-on-hold emails, irrespective of gateway chosen.

= 1.1.4 =
* Add link to payment tutorial on checkout completion page.

= 1.1.3 =
* Allow negative markups. Cap markups to +/- 100%

= 1.1.2 =
* Use official PayWithMetaMask button

= 1.1.1 =
* Fixes for plain text payment complete email.

= 1.1.0 =
* Add payment complete email for PayWithEther.com integration.

= 1.0.0 =
* Release to WordPress.org

= 0.9.3 =
* Do not allow gateway to be activated unless a payment address is set.
* Fix error when receiving timeout notifications

= 0.9 =
* Released for plugin review
