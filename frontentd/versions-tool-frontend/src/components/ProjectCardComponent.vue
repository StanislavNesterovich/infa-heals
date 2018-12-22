<template>
  <el-card v-loading="!project" class="project-card">
    <img :src="logoUrl" :alt="project.name" class="image">
    <div class="project-info text-center">
      <template v-if="!platform">
        <h2 class="project-name capitalize">{{project.name}}</h2>
        <router-link
          v-for="(platform, index) in project.platforms"
          :key="platform.id"
          :to="getPlatformLink(project, platform)">
          <span class="project-platform">
            {{platform.name}}<template v-if="index !== project.platforms.length - 1">,</template>
          </span>
        </router-link>
      </template>
      <template v-else>
        <h2 class="project-name capitalize">
          <a :href="platform.repositoryUrl" target="blank">{{project.name}}</a>
        </h2>
        <a :href="platform.browseUrl" target="blank" v-show="platform.contentId">
          <span class="platform-content-id">[{{platform.contentId || 'loading...'}}]</span>
        </a>
        <i v-show="!platform.contentId" class="platform-content-id el-icon-loading"></i>
      </template>
    </div>
  </el-card>
</template>

<script>
import { STORAGE_URL } from '../../app-config';

export default {
  name: 'ProjectCardComponent',
  props: {
    project: Object,
    platform: Object,
  },
  data() {
    return {
      logoUrl: `${STORAGE_URL}/${this.project.logoUrl}`,
    };
  },
  methods: {
    getPlatformLink(project, platform) {
      return { name: 'ProjectView', params: { projectId: this.project.id, platformId: platform.id } };
    },
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

a {
  color: $mainColor;
  text-decoration: none;
}

.project-info {
  margin-top: 20px;
}

.project-name {
  margin-bottom: 10px;
  color: $mainColor;
}

.project-platform {
  font-size: 20px;
}

.project-platform, .platform-description, .platform-content-id {
  color: $secondaryTextColor;
}

.image {
  width: 100%;
  display: block;
  max-height: 250px;
  object-fit: contain;
}
</style>
