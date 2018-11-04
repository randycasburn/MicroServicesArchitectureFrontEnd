import {onRefresh} from './chartActions.js';

let chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
let color = Chart.helpers.color;
export let config = {
    factor: 2.0,
    type: 'line',
    data: {
        datasets: [{
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: false,
            lineTension: 0,
            data: []
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            }
        },
        title: {
            display: false,
            text: 'Service Pings'
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                scaleLabel: {
                    display: false
                },
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                display: false,
                scaleLabel: {
                    display: true,
                },
                ticks: {
                    display: false
                }
            }]
        }
    }
};

