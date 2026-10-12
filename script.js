// Open Reader Modal
function openReader(title, author) {
    const modal = document.getElementById('reader-modal');
    const readerTitle = document.getElementById('reader-title');
    const readerBody = document.getElementById('reader-body');
    
    readerTitle.innerText = title;
    
    // Dynamic sample text based on book
    readerBody.innerHTML = `
        <h2>অধ্যায় ১: একটি নতুন শুরু</h2>
        <p>লেখক: <strong>${author}</strong></p>
        <p>"${title}" বইটির এই বিশেষ সংস্করণে আপনাকে স্বাগতম। গিটহাবের মাধ্যমে তৈরি এই ডিজিটাল বুক অ্যাপে আপনি অত্যন্ত চমৎকারভাবে আপনার পছন্দের উপন্যাস বা কনটেন্ট পড়তে পারবেন।</p>
        <p>জীবন সবসময় আমাদের ইচ্ছেমতো চলে না। কিন্তু প্রতিবার থমকে দাঁড়ানোর পর আবার নতুন করে শুরু করার নামই জীবন। এই বইয়ের প্রতিটি পাতা আপনাকে এক নতুন জগতের সন্ধান দেবে। ডিজিটাল মাধ্যমেও যদি সুন্দর একটি লেআউটে পড়া যায়, তবে গল্পগুলো জীবন্ত হয়ে ওঠে।</p>
        <p>পরবর্তী পাতাগুলোতে আপনার জন্য আরও চমৎকার অভিজ্ঞতা অপেক্ষা করছে...</p>
    `;
    
    modal.classList.remove('hidden');
}

// Close Reader Modal
function closeReader() {
    const modal = document.getElementById('reader-modal');
    modal.classList.add('hidden');
}

// Theme Selector functionality
const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    document.body.className = selectedTheme;
});

// Font size toggle functionality in reader
let isLargeFont = false;
document.getElementById('font-toggle').addEventListener('click', () => {
    const readerBody = document.getElementById('reader-body');
    isLargeFont = !isLargeFont;
    if (isLargeFont) {
        readerBody.style.fontSize = '1.25rem';
    } else {
        readerBody.style.fontSize = '1.05rem';
    }
});
