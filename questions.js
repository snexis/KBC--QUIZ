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
    en: { q: "Black soil is ideal for the cultivation of which crop?", o: ["Rice
