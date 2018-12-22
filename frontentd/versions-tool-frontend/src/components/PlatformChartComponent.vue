<template>
  <el-card v-loading="!platform.loaded" class="platform-chart">
    <canvas ref="chartWrapper" class="chart-wrapper"></canvas>
  </el-card>
</template>

<script>
import Chart from 'chart.js';
import ChartService from '../services/chart-service';

export default {
  name: 'PlatformChartComponent',
  props: {
    platform: Object,
  },
  data() {
    return {
      renderedChart: null,
    };
  },
  updated() {
    this.renderChart();
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const badSubmodules = {
        label: 'Commit',
        data: [],
      };
      const mediumSubmodules = {
        label: 'Branch',
        data: [],
      };
      const goodSubmodules = {
        label: 'Tag',
        data: [],
      };
      const chartData = {
        data: {
          labels: this.platform.chartPoints.map(point => new Date(point.date).getTime()),
          datasets: [goodSubmodules, mediumSubmodules, badSubmodules],
        },
        displayTitle: false,
      };
      this.platform.chartPoints.forEach((point) => {
        badSubmodules.data.push(point.data[0]);
        mediumSubmodules.data.push(point.data[1]);
        goodSubmodules.data.push(point.data[2]);
      });
      this.renderedChart = new Chart(this.$refs.chartWrapper.getContext('2d'), ChartService.getChartOptions(chartData));
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.platform-chart {
  margin: 20px 0;

  .el-card__body {
    padding: 5px;
  }
}

.chart-wrapper {
  background: #fff;
}
</style>
