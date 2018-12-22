<template>
  <div>
    <el-row
      v-if="currentGlobalPlatform &&
        currentGlobalPlatform.loaded">
      <el-col>
        <div class="view-mode-select" v-if="currentGlobalPlatform.dependencyGraphAvailable">
          <router-link
            :to="nextViewMode.link">
            <span class="view-mode-text">
              <i class="el-icon-caret-right"></i>
              {{nextViewMode.name}}
            </span>
          </router-link>
        </div>
        <el-tabs
          :value="platformId"
          type="card"
          @tab-click="handlePlatformChange">
          <el-tab-pane
            v-for="platform in platforms"
            :key="platform.id"
            :name="platform.id"
            :label="platform.name">
            <projects-submodules v-if="mode === 'table'" :platform="platform"></projects-submodules>
            <platform-dependencies v-else></platform-dependencies>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <page-loading v-if="currentGlobalPlatform && !currentGlobalPlatform.loaded"></page-loading>
    <page-error v-if="!currentGlobalPlatform" text="'Platform not found'"></page-error>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import ProjectsSubmodules from '../components/ProjectsSubmodulesComponent';
import PlatformDependencies from '../components/PlatformDependenciesComponent';

export default {
  name: 'ProjectsSubmodules',
  title: 'Submodules',
  props: {
    platformId: String,
    mode: String,
  },
  components: {
    'projects-submodules': ProjectsSubmodules,
    'platform-dependencies': PlatformDependencies,
  },
  computed: {
    ...mapState([
      'platforms',
    ]),
    ...mapGetters([
      'currentGlobalPlatform',
    ]),
    nextViewMode() {
      const viewMode = this.mode === 'table' ? 'graph' : 'table';
      const viewLabel = this.mode === 'table' ? 'Dependency graph' : 'Submodules table';

      return {
        name: viewLabel,
        link: { name: 'ProjectsSubmodulesView', params: { platformId: this.platformId, mode: viewMode } },
      };
    },
  },
  watch: {
    mode: function onModeChange() {
      this.fetchPlatformLibsDependencies();
    },
  },
  created() {
    this.setCurrentProjectsSubmodulesPlatform({ platformId: this.platformId });
    this.fetchPlatformLibsDependencies();
  },
  methods: {
    ...mapActions([
      'setCurrentProjectsSubmodulesPlatform',
      'loadPlatformLibsDependencies',
    ]),
    handlePlatformChange({ name: platformId }) {
      this.$router.push({ name: 'ProjectsSubmodulesView', params: { platformId, mode: 'table' } });
      this.setCurrentProjectsSubmodulesPlatform({ platformId });
    },
    fetchPlatformLibsDependencies() {
      if (this.mode === 'graph' &&
        this.currentGlobalPlatform.dependencyGraphAvailable &&
        !this.currentGlobalPlatform.dependencyGraphLoaded) {
        this.loadPlatformLibsDependencies({ platformId: this.platformId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.view-mode-select {
  position: absolute;
  right: 0;
  height: 41px;
  line-height: 41px;
  z-index: 100;

  .view-mode-text {
    color: $mainColor;
  }
}
</style>

