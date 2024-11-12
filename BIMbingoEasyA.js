const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

let correctMatches = 0;
const totalMatches = draggableElements.length; // Total number of matches required

// Draggable event listeners
draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
});

// Droppable event listeners
droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
});

// Drag and Drop functions
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragOver(event) {
    if (!event.target.classList.contains("dropped")) {
        event.preventDefault(); // This allows for the drop event to fire
    }
}

function dragLeave(event) {
    if (!event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");

    const draggableElementData = event.dataTransfer.getData("text");
    const droppableElementData = event.target.getAttribute("data-draggable-id");

    // Check if the dragged item is the correct one for the drop target
    if (draggableElementData === droppableElementData) {
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);

        // Clone the image and append it to the droppable area
        const clonedImage = draggableElement.cloneNode(true);
        clonedImage.classList.add('dropped-image');
        clonedImage.draggable = false;

        // Clear out the droppable container and append the cloned image
        event.target.innerHTML = '';
        event.target.appendChild(clonedImage);

        // Dim the original draggable image
        draggableElement.classList.add("dimmed");

        // Immediately complete the game on the first correct match
        gameCompleted();
    }
}



// for restart button
document.getElementById('restartButton').addEventListener('click', function () {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(elem => {
        elem.style.display = 'block';
        elem.classList.remove('dragged');
        elem.setAttribute('draggable', 'true');
    });

    const droppableElements = document.querySelectorAll('.droppable');
    droppableElements.forEach(elem => {
        elem.innerHTML = '<span>?</span>';
        elem.classList.remove('dropped');
        elem.style.backgroundColor = 'transparent';
    });

    correctMatches = 0; // Reset correct matches counter
    resetTimer();
});

// Timer functionality
let timerInterval;

function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(function () {
        seconds++;
        let minutesPart = Math.floor(seconds / 60);
        let secondsPart = seconds % 60;
        document.getElementById('timer').textContent =
            minutesPart.toString().padStart(2, '0') + ':' +
            secondsPart.toString().padStart(2, '0');
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = "00:00";
    startTimer(); // Restart the timer
}

// Start timer when the page content has loaded
document.addEventListener('DOMContentLoaded', (event) => {
    startTimer();
});

// Ensure the restart button also resets the timer
document.getElementById('restartButton').addEventListener('click', function () {
    resetTimer();
});

// Game completion function
function gameCompleted() {
    // Show the "Next Step" button or any end-of-game message
    document.getElementById("completionContainer").style.display = "block";
    clearInterval(timerInterval); // Stop the timer if needed
}

// Redirect to the end page when "Next Step" is clicked
function goToNextGame() {
    window.location.href = "BIMbingoEasyB.html"; // Ensure this path is correct
}

// Redirect to the main game hub when "Play Again" is clicked
function playAgain() {
    window.location.href = "mainHub.html"; // Update with the correct path to your main game hub page
}


window.addEventListener('resize', scaleGameContainer);

function scaleGameContainer() {
    const gameContainer = document.querySelector('.game-container');
    const scaleFactor = Math.min(
        window.innerWidth / gameContainer.offsetWidth,
        window.innerHeight / gameContainer.offsetHeight
    );
    gameContainer.style.transform = `scale(${scaleFactor})`;
}

// Call the function once initially
document.addEventListener('DOMContentLoaded', scaleGameContainer);