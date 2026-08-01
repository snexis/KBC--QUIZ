// ==========================================
// PROMO CODE & TRIAL MANAGEMENT (SECURE HASH)
// ==========================================

// SHA-256 হ্যাশ তালিকা (আসল কোড গোপনে রাখার জন্য)
// KBC15DAYS -> 40e2cfbf6be71e95690b2203efbc6b8e3a2c499e7df12ba6673bb2f638cbab89
// KBC20DAYS -> 08e98ec7d62fbdb99e46a74b12aa318ee4eb5953049b5c2c77d46a8947596fa5
// KBC30DAYS -> 8b6d3763ebad0841dfa9d5a6b09bd711463eefbbbf15dbbc450201c70e263d90
const PROMO_HASHES = {
  "40e2cfbf6be71e95690b2203efbc6b8e3a2c499e7df12ba6673bb2f638cbab89": 15,
  "08e98ec7d62fbdb99e46a74b12aa318ee4eb5953049b5c2c77d46a8947596fa5": 20,
  "8b6d3763ebad0841dfa9d5a6b09bd711463eefbbbf15dbbc450201c70e263d90": 30
};

// ক্যারেক্টার হ্যাশ রূপান্তর ফাংশন
async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ফ্রি ট্রায়াল ইনিশিয়ালাইজেশন (প্রথমবার ৫ দিন দেওয়া হবে)
function initializeTrial() {
  let expiryDate = localStorage.getItem("app_expiry_date");
  if (!expiryDate) {
    let now = new Date();
    now.setDate(now.getDate() + 5); // ৫ দিনের ফ্রি ট্রায়াল
    localStorage.setItem("app_expiry_date", now.toISOString());
    expiryDate = now.toISOString();
  }
  return new Date(expiryDate);
}

// ট্রায়াল বা সাবস্ক্রিপশনের মেয়াদ চেক
function isAccessValid() {
  const expiryDate = initializeTrial();
  const currentDate = new Date();
  return currentDate <= expiryDate;
}

// ইউজার প্রোমো কোড ইনপুট দিলে এটি কল হবে
async function applyPromoCode(userEnteredCode) {
  if (!userEnteredCode) {
    alert("অনুগ্রহ করে একটি প্রোমো কোড লিখুন!");
    return false;
  }

  const cleanCode = userEnteredCode.trim().toUpperCase();
  const userHash = await hashText(cleanCode);

  if (PROMO_HASHES[userHash]) {
    const daysToAdd = PROMO_HASHES[userHash];
    let currentExpiry = initializeTrial();
    let baseDate = (currentExpiry < new Date()) ? new Date() : currentExpiry;

    baseDate.setDate(baseDate.getDate() + daysToAdd);
    localStorage.setItem("app_expiry_date", baseDate.toISOString());

    alert(`প্রোমো কোড সফলভাবে যুক্ত হয়েছে! আপনার মেয়াদ ${daysToAdd} দিন বাড়ানো হয়েছে।`);
    
    // লগইন বা প্রম্পট হাইড করে গেম ইন্টারফেস দেখানোর ফাংশন কল করুন
    checkAppAccessStatus();
    return true;
  } else {
    alert("ভুল বা অবৈধ প্রোমো কোড!");
    return false;
  }
}

// অ্যাপ খোলার সাথে সাথে এক্সেস যাচাইকরণ
function checkAppAccessStatus() {
  if (!isAccessValid()) {
    // মেয়াদ শেষ হলে গেমের মূল অংশ লক করে প্রোমো কোড ইন্টারফেস দেখাবে
    alert("আপনার ফ্রি ট্রায়াল বা মেয়াদের সময়সীমা শেষ হয়ে গেছে! অনুগ্রহ করে প্রোমো কোড ব্যবহার করুন।");
    // এখানে আপনার লগইন/প্রোমো কোড ইউআই (Modal) দৃশ্যমান করার কোড লিখুন
  } else {
    // মেয়াদ থাকলে স্বাভাবিক গেম চালু থাকবে
    console.log("Access Granted. Expiry Date:", localStorage.getItem("app_expiry_date"));
  }
}

// পেজ লোড হওয়ার পর এক্সেস চেক করুন
document.addEventListener("DOMContentLoaded", () => {
  checkAppAccessStatus();
});
