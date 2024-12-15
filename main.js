// Check if user is logged in
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        // Redirect to login page if no user is logged in
        window.location.href = "login.html";
    } else {
        // Load user details into the UI
        updateProfileUI(user);
    }
}

// Login Function
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Registration Function
function register() {
    const username = document.getElementById("username").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email-register").value.trim();
    const password = document.getElementById("password-register").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    // Validate required fields
    if (!username || !firstname || !lastname || !email || !password || !address) {
        alert("Please fill in all required fields!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("A user with this email already exists. Please login.");
        return;
    }

    const newUser = {
        username,
        firstname,
        lastname,
        email,
        password,
        phone,
        address,
        coins: 50 // Starting coins
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    alert("Registration successful! You are now logged in.");
    window.location.href = "index.html";
}

// Update Profile UI
function updateProfileUI(user) {
    document.getElementById("profile-name").textContent = `${user.firstname} ${user.lastname}`;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-initials").textContent =
        user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase();
}

// Logout Function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Initialize Profile
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.html")) {
        checkLogin();
    }
});
