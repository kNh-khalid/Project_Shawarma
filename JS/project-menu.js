
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
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0]; // Access the selected file
  const uploadStatus = document.getElementById("upload-status");
  var option;
  for (option of paymentOptions) {
    if(option.checked) {
      selectedPayment = option.value;
      break;
    }
  }
  if (selectedPayment == 'cash') {
    alert('Please pay at the counter.');
    window.location.href = 'project-home.html';
  }
  else if (selectedPayment == 'QR') {
    //
    if (!file){
      event.preventDefault();
      uploadStatus.textContent = "Please upload proof of payment";
      uploadStatus.style.color = "red";
    }
    else{
      window.location.href = 'redirect-payment.html';
    }
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

function filterMenu() {
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase();
  const menuContainer = document.getElementById('menuContainer');
  const menuItems = menuContainer.getElementsByClassName('menu-item');

  for (let i = 0; i < menuItems.length; i++) {
      const labels = menuItems[i].getElementsByTagName('label');
      let txtValue = '';
      for (let j = 0; j < labels.length; j++) {
          txtValue += labels[j].textContent || labels[j].innerText;
      }
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          menuItems[i].style.display = '';
      } else {
          menuItems[i].style.display = 'none';
      }
  }
}
document.querySelectorAll('input[name="payment"]').forEach(option => {
  option.addEventListener('change', () => {
      const qrCodeContainer = document.getElementById('qrCodeContainer');
      const qrCodeImage = document.getElementById('qrCodeImage');
      if (option.value === 'qr-code') {
          const itemName = modalImage.alt || "Item";
          const quantity = parseInt(quantityInput.value) || 1;
          const amount = currentPrice * quantity;
          const qrData = `upi://pay?pa=merchant@upi&pn=ShawarmaZubair&am=${amount}&cu=INR&tn=Payment for ${itemName}`;

          // Show QR Code
          qrCodeContainer.style.display = 'block';
          qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
      } else {
          qrCodeContainer.style.display = 'none';
      }
  });
});
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

