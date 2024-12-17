let counter = 0;

const counterElement = document.getElementById('counter');
const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const resetButton = document.getElementById('tugma');

increaseButton.addEventListener('click', () => {
    counter++;
    counterElement.textContent = counter;
});

decreaseButton.addEventListener('click', () => {
    counter--;
    counterElement.textContent = counter;
});

resetButton.addEventListener('click', () => {
    counter = 0;
    counterElement.textContent = counter;
});
