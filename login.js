// Fetch selected language from localStorage
let selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

// Translations for login/signup page
const loginTranslations = {
    en: { title: "Login / Signup", username: "Username:", password: "Password:", login: "Login", noAccount: "Don't have an account? Sign Up" },
    hi: { title: "लॉगिन / साइन अप", username: "उपयोगकर्ता नाम:", password: "पासवर्ड:", login: "लॉग इन करें", noAccount: "खाता नहीं है? साइन अप करें" },
    mr: { title: "लॉगिन / साइन अप", username: "वापरकर्तानाव:", password: "संकेतशब्द:", login: "लॉग इन", noAccount: "खाते नाही? साइन अप करा" },
    bn: { title: "লগইন / সাইন আপ", username: "ব্যবহারকারীর নাম:", password: "পাসওয়ার্ড:", login: "লগইন", noAccount: "একটি অ্যাকাউন্ট নেই? সাইন আপ করুন" },
    ta: { title: "உள்நுழைவு / பதிவுபெறு", username: "பயனர் பெயர்:", password: "கடவுச்சொல்:", login: "உள்நுழைய", noAccount: "கணக்கு இல்லையா? பதிவுபெறுக" }
};

// Apply translations
document.getElementById("login-title").innerText = loginTranslations[selectedLanguage].title;
document.getElementById("username-label").innerText = loginTranslations[selectedLanguage].username;
document.getElementById("password-label").innerText = loginTranslations[selectedLanguage].password;
document.getElementById("login-btn").innerText = loginTranslations[selectedLanguage].login;
document.getElementById("no-account").innerHTML = loginTranslations[selectedLanguage].noAccount;

document.getElementById("login-btn").addEventListener("click", function () {
    // Simulate login (Replace with actual authentication later)
    window.location.href = "cropguard.html"; // Redirect to CropGuard main page
});

