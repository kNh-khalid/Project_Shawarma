window.onload = function () {
  renderCart();
};

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const template = document.getElementById('cart-item-template'); // Reference the template

  cartItemsContainer.innerHTML = ''; // Clear previous items

  let totalAmount = 0;

  cart.forEach((item, index) => {
    const itemElement = template.content.cloneNode(true);

    // Populate the template
    itemElement.querySelector('.cart-item-image').src = item.image;
    itemElement.querySelector('.cart-item-image').alt = item.name;
    itemElement.querySelector('.cart-item-name').textContent = item.name;
    itemElement.querySelector('.cart-item-price').textContent = `Price: RM${item.price}`;
    itemElement.querySelector('.cart-item-quantity').value = item.quantity;
    itemElement.querySelector('.cart-item-total').textContent = `Total: RM${item.price * item.quantity}`;
    itemElement.querySelector('.cart-item-remove').onclick = () => removeFromCart(index);

    // Handle quantity changes
    itemElement.querySelector('.cart-item-quantity').onchange = (e) => {
      cart[index].quantity = Math.max(1, parseInt(e.target.value, 10)); // Ensure quantity is at least 1
      saveCart(cart);
      renderCart();
    };

    cartItemsContainer.appendChild(itemElement);
    totalAmount += item.price * item.quantity;
  });

  totalAmountElement.textContent = `Total: RM${totalAmount}`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
  const modal = document.getElementById('Modal'); // Modal element
  modal.classList.add('active');

  const closeModalButton = document.getElementById("closeModal");
  closeModalButton.onclick = function () {
      modal.style.display = "none";
  };
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
}
function clearCart() {
  localStorage.removeItem('cart'); // Clear the cart from localStorage
  renderCart(); // Optionally update the UI
}
