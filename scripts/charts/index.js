import {config} from './chartConfig.js';

let service1ctx = document.getElementById('service1').getContext('2d');
let service2ctx = document.getElementById('service2').getContext('2d');
let service3ctx = document.getElementById('service3').getContext('2d');
window.service1Chart = new Chart(service1ctx, config);
window.service2Chart = new Chart(service2ctx, config);
window.service3Chart = new Chart(service3ctx, config);
