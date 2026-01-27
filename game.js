// Game Logic and Interaction

// Live Preview Logic
const codeEditor = document.querySelector('.code-area');
const outputFrame = document.getElementById('userOutputFrame');

function updatePreview() {
    if (!codeEditor || !outputFrame) return;
    
    const code = codeEditor.innerText;
    const doc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 20px; font-family: sans-serif; }
            </style>
        </head>
        <body>
            ${code}
        </body>
        </html>
    `);
    doc.close();
}

// Initialize and Listen
if(codeEditor && outputFrame) {
    codeEditor.addEventListener('input', updatePreview);
    codeEditor.addEventListener('keyup', updatePreview); // Extra responsiveness
    // Initial load
    updatePreview();
}

// Tab switching
document.querySelectorAll('.editor-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Code editor interaction
if (codeEditor) {
    codeEditor.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary)';
        this.style.outlineOffset = '2px';
    });
    
    codeEditor.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
}

// Test Code Button Logic
const testBtn = document.querySelector('.btn-primary');
if (testBtn) {
    testBtn.addEventListener('click', function() {
        const accuracy = document.querySelector('.accuracy-inner');
        const circle = document.querySelector('.accuracy-circle');
        const diffLines = document.querySelector('.diff-lines');
        
        // Simulate testing
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
        this.disabled = true;
        
        setTimeout(() => {
            // Random accuracy between 70-95% (Simulated for prototype)
            const newAccuracy = 70 + Math.floor(Math.random() * 26);
            if (accuracy) accuracy.textContent = newAccuracy + '%';
            
            // Update circle gradient
            if (circle) circle.style.background = `conic-gradient(var(--primary) ${newAccuracy}%, var(--bg-code) 0)`;
            
            // Update diff lines
            if (diffLines) {
                diffLines.innerHTML = `
                    <div><span class="diff-added">+ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);</span> (Missing)</div>
                    <div><span class="diff-removed">- border-radius: 12px;</span> (Should be 16px)</div>
                    <div><span class="diff-added">+ box-shadow: 0 20px 40px rgba(0,0,0,0.1);</span> (Missing)</div>
                `;
            }
            
            // Reset button
            this.innerHTML = '<i class="fas fa-play"></i> Test My Code';
            this.disabled = false;
            
            // Show confetti if high score
            if (newAccuracy > 90) {
                import('https://cdn.skypack.dev/canvas-confetti').then(confetti => {
                    confetti.default();
                }).catch(() => {
                    // Fallback if module fails
                    console.log('Confetti!');
                });
            }
        }, 1500);
    });
}