function openPayment(productName) {
    document.getElementById('payment-modal').style.display = 'block';
    localStorage.setItem('pendingItem', productName);
}

function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function placeOrder(method) {
    const item = localStorage.getItem('pendingItem') || "Sneaker Pro";

    // Simulate Email sending
    console.log(`Email Sent: Order Received for ${item}`);

    alert(`Thanks for shopping! \nOrder placed via ${method}. \nA confirmation email has been sent.`);

    // Save to "My Orders"
    let orders = JSON.parse(localStorage.getItem('myOrders')) || [];
    orders.push({
        id: "#" + Math.floor(Math.random() * 10000),
        name: item,
        status: "Processing"
    });
    localStorage.setItem('myOrders', JSON.stringify(orders));

    window.location.href = "myorders.html";
}

// Logic for My Orders page tracker
if (window.location.pathname.includes("myorders.html")) {
    window.onload = function () {
        const orderList = document.getElementById('order-list');
        const orders = JSON.parse(localStorage.getItem('myOrders')) || [];

        if (orders.length === 0) {
            orderList.innerHTML = "<p>No orders yet.</p>";
        } else {
            orders.forEach(order => {
                orderList.innerHTML += `
                    <div style="border:1px solid #ccc; padding:15px; margin-bottom:10px; border-radius:8px;">
                        <strong>Order ID: ${order.id}</strong> - ${order.name} <br>
                        <span style="color: green;">Status: ${order.status} (In Transit)</span>
                    </div>
                `;
            });
        }
    }
}
// Function to display orders in myorders.html
function displayOrders() {
    const orderList = document.getElementById('order-list');
    if (!orderList) return;

    // Retrieve orders from LocalStorage
    const orders = JSON.parse(localStorage.getItem('myOrders')) || [];

    if (orders.length === 0) {
        orderList.innerHTML = `
            <div class="empty-state">
                <p>You haven't ordered any heat yet!</p>
                <a href="products.html" class="btn">Start Shopping</a>
            </div>
        `;
        return;
    }

    // Sort orders by newest first
    orderList.innerHTML = orders.reverse().map(order => `
        <div class="order-card">
            <div class="order-info">
                <h3>${order.name}</h3>
                <p>Order ID: ${order.id}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="order-status">
                <span class="status-badge">In Transit</span>
                <p style="margin-top:10px; font-size:0.8rem; color:#2ecc71;">Expected: 2-3 Days</p>
            </div>
        </div>
    `).join('');
}

// Ensure loadFooter is defined
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        // For a local environment, we'll inject the string directly 
        // because "fetch" requires a local server to work.
        footerPlaceholder.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-logo">
                    <h2 style="color: #ff4757;">RUNNER</h2>
                    <p>&copy; 2026 runner.com</p>
                </div>
                <div class="footer-contact">
                    <h3>Contact Us</h3>
                    <form id="contactForm">
                        <input type="text" id="userName" placeholder="Your Name" required>
                        <textarea id="userMessage" placeholder="Your Query" required></textarea>
                        <button type="submit" class="whatsapp-btn">Send to WhatsApp</button>
                    </form>
                </div>
            </div>
        </footer>`;
    }
}
// WhatsApp Integration Logic
document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'contactForm') {
        e.preventDefault();

        const name = document.getElementById('userName').value;
        const query = document.getElementById('userMessage').value;
        const phoneNumber = "1234567890"; // Replace with your actual WhatsApp number

        // Format: https://wa.me/number?text=URLEncodedText
        const message = `Hello Runner Support, I am ${name}. My query is: ${query}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    }
});

// Optional: Function to load footer.html into a div with id="footer-placeholder"
// Usage: <div id="footer-placeholder"></div>
async function loadFooter() {
    const response = await fetch('footer.html');
    const data = await response.text();
    document.getElementById('footer-placeholder').innerHTML = data;
}