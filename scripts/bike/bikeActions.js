import Bike from './bike.js';

let startStop = 'pause';
let slowDown = 'slower';
let speedUp = 'faster';
let start = 'go';
let stop = 'stop';
let eventElement = null;

/**
 * Live HTMLCollection Objects
 */
let partsListElements = document.getElementsByClassName('moves');
let currentDuration = window.getComputedStyle(partsListElements[partsListElements.length - 1]);
let backgroundEl = document.getElementsByClassName('background');

export function doBikeAction(e) {
    eventElement = e.target;
    if (eventElement.classList.contains(startStop)) startEnd();
    if (eventElement.classList.contains(slowDown)) changeSpeed(slowDown);
    if (eventElement.classList.contains(speedUp)) changeSpeed(speedUp);
}

/**
 * DOM SIDE EFFECT
 */
function startEnd() {
    let remove = (Bike.moving) ? start : stop;
    let add = (Bike.moving) ? stop : start;
    for(let i = 0; i < partsListElements.length; i++) {
        partsListElements[i].classList.remove(remove);
        partsListElements[i].classList.add(add);
        restartAnimation(partsListElements[i]);
    }
    Bike.moving = !Bike.moving;
    Bike.currentDuration = currentDuration.getPropertyValue('animation-duration').split(',');
    showControls();
    setBackground(Bike.currentDuration, add, remove);
}

/**
 * DOM SIDE EFFECT
 * 
 * @param {string} direction 
 */
function changeSpeed(direction) {
    let newDuration = calcNewDuration(direction);
    for(let i = 0; i < partsListElements.length; i++){
        partsListElements[i].style.animationDuration = newDuration + 's, ' + newDuration + 's'
    }
    Bike.currentDuration.fill(newDuration);
    setBackground(Bike.currentDuration, null, null);
}

/**
 * DOM SIDE EFFECT
 */
function setBackground(duration, add, remove) {
    let factor = 25;
    let citySpeedChange = parseFloat(duration[0]) * factor;
    if (add && remove) {
        restartAnimation(backgroundEl[0])
        backgroundEl[0].classList.add(add);
        backgroundEl[0].classList.remove(remove);
    }
    backgroundEl[0].style.animationDuration = citySpeedChange + 's';
}
/**
 * DOM SIDE EFFECT
 */
function showControls() {
    document.querySelector("." + startStop).classList.toggle('active');
    document.querySelector("." + slowDown).classList.toggle('hidden');
    document.querySelector("." + speedUp).classList.toggle('hidden');
}
/**
 * Accomodates physics for slowing and accelerating 
 * 
 * DOM SIDE EFFECT
 * 
 * In order to completely remove existing animations, we must
 * remove/replace the element in the DOM. This forces the styles
 * to be recomputed, hence fresh animations.
 * 
 * @param {DOMNode} el 
 */
function restartAnimation(el) {
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;
}
/**
 * Adjust the current speed based upon the requested direction (slower/faster) and adustment factor
 * @param {event} e 
 */
function calcNewDuration(direction) {
    let activeDurationValue = parseFloat(Bike.currentDuration[0]);
    // Add adjustment to slow down & visa versa
    let factor = (direction === slowDown) ? Bike.adjustmentFactor : -(Bike.adjustmentFactor);
    let adjustedDuration = activeDurationValue + (activeDurationValue * factor);
    //Limit based upon Bike settings
    if(adjustedDuration > Bike.maxDuration) adjustedDuration = Bike.maxDuration;
    else if(adjustedDuration < Bike.minDuration) adjustedDuration = Bike.minDuration;
    return adjustedDuration;
}
