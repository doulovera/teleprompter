const textInput = document.getElementById('text-input');
const textContainer = document.querySelector('.text-container');
const scrollText = document.querySelector('.scroll-text');
const teleprompter = document.querySelector('.teleprompter');
const speedControl = document.getElementById('speed');
const fontSizeControl = document.getElementById('font-size');
const fontFamilyControl = document.getElementById('font-family');
const togglePrompterButton = document.getElementById('toggle-prompter');
const resetPrompterButton = document.getElementById('reset-prompter');
const fullscreenButton = document.getElementById('fullscreen-button');

let animationId;
let speed = 1;
let isScrolling = false;

function updateButtonStates() {
    const hasText = scrollText.innerText.trim().length > 0;
    togglePrompterButton.disabled = !hasText;
    resetPrompterButton.disabled = !hasText;
    fullscreenButton.disabled = !hasText;
}

function scroll() {
    const distance = 1;
    textContainer.scrollTop += distance * speed;

    if (textContainer.scrollTop >= textContainer.scrollHeight - textContainer.clientHeight) {
        stopScrolling();
    } else {
        animationId = requestAnimationFrame(scroll);
    }
}

function startScrolling() {
    if (isScrolling) return;
    isScrolling = true;
    togglePrompterButton.textContent = 'Stop Prompter';
    animationId = requestAnimationFrame(scroll);
}

function stopScrolling() {
    if (!isScrolling) return;
    isScrolling = false;
    togglePrompterButton.textContent = 'Start Prompter';
    cancelAnimationFrame(animationId);
}

function toggleScrolling() {
    if (isScrolling) {
        stopScrolling();
    } else {
        startScrolling();
    }
}

function resetPrompter() {
    stopScrolling();
    textContainer.scrollTop = 0;
}

function toggleFullscreen() {
    teleprompter.classList.toggle('fullscreen');
    const isFullscreen = teleprompter.classList.contains('fullscreen');
    fullscreenButton.textContent = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
}

textInput.addEventListener('input', (e) => {
    scrollText.innerText = e.target.value;
    resetPrompter();
    updateButtonStates();
});

speedControl.addEventListener('input', (e) => {
    speed = parseFloat(e.target.value);
});

fontSizeControl.addEventListener('input', (e) => {
    scrollText.style.fontSize = `${e.target.value}px`;
    resetPrompter();
});

fontFamilyControl.addEventListener('change', (e) => {
    scrollText.style.fontFamily = e.target.value;
    resetPrompter();
});

togglePrompterButton.addEventListener('click', toggleScrolling);
resetPrompterButton.addEventListener('click', resetPrompter);
fullscreenButton.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && teleprompter.classList.contains('fullscreen')) {
        toggleFullscreen();
    }
});

// Initial state
scrollText.innerText = textInput.value;
resetPrompter();
updateButtonStates();