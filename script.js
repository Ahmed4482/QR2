document.getElementById('generate-btn').addEventListener('click', generateQRCode);

async function generateQRCode() {
    const url = document.getElementById('url-input').value;
    if (url) {
        try {
            const response = await axios.post('/generate-qr', { url }, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response.data);
            document.getElementById('qr-code').src = imageUrl;
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    } else {
        alert('Please enter a valid URL');
    }
}