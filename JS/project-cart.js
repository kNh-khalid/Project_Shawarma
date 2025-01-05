window.onload = function () {
  renderCart();
};
const modal = document.getElementById('Modal'); // Modal element
const closeModalButton = document.getElementById("closeModal");

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const template = document.getElementById('cart-item-template'); // Reference the template

function renderCart() {
 
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
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
  // Open the modal
  modal.classList.add('active');
}

// Add the event listener to the submit button only once
document.getElementById('submit').addEventListener('click', function (event) {

  const paymentOptions = document.getElementsByName('payment');
  let selectedPayment = null;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0]; // Access the selected file
  const uploadStatus = document.getElementById("upload-status");

  for (let option of paymentOptions) {
    if (option.checked) {
      selectedPayment = option.value;
      break;
    }
  }

  if (selectedPayment === 'cash') {
    alert('Please pay at the counter.');
    window.location.href = 'project-home.html';
  } else if (selectedPayment == 'QR') {
      if (!file){
        event.preventDefault();
        uploadStatus.textContent = "Please upload proof of payment";
        uploadStatus.style.color = "red";
      }
      else{
        window.location.href = 'redirect-payment.html';
      }
  }else {
    alert('Please select a payment method.');
  }
});

closeModalButton.onclick = function () {
  modal.style.display = "none";
};
function clearCart() {
  const paymentOptions = document.getElementsByName('payment');
    let selectedPayment = null;
    var option;
    for (option of paymentOptions) {
      if(option.checked) {
        selectedPayment = option.value;
        break;
      }
    }
    if (selectedPayment == 'cash' || selectedPayment == 'QR') {
      localStorage.removeItem('cart'); // Clear the cart from localStorage
      renderCart(); // Optionally update the UI
    } 
}
const qrRadio = document.getElementById("payment-qr");
const cashRadio = document.getElementById("payment-cash");
const qrImage = document.getElementById("qr-image");
const uploadReceipt = document.getElementById("file-upload-form")

// Add event listeners to both radio buttons
qrRadio.addEventListener("change", function () {
  if (qrRadio.checked) {
      qrImage.style.display = "block"; // Show QR 
      uploadReceipt.style.display = "flex";
  }
});

cashRadio.addEventListener("change", function () {
  if (cashRadio.checked) {
      qrImage.style.display = "none"; // Hide QR code
      uploadReceipt.style.display = "none";
  }
});

const fileInput = document.getElementById("file");
const uploadArea = document.getElementById("upload-area");
const fileNameDisplay = document.getElementById("file-name");
const filePreview = document.getElementById("file-preview");
const uploadButton = document.getElementById("upload-button");
const uploadStatus = document.getElementById("upload-status");

fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  handleFile(file);
});

uploadArea.addEventListener("dragover", function (event) {
  event.preventDefault();
  uploadArea.classList.add("dragover");
});
uploadArea.addEventListener("dragleave", function () {
  uploadArea.classList.remove("dragover");
});
uploadArea.addEventListener("drop", function (event) {
  event.preventDefault();
  uploadArea.classList.remove("dragover");

  const file = event.dataTransfer.files[0];
  fileInput.files = event.dataTransfer.files; // Update the input
  handleFile(file);
});

// Handle file processing
function handleFile(file) {
  if (file) {
    fileNameDisplay.textContent = `Selected File: ${file.name}`;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        filePreview.src = e.target.result;
        filePreview.style.display = "block";
      };

      reader.readAsDataURL(file);
    } else {
      filePreview.style.display = "none";
    }
  } else {
    fileNameDisplay.textContent = "No file selected";
    filePreview.style.display = "none";
  }
}
// Upload button functionality
uploadButton.addEventListener("click", function () {
  const file = fileInput.files[0];

  if (!file) {
    uploadStatus.textContent = "No file selected. Please select a file before uploading.";
    uploadStatus.style.color = "red";
    return;
  }
  uploadStatus.textContent = "Uploading...";
  uploadStatus.style.color = "blue";

  setTimeout(() => {
    uploadStatus.textContent = `File "${file.name}" uploaded successfully!`;
    uploadStatus.style.color = "green";
  }, 2000);
});

