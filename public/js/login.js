document.getElementById('loginBtn').addEventListener('click', async () => {
    const passkey = document.getElementById('passkey').value;
    
    try {
        const response = await fetch('/verify-passkey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ passkey })
        });

        const data = await response.json();
        
        if (data.success) {
            window.location.href = '/home.html';
        } else {
            document.getElementById('error-message').textContent = 'Invalid passkey';
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'Something went wrong. Please try again.';
    }
});