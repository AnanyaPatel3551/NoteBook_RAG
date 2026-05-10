document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadStatus = document.getElementById('uploadStatus');
    
    const queryForm = document.getElementById('queryForm');
    const queryInput = document.getElementById('queryInput');
    const queryBtn = document.getElementById('queryBtn');
    const chatWindow = document.getElementById('chatWindow');

    let documentIngested = false;

    // Handle File Upload
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading & Ingesting...';
        uploadStatus.textContent = '';

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                uploadStatus.innerHTML = `<span style="color: green;">Success! ${data.chunksProcessed} chunks indexed.</span>`;
                documentIngested = true;
            } else {
                uploadStatus.innerHTML = `<span style="color: red;">Error: ${data.error}</span>`;
            }
        } catch (error) {
            uploadStatus.innerHTML = `<span style="color: red;">Upload failed: ${error.message}</span>`;
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload to RAG';
        }
    });

    // Handle Chat Query
    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = queryInput.value.trim();
        if (!query) return;

        // Display user message
        appendMessage('user', query);
        queryInput.value = '';
        queryBtn.disabled = true;

        try {
            const response = await fetch('/api/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });

            const data = await response.json();

            if (response.ok) {
                appendMessage('bot', data.answer, data.context);
            } else {
                appendMessage('bot', `Error: ${data.error}`);
            }
        } catch (error) {
            appendMessage('bot', `Failed to get answer: ${error.message}`);
        } finally {
            queryBtn.disabled = false;
            queryInput.focus();
        }
    });

    function appendMessage(sender, text, context = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        msgDiv.textContent = text;

        if (sender === 'bot' && context.length > 0 && text !== 'Not found in document') {
            const ctxDiv = document.createElement('div');
            ctxDiv.className = 'context-box';
            ctxDiv.innerHTML = '<strong>Sources used:</strong><br>' + context.map((c, i) => `[${i+1}] ${c.substring(0, 100)}...`).join('<br>');
            msgDiv.appendChild(ctxDiv);
        }

        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
