window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

$(document).ready(function() {
  // Select all amountInput fields
  var $amountInputs = $('#whopper, #chicken, #onion, #coke');

  // Listen for changes in the amountInput fields
  $amountInputs.on('input', function() {
      var total = 0;
      var quantityTotal = 0;

      // Loop through each amountInput field and add its value to the total
      $amountInputs.each(function() {
          var value = $(this).val();
          var price = $(this).data('price');

          // Make sure the value is a number and not an empty string
          if (value !== '') {
              total += parseFloat(value) * price;
              quantityTotal += parseFloat(value);
          }
      });

      // Update the amounttotal field with the new total
      $('#Pricetotal').val(total);
      $('#amounttotal').val(quantityTotal);
  });

  $('.btn-submit').on('click', function(event) {
    // Fetch the values from the input fields
    var name = $('.form-control[aria-label="Username"]:first').val();
    var address = $('.form-control[aria-label="Username"]:eq(1)').val();
    var contactNumber = $('.form-control[aria-label="Username"]:last').val();
    var totalBill = $('#Pricetotal').val();
    var inputtedCash = $('#Pricechange').val();
  
    // Calculate the change
    var change = parseFloat(inputtedCash) - parseFloat(totalBill);
  
    // Check if the inputtedCash is less than the totalBill
    if (change < 0) {
        // Prevent the default action
        event.preventDefault();
  
        // Display an error message
        $('.modal-body').html(`
            <div class="value-font">"Insufficient cash! Please input the correct amount."</div>
        `);
    } else {
        // Display these values in the modal
        $('.modal-body').html(`
    <div class="row fs-4">
        <div class="col-6">
            Name:<br>
            Address:<br>
            Contact Number:
        </div>
        <div class="col-6 text-secondary value-font">
            ${name}<br>
            ${address}<br>
            ${contactNumber}
        </div>
    </div>
    <div class="row fs-4">
        <div class="col-6">
            Total Bill:<br>
            Payment:<br>
            Change:
        </div>
        <div class="col-6 text-secondary value-font">
            Php ${totalBill}.00<br>
            Php ${inputtedCash}.00<br>
            Php ${change}.00
        </div>
    </div>
`);
  
        // Manually open the modal
        $('#staticBackdrop').modal('show');
    }
  });
});