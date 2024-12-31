
const items = document.querySelectorAll('.item');
// elements dlm modal
const modal = document.getElementById('Modal');
const modalImage = document.getElementById('modalImage');
const modalPrice = document.getElementById('modalPrice');
const quantityInput = document.getElementById('quantityInput');
const totalPrice = document.getElementById('totalPrice');
const closeModal = document.getElementById('closeModal');

let currentPrice = 0;

// event listeners to each image utk click
items.forEach(item => {
  item.addEventListener('click', () => {
    currentPrice = parseFloat(item.getAttribute('data-price')); //change to float
    const imgSrc = item.getAttribute('src'); //get image source
    const imgAlt = item.getAttribute('alt'); // get alt

    // Update modal content
    modalImage.src = imgSrc; 
    modalImage.alt = imgAlt;
    modalPrice.textContent = `Price: RM ${currentPrice.toFixed(2)}`; //tofixed for decimal places
    quantityInput.value = 1; //starting with 1
    totalPrice.textContent = `Total: RM ${(currentPrice * 1).toFixed(2)}`; // Default total for 1 item

    // Show the modal
    modal.classList.add('active');
  });
});

// Update total price when quantity changes
quantityInput.addEventListener('input', () => {
  const quantity = parseInt(quantityInput.value) || 1;
  totalPrice.textContent = `Total: RM ${(currentPrice * quantity).toFixed(2)}`;
});

// Close modal event
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

document.getElementById('submit').addEventListener('click', function (event) {
  event.preventDefault();
  const paymentOptions = document.getElementsByName('payment');
  let selectedPayment = null;
  var option;
  for (option of paymentOptions) {
    if(option.checked) {
      selectedPayment = option.value;
      break;
    }
  }
  if (selectedPayment == 'cash') {
    alert('Please pay at the counter.');
    window.location.href = '/HTML/project-home.html';
  }
  else if (selectedPayment == 'bank-muamalat' || selectedPayment == 'bank-islam' || selectedPayment == 'tng-ewallet') {
    //
    window.location.href = '/HTML/redirect-payment.html';   
  }
  else {
    alert('Please select a payment method.');
}
});
function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the item is already in the cart
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1; // Increment the quantity if the item already exists
  } else {
    // Add a new item with quantity 1
    cart.push({ name, price, image, quantity: 1 });
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${name} has been added to the cart!`);
}
