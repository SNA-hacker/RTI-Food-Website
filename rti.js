/*==================== Navbar Hamburger ================*/ 
const menuIcon = document.getElementById("hamburger");
const navItems = document.getElementById("nav-menu");
menuIcon.addEventListener('click' , ()=>{
    navItems.classList.toggle("active");
});

/*================ Add to Cart Button ====================*/
const cartButtons = document.querySelectorAll(".add-to-cart");
const cartEmptySection =document.getElementById("cart-empty");
const cartContainer = document.getElementById("cart-container");
const cartTableBody = document.querySelector("#cart-table tbody");
const subtotalElement = document.querySelector("#subtotal");
const totalElement = document.querySelector("#total");
const checkoutBtn = document.querySelector("#cart-summary .btn");
const cartCount = document.getElementById('cart-count');
let count = 0;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    count ++;
    cartCount.textContent = count;
    const product = button.closest(".product");
    const productImage =product.querySelector(".product-img").src;
    const productName = product.querySelector(".product-name").textContent;
    const productPriceText = product.querySelector(".product-price")?.textContent || "$0";
    const match = productPriceText.match(/\d+(\.\d+)?/);
    const productPrice = match ? parseFloat(match[0]) : 0;

    const existingProduct =cart.find(item => item.name === productName);
    if(existingProduct){
        existingProduct.quantity +=  1;
        existingProduct.subtotal = parseFloat((existingProduct.price * existingProduct.quantity).toFixed(2));
    }
    else{ 
        cart.push({
            name:productName,
            price:productPrice,
            quantity:1,
            image:productImage,
            subtotal:productPrice
        });
  }
  updateCartTable();
  localStorage.setItem("cart", JSON.stringify(cart)); 
   alert(`${productName} added to cart!`);
});
});
   /*  ======== Remove Items ===========*/
if (cartTableBody) {
  cartTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCartTable();
      updateCartSummary();
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

 /* =============== Function to Update Cart Table ============ */

 function updateCartTable(){
    
    if(cart.length === 0){
        if(cartTableBody) cartTableBody.innerHTML = "";
        if(cartEmptySection) cartEmptySection.classList.remove("hidden");
        if(cartContainer) cartContainer.classList.add("hidden");
        if(document.getElementById("subtotal")) document.getElementById("subtotal").textContent = "$0.00";
        if(document.getElementById("total")) document.getElementById("total").textContent = "$0.00";
        return;
    }

    if(cartEmptySection) cartEmptySection.classList.add("hidden");
    if(cartContainer) cartContainer.classList.remove("hidden");
    if(cartTableBody) cartTableBody.innerHTML = "";
    let total = 0;

    cart.forEach((item,index)=>{
        if(!cartTableBody) return;
        const row = document.createElement("tr");
        row.innerHTML= ` 
        <td><img  src="${ item.image}"  width="60"> ${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${item.subtotal.toFixed(2)}</td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
       
    });
}
/* ================ Update Summary ================= */
function updateCartSummary(){
    let subtotal = 0;
    cart.forEach(item =>{
        subtotal += item.subtotal;
    });


     if(subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
     if(totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
if(checkoutBtn){
    if(cart.length === 0){
      checkoutBtn.classList.add('disabled');
    }
    else{
      checkoutBtn.classList.remove('disabled');    
    }
}
}
 
 updateCartTable();
 updateCartSummary();

 /*==================== Checkout Button ====================*/
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add some items first.");
      return;
    }


    alert("Thank you for your purchase! Your order has been placed.");

    
    cart = [];
    localStorage.removeItem("cart");


    updateCartTable();
    updateCartSummary();
  });
}

/*===================== Contact Form ================== */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = nameInput ? nameInput.nextElementSibling : null;
        const emailError = emailInput ? emailInput.nextElementSibling : null;
        const messageError = messageInput ? messageInput.nextElementSibling : null;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;

            if (nameInput && nameInput.value.trim() === '') {
                if (nameError) nameError.textContent = "Name is required";
                valid = false;
            } else if (nameError) nameError.textContent = '';

            if (emailInput && emailInput.value.trim() === '') {
                if (emailError) emailError.textContent = "Email is required";
                valid = false;
            } else if (emailError) emailError.textContent = '';

            if (messageInput && messageInput.value.trim() === '') {
                if (messageError) messageError.textContent = "Message is required";
                valid = false;
            } else if (messageError) messageError.textContent = '';

            if (valid) {
                alert("Message sent successfully!");
                contactForm.reset();
            }
        });
    }
});



/*================ Menu ================== */
//  Get filter buttons and menu items
const filterButtons = document.querySelectorAll('#filter-buttons button');
const menuItems = document.querySelectorAll('#All-dishes .dish');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.textContent.toLowerCase();

        menuItems.forEach(item => {
            const category = item.classList.contains(filter) ? filter : null;
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

    
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
const inputMenu = document.getElementById('input-menu');
inputMenu.addEventListener('input', () => {
    const searchText = inputMenu.value.toLowerCase();
    menuItems.forEach(item => {
        const name = item.querySelector('.product-name').textContent.toLowerCase();
        if (name.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});




