import * as mtypes from './mutation-types';

export default {
  [mtypes.SET_CURRENT_PLATFORM](state, { projectId, platformId }) {
    state.currentProjectId = projectId;
    state.currentPlatformId = platformId;
  },
  [mtypes.SET_CURRENT_PROJECTS_SUBMODULES_PLATFORM](state, { platformId }) {
    state.currentProjectsSubmodulesPlatformId = platformId;
  },
  [mtypes.SET_PROJECT_LIST](state, { projects }) {
    state.projects = projects;
  },
  [mtypes.SET_PLATFORMS_LIST](state, { platforms }) {
    state.platforms = platforms;
  },
  [mtypes.SET_PLATFORM_LIBS_DEPENDENCIES](state, { platformId, dependencyGraph }) {
    state.platforms = state.platforms.map((platform) => {
      if (platform.id === platformId) {
        Object.assign(platform, {
          dependencyGraph,
          dependencyGraphLoaded: Date.now(),
        });
      }
      return platform;
    });
  },
  [mtypes.SET_GLOBAL_PLATFORM_DATA](state, { platformId, submodules, projects }) {
    state.platforms = state.platforms.map((platform) => {
      if (platform.id === platformId) {
        Object.assign(platform, {
          submodules,
          projects,
          loaded: Date.now(),
        });
      }
      return platform;
    });
  },
  [mtypes.SET_PLATFORM_DATA](state,
    { projectId, platformId, platformTableData, platformChartData }) {
    state.projects = state.projects.map((project) => {
      if (project.id === projectId) {
        /* eslint-disable-next-line */
        project.platforms = project.platforms.map((platform) => {
          if (platform.id === platformId) {
            return {
              ...platformTableData,
              ...platform,
              chartPoints: platformChartData,
              loaded: Date.now(),
            };
          }
          return platform;
        });
      }
      return project;
    });
  },
};
