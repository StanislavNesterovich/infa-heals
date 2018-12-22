/* eslint-disable */
import Chart from 'chart.js';

Chart.defaults.lineWithVericalLine = Chart.defaults.line;
Chart.controllers.lineWithVericalLine = Chart.controllers.line.extend({
  draw(ease) {
    Chart.controllers.line.prototype.draw.call(this, ease);
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0];
      const ctx = this.chart.ctx;
      const x = activePoint.tooltipPosition().x;
      const topY = this.chart.scales['y-axis-0'].top;
      const bottomY = this.chart.scales['y-axis-0'].bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#424242';
      ctx.stroke();
      ctx.restore();
    }
  },
});

const colors = [
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
];

function formatChartDatasets(datasets) {
  return datasets.map((ds, i) => {
    ds.fill = false;
    ds.backgroundColor = colors[i];
    ds.borderColor = colors[i];
    return ds;
  });
}

function getChartOptions(chartData) {
  chartData.data.datasets = formatChartDatasets(chartData.data.datasets);
  return {
    type: 'lineWithVericalLine',
    data: chartData.data,
    options: {
      responsive: true,
      title: {
        display: chartData.displayTitle,
        text: chartData.title,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'point',
        intersect: true,
      },
      legend: {
        labels: {
          boxWidth: 20,
        }
      },
      scales: {
        xAxes: [
          {
            distribution: 'series',
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'DD.MM',
              },
              tooltipFormat: 'MMM D YYYY',
            },
            ticks: {
              source: 'labels',
              maxRotation: 0,
              callback: function(value, index, values) {
                if (index === values.length - 1) {
                  return 'NOW'
                };
                return value;
              }
            }
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value) {if (value % 1 === 0) {return value;}}
            }
          },
        ]
      },
    },
  };
}

export default {
  getChartOptions,
};
