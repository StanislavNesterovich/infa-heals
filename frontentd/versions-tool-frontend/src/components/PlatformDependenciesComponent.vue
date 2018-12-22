<template>
  <div class="dependency-chart-wrapper">
    <div ref="dependencyChart"
      class="dependency-chart"></div>
      <h3 v-if="currentGlobalPlatform.dependencyGraphAvailable &&
        !currentGlobalPlatform.dependencyGraphLoaded"
      class="loading-graph">Please wait. Preparing dependency graph
        <i class="el-icon-loading"></i></h3>
      <page-error v-if="!currentGlobalPlatform.dependencyGraphAvailable"
        text="Graph unavailable for current platform">
      </page-error>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const chart = window.d3.chart.dependencyWheel();

export default {
  name: 'PlatformDependenciesComponent',
  computed: {
    ...mapGetters([
      'currentGlobalPlatform',
    ]),
  },
  mounted() {
    if (this.currentGlobalPlatform.dependencyGraphLoaded) {
      this.drawDependencyChart();
    }
  },
  watch: {
    currentGlobalPlatform: function drawChart() {
      this.drawDependencyChart();
    },
  },
  methods: {
    drawDependencyChart() {
      const element = this.$refs.dependencyChart;
      window.d3.select(element)
        .datum(this.currentGlobalPlatform.dependencyGraph)
        .call(chart);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.dependency-chart-wrapper {
  height: 100%;
}
.dependency-chart {
  text-align: center;
  overflow: hidden;
  width: 100%;
}
.loading-graph {
  width: 100%;
  margin-top: 250px;
  font-size: 16px;
  text-align: center;
  color: $mainColor;
}
</style>
