const canvas = document.getElementById('canvas');
const plusBtn = document.querySelector('.increase');
const minusBtn = document.querySelector('.decrease');
const sizeText = document.querySelector('.size');
const colorEl = document.querySelector('.color');
const clearEl = document.querySelector('.clear');
const penTool = document.querySelector('.fa-spray-can');
const brushTool = document.querySelector('.fa-brush');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color;
let x = undefined;
let y = undefined;
isPen = false;
isBrush = true;

updateSize();

penTool.addEventListener('click', () => {
    isBrush = false;
    isPen = true;
});

brushTool.addEventListener('click', () => {
    isPen = false;
    isBrush = true;
});

clearEl.addEventListener('click', () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

plusBtn.addEventListener('click', () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSize();
});

minusBtn.addEventListener('click', () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSize();
});

colorEl.addEventListener('change', () => {
    color = colorEl.value;
});

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

// Getting the x and y
canvas.addEventListener('mousemove', (e) => {
    // const x = e.clientX - canvas.getBoundingClientRect().left;
    // const y = e.clientY - canvas.getBoundingClientRect().top;
    if (isPressed && isPen){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        // drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    } if (isPressed && isBrush) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        // drawCircle(x2, y2);
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle (x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    // ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSize() {
    sizeText.innerHTML = size;
}

