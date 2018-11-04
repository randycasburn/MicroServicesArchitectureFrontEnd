let Bike = {
    moving: false,
    startUpDuration: 5,
    currentDuration: 5,
    maxDuration: 5, //As slow as can go
    minDuration: 0.6, //As fast as can go
    limitTestNode: document.getElementsByClassName('wheel')[0],
    adjustmentFactor: 0.4,
};

export default Bike;
