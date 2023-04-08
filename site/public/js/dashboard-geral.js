var ctx1 = document.getElementById('grafico1').getContext('2d');
var chart1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Uso de Rede'],
        datasets: [{
            data: [60, 40],
            backgroundColor: ['#F44336', '#FAEBD7']
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            enabled: false
        },
        legend: {
            display: false
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

var ctx2 = document.getElementById('grafico2').getContext('2d');
var chart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Uso de Rede'],
        datasets: [{
            data: [30, 70],
            backgroundColor: ['#F44336', '#FAEBD7']
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            enabled: false
        },
        legend: {
            display: false
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

var ctx3 = document.getElementById('grafico3').getContext('2d');
var chart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ['Uso de Rede'],
        datasets: [{
            data: [80, 20],
            backgroundColor: ['#F44336', '#FAEBD7']
        }]
    },
    options: {
        cutoutPercentage: 90,
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
            enabled: false
        },
        legend: {
            display: false
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }
});

