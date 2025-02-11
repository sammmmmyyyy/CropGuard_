document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("preferredLanguage") || "en";

    const translations = {
        en: {
            loginTitle: "Login / Signup",
            userType: "Select User Type:",
            username: "Username:",
            password: "Password:",
            loginButton: "Login",
            noAccount: "Don't have an account? <a id='signup-link' href='signup.html'>Sign Up</a>"
        },
        hi: {
            loginTitle: "लॉगिन / साइनअप",
            userType: "उपयोगकर्ता प्रकार चुनें:",
            username: "उपयोगकर्ता नाम:",
            password: "पासवर्ड:",
            loginButton: "लॉगिन",
            noAccount: "खाता नहीं है? <a id='signup-link' href='signup.html'>साइन अप करें</a>"
        },
        mr: {
            loginTitle: "लॉगिन / साइनअप",
            userType: "वापरकर्ता प्रकार निवडा:",
            username: "वापरकर्ता नाव:",
            password: "संकेतशब्द:",
            loginButton: "लॉगिन",
            noAccount: "खाते नाही? <a id='signup-link' href='signup.html'>साइन अप करा</a>"
        },

        bn: {
            loginTitle: "লগইন / সাইনআপ",
            userType: "ব্যবহারকারীর ধরন নির্বাচন করুন:",
            username: "ব্যবহারকারীর নাম:",
            password: "পাসওয়ার্ড:",
            loginButton: "লগইন",
            noAccount: "অ্যাকাউন্ট নেই? <a id='signup-link' href='signup.html'>সাইন আপ করুন</a>"
        },
        ta: {
            loginTitle: "உள்நுழைவு / பதிவு",
            userType: "பயனர் வகையைத் தேர்ந்தெடுக்கவும்:",
            username: "பயனர் பெயர்:",
            password: "கடவுச்சொல்:",
            loginButton: "உள்நுழைய",
            noAccount: "கணக்கு இல்லையா? <a id='signup-link' href='signup.html'>பதிவு செய்யவும்</a>"
        },
        te: {
            loginTitle: "లాగిన్ / సైన్ అప్",
            userType: "వినియోగదారు రకం ఎంచుకోండి:",
            username: "వినియోగదారు పేరు:",
            password: "పాస్‌వర్డ్:",
            loginButton: "లాగిన్",
            noAccount: "ఖాతా లేదు? <a id='signup-link' href='signup.html'>సైన్ అప్ చేయండి</a>"
        },

        ml: {
            loginTitle: "ലോഗിൻ / സൈൻ അപ്പ്",
            userType: "ഉപയോക്തൃ തരം തിരഞ്ഞെടുക്കുക:",
            username: "ഉപയോക്തൃനാമം:",
            password: "പാസ്വേഡ്:",
            loginButton: "ലോഗിൻ",
            noAccount: "അക്കൗണ്ട് ഇല്ലേ? <a id='signup-link' href='signup.html'>സൈൻ അപ്പ് ചെയ്യുക</a>"
        },
        pa: {
            loginTitle: "ਲਾਗਇਨ / ਸਾਇਨ ਅੱਪ",
            userType: "ਉਪਭੋਗਤਾ ਕਿਸਮ ਚੁਣੋ:",
            username: "ਉਪਭੋਗਤਾ ਨਾਂ:",
            password: "ਪਾਸਵਰਡ:",
            loginButton: "ਲਾਗਇਨ",
            noAccount: "ਅਕਾਉਂਟ ਨਹੀਂ? <a id='signup-link' href='signup.html'>ਸਾਇਨ ਅੱਪ ਕਰੋ</a>"
        },
        or: {
            loginTitle: "ଲଗଇନ୍ / ସାଇନ୍ ଅପ୍",
            userType: "ଉପଯୋଗକାରୀ ପ୍ରକାର ବାଛନ୍ତୁ:",
            username: "ଉପଯୋଗକାରୀ ନାମ:",
            password: "ପାସୱାର୍ଡ୍:",
            loginButton: "ଲଗଇନ୍",
            noAccount: "ଖାତା ନାହିଁ? <a id='signup-link' href='signup.html'>ସାଇନ୍ ଅପ୍ କରନ୍ତୁ</a>"
        },
        gu: {
            loginTitle: "લૉગિન / સાઇનઅપ",
            userType: "વપરાશકર્તા પ્રકાર પસંદ કરો:",
            username: "વપરાશકર્તા નામ:",
            password: "પાસવર્ડ:",
            loginButton: "લૉગિન",
            noAccount: "એકાઉન્ટ નથી? <a id='signup-link' href='signup.html'>સાઇન અપ કરો</a>"
        }
        
    };

    // Apply translations
    if (translations[language]) {
        document.getElementById("login-title").textContent = translations[language].loginTitle;
        document.querySelector("label[for='user-type']").textContent = translations[language].userType;
        document.getElementById("username-label").textContent = translations[language].username;
        document.getElementById("password-label").textContent = translations[language].password;
        document.getElementById("login-btn").textContent = translations[language].loginButton;
        document.getElementById("no-account").innerHTML = translations[language].noAccount;
    }

    // Fix Sign Up link after translation
    const signupLink = document.getElementById("signup-link");
    if (signupLink) {
        signupLink.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default in case JS interferes
            window.location.href = "signup.html"; // Redirect manually
        });
    }

    // Login button event
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
            window.location.href = "cropguard.html"; // Redirect farmers to CropGuard page
        }
    });
});
