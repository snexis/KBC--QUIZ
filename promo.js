// ==========================================
// PROMO CODE & TRIAL MANAGEMENT (UPDATED & SECURE)
// ==========================================

// SHA-256 হ্যাশ তালিকা (গোপন কোড ও দিন)
// KBC15DAYS -> 40e2cfbf6be71e95690b2203efbc6b8e3a2c499e7df12ba6673bb2f638cbab89 (15 Days)
// KBC20DAYS -> 08e98ec7d62fbdb99e46a74b12aa318ee4eb5953049b5c2c77d46a8947596fa5 (20 Days)
// KBC30DAYS -> 8b6d3763ebad0841dfa9d5a6b09bd711463eefbbbf15dbbc450201c70e263d90 (30 Days)
// WELCOME2026 -> b85fa179973bf7c269826d9c6c2bbfec2f0b355811cda32b1236113b2c1b2f42 (10 Days)
// KBCVIP60 -> e38dbbc0f4f9543e3c66f5716df0ee3cae235a90967dbb69ffef900a08e1a144 (60 Days)
// KBCFESTIVAL -> a8f58beed84bbdf3e1765c363dc839f993f4124cb11ef62cfb37b6c7a7605d3b (25 Days)
// FREE7DAYS -> d516caefdf0ef087f95fb6be0b5e5a2db3647183e8b0a996f0110bd5f43dbbbf (7 Days)

const PROMO_HASHES = {
  "40e2cfbf6be71e95690b2203efbc6b8e3a2c499e7df12ba6673bb2f638cbab89": 15,
  "08e98ec7d62fbdb99e46a74b12aa318ee4eb5953049b5c2c77d46a8947596fa5": 20,
  "8b6d3763ebad0841dfa9d5a6b09bd711463eefbbbf15dbbc450201c70e263d90": 30,
  "b85fa179973bf7c269826d9c6c2bbfec2f0b355811cda32b1236113b2c1b2f42": 10,
  "e38dbbc0f4f9543e3c66f5716df0ee3cae235a90967dbb69ffef900a08e1a144": 60,
  "a8f58beed84bbdf3e1765c363dc839f993f4124cb11ef62cfb37b6c7a7605d3b": 25,
  "d516caefdf0ef087f95fb6be0b5e5a2db3647183e8b0a996f0110bd5f43dbbbf": 7
};

// ক্যারেক্টার হ্যাশ রূপান্তর ফাংশন
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// প্রথমবার ফ্রি ট্রায়াল সেট করা (৫ দিন)
function initializeTrial() {
  let expiryDate = localStorage.getItem("app_expiry_date");
  if (!expiryDate) {
    let now = new Date();
    now.setDate(now.getDate() + 5);
    localStorage.setItem("app_expiry_date", now.toISOString());
    expiryDate = now.toISOString();
  }
  return new Date(expiryDate);
}

// ট্রায়াল বা এক্সেস বৈধ কিনা যাচাই
function isAccessValid() {
  const expiryDate = initializeTrial();
  const currentDate = new Date();
  return currentDate <= expiryDate;
}

// ইউজার কতদিন মেয়াদ বাকি আছে তা বের করার হেল্পার
function getRemainingDays() {
  const expiryDate = initializeTrial();
  const currentDate = new Date();
  const diffTime = expiryDate - currentDate;
  if (diffTime <= 0) return 0;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// প্রোমো কোড অ্যাপ্লাই করার আধুনিক ফাংশন
async function applyPromoCode(userEnteredCode) {
  const codeInput = userEnteredCode || (document.getElementById("promoInput") ? document.getElementById("promoInput").value : "");
  
  if (!codeInput || codeInput.trim() === "") {
    alert(curLang === 'bn' ? "অনুগ্রহ করে একটি প্রোমো কোড লিখুন!" : "Please enter a promo code!");
    return false;
  }

  const cleanCode = codeInput.trim().toUpperCase();
  const userHash = await hashText(cleanCode);

  // ব্যবহৃত কোড কিনা তা যাচাই
  let usedCodes = JSON.parse(localStorage.getItem("kbc_used_promo_hashes") || "[]");
  if (usedCodes.includes(userHash)) {
    alert(curLang === 'bn' ? "আপনি এই প্রোমো কোডটি ইতিমধ্যে ব্যবহার করেছেন!" : "You have already redeemed this promo code!");
    return false;
  }

  if (PROMO_HASHES[userHash]) {
    const daysToAdd = PROMO_HASHES[userHash];
    let currentExpiry = initializeTrial();
    let baseDate = (currentExpiry < new Date()) ? new Date() : currentExpiry;

    baseDate.setDate(baseDate.getDate() + daysToAdd);
    localStorage.setItem("app_expiry_date", baseDate.toISOString());

    // ব্যবহৃত কোড সেভ করা
    usedCodes.push(userHash);
    localStorage.setItem("kbc_used_promo_hashes", JSON.stringify(usedCodes));

    alert(curLang === 'bn' 
      ? `সফল হয়েছে! আপনার মেয়াদ আরও ${daysToAdd} দিন বাড়ানো হয়েছে।` 
      : `Success! Your access has been extended by ${daysToAdd} days.`);
    
    // ইনপুট বক্স ক্লিয়ার করা
    const inputElem = document.getElementById("promoInput");
    if (inputElem) inputElem.value = "";

    checkAppAccessStatus();
    return true;
  } else {
    alert(curLang === 'bn' ? "ভুল বা অবৈধ প্রোমো কোড!" : "Invalid promo code!");
    return false;
  }
}

// অ্যাপ এক্সেস স্ট্যাটাস চেক এবং ইন্টারফেস আপডেট
function checkAppAccessStatus() {
  const remainingDays = getRemainingDays();
  const promoSection = document.getElementById('promo-section');
  const expiryBadge = document.getElementById('expiry-badge');

  if (expiryBadge) {
    expiryBadge.innerText = curLang === 'bn' 
      ? `মেয়াদ বাকি: ${remainingDays} দিন` 
      : `Validity: ${remainingDays} Days`;
  }

  if (!isAccessValid()) {
    if (promoSection) promoSection.style.display = 'block';
    alert(curLang === 'bn' 
      ? "আপনার ফ্রি ট্রায়ালের মেয়াদ শেষ হয়ে গেছে! অনুগ্রহ করে প্রোমো কোড ব্যবহার করুন।" 
      : "Your trial period has expired! Please enter a valid promo code.");
    show('scr-login');
  } else {
    if (promoSection) promoSection.style.display = 'none';
  }
}
