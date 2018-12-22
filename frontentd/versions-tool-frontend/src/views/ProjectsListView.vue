<template>
  <el-row :gutter="30">
    <el-col :sm="12" :md="8" :lg="6" :xl="4" v-for="project in projects" :key="project.id">
      <router-link :to="getProjectLink(project)">
        <project-card :project="project"></project-card>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProjectsListView',
  title: 'Projects',
  computed: {
    ...mapState([
      'projects',
    ]),
  },
  methods: {
    getProjectLink(project) {
      return { name: 'ProjectView', params: { projectId: project.id, platformId: project.platforms[0].id } };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.el-col {
  margin-top: 20px;
}

.el-row {
  margin-top: -20px;
}

.el-card:hover {
  cursor: pointer;
  box-shadow: 0 2px 12px 0 $mainColor;
}
</style>
