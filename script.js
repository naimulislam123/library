// Password Unlock System (Default Password: 1234)
function unlockApp() {
    const input = document.getElementById('pass-input').value;
    const errorMsg = document.getElementById('pass-error');
    
    if (input === '1234') {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        displayNotes();
    } else {
        errorMsg.style.display = 'block';
    }
}

// Theme Selector
const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', (e) => {
    document.body.className = e.target.value;
});

// Sample Reader Modal
function openSampleReader(title, author) {
    const modal = document.getElementById('reader-modal');
    document.getElementById('reader-title').innerText = title;
    document.getElementById('pdf-render').style.display = 'none';
    
    const textContent = document.getElementById('text-content');
    textContent.style.display = 'block';
    textContent.innerHTML = `
        <h2>${title}</h2>
        <p><strong>লেখক:</strong> ${author}</p>
        <hr style="margin: 15px 0; border-color: var(--border-color);">
        <p>জীবন সবসময় আমাদের ইচ্ছেমতো চলে না। কিন্তু প্রতিবার থমকে দাঁড়ানোর পর আবার নতুন করে শুরু করার নামই জীবন। এই বইয়ের প্রতিটি পাতা আপনাকে এক নতুন জগতের সন্ধান দেবে...</p>
    `;
    modal.classList.remove('hidden');
}

// Close Reader Modal
function closeReader() {
    document.getElementById('reader-modal').classList.add('hidden');
}

// PDF Reader Engine using PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

function handlePDFUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            
            pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const canvas = document.getElementById('pdf-render');
                    const context = canvas.getContext('2d');
                    const viewport = page.getViewport({ scale: 1.5 });

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };

                    page.render(renderContext).promise.then(() => {
                        document.getElementById('reader-title').innerText = file.name;
                        document.getElementById('text-content').style.display = 'none';
                        canvas.style.display = 'block';
                        document.getElementById('reader-modal').classList.remove('hidden');
                    });
                });
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
}

// LocalStorage Notes System
function saveNote() {
    const noteText = document.getElementById('note-input').value;
    if (!noteText.trim()) return;

    let notes = JSON.parse(localStorage.getItem('qalmora_notes') || '[]');
    notes.push(noteText);
    localStorage.setItem('qalmora_notes', JSON.stringify(notes));
    
    document.getElementById('note-input').value = '';
    displayNotes();
}

function displayNotes() {
    const savedNotesDiv = document.getElementById('saved-notes');
    let notes = JSON.parse(localStorage.getItem('qalmora_notes') || '[]');
    
    if (notes.length === 0) {
        savedNotesDiv.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 10px;">কোনো নোট সেভ করা নেই।</p>';
        return;
    }

    savedNotesDiv.innerHTML = '<h4 style="margin-top: 15px;">Saved Notes:</h4>' + notes.map((note, index) => `
        <div style="background: var(--bg-color); padding: 8px 12px; border-radius: 6px; margin-top: 6px; font-size: 0.9rem; display: flex; justify-content: space-between; align-items: center;">
            <span>${note}</span>
            <button onclick="deleteNote(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-weight: bold;">✕</button>
        </div>
    `).join('');
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('qalmora_notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('qalmora_notes', JSON.stringify(notes));
    displayNotes();
                            }
