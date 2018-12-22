<template>
  <div>
    <el-row :gutter="30" v-if="currentProject && currentPlatform">
      <el-col :md="6">
        <project-card :project="currentProject" :platform="currentPlatform"></project-card>
        <platform-chart :platform="currentPlatform" v-if="currentPlatform.loaded"></platform-chart>
      </el-col>
      <el-col :md="18">
        <el-tabs
          :value="platformId"
          type="border-card"
          @tab-click="handlePlatformChange">
          <el-tab-pane
          v-for="platform in currentProject.platforms"
          :key="platform.id"
          :name="platform.id"
          :label="platform.name">
            <platform-submodules :platform="platform"></platform-submodules>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <page-loading v-if="!currentProject && !currentPlatform"></page-loading>
    <page-error v-if="currentProject && !currentPlatform" text="'Platform not found'"></page-error>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PlatformSubmodules from '../components/PlatformSubmodulesComponent';
import PlatformChart from '../components/PlatformChartComponent';

export default {
  name: 'ProjectView',
  title: 'Platform view',
  components: {
    'platform-submodules': PlatformSubmodules,
    'platform-chart': PlatformChart,
  },
  props: {
    projectId: String,
    platformId: String,
  },
  computed: {
    ...mapGetters([
      'currentProject',
      'currentPlatform',
    ]),
  },
  created() {
    this.setCurrentPlatform({ projectId: this.projectId, platformId: this.platformId });
  },
  methods: {
    ...mapActions([
      'setCurrentPlatform',
    ]),
    handlePlatformChange({ name: platformId }) {
      this.$router.push({ name: 'ProjectView', params: { projectId: this.projectId, platformId } });
      this.setCurrentPlatform({ projectId: this.projectId, platformId });
    },
  },
};
</script>
