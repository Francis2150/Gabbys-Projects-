function payWithPaystack(itemName, amount) {
  var handler = PaystackPop.setup({
    key: 'pk_test_346089ac0faa394fab894195cf0acd136817dcda', // Your public key
    email: 'customer@example.com', // You can make this dynamic
    amount: amount, // in pesewas (5000 = GHS 50)
    currency: 'GHS',
    label: itemName,
    callback: function(response) {
      alert('✅ Payment successful! Reference: ' + response.reference);
      // Here you can save the transaction or redirect
    },
    onClose: function() {
      alert('❌ Payment window closed.');
    }
  });
  handler.openIframe();
}
