import Bike from './bike.js';

let element = Bike.limitTestNode;

element.addEventListener("animationstart", listener, false);
element.addEventListener("animationend", listener, false);
element.addEventListener("animationiteration", listener, false);

function listener(event) {
    console.log('listening to wheel...');
    var l = document.createElement("li");
    switch (event.type) {
        case "animationstart":
            l.innerHTML = "Started: elapsed time is " + event.elapsedTime;
            break;
        case "animationend":
            l.innerHTML = "Ended: elapsed time is " + event.elapsedTime;
            break;
        case "animationiteration":
            l.innerHTML = "New loop started at time " + event.elapsedTime;
            break;
    }
    console.log(l.innerHTML);
}
