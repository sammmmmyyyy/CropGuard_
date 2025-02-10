document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const userType = document.getElementById("user-type");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");

    let isSignup = false; // Tracks whether the form is in signup mode

    // Toggle between Login and Signup
    toggleForm.addEventListener("click", function (e) {
        e.preventDefault();
        isSignup = !isSignup;

        if (isSignup) {
            formTitle.textContent = "Sign Up";
            submitBtn.textContent = "Sign Up";
            toggleForm.innerHTML = 'Already have an account? <a href="#">Login</a>';
        } else {
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleForm.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>";
        }
    });

    // Handle Login and Signup
    submitBtn.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const selectedUserType = userType.value; // Get selected user type (farmer/vendor)

        if (!username || !password) {
            alert("Please fill in all fields!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || {};

        if (isSignup) {
            // Signup process
            if (users[username]) {
                alert("Username already exists. Please choose another one.");
                return;
            }
            users[username] = { password, userType: selectedUserType };
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account created successfully! Please login.");
            isSignup = false; // Switch back to login mode
            formTitle.textContent = "Login";
            submitBtn.textContent = "Login";
            toggleForm.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>";
        } else {
            // Login process
            if (!users[username] || users[username].password !== password) {
                alert("Invalid username or password!");
                return;
            }

            localStorage.setItem("currentUser", username); // Store active session

            // Redirect based on user type
            if (users[username].userType === "farmer") {
                alert(`Welcome, ${username}! Redirecting to CropGuard...`);
                window.location.href = "cropguard.html"; // Farmer page
            } else if (users[username].userType === "vendor") {
                alert(`Welcome, ${username}! Redirecting to Vendor Registration...`);
                window.location.href = "vendor.html"; // Vendor page
            }
        }
    });
});
