document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("preferredLanguage") || "en";

    const translations = {
        en: {
            loginTitle: "Login / Signup",
            userType: "Select User Type:",
            username: "Username:",
            password: "Password:",
            loginButton: "Login",
            noAccount: "Don't have an account? <a href='#'>Sign Up</a>"
        },
        hi: {
            loginTitle: "लॉगिन / साइनअप",
            userType: "उपयोगकर्ता प्रकार चुनें:",
            username: "उपयोगकर्ता नाम:",
            password: "पासवर्ड:",
            loginButton: "लॉगिन",
            noAccount: "खाता नहीं है? <a href='#'>साइन अप करें</a>"
        }
        // Add translations for other languages...
    };

    // Apply translations based on selected language
    if (translations[language]) {
        document.getElementById("login-title").textContent = translations[language].loginTitle;
        document.querySelector("label[for='user-type']").textContent = translations[language].userType;
        document.getElementById("username-label").textContent = translations[language].username;
        document.getElementById("password-label").textContent = translations[language].password;
        document.getElementById("login-btn").textContent = translations[language].loginButton;
        document.getElementById("no-account").innerHTML = translations[language].noAccount;
    }

    // Login button click event
    document.getElementById("login-btn").addEventListener("click", () => {
        const userType = document.getElementById("user-type").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Save login state and user type
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userType", userType);

        // Redirect based on user type
        if (userType === "vendor") {
            window.location.href = "vendor.html"; // Redirect vendors to vendor page
        } else {
            window.location.href = "cropguard.html"; // Redirect farmers to cropguard page
        }
    });
});
