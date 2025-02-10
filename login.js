document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("preferredLanguage") || "en";

    const translations = {
        en: {
            loginTitle: "Login / Signup",
            username: "Username:",
            password: "Password:",
            loginButton: "Login",
            noAccount: "Don't have an account? <a href='#'>Sign Up</a>"
        },
        hi: {
            loginTitle: "लॉगिन / साइनअप",
            username: "उपयोगकर्ता नाम:",
            password: "पासवर्ड:",
            loginButton: "लॉगिन",
            noAccount: "खाता नहीं है? <a href='#'>साइन अप करें</a>"
        },
        mr: {
            loginTitle: "लॉगिन / साइनअप",
            username: "वापरकर्ता नाव:",
            password: "संकेतशब्द:",
            loginButton: "लॉगिन",
            noAccount: "खाते नाही? <a href='#'>साइन अप करा</a>"
        },
        bn: {
            loginTitle: "লগইন / সাইনআপ",
            username: "ব্যবহারকারীর নাম:",
            password: "পাসওয়ার্ড:",
            loginButton: "লগইন",
            noAccount: "অ্যাকাউন্ট নেই? <a href='#'>সাইন আপ করুন</a>"
        },
        ta: {
            loginTitle: "உள்நுழைவு / பதிவு",
            username: "பயனர் பெயர்:",
            password: "கடவுச்சொல்:",
            loginButton: "உள்நுழைய",
            noAccount: "கணக்கு இல்லையா? <a href='#'>பதிவு செய்ய</a>"
        },
        te: {
            loginTitle: "లాగిన్ / సైన్ అప్",
            username: "వాడుకరి పేరు:",
            password: "పాస్‌వర్డ్:",
            loginButton: "లాగిన్",
            noAccount: "ఖాతా లేదా? <a href='#'>సైన్ అప్ చేయండి</a>"
        },
        ml: {
            loginTitle: "ലോഗിൻ / സൈൻ അപ്പ്",
            username: "ഉപയോക്തൃനാമം:",
            password: "പാസ്വേഡ്:",
            loginButton: "ലോഗിൻ",
            noAccount: "അക്കൗണ്ട് ഇല്ലേ? <a href='#'>സൈൻ അപ്പ്</a>"
        },
        pa: {
            loginTitle: "ਲੌਗਇਨ / ਸਾਈਨਅੱਪ",
            username: "ਉਪਭੋਗਤਾ ਨਾਮ:",
            password: "ਪਾਸਵਰਡ:",
            loginButton: "ਲੌਗਇਨ",
            noAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ? <a href='#'>ਸਾਈਨ ਅੱਪ</a>"
        },
        or: {
            loginTitle: "ଲଗଇନ୍ / ସାଇନ୍ ଅପ୍",
            username: "ଉପଯୋଗକର୍ତ୍ତା ନାମ:",
            password: "ପାସୱାର୍ଡ:",
            loginButton: "ଲଗଇନ୍",
            noAccount: "ଏକାଉଣ୍ଟ ନାହିଁ? <a href='#'>ସାଇନ୍ ଅପ୍</a>"
        },
        gu: {
            loginTitle: "લૉગિન / સાઇનઅપ",
            username: "વપરાશકર્તા નામ:",
            password: "પાસવર્ડ:",
            loginButton: "લૉગિન",
            noAccount: "ખાતું નથી? <a href='#'>સાઇન અપ કરો</a>"
        }
    };

    // Apply translations
    if (translations[language]) {
        document.getElementById("login-title").textContent = translations[language].loginTitle;
        document.getElementById("username-label").textContent = translations[language].username;
        document.getElementById("password-label").textContent = translations[language].password;
        document.getElementById("login-btn").textContent = translations[language].loginButton;
        document.getElementById("no-account").innerHTML = translations[language].noAccount;
    }

    // Login button click event
    document.getElementById("login-btn").addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Save login state (you can replace this with actual authentication logic)
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to CropGuard page
        window.location.href = "cropguard.html";
    });
});