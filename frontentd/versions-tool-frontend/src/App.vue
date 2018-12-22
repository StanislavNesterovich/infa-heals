<template>
  <div id="app" class="app">
    <el-container v-if="projects && projects.length" class="layout-wrapper">
      <el-header>
        <app-menu></app-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <page-loading v-if="!projects"></page-loading>
    <page-error v-if="projects && !projects.length" text="No available projects"></page-error>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MenuComponent from './components/MenuComponent';

export default {
  name: 'App',
  components: {
    'app-menu': MenuComponent,
  },
  created() {
    this.loadProjectList();
  },
  computed: {
    ...mapState([
      'projects',
    ]),
  },
  methods: {
    ...mapActions([
      'loadProjectList',
    ]),
  },
};
</script>

<style lang="scss">
  .app, .layout-wrapper {
    height: 100%;
  }
</style>
