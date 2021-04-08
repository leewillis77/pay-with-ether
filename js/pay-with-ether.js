import Units from 'ethereumjs-units';
import BigNumber from 'bignumber.js';

function pwe_sendTransaction() {
	window.ethereum.request(
		{
			method: 'eth_requestAccounts'
		},
	).then( function ( accounts ) {
				const txValue = '0x' + new BigNumber(
					Units.convert( window.pwe.eth_value, 'eth', 'wei' ),
					10
				).toString( 16 );
				const txData = [ {
					to: window.pwe.payment_address,
					value: txValue,
					// See https://github.com/MetaMask/metamask-extension/issues/9951
					// data: window.pwe.tx_ref,
					from: accounts[ 0 ],
				} ];
				window.ethereum.request(
					{
						method: 'eth_sendTransaction',
						params: txData,
					}
				).catch( err => {
					console.log( err )
				} );
			}
	).catch( err => {
		console.log( err )
	} );
}

window.addEventListener( 'load', function () {
	if ( typeof window.ethereum !== 'undefined' ) {
		jQuery( '.pwe-metamask-button' ).show();
		jQuery( '.pwe-metamask-button' ).on( 'click', pwe_sendTransaction );
	}
} );
