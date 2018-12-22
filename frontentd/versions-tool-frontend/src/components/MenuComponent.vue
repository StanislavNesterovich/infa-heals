<template>
  <el-menu
    :default-active="activeLink"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    active-text-color="#ffd04b">
    <el-menu-item
      index="ProjectsList"
      :route="{ name: 'ProjectsList' }">
      <i class="el-icon-tickets"></i> Projects
    </el-menu-item>
    <el-menu-item
      index="ProjectsSubmodulesView"
      :route="{ name: 'ProjectsSubmodulesView', params: { platformId: 'haxe', 'mode': 'table' } }">
      <i class="el-icon-view"></i> Submodules
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'MenuComponent',
  data() {
    return {
      activeLink: '',
    };
  },
  created() {
    this.activeLink = this.$route.name;
  },
};
</script>

<style lang="scss">
  .el-menu {
    justify-content: center;
    display: flex;

    .el-menu-item {
      font-size: 18px;
      display: flex;
      font-weight: 500;
      align-items: center;
      i {
        color: #fff;
      }
      &.is-active {
        i {
          color: #ffd04b;
        }
      }
    }
  }
</style>

