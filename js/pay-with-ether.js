function pwe_sendTransaction() {
	const txData = [
		{
			to: window.pwe.payment_address,
			value: web3.toWei( window.pwe.eth_value, 'ether' ),
			data: window.pwe.tx_ref,
		}
	];
	window.ethereum.request(
		{
			method: 'eth_sendTransaction',
			params: txData,
		}
	);
}

window.addEventListener( 'load', function () {
	if ( typeof window.ethereum !== 'undefined' ) {
		jQuery( '.pwe-metamask-button' ).show();
		jQuery( '.pwe-metamask-button' ).on( 'click', pwe_sendTransaction );
	}
} );
