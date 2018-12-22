export default {
  currentProject: (state) => {
    if (!state.projects) {
      return null;
    }
    return state.projects.find(
      project => project.id === state.currentProjectId,
    );
  },
  currentPlatform: (state, getters) => {
    if (!getters.currentProject) {
      return null;
    }
    return getters.currentProject.platforms.find(
      platform => platform.id === state.currentPlatformId,
    );
  },
  currentGlobalPlatform: (state) => {
    if (!state.currentProjectsSubmodulesPlatformId) {
      return null;
    }
    return state.platforms.find(
      platform => platform.id === state.currentProjectsSubmodulesPlatformId,
    );
  },
};
