let factor = [2.0,2.0,2.0];;

export function onRefresh(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
        let ts = Date.now();
        dataset.data.push({
            x: ts,
            y: factor[chart.id] == 2 ? factor[chart.id] = 0 : factor[chart.id] = 2.0
        });
        dataset.data.push({
            x: ts+400,
            y: 0
        });
    });
}



