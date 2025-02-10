// Language data object
const translations = {
    en: { title: "Select Your Preferred Language", continue: "Continue" },
    hi: { title: "अपनी पसंदीदा भाषा चुनें", continue: "जारी रखें" },
    mr: { title: "तुमची पसंतीची भाषा निवडा", continue: "सुरू ठेवा" },
    bn: { title: "আপনার পছন্দের ভাষা নির্বাচন করুন", continue: "চালিয়ে যান" },
    ta: { title: "உங்கள் விருப்பமான மொழியைத் தேர்வுசெய்க", continue: "தொடரவும்" },
    te: { title: "మీ ఇష్టమైన భాషను ఎంచుకోండి", continue: "కొనసాగించు" },
    ml: { title: "നിങ്ങളുടെ ഇഷ്‌ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക", continue: "തുടരുക" },
    pa: { title: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ", continue: "ਜਾਰੀ ਰੱਖੋ" },
    or: { title: "ଆପଣଙ୍କର ପସନ୍ଦର ଭାଷା ବାଛନ୍ତୁ", continue: "ଜାରି ରଖନ୍ତୁ" },
    gu: { title: "તમારી પસંદીદાર ભાષા પસંદ કરો", continue: "ચાલુ રાખો" }
};

// Function to change language dynamically
document.getElementById("language-selector").addEventListener("change", function () {
    let selectedLanguage = this.value;
    document.getElementById("title").innerText = translations[selectedLanguage].title;
    document.getElementById("continue-btn").innerText = translations[selectedLanguage].continue;
});

// Function to save selected language and proceed to login/signup page
document.getElementById("continue-btn").addEventListener("click", function () {
    let selectedLanguage = document.getElementById("language-selector").value;
    localStorage.setItem("selectedLanguage", selectedLanguage); // Save preference
    window.location.href = "login.html"; // Redirect to login/signup
});

