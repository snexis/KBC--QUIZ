// =================================================================
// KBC PREMIUM 2026: COMPLETE 200 QUESTION DATABASE (BI-LINGUAL)
// =================================================================

const masterQuestionBank = [
  // --- ক্যাটাগরি: ইতিহাস ও স্বাধীনতা সংগ্রাম (১ থেকে ৪০) ---
  {
    id: 1,
    bn: { q: "কত সালে ভারতের রাজধানী কলকাতা থেকে দিল্লিতে স্থানান্তরিত হয়?", o: ["১৯০৫", "১৯১১", "১৯৪৭", "১৯৫০"] },
    en: { q: "In which year was the capital of India shifted from Calcutta to Delhi?", o: ["1905", "1911", "1947", "1950"] },
    a: 1
  },
  {
    id: 2,
    bn: { q: "সিন্ধু সভ্যতার কোন স্থানটি বর্তমান পাকিস্তানে অবস্থিত?", o: ["লোথাল", "কালিবঙ্গান", "হড়প্পা", "রোপার"] },
    en: { q: "Which Indus Valley Civilization site is located in Pakistan today?", o: ["Lothal", "Kalibangan", "Harappa", "Ropar"] },
    a: 2
  },
  {
    id: 3,
    bn: { q: "তাজমহল কোন নদীর তীরে অবস্থিত?", o: ["গঙ্গা", "যমুনা", "সরস্বতী", "নর্মদা"] },
    en: { q: "The famous Taj Mahal is situated on the banks of which river?", o: ["Ganga", "Yamuna", "Saraswati", "Narmada"] },
    a: 1
  },
  {
    id: 4,
    bn: { q: "গ্র্যান্ড ট্রাঙ্ক রোড (GT Road) কে নির্মাণ করেছিলেন?", o: ["আকবর", "শেরশাহ সুরি", "শাহজাহান", "চন্দ্রগুপ্ত মৌর্য"] },
    en: { q: "Who built the historical Grand Trunk Road (GT Road)?", o: ["Akbar", "Sher Shah Suri", "Shah Jahan", "Chandragupta Maurya"] },
    a: 1
  },
  {
    id: 5,
    bn: { q: "ভারতের কোন রাজ্যে বিখ্যাত অজন্তা গুহা অবস্থিত?", o: ["মধ্যপ্রদেশ", "মহারাষ্ট্র", "গুজরাট", "উড়িষ্যা"] },
    en: { q: "In which state of India are the famous Ajanta Caves located?", o: ["Madhya Pradesh", "Maharashtra", "Gujarat", "Odisha"] },
    a: 1
  },
  {
    id: 6,
    bn: { q: "কোন মুঘল সম্রাট সুরสม্রাট তানসেনকে নিজের দরবারে স্থান দিয়েছিলেন?", o: ["বাবর", "হুমায়ুন", "আকবর", "শাহজাহান"] },
    en: { q: "Which Mughal Emperor patronized the legendary musician Tansen?", o: ["Babur", "Humayun", "Akbar", "Shah Jahan"] },
    a: 2
  },
  {
    id: 7,
    bn: { q: "১৮৫৭ সালের মহাবিদ্রোহের প্রথম শহীদ কাকে মানা হয়?", o: ["মঙ্গল পাণ্ডে", "তাঁতিয়া তোপী", "নানা সাহেব", "বাহাদুর শাহ জাফর"] },
    en: { q: "Who is considered the first martyr of the Revolt of 1857?", o: ["Mangal Pandey", "Tatya Tope", "Nana Sahib", "Bahadur Shah Zafar"] },
    a: 0
  },
  {
    id: 8,
    bn: { q: "মহাত্মা গান্ধীর ডান্ডি অভিযান কত সালে শুরু হয়েছিল?", o: ["১৯২০", "১৯৩০", "১৯৪২", "১৯৪৭"] },
    en: { q: "In which year did Mahatma Gandhi start the Dandi March?", o: ["1920", "1930", "1942", "1947"] },
    a: 1
  },
  {
    id: 9,
    bn: { q: "সুভাষচন্দ্র বসু কোথায় 'আজাদ হিন্দ ফৌজ' গঠন করেন?", o: ["জার্মানি", "জাপান", "সিঙ্গাপুর", "মায়ানমার"] },
    en: { q: "Where did Subhash Chandra Bose form the 'Azad Hind Fauj'?", o: ["Germany", "Japan", "Singapore", "Myanmar"] },
    a: 2
  },
  {
    id: 10,
    bn: { q: "জালিয়ানওয়ালাবাগ হত্যাকাণ্ড কোন শহরে হয়েছিল?", o: ["অমৃতসর", "লাহোর", "দিল্লি", "জলন্ধর"] },
    en: { q: "In which city did the Jallianwala Bagh massacre take place?", o: ["Amritsar", "Lahore", "Delhi", "Jalandhar"] },
    a: 0
  },
  {
    id: 11,
    bn: { q: "আলেকজান্ডার যখন ভারত আক্রমণ করেন, তখন মগধের সিংহাসনে কোন বংশ ছিল?", o: ["মৌর্য বংশ", "নন্দ বংশ", "গুপ্ত বংশ", "নব্য বংশ"] },
    en: { q: "Which dynasty ruled Magadha when Alexander invaded India?", o: ["Maurya Dynasty", "Nanda Dynasty", "Gupta Dynasty", "Nanya Dynasty"] },
    a: 1
  },
  {
    id: 12,
    bn: { q: "কাদের মধ্যে প্রথম পানিপথের যুদ্ধ সংঘটিত হয়েছিল?", o: ["বাবর ও ইব্রাহিম লোদি", "আকবর ও হেমু", "হুমায়ুন ও শেরশাহ", "মারাঠা ও আফগান"] },
    en: { q: "Between whom was the First Battle of Panipat fought?", o: ["Babur and Ibrahim Lodi", "Akbar and Hemu", "Humayun and Sher Shah", "Marathas and Afghans"] },
    a: 0
  },
  {
    id: 13,
    bn: { q: "কোন মুঘল সম্রাট 'জিন্দাপীর' নামে পরিচিত ছিলেন?", o: ["আকবর", "জাহাঙ্গীর", "শাহজাহান", "আওরঙ্গজেব"] },
    en: { q: "Which Mughal Emperor was known as 'Zinda Pir'?", o: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"] },
    a: 3
  },
  {
    id: 14,
    bn: { q: "কবে এবং কার মধ্যে পলাশীর যুদ্ধ হয়েছিল?", o: ["১৭৫৭ - সিরাজউদ্দৌলা ও ক্লাইভ", "১৭৬৪ - মীর কাসিম ও ক্লাইভ", "১৫৫৬ - আকবর ও হেমু", "১৭৬১ - মারাঠা ও আহমদ শাহ"] },
    en: { q: "When and between whom was the Battle of Plassey fought?", o: ["1757 - Siraj-ud-Daulah & Clive", "1764 - Mir Qasim & Clive", "1556 - Akbar & Hemu", "1761 - Marathas & Ahmad Shah"] },
    a: 0
  },
  {
    id: 15,
    bn: { q: "বিজয়নগর সাম্রাজ্যের শ্রেষ্ঠ সম্রাট কে ছিলেন?", o: ["হরিহর", "বুক্কা", "কৃষ্ণদেব রায়", "সদাশিব রায়"] },
    en: { q: "Who was the greatest ruler of the Vijayanagara Empire?", o: ["Harihara", "Bukka", "素质 কৃষ্ণদেব রায় / Krishnadeva Raya", "Sadashiva Raya"] },
    a: 2
  },
  {
    id: 16,
    bn: { q: "কে 'ইন্ডিয়ান ন্যাশনাল আর্মি' (INA) প্রতিষ্ঠা করেছিলেন?", o: ["রাসবিহারী বসু", "সুভাষচন্দ্র বসু", "ভগত সিং", "লালা লাজপত রায়"] },
    en: { q: "Who initially founded the Indian National Army (INA)?", o: ["Rash Behari Bose", "Subhash Chandra Bose", "Bhagat Singh", "Lala Lajpat Rai"] },
    a: 0
  },
  {
    id: 17,
    bn: { q: "কোন আন্দোলনের সময় গান্ধীজি 'করেঙ্গে ইয়া মরেঙ্গে' স্লোগান দেন?", o: ["সহযোগিতা আন্দোলন", "আইন অমান্য আন্দোলন", "ভারত ছাড়ো আন্দোলন", "চম্পারণ সত্যাগ্রহ"] },
    en: { q: "During which movement did Gandhiji give the slogan 'Do or Die'?", o: ["Non-Cooperation", "Civil Disobedience", "Quit India Movement", "Champaran Satyagraha"] },
    a: 2
  },
  {
    id: 18,
    bn: { q: "স্বরাজ আমার জন্মগত অধিকার—উক্তিটি কার?", o: ["বাল গঙ্গাধর তিলক", "বিপিন চন্দ্র পাল", "লালা লাজপত রায়", "সুভাষচন্দ্র বসু"] },
    en: { q: "Swaraj is my birthright—who said this?", o: ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Lala Lajpat Rai", "Subhash Chandra Bose"] },
    a: 0
  },
  {
    id: 19,
    bn: { q: "ভারতের প্রথম গভর্নর জেনারেল কে ছিলেন?", o: ["লর্ড ক্লাইভ", "ওয়ারেন হেস্টিংস", "লর্ড উইলিয়াম বেন্টিঙ্ক", "লর্ড ক্যানিং"] },
    en: { q: "Who was the first Governor-General of India?", o: ["Lord Clive", "Warren Hastings", "Lord William Bentinck", "Lord Canning"] },
    a: 2
  },
  {
    id: 20,
    bn: { q: "কংগ্রেসের কোন অধিবেশনে প্রথম পূর্ণ স্বরাজের দাবি করা হয়?", o: ["কলকাতা অধিবেশন", "লাহোর অধিবেশন", "সুরাট অধিবেশন", "বোম্বে অধিবেশন"] },
    en: { q: "In which Congress session was the demand for 'Purna Swaraj' made?", o: ["Kolkata Session", "Lahore Session", "Surat Session", "Bombay Session"] },
    a: 1
  },
  {
    id: 21,
    bn: { q: "বাংলার প্রথম স্বাধীন নবাব কে ছিলেন?", o: ["মুর্শিদকুলি খান", "আলীবর্দী খান", "সিরাজউদ্দৌলা", "মীর জাফর"] },
    en: { q: "Who was the first independent Nawab of Bengal?", o: ["Murshid Quli Khan", "Alivardi Khan", "Siraj-ud-Daulah", "Mir Jafar"] },
    a: 0
  },
  {
    id: 22,
    bn: { q: "কোন গুপ্ত সম্রাটকে 'ভারতের নেপোলিয়ন' বলা হয়?", o: ["চন্দ্রগুপ্ত মৌর্য", "সমুদ্রগুপ্ত", "দ্বিতীয় চন্দ্রগুপ্ত", "কুমারগুপ্ত"] },
    en: { q: "Which Gupta ruler is known as the 'Napoleon of India'?", o: ["Chandragupta Maurya", "Samudragupta", "Chandragupta II", "Kumaragupta"] },
    a: 1
  },
  {
    id: 23,
    bn: { q: "কইলাশ মন্দির (এলোরা) কোন রাজবংশের আমলে নির্মিত হয়েছিল?", o: ["পল্লব রাজবংশ", "চোল রাজবংশ", "রাষ্ট্রকূট রাজবংশ", "চালুক্য রাজবংশ"] },
    en: { q: "The Kailash Temple at Ellora was built by which dynasty?", o: ["Pallavas", "Cholas", "Rashtrakutas", "Chalukyas"] },
    a: 2
  },
  {
    id: 24,
    bn: { q: "কে বিক্রমশীলা মহাবিহার বা বিশ্ববিদ্যালয় স্থাপন করেছিলেন?", o: ["গোপাল", "ধর্মপাল", "দেবপাল", "মহীপাল"] },
    en: { q: "Who founded the Vikramashila University?", o: ["Gopala", "Dharmapala", "Devapala", "Mahipala"] },
    a: 1
  },
  {
    id: 25,
    bn: { q: "কোন ঘটনার প্রতিবাদে রবীন্দ্রনাথ ঠাকুর 'নাইটহুড' উপাধি বর্জন করেন?", o: ["বঙ্গভঙ্গ", "জালিয়ানওয়ালাবাগ হত্যাকাণ্ড", "চৌরিচৌরা ঘটনা", "রাউলাট আইন"] },
    en: { q: "Against which incident did Rabindranath Tagore renounce his Knighthood?", o: ["Partition of Bengal", "Jallianwala Bagh Massacre", "Chauri Chaura Incident", "Rowlatt Act"] },
    a: 1
  },
  {
    id: 26,
    bn: { q: "ফাহিয়েন কোন মুঘল/গুপ্ত সম্রাটের শাসনকালে ভারতে আসেন?", o: ["চন্দ্রগুপ্ত মৌর্য", "সমুদ্রগুপ্ত", "দ্বিতীয় চন্দ্রগুপ্ত", "হর্ষবর্ধন"] },
    en: { q: "Fa-Hien visited India during the reign of which emperor?", o: ["Chandragupta Maurya", "Samudragupta", "Chandragupta II", "Harshavardhana"] },
    a: 2
  },
  {
    id: 27,
    bn: { q: "দিল্লির সুলতানি সাম্রাজ্যের একমাত্র মহিলা শাসক কে ছিলেন?", o: ["চাঁদ বিবি", "নূরজাহান", "সুলতানা রাজিয়া", "মমতাজ মহল"] },
    en: { q: "Who was the only female ruler of the Delhi Sultanate?", o: ["Chand Bibi", "Noor Jahan", "Sultana Razia", "Mumtaz Mahal"] },
    a: 2
  },
  {
    id: 28,
    bn: { q: "দ্বীন-ই-ইলাহী ধর্মমত কে প্রবর্তন করেন?", o: ["বাবর", "আকবর", "শাহজাহান", "জাহাঙ্গীর"] },
    en: { q: "Who introduced the religious path called 'Din-i-Ilahi'?", o: ["Babur", "Akbar", "Shah Jahan", "Jahangir"] },
    a: 1
  },
  {
    id: 29,
    bn: { q: "কবে অধীনতামূলক মিত্রতা নীতি (Subsidiary Alliance) প্রবর্তিত হয়?", o: ["১৭৯৮", "১৭৯৩", "১৮০৫", "১৮৫৬"] },
    en: { q: "In which year was the Subsidiary Alliance introduced?", o: ["1798", "1793", "1805", "1856"] },
    a: 0
  },
  {
    id: 30,
    bn: { q: "আমেরিকায় গদর পার্টি (Ghadar Party) কে প্রতিষ্ঠা করেছিলেন?", o: ["লালা হরদয়াল", "ভগত সিং", "চন্দ্রশেখর আজাদ", "সুভাষচন্দ্র বসু"] },
    en: { q: "Who founded the Ghadar Party in America?", o: ["Lala Hardayal", "Bhagat Singh", "Chandrashekhar Azad", "Subhash Chandra Bose"] },
    a: 0
  },
  {
    id: 31,
    bn: { q: "কে লোকনায়ক নামে পরিচিত ছিলেন?", o: ["জয়প্রকাশ নারায়ণ", "বাল গঙ্গাধর তিলক", "চিত্তরঞ্জন দাশ", "লালা লাজপত রায়"] },
    en: { q: "Who was popularly known as 'Loknayak'?", o: ["Jayaprakash Narayan", "Bal Gangadhar Tilak", "Chittaranjan Das", "Lala Lajpat Rai"] },
    a: 0
  },
  {
    id: 32,
    bn: { q: "হর্ষচরিত গ্রন্থটি কার রচনা?", o: ["হর্ষবর্ধন", "বাণভট্ট", "কলহন", "বিলহন"] },
    en: { q: "Who wrote the famous historical text 'Harshacharita'?", o: ["Harshavardhana", "Banabhatta", "Kalhana", "Bilhana"] },
    a: 1
  },
  {
    id: 33,
    bn: { q: "আর্যরা প্রথম ভারতের কোথায় বসতি স্থাপন করে?", o: ["সপ্তসিন্ধু অঞ্চল", "গাঙ্গেয় উপত্যকা", "দাক্ষিণাত্য", "বঙ্গদেশ"] },
    en: { q: "Where did the Aryans first settle in India?", o: ["Sapta Sindhu Region", "Gangetic Valley", "Deccan", "Bengal"] },
    a: 0
  },
  {
    id: 34,
    bn: { q: "গৌতম বুদ্ধ কোথায় তাঁর প্রথম বাণী প্রচার করেন (ধর্মচক্রপ্রবর্তন)?", o: ["লুম্বিনী", "বোধগয়া", "সারনাথ", "কুশীনগর"] },
    en: { q: "Where did Gautama Buddha deliver his first sermon?", o: ["Lumbini", "Bodh Gaya", "Sarnath", "Kushinagar"] },
    a: 2
  },
  {
    id: 35,
    bn: { q: "কোন মৌর্য সম্রাট কলিঙ্গ যুদ্ধের পর যুদ্ধনীতি ত্যাগ করেন?", o: ["চন্দ্রগুপ্ত মৌর্য", "বিন্দুসার", "অশোক", "বৃহদ্রথ"] },
    en: { q: "Which Maurya ruler abandoned warfare after the Kalinga War?", o: ["Chandragupta Maurya", "Bindusara", "Ashoka", "Brihadratha"] },
    a: 2
  },
  {
    id: 36,
    bn: { q: "চতুর্থ বৌদ্ধ সংগীতি কার আমলে অনুষ্ঠিত হয়েছিল?", o: ["অজাতশত্রু", "কালাশোক", "অশোক", "কণিষ্ক"] },
    en: { q: "The Fourth Buddhist Council was held during the reign of?", o: ["Ajatashatru", "Kalashoka", "Ashoka", "Kanishka"] },
    a: 3
  },
  {
    id: 37,
    bn: { q: "কে সূর্যাস্ত আইন (Sunset Law) প্রবর্তন করেছিলেন?", o: ["লর্ড ওয়ারেন হেস্টিংস", "লর্ড কর্নওয়ালিস", "লর্ড ডালহৌসি", "লর্ড ক্যানিং"] },
    en: { q: "Who introduced the infamous Sunset Law in Bengal?", o: ["Lord Warren Hastings", "Lord Cornwallis", "Lord Dalhousie", "Lord Canning"] },
    a: 1
  },
  {
    id: 38,
    bn: { q: "মহাত্মা গান্ধী কত সালে দক্ষিণ আফ্রিকা থেকে ভারতে ফেরেন?", o: ["১৯১৫", "১৯১২", "১৯১৭", "১৯২০"] },
    en: { q: "In which year did Mahatma Gandhi return to India from South Africa?", o: ["1915", "1912", "1917", "1920"] },
    a: 0
  },
  {
    id: 39,
    bn: { q: "ভারতের প্রথম স্বাধীনতা যুদ্ধ (১৮৫৭)-র সময় মুঘল সম্রাট কে ছিলেন?", o: ["শাহ আলম", "দ্বিতীয় বাহাদুর শাহ", "আকবর শাহ", "ওরঙ্গজেব"] },
    en: { q: "Who was the Mughal Emperor during the Revolt of 1857?", o: ["Shah Alam", "Bahadur Shah II", "Akbar Shah", "Aurangzeb"] },
    a: 1
  },
  {
    id: 40,
    bn: { q: "ভারতের থিওসফিক্যাল সোসাইটির আন্দোলনের মূল চালিকাশক্তি কে ছিলেন?", o: ["অ্যানি বেসান্ত", "মাদাম ব্লাভাটস্কি", "হেনরি ওলকট", "বিবেকানন্দ"] },
    en: { q: "Who was the main force behind the Theosophical Society movement in India?", o: ["Annie Besant", "Madame Blavatsky", "Henry Olcott", "Vivekananda"] },
    a: 0
  },

  // --- ক্যাটাগরি: বিশ্ব ও ভারতের ভূগোল (৪১ থেকে ৮০) ---
  {
    id: 41,
    bn: { q: "বিশ্বের দীর্ঘতম নদী কোনটি?", o: ["অ্যামাজন", "নীল নদ", "ইয়াংসি", "মিসিসিপি"] },
    en: { q: "Which is the longest river on Earth?", o: ["Amazon", "Nile", "Yangtze", "Mississippi"] },
    a: 1
  },
  {
    id: 42,
    bn: { q: "ভারতের কোন রাজ্যে সূর্য প্রথম উদিত হয়?", o: ["আসাম", "অরুণাচল প্রদেশ", "মণিপুর", "নাগাল্যান্ড"] },
    en: { q: "In which state of India does the sun rise first?", o: ["Assam", "Arunachal Pradesh", "Manipur", "Nagaland"] },
    a: 1
  },
  {
    id: 43,
    bn: { q: "কোন দেশকে 'উদীয়মান সূর্যের দেশ' বলা হয়?", o: ["চীন", "জাপান", "নরওয়ে", "অস্ট্রেলিয়া"] },
    en: { q: "Which country is called the 'Land of the Rising Sun'?", o: ["China", "Japan", "Norway", "Australia"] },
    a: 1
  },
  {
    id: 44,
    bn: { q: "ইউরোপের কোন দেশকে 'খেলার মাঠ' বা Playground বলা হয়?", o: ["ইতালি", "ফ্রান্স", "সুইজারল্যান্ড", "জার্মানি"] },
    en: { q: "Which country is called the 'Playground of Europe'?", o: ["Italy", "France", "Switzerland", "Germany"] },
    a: 2
  },
  {
    id: 45,
    bn: { q: "ভারতের প্রাচীনতম পর্বতমালা কোনটি?", o: ["হিমালয়", "আরাবল্লী", "পশ্চিমঘাট", "পূর্বঘাট"] },
    en: { q: "Which is the oldest mountain range in India?", o: ["Himalayas", "Aravalli", "Western Ghats", "Eastern Ghats"] },
    a: 1
  },
  {
    id: 46,
    bn: { q: "পৃথিবীর ছাদ বা Roof of the World কাকে বলা হয়?", o: ["পামির মালভূমি", "তিব্বত মালভূমি", "হিমালয় পর্বত", "আন্দিজ পর্বত"] },
    en: { q: "Which region is known as the 'Roof of the World'?", o: ["Pamir Knot", "Tibetan Plateau", "Himalayas", "Andes"] },
    a: 0
  },
  {
    id: 47,
    bn: { q: "কোন নদীকে 'মিশরের দান' বলা হয়?", o: ["অ্যামাজন", "নীল নদ", "মিসিসিপি", "গঙ্গা"] },
    en: { q: "Which river is called the 'Gift of Egypt'?", o: ["Amazon", "Nile", "Mississippi", "Ganga"] },
    a: 1
  },
  {
    id: 48,
    bn: { q: "পৃথিবীর গভীরতম মহাসাগর কোনটি?", o: ["আটলান্টিক মহাসাগর", "প্রশান্ত মহাসাগর", "ভারত মহাসাগর", "উত্তর মহাসাগর"] },
    en: { q: "Which is the deepest ocean on Earth?", o: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"] },
    a: 1
  },
  {
    id: 49,
    bn: { q: "ক্ষেত্রফলের দিক থেকে বিশ্বের বৃহত্তম দেশ কোনটি?", o: ["চীন", "کানাডা", "রাশিয়া", "আমেরিকা"] },
    en: { q: "Which is the largest country in the world by area?", o: ["China", "Canada", "Russia", "USA"] },
    a: 2
  },
  {
    id: 50,
    bn: { q: "অস্ট্রেলিয়ার রাজধানী শহর কোনটি?", o: ["সিডনি", "মেলবোর্ন", "ক্যানবেরা", "ব্রিসবেন"] },
    en: { q: "What is the capital city of Australia?", o: ["Sydney", "Melbourne", "Canberra", "Brisbane"] },
    a: 2
  },
  {
    id: 51,
    bn: { q: "বিশ্বের বৃহত্তম মরুভূমি কোনটি?", o: ["সাহারা মরুভূমি", "গোবি মরুভূমি", "থর মরুভূমি", "অ্যান্টার্কটিকা মরুভূমি"] },
    en: { q: "Which is the largest desert in the world?", o: ["Sahara Desert", "Gobi Desert", "Thar Desert", "Antarctica Desert"] },
    a: 3
  },
  {
    id: 52,
    bn: { q: "কোন দেশকে 'সাদা হাতির দেশ' বলা হয়?", o: ["থাইল্যান্ড", "মায়ানমার", "ভারত", "শ্রীলঙ্কা"] },
    en: { q: "Which country is known as the 'Land of White Elephants'?", o: ["Thailand", "Myanmar", "India", "Sri Lanka"] },
    a: 0
  },
  {
    id: 53,
    bn: { q: "মাউন্ট এভারেস্ট কোন দেশে অবস্থিত?", o: ["ভারত", "চীন", "নেপাল", "ভুটান"] },
    en: { q: "In which country is Mount Everest located?", o: ["India", "China", "Nepal", "Bhutan"] },
    a: 2
  },
  {
    id: 54,
    bn: { q: "সুয়েজ খাল কোন দুটি সাগরকে যুক্ত করেছে?", o: ["লোহিত সাগর ও ভূমধ্যসাগর", "কাস্পিয়ান সাগর ও কৃষ্ণসাগর", "আরব সাগর ও লোহিত সাগর", "উত্তর সাগর ও আটলান্টিক"] },
    en: { q: "The Suez Canal connects which two seas?", o: ["Red Sea and Mediterranean Sea", "Caspian Sea and Black Sea", "Arabian Sea and Red Sea", "North Sea and Atlantic Ocean"] },
    a: 0
  },
  {
    id: 55,
    bn: { q: "পানামা খাল কোন দুটি মহাসাগরকে যুক্ত করেছে?", o: ["আটলান্টিক ও প্রশান্ত মহাসাগর", "ভারত ও প্রশান্ত মহাসাগর", "আটলান্টিক ও ভারত মহাসাগর", "উত্তর ও দক্ষিণ মহাসাগর"] },
    en: { q: "The Panama Canal connects which two oceans?", o: ["Atlantic and Pacific Ocean", "Indian and Pacific Ocean", "Atlantic and Indian Ocean", "Arctic and Antarctic Ocean"] },
    a: 0
  },
  {
    id: 56,
    bn: { q: "ভারতের বৃহত্তম মিষ্টি জলের হ্রদ (Freshwater Lake) কোনটি?", o: ["চিল্কা হ্রদ", "উলার হ্রদ", "ডাল হ্রদ", "লোনাক হրদ"] },
    en: { q: "Which is the largest freshwater lake in India?", o: ["Chilika Lake", "Wular Lake", "Dal Lake", "Lonar Lake"] },
    a: 1
  },
  {
    id: 57,
    bn: { q: "কোন কাল্পনিক রেখা ভারতকে প্রায় দুটি সমান ভাগে ভাগ করেছে?", o: ["বিষুবরেখা", "কর্কটক্রান্তি রেখা", "মকরক্রান্তি রেখা", "মূল মধ্যরেখা"] },
    en: { q: "Which imaginary line divides India into almost two equal parts?", o: ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Prime Meridian"] },
    a: 1
  },
  {
    id: 58,
    bn: { q: "ভারতের দক্ষিণতম বিন্দু (Southernmost Point) কোনটি?", o: ["কন্যাকুমারী", "ইন্দিরা পয়েন্ট", "পোর্ট ব্লেয়ার", "কিলতানের সমুদ্র সৈকত"] },
    en: { q: "What is the southernmost point of Indian territory?", o: ["Kanyakumari", "Indira Point", "Port Blair", "Kiltan Point"] },
    a: 1
  },
  {
    id: 59,
    bn: { q: "যোগ জলপ্রপাত (Jog Falls) ভারতের কোন রাজ্যে অবস্থিত?", o: ["কেরালা", "কর্ণাটক", "তামিলনাড়ু", "মহারাষ্ট্র"] },
    en: { q: "In which state of India is the famous Jog Falls located?", o: ["Kerala", "Karnataka", "Tamil Nadu", "Maharashtra"] },
    a: 1
  },
  {
    id: 60,
    bn: { q: "কোন নদীকে 'দক্ষিণের গঙ্গা' বা Dakshin Ganga বলা হয়?", o: ["কৃষ্ণা নদী", "কাবেীর নদী", "গোদাবরী নদী", "নর্মদা নদী"] },
    en: { q: "Which river is known as 'Dakshin Ganga'?", o: ["Krishna River", "Cauvery River", "Godavari River", "Narmada River"] },
    a: 2
  },
  {
    id: 61,
    bn: { q: "ভারতের কোন রাজ্য সর্বাধিক রাজ্যের সীমানা স্পর্শ করেছে?", o: ["মধ্যপ্রদেশ", "উত্তরপ্রদেশ", "মহারাষ্ট্র", "রাজস্থান"] },
    en: { q: "Which Indian state shares its borders with the maximum number of states?", o: ["Madhya Pradesh", "Uttar Pradesh", "Maharashtra", "Rajasthan"] },
    a: 1
  },
  {
    id: 62,
    bn: { q: "বায়ুমণ্ডলের কোন স্তরে সমস্ত আবহাওয়া বা মেঘের ঘটনা ঘটে?", o: ["ট্রপোস্ফিয়ার", "স্ট্র্যাটোস্ফিয়ার", "মেসোস্ফিয়ার", "আয়নোস্ফিয়ার"] },
    en: { q: "In which layer of the atmosphere do all weather phenomena occur?", o: ["Troposphere", "Stratosphere", "Mesosphere", "Ionosphere"] },
    a: 0
  },
  {
    id: 63,
    bn: { q: "বিশ্বের বৃহত্তম নদী দ্বীপ (River Island) 'মাজুলী' কোথায় অবস্থিত?", o: ["আসাম (ব্রহ্মপুত্র)", "পশ্চিমবঙ্গ (হুগলি)", "উড়িষ্যা (মহানন্দা)", "বিহার (গঙ্গা)"] },
    en: { q: "Where is 'Majuli', the world's largest river island, located?", o: ["Assam (Brahmaputra)", "West Bengal (Hooghly)", "Odisha (Mahanadi)", "Bihar (Ganga)"] },
    a: 0
  },
  {
    id: 64,
    bn: { q: "কোন প্রণালী ভারত ও শ্রীলঙ্কাকে পৃথক করেছে?", o: ["মালাক্কা প্রণালী", "পক প্রণালী", "বেরিং প্রণালী", "জিব্রাল্টার প্রণালী"] },
    en: { q: "Which strait separates India and Sri Lanka?", o: ["Malacca Strait", "Palk Strait", "Bering Strait", "Gibraltar Strait"] },
    a: 1
  },
  {
    id: 65,
    bn: { q: "হুডরূ জলপ্রপাত (Hundru Falls) কোন নদীর ওপর তৈরি হয়েছে?", o: ["সুবর্ণরেখা নদী", "দামোদার নদী", "কংসাবতী নদী", "রূপনারায়ণ নদী"] },
    en: { q: "The Hundru Falls is formed by which river?", o: ["Subarnarekha River", "Damodar River", "Kangsabati River", "Rupnarayan River"] },
    a: 0
  },
  {
    id: 66,
    bn: { q: "কৃষ্ণ মৃত্তিকা বা Black Soil কোন চাষের জন্য সবচেয়ে উপযোগী?", o: ["ধান", "গম", "তুলা (কার্পাস)", "চা"] },
en: { q: "Black soil is ideal for the cultivation of which...", o: [...] }
},
// --- ক্যাটাগরি: বিজ্ঞান ও পরিবেশ (৬৭ থেকে ১০০) ---
{
    id: 67,
    bn: { q: "মানবদেহের বৃহত্তম অঙ্গ (Organ) কোনটি?", o: ["যকৃৎ (Liver)", "ত্বক (Skin)", "হৃদপিণ্ড", "মস্তিষ্ক"] },
    en: { q: "Which is the largest organ of the human body?", o: ["Liver", "Skin", "Heart", "Brain"] },
    a: 1
  },
  {
    id: 68,
    bn: { q: "কোন গ্যাসটিকে সাধারণত 'লাফিং গ্যাস' (Laughing Gas) বলা হয়?", o: ["নাইট্রাস অক্সাইড", "কার্বন মনোক্সাইড", "সালফার ডাইঅক্সাইড", "মিথেন"] },
    en: { q: "Which gas is commonly known as 'Laughing Gas'?", o: ["Nitrous Oxide", "Carbon Monoxide", "Sulfur Dioxide", "Methane"] },
    a: 0
  },
  {
    id: 69,
    bn: { q: "ভিটামিন সি (Vitamin C)-এর রাসায়নিক নাম কী?", o: ["রেটিনল", "অ্যাসকরবিক অ্যাসিড", "ক্যালসিফেরল", "টোকোফেরল"] },
    en: { q: "What is the chemical name of Vitamin C?", o: ["Retinol", "Ascorbic Acid", "Calciferol", "Tocopherol"] },
    a: 1
  },
  {
    id: 70,
    bn: { q: "সূর্যের আলো থেকে আমরা কোন ভিটামিন পাই?", o: ["ভিটামিন এ", "ভিটামিন বি", "ভিটামিন সি", "ভিটামিন ডি"] },
    en: { q: "Which vitamin do we get from sunlight?", o: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"] },
    a: 3
  },
  {
    id: 71,
    bn: { q: "কাঁচ তৈরিতে প্রধান কাঁচামাল হিসেবে কী ব্যবহার করা হয়?", o: ["বালি (Silica)", "কাদা", "চুনাপাথর", "সোডা"] },
    en: { q: "What is the primary raw material used in making glass?", o: ["Sand (Silica)", "Clay", "Limestone", "Soda"] },
    a: 0
  },
  {
    id: 72,
    bn: { q: "কোন গ্রহকে সৌরজগতের 'লাল গ্রহ' (Red Planet) বলা হয়?", o: ["শুক্র", "মঙ্গল", "বৃহস্পতি", "শনি"] },
    en: { q: "Which planet is known as the 'Red Planet'?", o: ["Venus", "Mars", "Jupiter", "Saturn"] },
    a: 1
  },
  {
    id: 73,
    bn: { q: "পেনিসিলিন (Penicillin) কে আবিষ্কার করেছিলেন?", o: ["লুই পাস্তুর", "আলেকজান্ডার ফ্লেমিং", "এডওয়ার্ড জেনার", "রবার্ট কোচ"] },
    en: { q: "Who discovered Penicillin?", o: ["Louis Pasteur", "Alexander Fleming", "Edward Jenner", "Robert Koch"] },
    a: 1
  },
  {
    id: 74,
    bn: { q: "সাধারণ লবণের রাসায়নিক নাম কী?", o: ["সোডিয়াম কার্বনেট", "সোডিয়াম ক্লোরাইড", "ক্যালসিয়াম ক্লোরাইড", "পটাশিয়াম ক্লোরাইড"] },
    en: { q: "What is the chemical name of common salt?", o: ["Sodium Carbonate", "Sodium Chloride", "Calcium Chloride", "Potassium Chloride"] },
    a: 1
  },
  {
    id: 75,
    bn: { q: "কোন ধাতুকে 'কুইকসিলভার' (Quicksilver) বলা হয়?", o: ["রুপো", "পারদ (Mercury)", "প্লাটিনাম", "অ্যালুমিনিয়াম"] },
    en: { q: "Which metal is also known as 'Quicksilver'?", o: ["Silver", "Mercury", "Platinum", "Aluminum"] },
    a: 1
  },
  {
    id: 76,
    bn: { q: "টেলিফোন কে আবিষ্কার করেছিলেন?", o: ["টমাস আলভা এডিসন", "অ্যালেকজান্ডার গ্রাহাম বেল", "মার্কোনি", "আইজ্যাক নিউটন"] },
    en: { q: "Who invented the telephone?", o: ["Thomas Alva Edison", "Alexander Graham Bell", "Marconi", "Isaac Newton"] },
    a: 1
  },
  {
    id: 77,
    bn: { q: "রক্তের গ্রুপ (Blood Groups) কে আবিষ্কার করেন?", o: ["উইলিয়াম হার্ভে", "কার্ল ল্যান্ডস্টেইনার", "রবার্ট হুক", "লুই পাস্তুর"] },
    en: { q: "Who discovered human blood groups?", o: ["William Harvey", "Karl Landsteiner", "Robert Hooke", "Louis Pasteur"] },
    a: 1
  },
  {
    id: 78,
    bn: { q: "গাছের রান্নাঘর বা গাছের খাদ্য তৈরির মূল স্থান কোনটি?", o: ["মূল বা শিকড়", "পাতা", "কাণ্ড", "ফুল"] },
    en: { q: "Which part of the plant is known as its food factory?", o: ["Root", "Leaf", "Stem", "Flower"] },
    a: 1
  },
  {
    id: 79,
    bn: { q: "বিদ্যুৎ প্রবাহ পরিমাপ করার যন্ত্রের নাম কী?", o: ["ভোল্টমিটার", "অ্যামিটার", "গ্যালভানোমিটার", "ব্যারোমিটার"] },
    en: { q: "Which instrument is used to measure electric current?", o: ["Voltmeter", "Ammeter", "Galvanometer", "Barometer"] },
    a: 1
  },
  {
    id: 80,
    bn: { q: "কোন বিজ্ঞানী 'আপেক্ষিকতার তত্ত্ব' (Theory of Relativity) দিয়েছিলেন?", o: ["আইজ্যাক নিউটন", "অ্যালবার্ট আইনস্টাইন", "গ্যালিলিও গ্যালিলি", "স্টিফেন হকিং"] },
    en: { q: "Which scientist proposed the Theory of Relativity?", o: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"] },
    a: 1
  },
  {
    id: 81,
    bn: { q: "সিগারেটের লাইটারে কোন গ্যাস ব্যবহার করা হয়?", o: ["মিথেন", "ইথেন", "প্রোপেন", "বিউটেন"] },
    en: { q: "Which gas is used in cigarette lighters?", o: ["Methane", "Ethane", "Propane", "Butane"] },
    a: 3
  },
  {
    id: 82,
    bn: { q: "পানির ফুটন্ত তাপমাত্রা কত ডিগ্রি সেলসিয়াস?", o: ["০°C", "৫০°C", "৮০°C", "১০০°C"] },
    en: { q: "What is the boiling point of water in Celsius?", o: ["0°C", "50°C", "80°C", "100°C"] },
    a: 3
  },
  {
    id: 83,
    bn: { q: "লোহায় জং ধরা আসলে কী ধরনের বিক্রিয়া?", o: ["বিজারণ", "জারণ (Oxidation)", "প্রতিস্থাপন", "পলিমারাইজেশন"] },
    en: { q: "Rusting of iron is an example of which chemical process?", o: ["Reduction", "Oxidation", "Displacement", "Polymerization"] },
    a: 1
  },
  {
    id: 84,
    bn: { q: "কোন গ্যাসটি ওজোন স্তরের ক্ষয়ের জন্য প্রধানত দায়ী?", o: ["কার্বন ডাইঅক্সাইড", "ক্লোরোফ্লুরোকার্বন (CFC)", "নাইট্রোজেন", "অক্সিজেন"] },
    en: { q: "Which gas is primarily responsible for the depletion of the Ozone layer?", o: ["Carbon Dioxide", "Chlorofluorocarbon (CFC)", "Nitrogen", "Oxygen"] },
    a: 1
  },
  {
    id: 85,
    bn: { q: "সবচেয়ে হালকা গ্যাস কোনটি?", o: ["হিলিয়াম", "হাইড্রোজেন", "নাইট্রোজেন", "অক্সিজেন"] },
    en: { q: "Which is the lightest gas in the universe?", o: ["Helium", "Hydrogen", "Nitrogen", "Oxygen"] },
    a: 1
  },
  {
    id: 86,
    bn: { q: "ডিনামাইট (Dynamite) কে আবিষ্কার করেছিলেন?", o: ["আলফ্রেড নোবেল", "থমাস এডিসন", "রন্টজেন", "মাদাম কুরি"] },
    en: { q: "Who invented Dynamite?", o: ["Alfred Nobel", "Thomas Edison", "Rontgen", "Madame Curie"] },
    a: 0
  },
  {
    id: 87,
    bn: { q: "মানুষের কোষে কত জোড়া ক্রোমোজোম থাকে?", o: ["২০ জোড়া", "২২ জোড়া", "২৩ জোড়া", "২৪ জোড়া"] },
    en: { q: "How many pairs of chromosomes are found in human cells?", o: ["20 pairs", "22 pairs", "23 pairs", "24 pairs"] },
    a: 2
  },
  {
    id: 88,
    bn: { q: "নিউটনের কোন সূত্র থেকে বলের (Force) সংজ্ঞা পাওয়া যায়?", o: ["প্রথম সূত্র", "দ্বিতীয় সূত্র", "তৃতীয় সূত্র", "মহাকর্ষ সূত্র"] },
    en: { q: "From which of Newton's laws do we get the definition of Force?", o: ["First Law", "Second Law", "Third Law", "Law of Gravitation"] },
    a: 0
  },
  {
    id: 89,
    bn: { q: "কোন কোষ অঙ্গাণুকে 'কোষের শক্তিঘর' (Powerhouse of the Cell) বলা হয়?", o: ["লাইসোজোম", "রাইবোজোম", "মাইটোকন্ড্রিয়া", "গলগি বডি"] },
    en: { q: "Which cell organelle is known as the 'Powerhouse of the Cell'?", o: ["Lysosome", "Ribosome", "Mitochondria", "Golgi body"] },
    a: 2
  },
  {
    id: 90,
    bn: { q: "শব্দের গতিবেগ কোন মাধ্যমে সবচেয়ে বেশি হয়?", o: ["বায়ু", "পানি", "কঠিন মাধ্যম (ধাতু)", "শূন্যস্থান"] },
    en: { q: "In which medium does sound travel the fastest?", o: ["Air", "Water", "Solid (Metal)", "Vacuum"] },
    a: 2
  },
  {
    id: 91,
    bn: { q: "সিএনজি (CNG)-এর প্রধান উপাদান কোনটি?", o: ["ইথেন", "মিথেন", "প্রোপেন", "বিউটেন"] },
    en: { q: "What is the primary component of CNG?", o: ["Ethane", "Methane", "Propane", "Butane"] },
    a: 1
  },
  {
    id: 92,
    bn: { q: "কোন হরমোনকে 'লড়াই অথবা পলায়ন' (Fight or Flight) হরমোন বলা হয়?", o: ["ইনসুলিন", "থাইরক্সিন", "অ্যাড্রেনালিন", "ইস্ট্রোজেন"] },
    en: { q: "Which hormone is known as the 'Fight or Flight' hormone?", o: ["Insulin", "Thyroxin", "Adrenaline", "Estrogen"] },
    a: 2
  },
  {
    id: 93,
    bn: { q: "এলপিজি (LPG) সিলিন্ডারে গন্ধের জন্য কী মেশানো হয়?", o: ["মিথেন", "ইথাইল মারক্যাপ্টান", "ক্লোরিন", "ইথার"] },
    en: { q: "What is added to LPG cylinders to detect gas leaks by smell?", o: ["Methane", "Ethyl Mercaptan", "Chlorine", "Ether"] },
    a: 1
  },
  {
    id: 94,
    bn: { q: "বিশুদ্ধ পানির পিএইচ (pH) মান কত?", o: ["৫", "৭", "৯", "১৪"] },
    en: { q: "What is the pH value of pure water?", o: ["5", "7", "9", "14"] },
    a: 1
  },
  {
    id: 95,
    bn: { q: "কোন রঞ্জকের উপস্থিতির কারণে গাছের পাতা সবুজ দেখায়?", o: ["হিমোগ্লোবিন", "ক্যারোটিন", "ক্লোরোফিল", "জ্যান্থোফিল"] },
    en: { q: "Which pigment gives leaves their green color?", o: ["Hemoglobin", "Carotene", "Chlorophyll", "Xanthophyll"] },
    a: 2
  },
  {
    id: 96,
    bn: { q: "সবচেয়ে শক্ত প্রাকৃতিক পদার্থ কোনটি?", o: ["লোহা", "সোনা", "হিরে (Diamond)", "গ্রাফাইট"] },
    en: { q: "Which is the hardest naturally occurring substance on Earth?", o: ["Iron", "Gold", "Diamond", "Graphite"] },
    a: 2
  },
  {
    id: 97,
    bn: { q: "কোন গ্যাসটি আগুন নেভাতে সাহায্য করে?", o: ["অক্সিজেন", "হাইড্রোজেন", "কার্বন ডাইঅক্সাইড", "নাইট্রোজেন"] },
    en: { q: "Which gas is used to extinguish fires?", o: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"] },
    a: 2
  },
  {
    id: 98,
    bn: { q: "ভূমিকম্পের তীব্রতা মাপার জন্য কোন স্কেল ব্যবহার করা হয়?", o: ["রিক্টার স্কেল", "কেলভিন স্কেল", "সেলসিয়াস স্কেল", "ব্যারোমিটার"] },
    en: { q: "Which scale is used to measure the intensity of an earthquake?", o: ["Richter Scale", "Kelvin Scale", "Celsius Scale", "Barometer"] },
    a: 0
  },
  {
    id: 99,
    bn: { q: "কোন ভিটামিনের অভাবে মানুষের রাতকানা (Night Blindness) রোগ হয়?", o: ["ভিটামিন এ", "ভিটামিন বি", "ভিটামিন সি", "ভিটামিন কে"] },
    en: { q: "Deficiency of which vitamin causes Night Blindness?", o: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"] },
    a: 0
  },
  {
    id: 100,
    bn: { q: "ব্রাস বা পিতল কোন দুটি ধাতুর সংকর মিশ্রণ?", o: ["তামা ও দস্তা (Zinc)", "তামা ও টিন", "লোহা ও নিকেল", "সীসা ও টিন"] },
    en: { q: "Brass is an alloy of which two metals?", o: ["Copper and Zinc", "Copper and Tin", "Iron and Nickel", "Lead and Tin"] },
    a: 0
  },

  // --- ক্যাটাগরি: খেলাধুলা, বিনোদন ও পুরস্কার (১০১ থেকে ১৩৫) ---
  {
    id: 101,
    bn: { q: "প্রথম টি-২০ ক্রিকেট বিশ্বকাপ কোন দেশ জিতেছিল?", o: ["পাকিস্তান", "ভারত", "অস্ট্রেলিয়া", "ওয়েস্ট ইন্ডিজ"] },
    en: { q: "Which country won the inaugural T20 Cricket World Cup?", o: ["Pakistan", "India", "Australia", "West Indies"] },
    a: 1
  },
  {
    id: 102,
    bn: { q: "ফুটবল বিশ্বকাপে সবচেয়ে বেশিবার চ্যাম্পিয়ন হয়েছে কোন দেশ?", o: ["আর্জেন্টিনা", "জার্মানি", "ইতালি", "ব্রাজিল"] },
    en: { q: "Which country has won the FIFA World Cup the most times?", o: ["Argentina", "Germany", "Italy", "Brazil"] },
    a: 3
  },
  {
    id: 103,
    bn: { q: "অস্কার পুরস্কার (Academy Awards) কোন ক্ষেত্রের শ্রেষ্ঠত্বের জন্য দেওয়া হয়?", o: ["সাহিত্য", "চলচ্চিত্র (Cinema)", "বিজ্ঞান", "সাংবাদিকতা"] },
    en: { q: "The famous Oscar Awards are given for excellence in which field?", o: ["Literature", "Cinema", "Science", "Journalism"] },
    a: 1
  },
  {
    id: 104,
    bn: { q: "নোবেল পুরস্কার মোট কতটি ভিন্ন ক্ষেত্রে দেওয়া হয়?", o: ["৪টি", "৫টি", "৬টি", "৭টি"] },
    en: { q: "In how many categories are Nobel Prizes awarded?", o: ["4", "5", "6", "7"] },
    a: 2
  },
  {
    id: 105,
    bn: { q: "প্রথম ভারতীয় হিসেবে কে নোবেল পুরস্কার পেয়েছিলেন?", o: ["সি ভি রমন", "রবীন্দ্রনাথ ঠাকুর", "মাদার টেরেসা", "অমর্ত্য সেন"] },
    en: { q: "Who was the first Indian to receive a Nobel Prize?", o: ["C.V. Raman", "Rabindranath Tagore", "Mother Teresa", "Amartya Sen"] },
    a: 1
  },
  {
    id: 106,
    bn: { q: "ক্রিকেটে 'লিটল মাস্টার' নামে কে পরিচিত?", o: ["শচীন তেন্ডুলকর", "সুনীল গাভাস্কার", "সৌরভ গাঙ্গুলী", "বিরাট কোহলি"] },
    en: { q: "Who is traditionally referred to as the 'Little Master' in cricket?", o: ["Sachin Tendulkar", "Sunil Gavaskar", "Sourav Ganguly", "Virat Kohli"] },
    a: 1
  },
  {
    id: 107,
    bn: { q: "বিখ্যাত চলচ্চিত্র 'পথের পাঁচালী' কে পরিচালনা করেছিলেন?", o: ["ঋত্বিক ঘটক", "মৃণাল সেন", "সত্যজিৎ রায়", "তপন সিনহা"] },
    en: { q: "Who directed the legendary masterpiece movie 'Pather Panchali'?", o: ["Ritwik Ghatak", "Mrinal Sen", "Satyajit Ray", "Tapan Sinha"] },
    a: 2
  },
  {
    id: 108,
    bn: { q: "দাদাসাহেব ফালকে পুরস্কার ভারতের কোন ক্ষেত্রে সর্বোচ্চ সম্মান?", o: ["খেলাধুলা", "চলচ্চিত্র (Cinema)", "সঙ্গীত", "সাহিত্য"] },
    en: { q: "Dadasaheb Phalke Award is the highest honor in which field?", o: ["Sports", "Cinema", "Music", "Literature"] },
    a: 1
  },
  {
    id: 109,
    bn: { q: "অলিম্পিক পতাকায় মোট কতটি গোল রিং থাকে?", o: ["৪টি", "৫টি", "৬টি", "৭টি"] },
    en: { q: "How many interlocking rings are there on the Olympic flag?", o: ["4", "5", "6", "7"] },
    a: 1
  },
  {
    id: 110,
    bn: { q: "আধুনিক অলিম্পিক গেমসের সূচনা কত সালে হয়েছিল?", o: ["১৮৯৬", "১৯০০", "১৯১২", "১৯২৪"] },
    en: { q: "In which year were the first modern Olympic Games held?", o: ["1896", "1900", "1912", "1924"] },
    a: 0
  },
  {
    id: 111,
    bn: { q: "জ্ঞানপীঠ পুরস্কার কোন ক্ষেত্রে অবদানের জন্য দেওয়া হয়?", o: ["বিজ্ঞান", "সমাজসেবা", "সাহিত্য (Literature)", "খেলাধুলা"] },
    en: { q: "The Jnanpith Award is presented for outstanding contribution to?", o: ["Science", "Social Work", "Literature", "Sports"] },
    a: 2
  },
  {
    id: 112,
    bn: { q: "প্রথম ভারতীয় মহিলা হিসেবে কে অলিম্পিক পদক জিতেছিলেন?", o: ["সাইনা নেহওয়াল", "পি ভি সিন্ধু", "কর্ণম মালেশ্বরী", "মেরি কম"] },
    en: { q: "Who was the first Indian woman to win an Olympic medal?", o: ["Saina Nehwal", "P.V. Sindhu", "Karnam Malleswari", "Mary Kom"] },
    a: 2
  },
  {
    id: 113,
    bn: { q: "ভারতের জাতীয় খেলা কোনটি?", o: ["ক্রিকেট", "কাবাডি", "হকি", "ফুটবল"] },
    en: { q: "What is recognized as the National Sport of India?", o: ["Cricket", "Kabaddi", "Hockey", "Football"] },
    a: 2
  },
  {
    id: 114,
    bn: { q: "কোন ভারতীয় ক্রিকেটার প্রথম আন্তর্জাতিক টেস্ট ক্রিকেটে হ্যাটট্রিক করেন?", o: ["অনিল কুম্বলে", "হরভজন সিং", "कपিল দেব", "জাসপ্রিত বুমরাহ"] },
    en: { q: "Which Indian bowler took the first-ever Test hat-trick for India?", o: ["Anil Kumble", "Harbhajan Singh", "Kapil Dev", "Jasprit Bumrah"] },
    a: 1
  },
  {
    id: 115,
    bn: { q: "বিখ্যাত জাদুঘর 'লুভর মিউজিয়াম' কোন শহরে অবস্থিত?", o: ["লন্ডন", "প্যারিস", "নিউ ইয়র্ক", "রোম"] },
    en: { q: "The world-famous Louvre Museum is located in which city?", o: ["London", "Paris", "New York", "Rome"] },
    a: 1
  },
  {
    id: 116,
    bn: { q: "বুল ফাইটিং (ষাঁড়ের লড়াই) কোন দেশের জাতীয় খেলা?", o: ["স্পেন", "পর্তুগাল", "মেক্সিকো", "ইতালি"] },
    en: { q: "Bullfighting is the traditional national sport of which country?", o: ["Spain", "Portugal", "Mexico", "Italy"] },
    a: 0
  },
  {
    id: 117,
    bn: { q: "কোন পুরস্কারকে 'এশিয়ার নোবেল পুরস্কার' বলা হয়?", o: ["ম্যান বুকার পুরস্কার", "র্যামন ম্যাগসেসে পুরস্কার", "পুলিৎজার পুরস্কার", "অস্কার"] },
    en: { q: "Which award is known as the 'Nobel Prize of Asia'?", o: ["Man Booker Prize", "Ramon Magsaysay Award", "Pulitzer Prize", "Oscar"] },
    a: 1
  },
  {
    id: 118,
    bn: { q: "হলিউডের বিখ্যাত চরিত্র 'আয়রন ম্যান'-এর ভূমিকায় কে অভিনয় করেছেন?", o: ["ক্রিস ইভান্স", "রবার্ট ডাউনি জুনিয়র", "টম ক্রুজ", "হিউ জ্যাকম্যান"] },
    en: { q: "Who played the character of 'Iron Man' in the Marvel films?", o: ["Chris Evans", "Robert Downey Jr.", "Tom Cruise", "Hugh Jackman"] },
    a: 1
  },
  {
    id: 119,
    bn: { q: "গ্র্যান্ড স্ল্যাম (Grand Slam) শব্দটি কোন খেলার সাথে যুক্ত?", o: ["গলফ", "টেনিস", "দাবা", "ব্যাডমিন্টন"] },
    en: { q: "The term 'Grand Slam' is associated with which sport?", o: ["Golf", "Tennis", "Chess", "Badminton"] },
    a: 1
  },
  {
    id: 120,
    bn: { q: "কোন ভারতীয় কুস্তিগীর প্রথম অলিম্পিকে ব্যক্তিগত রৌপ্য পদক পান?", o: ["সুশীল কুমার", "যোগেশ্বর দত্ত", "রবি কুমার দাহিয়া", "বজরং পুনিয়া"] },
    en: { q: "Which Indian wrestler won a silver medal at the Olympics?", o: ["Sushil Kumar", "Yogeshwar Dutt", "Ravi Kumar Dahiya", "Bajrang Punia"] },
    a: 0
  },
  {
    id: 121,
    bn: { q: "উইম্বলডন চ্যাম্পিয়নশিপ কোন ধরণের কোর্টে খেলা হয়?", o: ["ক্লে কোর্ট (মাটি)", "গ্রাফ কোর্ট (ঘাস)", "হার্ড কোর্ট", "কার্পেট কোর্ট"] },
    en: { q: "Wimbledon tennis tournament is played on which type of court?", o: ["Clay Court", "Grass Court", "Hard Court", "Carpet Court"] },
    a: 1
  },
  {
    id: 122,
    bn: { q: "বিখ্যাত ভারতীয় ক্রীড়াবিদ মিলখা সিং কোন খেলার সাথে যুক্ত ছিলেন?", o: ["হকি", "বক্সিং", "অ্যাথলেটিক্স (দৌড়)", "শুটিং"] },
    en: { q: "The legendary Indian athlete Milkha Singh was associated with?", o: ["Hockey", "Boxing", "Athletics (Sprinting)", "Shooting"] },
    a: 2
  },
  {
    id: 123,
    bn: { q: "ভারতের সর্বোচ্চ ক্রীড়া সম্মান 'মেজর ধ্যানচাঁদ খেলরত্ন' প্রথম কে পান?", o: ["শচীন তেন্ডুলকর", "বিশ্বনাথন আনন্দ", "कपিল দেব", "লিয়েন্ডার পেজ"] },
    en: { q: "Who was the first recipient of the Rajiv Gandhi Khel Ratna (Major Dhyan Chand Khel Ratna) award?", o: ["Sachin Tendulkar", "Viswanathan Anand", "Kapil Dev", "Leander Paes"] },
    a: 1
  },
  {
    id: 124,
    bn: { q: "কোন দেশকে 'ক্রিকেটের মক্কা' বলা হয়?", o: ["মেলবোর্ন ক্রিকেট গ্রাউন্ড", "লর্ডস ক্রিকেট গ্রাউন্ড", "ইডেন গার্ডেনস", "ওভাল"] },
    en: { q: "Which cricket ground is popularly known as the 'Mecca of Cricket'?", o: ["MCG", "Lords", "Eden Gardens", "The Oval"] },
    a: 1
  },
  {
    id: 125,
    bn: { q: "প্রথম অস্কার বিজয়ী ভারতীয় কে ছিলেন?", o: ["সত্যজিৎ রায়", "এ আর রহমান", "ভানু আথাইয়া", "গুলজার"] },
    en: { q: "Who was the first Indian to win an Oscar award?", o: ["Satyajit Ray", "A.R. Rahman", "Bhanu Athaiya", "Gulzar"] },
    a: 2
  },
  {
    id: 126,
    bn: { q: "বিখ্যাত কমিক চরিত্র 'ব্যাটম্যান'-এর আসল নাম কী?", o: ["টনি স্টার্ক", "ব্রুস ওয়েন", "পিটার পার্কার", "ক্লার্ক কেন্ট"] },
    en: { q: "What is the real identity name of the comic superhero Batman?", o: ["Tony Stark", "Bruce Wayne", "Peter Parker", "Clark Kent"] },
    a: 1
  },
  {
    id: 127,
    bn: { q: "সন্তোষ ট্রফি (Santosh Trophy) কোন খেলার সাথে যুক্ত?", o: ["হকি", "ফুটবল", "ক্রিকেট", "পোলো"] },
    en: { q: "The historic Santosh Trophy is associated with which sport in India?", o: ["Hockey", "Football", "Cricket", "Polo"] },
    a: 1
  },
  {
    id: 128,
    bn: { q: "বিখ্যাত গান 'জয় হো' (Jai Ho)-এর সুরকার কে?", o: ["প্রীতম", "এ আর রহমান", "শঙ্কর মহাদেবন", "অনু মালিক"] },
    en: { q: "Who composed the Oscar-winning global song 'Jai Ho'?", o: ["Pritam", "A.R. Rahman", "Shankar Mahadevan", "Anu Malik"] },
    a: 1
  },
  {
    id: 129,
    bn: { q: "বিখ্যাত ভারতীয় বক্সার মেরি কম কোন রাজ্যের বাসিন্দা?", o: ["আসাম", "নাগাল্যান্ড", "মণিপুর", "মিজোরাম"] },
    en: { q: "The multiple-time world champion boxer Mary Kom belongs to which state?", o: ["Assam", "Nagaland", "Manipur", "Mizoram"] },
    a: 2
  },
  {
    id: 130,
    bn: { q: "দাবা খেলায় বোর্ডের মোট কতটি ছোট ঘর বা স্কয়ার থাকে?", o: ["৩২টি", "৪৮টি", "৬৪টি", "৮০টি"] },
    en: { q: "How many total small squares are there on a standard chessboard?", o: ["32", "48", "64", "80"] },
    a: 2
  },
  {
    id: 131,
    bn: { q: "প্রথম এশিয়ান গেমস কত সালে এবং কোথায় অনুষ্ঠিত হয়েছিল?", o: ["১৯৫১ - নয়াদিল্লি", "১৯৫৪ - টোকিও", "১৯৬২ - জাকার্তা", "১৯৫৮ - ব্যাংকক"] },
    en: { q: "In which year and where were the first Asian Games held?", o: ["1951 - New Delhi", "1954 - Tokyo", "1962 - Jakarta", "1958 - Bangkok"] },
    a: 0
  },
  {
    id: 132,
    bn: { q: "থমাস কাপ (Thomas Cup) কোন খেলার আন্তর্জাতিক ট্রফি?", o: ["টেনিস", "টেবিল টেনিস", "ব্যাডমিন্টন", "দাবা"] },
    en: { q: "The international tournament Thomas Cup is associated with?", o: ["Tennis", "Table Tennis", "Badminton", "Chess"] },
    a: 2
  },
  {
    id: 133,
    bn: { q: "কোন ভারতীয় লেখক তাঁর 'The White Tiger' বইটির জন্য ম্যান বুকার পান?", o: ["অরুন্ধতী রায়", "অরবিন্দ আদিগা", "সালমান রুশদি", "কিরণ দেশাই"] },
    en: { q: "Which Indian author won the Booker Prize for 'The White Tiger'?", o: ["Arundhati Roy", "Aravind Adiga", "Salman Rushdie", "Kiran Desai"] },
    a: 1
  },
  {
    id: 134,
    bn: { q: "বিখ্যাত 'হ্যারি পটার' (Harry Potter) বই সিরিজের লেখক কে?", o: ["জে কে রাউলিং", "আগাথা ক্রিস্টি", "স্টিভেন কিং", "রোল্ড ডাল"] },
    en: { q: "Who is the world-renowned author of the Harry Potter book series?", o: ["J.K. Rowling", "Agatha Christie", "Stephen King", "Roald Dahl"] },
    a: 0
  },
  {
    id: 135,
    bn: { q: "প্রথম ভারতীয় টেস্ট ক্রিকেট দলের অধিনায়ক কে ছিলেন?", o: ["লালা অমরনাথ", "সি কে নাইডু", "বিজয় হাজারে", "নবাব পতৌদি"] },
    en: { q: "Who was the first-ever captain of the Indian Test cricket team?", o: ["Lala Amarnath", "C.K. Nayudu", "Vi
       // --- ক্যাটাগরি: ভারতের সংবিধান, অর্থনীতি ও কারেন্ট অ্যাফেয়ার্স (১৩৬ থেকে ২০০) ---
  {
    id: 136,
    bn: { q: "ভারতের সংবিধানের কত নম্বর ধারাকে ড. বি আর আম্বেদকর 'সংবিধানের হৃদয় ও আত্মা' বলেছেন?", o: ["১৪ নম্বর ধারা", "১৯ নম্বর ধারা", "২১ নম্বর ধারা", "৩২ নম্বর ধারা"] },
    en: { q: "Which Article of the Indian Constitution was termed as 'Heart and Soul' by Dr. B.R. Ambedkar?", o: ["Article 14", "Article 19", "Article 21", "Article 32"] },
    a: 3
  },
  {
    id: 137,
    bn: { q: "ভারতের লোকসভার প্রথম স্পিকার বা অধ্যক্ষ কে ছিলেন?", o: ["জি ভি মাভলঙ্কর", "সুকুমার সেন", "বলরাম জাখর", "মীরা কুমার"] },
    en: { q: "Who was the first Speaker of the Lok Sabha of India?", o: ["G.V. Mavalankar", "Sukumar Sen", "Balram Jakhar", "Meira Kumar"] },
    a: 0
  },
  {
    id: 138,
    bn: { q: "ভারতের সুপ্রিম কোর্টের প্রধান বিচারপতিকে কে শপথবাক্য পাঠ করান?", o: ["প্রধানমন্ত্রী", "রাষ্ট্রপতি", "উপাধ্যক্ষ", "আইনমন্ত্রী"] },
    en: { q: "Who administers the oath of office to the Chief Justice of India?", o: ["Prime Minister", "President", "Vice President", "Law Minister"] },
    a: 1
  },
  {
    id: 139,
    bn: { q: "কত বছর বয়সে ভারতের কোনো নাগরিক ভোট দেওয়ার অধিকার পান?", o: ["১৬ বছর", "১৮ বছর", "২১ বছর", "২৫ বছর"] },
    en: { q: "At what age does an Indian citizen get the right to vote?", o: ["16 years", "18 years", "21 years", "25 years"] },
    a: 1
  },
  {
    id: 140,
    bn: { q: "ভারতের রিজার্ভ ব্যাংক (RBI) কত সালে প্রতিষ্ঠিত হয়েছিল?", o: ["১৯৩৫", "১৯৪৭", "১৯৫০", "১৯৬৯"] },
    en: { q: "In which year was the Reserve Bank of India (RBI) established?", o: ["1935", "1947", "1950", "1969"] },
    a: 0
  },
  {
    id: 141,
    bn: { q: "ভারতীয় মুদ্রার এই প্রতীক চিহ্নটি (₹) কে ডিজাইন করেছেন?", o: ["উদয় কুমার ধর্মলিঙ্গম", "রঘুরাম রাজন", "অমর্ত্য সেন", "নন্দন নিলেকানি"] },
    en: { q: "Who designed the official symbol of the Indian Rupee (₹)?", o: ["Udaya Kumar Dharmalingam", "Raghuram Rajan", "Amartya Sen", "Nandan Nilekani"] },
    a: 0
  },
  {
    id: 142,
    bn: { q: "ভারতের প্রথম পঞ্চবার্ষিকী পরিকল্পনা কোন সালে শুরু হয়েছিল?", o: ["১৯৪৭", "১৯৫০", "১৯৫১", "১৯৫৬"] },
    en: { q: "In which year did the First Five-Year Plan of India begin?", o: ["1947", "1950", "1951", "1956"] },
    a: 2
  },
  {
    id: 143,
    bn: { q: "ভারতের কোন শহরকে 'সিলিকন ভ্যালি' (Silicon Valley) বলা হয়?", o: ["হায়দরাবাদ", "মুম্বাই", "বেঙ্গালুরু", "পুনে"] },
    en: { q: "Which city is known as the 'Silicon Valley of India'?", o: ["Hyderabad", "Mumbai", "Bengaluru", "Pune"] },
    a: 2
  },
  {
    id: 144,
    bn: { q: "জিএসটি (GST) ভারতে কত তারিখ থেকে কার্যকর করা হয়েছিল?", o: ["১ জানুয়ারি ২০১৬", "১ জুলাই ২০১৭", "১ এপ্রিল ২০১৮", "১৫ আগস্ট ২০১৯"] },
    en: { q: "From which date was GST implemented in India?", o: ["1st January 2016", "1st July 2017", "1st April 2018", "15th August 2019"] },
    a: 1
  },
  {
    id: 145,
    bn: { q: "অর্থনীতির জনক বা Father of Economics কাকে বলা হয়?", o: ["অ্যাডাম স্মিথ", "জন মেনার্ড কেইনস", "কার্ল মার্ক্স", "অমর্ত্য সেন"] },
    en: { q: "Who is known as the 'Father of Economics'?", o: ["Adam Smith", "John Maynard Keynes", "Karl Marx", "Amartya Sen"] },
    a: 0
  },
  {
    id: 146,
    bn: { q: "বিশ্বের বৃহত্তম লিখিত সংবিধান কোন দেশের আছে?", o: ["আমেরিকা", "যুক্তরাজ্য (UK)", "ভারত", "কানাডা"] },
    en: { q: "Which country has the lengthiest written constitution in the world?", o: ["USA", "UK", "India", "Canada"] },
    a: 2
  },
  {
    id: 147,
    bn: { q: "ভারতের প্রথম রাষ্ট্রপতি কে ছিলেন?", o: ["ড. সর্বপল্লী রাধাকৃষ্ণন", "ড. রাজেন্দ্র প্রসাদ", "জওহরলাল নেহেরু", "ড. জাকির হোসেন"] },
    en: { q: "Who was the first President of independent India?", o: ["Dr. S. Radhakrishnan", "Dr. Rajendra Prasad", "Jawaharlal Nehru", "Dr. Zakir Husain"] },
    a: 1
  },
  {
    id: 148,
    bn: { q: "ভারতের প্রথম মহিলা প্রধানমন্ত্রী কে ছিলেন?", o: ["প্রতিভা পাতিল", "ইন্দিরা গান্ধী", "সরোজিনী নাইডু", "সুচেতা কৃপালনী"] },
    en: { q: "Who was the first woman Prime Minister of India?", o: ["Pratibha Patil", "Indira Gandhi", "Sarojini Naidu", "Sucheta Kripalani"] },
    a: 1
  },
  {
    id: 149,
    bn: { q: "আমাদের সংবিধানে মৌলিক কর্তব্য (Fundamental Duties) কোন দেশের থেকে নেওয়া হয়েছে?", o: ["আমেরিকা", "সোভিয়েত ইউনিয়ন (Russia)", "আয়ারল্যান্ড", "অস্ট্রেলিয়া"] },
    en: { q: "From which country's constitution were the Fundamental Duties adopted in India?", o: ["USA", "USSR (Russia)", "Ireland", "Australia"] },
    a: 1
  },
  {
    id: 150,
    bn: { q: "ভারতের সংবিধানে নির্দেশমূলক নীতি (DPSP) কোন দেশের থেকে গৃহীত হয়েছে?", o: ["কানাডা", "আয়ারল্যান্ড", "জার্মানি", "দক্ষিণ আফ্রিকা"] },
    en: { q: "The Directive Principles of State Policy (DPSP) are borrowed from which country?", o: ["Canada", "Ireland", "Germany", "South Africa"] },
    a: 1
  },
  {
    id: 151,
    bn: { q: "ভারতের পঞ্চায়েতি রাজ ব্যবস্থা কত স্তরের?", o: ["এক স্তর", "দ্বি-স্তর", "ত্রিতল বা তিন স্তর", "চার স্তর"] },
    en: { q: "The Panchayati Raj system in India is structured into how many tiers?", o: ["Single-tier", "Two-tier", "Three-tier", "Four-tier"] },
    a: 2
  },
  {
    id: 152,
    bn: { q: "অর্থনৈতিক পরিভাষায় 'বুল' (Bull) এবং 'বেয়ার' (Bear) শব্দ দুটি কিসের সাথে যুক্ত?", o: ["ব্যাংকিং ব্যবস্থা", "শেয়ার বাজার (Stock Market)", "বৈদেশিক বাণিজ্য", "কৃষি ঋণ"] },
    en: { q: "The terms 'Bull' and 'Bear' are associated with which financial sector?", o: ["Banking System", "Stock Market", "Foreign Trade", "Agricultural Loans"] },
    a: 1
  },
  {
    id: 153,
    bn: { q: "ভারতের এক টাকার নোটে কার স্বাক্ষর থাকে?", o: ["আরবিআই গভর্নর", "ভারতের রাষ্ট্রপতি", "অর্থ সচিব (Finance Secretary)", "প্রধানমন্ত্রী"] },
    en: { q: "Whose signature is present on the one-rupee note in India?", o: ["RBI Governor", "President of India", "Finance Secretary", "Prime Minister"] },
    a: 2
  },
  {
    id: 154,
    bn: { q: "ভারতের কোন রাজ্যে প্রথম পঞ্চায়েতি রাজ ব্যবস্থা চালু হয়েছিল?", o: ["রাজস্থান", "অন্ধ্রপ্রদেশ", "পশ্চিমবঙ্গ", "গুজরাট"] },
    en: { q: "Which state of India first introduced the Panchayati Raj system?", o: ["Rajasthan", "Andhra Pradesh", "West Bengal", "Gujarat"] },
    a: 0
  },
  {
    id: 155,
    bn: { q: "ভারতের সংবিধান সংশোধন করার পদ্ধতিটি কত নম্বর ধারায় আছে?", o: ["৩৫০ নম্বর ধারা", "৩৬০ নম্বর ধারা", "৩৬৮ নম্বর ধারা", "৩৭০ নম্বর ধারা"] },
    en: { q: "Which Article deals with the procedure for amending the Indian Constitution?", o: ["Article 350", "Article 360", "Article 368", "Article 370"] },
    a: 2
  },
  {
    id: 156,
    bn: { q: "ভারতের কোন রাজ্যকে 'চিনির বাটি' (Sugar Bowl of India) বলা হয়?", o: ["পাঞ্জাব", "উত্তরপ্রদেশ", "মহারাষ্ট্র", "তামিলনাড়ু"] },
    en: { q: "Which state is known as the 'Sugar Bowl of India'?", o: ["Punjab", "Uttar Pradesh", "Maharashtra", "Tamil Nadu"] },
    a: 1
  },
  {
    id: 157,
    bn: { q: "কোনো বিল 'অর্থ বিল' বা Money Bill কি না, তা কে নিশ্চিত করেন?", o: ["রাষ্ট্রপতি", "প্রধানমন্ত্রী", "লোকসভার স্পিকার", "অর্থনৈতিক উপদেষ্টা"] },
    en: { q: "Who decides whether a bill is a Money Bill or not?", o: ["President", "Prime Minister", "Speaker of Lok Sabha", "Economic Advisor"] },
    a: 2
  },
  {
    id: 158,
    bn: { q: "ভারতের অর্থ কমিশন (Finance Commission) কত বছর অন্তর গঠিত হয়?", o: ["৩ বছর", "৫ বছর", "৬ বছর", "১০ বছর"] },
    en: { q: "After how many years is the Finance Commission of India constituted?", o: ["3 years", "5 years", "6 years", "10 years"] },
    a: 1
  },
  {
    id: 159,
    bn: { q: "নীতি আয়োগ (NITI Aayog)-এর চেয়ারম্যান বা সভাপতি কে হন?", o: ["রাষ্ট্রপতি", "প্রধানমন্ত্রী", "অর্থমন্ত্রী", "আরবিআই গভর্নর"] },
    en: { q: "Who functions as the ex-officio Chairman of NITI Aayog?", o: ["President", "Prime Minister", "Finance Minister", "RBI Governor"] },
    a: 1
  },
  {
    id: 160,
    bn: { q: "ভারতের কোন রাজ্যে বিখ্যাত 'কাজিরাঙ্গা জাতীয় উদ্যান' অবস্থিত?", o: ["আসাম", "পশ্চিমবঙ্গ", "উত্তরাখণ্ড", "মধ্যপ্রদেশ"] },
    en: { q: "In which state is the famous Kaziranga National Park located?", o: ["Assam", "West Bengal", "Uttarakhand", "Madhya Pradesh"] },
    a: 0
  },
  {
    id: 161,
    bn: { q: "ইউনেস্কো (UNESCO)-এর প্রধান কার্যালয় বা হেডকোয়ার্টার্স কোথায় অবস্থিত?", o: ["নিউ ইয়র্ক", "লন্ডন", "প্যারিস", "জেনেভা"] },
    en: { q: "Where is the headquarters of UNESCO located?", o: ["New York", "London", "Paris", "Geneva"] },
    a: 2
  },
  {
    id: 162,
    bn: { q: "বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর সদর দফতর কোন শহরে অবস্থিত?", o: ["রোম", "জেনেভা", "প্যারিস", "ওয়াশিংটন ডিসি"] },
    en: { q: "Where is the headquarters of the World Health Organization (WHO) located?", o: ["Rome", "Geneva", "Paris", "Washington D.C."] },
    a: 1
  },
  {
    id: 163,
    bn: { q: "ISRO (ইসরো)-এর প্রধান মহাকাশ গবেষণা কেন্দ্রটি ভারতের কোথায় অবস্থিত?", o: ["শ্রীহরিকোটা", "বেঙ্গালুরু", "তিরুবনন্তপুরম", "আহমেদাবাদ"] },
    en: { q: "Where is the main spaceport/headquarters of ISRO located?", o: ["Sriharikota", "Bengaluru", "Thiruvananthapuram", "Ahmedabad"] },
    a: 1
  },
  {
    id: 164,
    bn: { q: "ভারতের প্রথম পারমাণবিক চুল্লির নাম কী ছিল?", o: ["অপ্সরা", "রোহিণী", "আর্যভট্ট", "অপ্সরী"] },
    en: { q: "What was the name of India's first nuclear reactor?", o: ["Apsara", "Rohini", "Aryabhata", "Apsari"] },
    a: 0
  },
  {
    id: 165,
    bn: { q: "পশ্চিমবঙ্গের কোন জেলাকে 'ধানের গোলা' বলা হয়?", o: ["হুগলি", "পূর্ব বর্ধমান", "বাঁকুড়া", "মুর্শিদাবাদ"] },
    en: { q: "Which district is known as the 'Granary of West Bengal'?", o: ["Hooghly", "Purba Bardhaman", "Bankura", "Murshidabad"] },
    a: 1
  },
  {
    id: 166,
    bn: { q: "ভারতের কোন রাজ্যে শিক্ষার হার (Literacy Rate) সবচেয়ে বেশি?", o: ["মিজোরাম", "গোয়া", "কেরালা", "তামিলনাড়ু"] },
    en: { q: "Which Indian state has the highest literacy rate?", o: ["Mizoram", "Goa", "Kerala", "Tamil Nadu"] },
    a: 2
  },
  {
    id: 167,
    bn: { q: "বিশ্ব পরিবেশ দিবস কবে পালিত হয়?", o: ["২২ এপ্রিল", "৫ জুন", "১১ জুলাই", "১ ডিসেম্বর"] },
    en: { q: "On which date is World Environment Day celebrated?", o: ["22nd April", "5th June", "11th July", "1st December"] },
    a: 1
  },
  {
    id: 168,
    bn: { q: "ভারতের সংবিধানে বর্তমানে মোট কতটি তফশিল বা শিডিউল আছে?", o: ["৮টি", "১০টি", "১২টি", "১৪টি"] },
    en: { q: "How many schedules are there in the Indian Constitution currently?", o: ["8", "10", "12", "14"] },
    a: 2
  },
  {
    id: 169,
    bn: { q: "প্রথম ভারতীয় মহিলা আইপিএস (IPS) অফিসার কে?", o: ["কিরণ বেদী", "আন্না জর্জ", "বিমলা দেবী", "অরুন্ধতী ভট্টাচার্য"] },
    en: { q: "Who was the first woman IPS officer in India?", o: ["Kiran Bedi", "Anna George", "Vimla Devi", "Arundhati Bhattacharya"] },
    a: 0
  },
  {
    id: 170,
    bn: { q: "ভারতের সংবিধানের অভিভাবক বা কাস্টডিয়ান কাকে বলা হয়?", o: ["সংসদ", "রাষ্ট্রপতি", "সুপ্রিম কোর্ট", "প্রধানমন্ত্রী"] },
    en: { q: "Who is considered the custodian/guardian of the Indian Constitution?", o: ["Parliament", "President", "Supreme Court", "Prime Minister"] },
    a: 2
  },
  {
    id: 171,
    bn: { q: "কোন দেশের ক্রিকেট দল ২০২৪ সালের পুরুষ টি-২০ বিশ্বকাপ জিতেছিল?", o: ["দক্ষিণ আফ্রিকা", "ভারত", "অস্ট্রেলিয়া", "ইংল্যান্ড"] },
    en: { q: "Which country's cricket team won the 2024 Men's T20 World Cup?", o: ["South Africa", "India", "Australia", "England"] },
    a: 1
  },
  {
    id: 172,
    bn: { q: "২০২৪ সালের প্যারিস অলিম্পিকে ভারত মোট কতটি পদক জিতেছিল?", o: ["৫টি", "৬টি", "৭টি", "৮টি"] },
    en: { q: "How many total medals did India win at the 2024 Paris Olympics?", o: ["5", "6", "7", "8"] },
    a: 1
  },
  {
    id: 173,
    bn: { q: "চাঁদের দক্ষিণ মেরুতে সফলভাবে অবতরণ করা প্রথম মহাকাশযান কোনটি?", o: ["চন্দ্রযান-২", "চন্দ্রযান-৩", "লুনা ২৫", "অ্যাপোলো ১১"] },
    en: { q: "Which spacecraft was the first to successfully land near the Moon's south pole?", o: ["Chandrayaan-2", "Chandrayaan-3", "Luna 25", "Apollo 11"] },
    a: 1
  },
  {
    id: 174,
    bn: { q: "পশ্চিমবঙ্গের বর্তমান রাজ্যপালের নাম কী?", o: ["জগদীপ ধনখড়", "সি ভি আনন্দ বোস", "লা গণেশন", "কে এন ত্রিপাঠী"] },
    en: { q: "Who is the current Governor of West Bengal?", o: ["Jagdeep Dhankhar", "C.V. Ananda Bose", "La Ganesan", "K.N. Tripathi"] },
    a: 1
  },
  {
    id: 175,
    bn: { q: "ভারতের বর্তমান রাষ্ট্রপতির নাম কী?", o: ["প্রণব মুখার্জী", "রামনাথ কোবিন্দ", "দ্রৌপদী মুর্মু", "জগদীপ ধনখড়"] },
    en: { q: "Who is the current President of India?", o: ["Pranab Mukherjee", "Ram Nath Kovind", "Droupadi Murmu", "Jagdeep Dhankhar"] },
    a: 2
  },
  {
    id: 176,
    bn: { q: "ভারতের বর্তমান সুপ্রিম কোর্টের প্রধান বিচারপতি কে?", o: ["ডি ওয়াই চন্দ্রচূড়", "সঞ্জীব খান্না", "ইউ ইউ ললিত", "এন ভি রামানা"] },
    en: { q: "Who is the current Chief Justice of India?", o: ["D.Y. Chandrachud", "Sanjiv Khanna", "U.U. Lalit", "N.V. Ramana"] },
    a: 1
  },
  {
    id: 177,
    bn: { q: "বিশ্বের প্রথম দেশ হিসেবে কোনটি সম্পূর্ণ এআই (AI) চালিত নিউজ অ্যাঙ্কর তৈরি করেছে?", o: ["আমেরিকা", "চীন", "জাপান", "দক্ষিণ কোরিয়া"] },
    en: { q: "Which country introduced the world's first fully AI-powered news anchor?", o: ["USA", "China", "Japan", "South Korea"] },
    a: 1
  },
  {
    id: 178,
    bn: { q: "ভারতের নবনির্মিত লোকসভা ভবনে মোট কতজন সদস্যের বসার আসন রয়েছে?", o: ["৫৪৩ জন", "৭৯০ জন", "৮৮৮ জন", "১২৭২ জন"] },
    en: { q: "How many seating capacities are there for members in the newly built Indian Lok Sabha chamber?", o: ["543", "790", "888", "1272"] },
    a: 2
  },
  {
    id: 179,
    bn: { q: "নীতি আয়োগের বর্তমান সিইও (CEO) কে?", o: ["পরমেশ্বরন আইয়ার", "বি ভি আর সুব্রহ্মণ্যম", "অমিতাভ কান্ত", "সুমন বেরী"] },
    en: { q: "Who is the current CEO of NITI Aayog?", o: ["Parameswaran Iyer", "B.V.R. Subrahmanyam", "Amitabh Kant", "Suman Bery"] },
    a: 1
  },
  {
    id: 180,
    bn: { q: "ভারতের প্রধান নির্বাচন কমিশনার (CEC) বর্তমানে কে আছেন?", o: ["রাজীব কুমার", "অনুপ চন্দ্র পাণ্ডে", "সুশীল চন্দ্র", "অরুণ গোয়েল"] },
    en: { q: "Who is the current Chief Election Commissioner of India?", o: ["Rajiv Kumar", "Anup Chandra Pandey", "Sushil Chandra", "Arun Goel"] },
    a: 0
  },
  {
    id: 181,
    bn: { q: "২০২৪ সালের ইউরো কাপ ফুটবল টুর্নামেন্টে কোন দেশ চ্যাম্পিয়ন হয়েছে?", o: ["ইংল্যান্ড", "ফ্রান্স", "স্পেন", "জার্মানি"] },
    en: { q: "Which country won the 2024 UEFA Euro football championship?", o: ["England", "France", "Spain", "Germany"] },
    a: 2
  },
  {
    id: 182,
    bn: { q: "কোন রাজ্য সরকার মহিলাদের জন্য 'লক্ষ্মীর ভাণ্ডার' প্রকল্প চালু করেছে?", o: ["ওড়িশা", "পশ্চিমবঙ্গ", "ঝাড়খণ্ড", "আসাম"] },
    en: { q: "Which state government runs the welfare scheme named 'Lakshmir Bhandar'?", o: ["Odisha", "West Bengal", "Jharkhand", "Assam"] },
    a: 1
  },
  {
    id: 183,
    bn: { q: "২০২৩ সালের ওডিআই (ODI) ক্রিকেট বিশ্বকাপে 'প্লেয়ার অফ দ্য টুর্নামেন্ট' কে হয়েছিলেন?", o: ["রোহিত শর্মা", "বিরাট কোহলি", "ট্র্যাভিস হেড", "মোহাম্মদ শামি"] },
    en: { q: "Who was named 'Player of the Tournament' in the 2023 ODI Cricket World Cup?", o: ["Rohit Sharma", "Virat Kohli", "Travis Head", "Mohammed Shami"] },
    a: 1
  },
  {
    id: 184,
    bn: { q: "ভারতের কোন শহরে প্রথম আন্ডারওয়াটার মেট্রো (Underwater Metro) চালু করা হয়েছে?", o: ["মুম্বাই", "চেন্নাই", "কলকাতা", "কোচি"] },
    en: { q: "In which Indian city was the first underwater metro service operationalized?", o: ["Mumbai", "Chennai", "Kolkata", "Kochi"] },
    a: 2
  },
  {
    id: 185,
    bn: { q: "২০২৪ সালের দাদা সাহেব ফালকে ইন্টারন্যাশনাল ফিল্ম ফেস্টিভ্যালে সেরা অভিনেতার পুরস্কার কে পেয়েছেন?", o: ["রণবীর কাপুর", "শাহরুখ খান", "সালমান খান", "কার্তিক আরিয়ান"] },
    en: { q: "Who won the Best Actor award at the Dadasaheb Phalke International Film Festival Awards 2024?", o: ["Ranbir Kapoor", "Shah Rukh Khan", "Salman Khan", "Kartik Aaryan"] },
    a: 1
  },
  {
    id: 186,
    bn: { q: "গুগল (Google)-এর বর্তমান সিইও (CEO) কে?", o: ["সত্য নাদেলা", "সুন্দর পিচাই", "টিম কুক", "অরবিন্দ কৃষ্ণ"] },
    en: { q: "Who is the current CEO of Google?", o: ["Satya Nadella", "Sundar Pichai", "Tim Cook", "Arvind Krishna"] },
    a: 1
  },
  {
    id: 187,
    bn: { q: "Twitter-এর বর্তমান নাম পরিবর্তন করে কী রাখা হয়েছে?", o: ["Thread", "X", "Meta", "BlueSky"] },
    en: { q: "What is the new rebranded name of the social media platform Twitter?", o: ["Thread", "X", "Meta", "BlueSky"] },
    a: 1
  },
  {
    id: 188,
    bn: { q: "ChatGPT তৈরিকারী মূল প্রতিষ্ঠান বা কোম্পানির নাম কী?", o: ["Google", "Microsoft", "OpenAI", "Meta"] },
    en: { q: "Which company originally developed and launched ChatGPT?", o: ["Google", "Microsoft", "OpenAI", "Meta"] },
    a: 2
  },
  {
    id: 189,
    bn: { q: "ভারতের কোন সিনেমা গানটি প্রথম গোল্ডেন গ্লোব এবং অস্কার জিতেছে?", o: ["নাটু নাটু (Naatu Naatu)", "জয় হো", "বোমবে জয়শ্রী", "বন্দে মাতরম"] },
    en: { q: "Which Indian original song won both a Golden Globe and an Oscar award?", o: ["Naatu Naatu", "Jai Ho", "Bombay Jayashri", "Vande Mataram"] },
    a: 0
  },
  {
    id: 190,
    bn: { q: "কোন দেশ প্রথম কৃত্রিম উপগ্রহ স্পুটনিক-১ মহাকাশে পাঠিয়েছিল?", o: ["আমেরিকা", "সোভিয়েত ইউনিয়ন", "চীন", "যুক্তরাজ্য"] },
    en: { q: "Which nation launched the world's first artificial satellite, Sputnik 1?", o: ["USA", "USSR", "China", "UK"] },
    a: 1
  },
  {
    id: 191,
    bn: { q: "বিশ্বের বৃহত্তম ক্রিকেট স্টেডিয়াম 'নরেন্দ্র মোদী স্টেডিয়াম' ভারতের কোন শহরে অবস্থিত?", o: ["মুম্বাই", "কলকাতা", "আহমেদাবাদ", "নয়াদিল্লি"] },
    en: { q: "In which city is Narendra Modi Stadium, the largest cricket stadium in the world, located?", o: ["Mumbai", "Kolkata", "Ahmedabad", "New Delhi"] },
    a: 2
  },
  {
    id: 192,
    bn: { q: "২০২৪ সালের অস্কারে সেরা চলচ্চিত্রের (Best Picture) পুরস্কার জিতেছে কোন সিনেমা?", o: ["বার্বি", "ওপেনহেইমার (Oppenheimer)", "কিলার্স অফ দ্য ফ্লাওয়ার মুন", "পাস্ট লাইভস"] },
    en: { q: "Which movie won the Best Picture award at the 2024 Oscars?", o: ["Barbie", "Oppenheimer", "Killers of the Flower Moon", "Past Lives"] },
    a: 1
  },
  {
    id: 193,
    bn: { q: "বর্তমানে ভারতীয় ক্রিকেট দলের (Men's Team) প্রধান কোচ কে?", o: ["রাহুল দ্রাবিড়", "গৌতম গম্ভীর", "রবি শাস্ত্রী", "ভিভিএস লক্ষ্মণ"] },
    en: { q: "Who is the current Head Coach of the Indian Men's National Cricket Team?", o: ["Rahul Dravid", "Gautam Gambhir", "Ravi Shastri", "VVS Laxman"] },
    a: 1
  },
  {
    id: 194,
    bn: { q: "ভারতের প্রথম সূর্য মিশন মহাকাশযানটির নাম কী ছিল?", o: ["আদিত্য-L1", "সূর্যযান", "অগ্নি-১", "চন্দ্রযান-৩"] },
    en: { q: "What is the name of India's first dedicated scientific mission to study the Sun?", o: ["Aditya-L1", "Suryayaan", "Agni-I", "Chandrayaan-3"] },
    a: 0
  },
  {
    id: 195,
    bn: { q: "২০২৪ সালের হেনলি পাসপোর্ট ইনডেক্স অনুযায়ী বিশ্বের সবচেয়ে শক্তিশালী পাসপোর্ট কোন দেশের?", o: ["ভারত", "জাপান", "সিঙ্গাপুর / ফ্রান্স", "আমেরিকা"] },
    en: { q: "Which country tops the Henley Passport Index as the most powerful passport?", o: ["India", "Japan", "Singapore / France", "USA"] },
    a: 2
  },
  {
    id: 196,
    bn: { q: "অযোধ্যার নবনির্মিত রাম মন্দিরের প্রধান ভাস্কর (মূর্তি তৈরিকারী) কে?", o: ["রাম সুতার", "অরুণ যোগীরাজ", "চন্দ্রকান্ত সোমপুরা", "অনিল মিশ্র"] },
    en: { q: "Who is the chief sculptor of the Ram Lalla idol in Ayodhya's new temple?", o: ["Ram Sutar", "Arun Yogiraj", "Chandrakant Sompura", "Anil Mishra"] },
    a: 1
  },
  {
    id: 197,
    bn: { q: "২০২৪ সালে ভারতের সর্বোচ্চ নাগরিক সম্মান 'ভারত রত্ন' কাকে দেওয়া হয়েছিল?", o: ["লালকৃষ্ণ আদবানি", "কর্পূরী ঠাকুর", "এম এস স্বামীনাথন", "ওপরের সকলেই"] },
    en: { q: "Who among the following was awarded the Bharat Ratna?", o: ["L.K. Advani", "Karpoori Thakur", "M.S. Swaminathan", "All of the above"] },
    a: 3
  },
  {
    id: 198,
    bn: { q: "কোন ভারতীয় বংশোদ্ভূত অর্থনীতিবিদ নোবেল স্মৃতি পুরস্কার পেয়েছেন?", o: ["অভিজিৎ ব্যানার্জী", "অমর্ত্য Sen", "রঘুরাম রাজন", "১ এবং ২ উভয়েই"] },
    en: { q: "Which Indian-origin economists have won the Nobel Memorial Prize?", o: ["Abhijit Banerjee", "Amartya Sen", "Raghuram Rajan", "Both 1 and 2"] },
    a: 3
  },
  {
    id: 199,
    bn: { q: "পশ্চিমবঙ্গের কোন স্থানটি চা উৎপাদনের জন্য বিশ্বজুড়ে বিখ্যাত?", o: ["কালিম্পং", "দার্জিলিং", "শিলিগুড়ি", "জলপাইগুড়ি"] },
    en: { q: "Which place in West Bengal is globally famous for its premium tea production?", o: ["Kalimpong", "Darjeeling", "Siliguri", "Jalpaiguri"] },
    a: 1
  },
  {
    id: 200,
    bn: { q: "কেবিসি (KBC) গেমের আসল টেলিভিশন শোটি কে সঞ্চালনা বা হোস্ট করেন?", o: ["শাহরুখ Khan", "সালমান খান", "অমিতাভ বচ্চন", "আমির খান"] },
    en: { q: "Who is the legendary main host of the official KBC television show?", o: ["Shah Rukh Khan", "Salman Khan", "Amitabh Bachchan", "Aamir Khan"] },
    a: 2
  }
];                                                                             
                                                                                    
