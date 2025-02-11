
document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("preferredLanguage") || "en";

    const translations = {
        en: {
            signupTitle: "Sign Up",
            userType: "Select User Type:",
            username: "Username:",
            password: "Password:",
            confirmPassword: "Confirm Password:",
            signupButton: "Sign Up",
            haveAccount: "Already have an account? <a href='login.html'>Login</a>"
        },
        hi: {
            signupTitle: "साइन अप",
            userType: "उपयोगकर्ता प्रकार चुनें:",
            username: "उपयोगकर्ता नाम:",
            password: "पासवर्ड:",
            confirmPassword: "पासवर्ड की पुष्टि करें:",
            signupButton: "साइन अप",
            haveAccount: "पहले से खाता है? <a href='login.html'>लॉगिन करें</a>"
        },
        mr: {
            signupTitle: "साइन अप",
            userType: "वापरकर्ता प्रकार निवडा:",
            username: "वापरकर्ता नाव:",
            password: "संकेतशब्द:",
            confirmPassword: "संकेतशब्द पुन्हा टाका:",
            signupButton: "साइन अप",
            haveAccount: "आधीच खाते आहे? <a href='login.html'>लॉगिन करा</a>"
        }
    };

    if (translations[language]) {
        document.getElementById("signup-title").textContent = translations[language].signupTitle;
        document.querySelector("label[for='user-type']").textContent = translations[language].userType;
        document.querySelector("label[for='username']").textContent = translations[language].username;
        document.querySelector("label[for='password']").textContent = translations[language].password;
        document.querySelector("label[for='confirm-password']").textContent = translations[language].confirmPassword;
        document.getElementById("signup-btn").textContent = translations[language].signupButton;
        document.getElementById("have-account").innerHTML = translations[language].haveAccount;
    }

    document.getElementById("signup-btn").addEventListener("click", () => {
        const userType = document.getElementById("user-type").value;
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (username === "" || password === "" || confirmPassword === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Save user details (Note: In a real application, use a backend & database)
        localStorage.setItem("registeredUser", JSON.stringify({ username, password, userType }));

        alert("Signup successful! You can now log in.");
        window.location.href = "login.html";
    });
});
