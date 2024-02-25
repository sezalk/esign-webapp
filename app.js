const canvas = document.getElementById('signatureCanvas');
const context = canvas.getContext('2d');
const penColorInput = document.getElementById('penColor');
const transparentBgOption = document.getElementById('transparentBg');
const whiteBgOption = document.getElementById('whiteBg');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    context.strokeStyle = penColorInput.value;
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

function erase() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadPNG() {
    const bgOption = document.querySelector('input[name="bgOption"]:checked').value;
    let image;
    if (bgOption === 'transparent') {
        image = canvas.toDataURL('image/png');
    } else if (bgOption === 'white') {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempContext = tempCanvas.getContext('2d');
        tempContext.fillStyle = 'white';
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempContext.drawImage(canvas, 0, 0);
        image = tempCanvas.toDataURL('image/png');
    }
    const link = document.createElement('a');
    link.href = image;
    link.download = 'signature.png';
    link.click();
}

function clearCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset to default state
    context.strokeStyle = penColorInput.value; // Reset pen color
    context.lineWidth = 2; // Reset line width
    context.lineCap = 'round'; // Reset line cap
}

// Add this event listener for the Clear All button
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', clearCanvas);
