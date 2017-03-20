function pwe_sendTransaction() {
	web3.eth.sendTransaction(
		{
			to: window.pwe.payment_address,
			value: web3.toWei(window.pwe.eth_value, 'ether'),
			data: window.pwe.tx_ref,
		}, function(e, res) {}
	);
}
window.addEventListener('load', function() {
	if (typeof web3 !== 'undefined') {
		jQuery('.pwe-metamask-button').show();
		jQuery('.pwe-metamask-button').on('click', pwe_sendTransaction);
	}
});
