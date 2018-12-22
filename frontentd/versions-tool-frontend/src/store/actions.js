import axios from 'axios';
import * as mtypes from './mutation-types';
import { API_URL } from '../../app-config';

const VUE_INSTANCE_FIELD = '_vm';
const CACHE_TIME = 1000 * 60 * 30;

export default {
  setCurrentProjectsSubmodulesPlatform({ commit, dispatch, getters }, { platformId }) {
    commit(mtypes.SET_CURRENT_PROJECTS_SUBMODULES_PLATFORM, {
      platformId,
    });
    if (getters.currentGlobalPlatform) {
      if (!getters.currentGlobalPlatform.loaded ||
        getters.currentGlobalPlatform.loaded + CACHE_TIME < Date.now()) {
        dispatch('loadGlobalPlatformData', { platformId });
      }
    }
  },
  setCurrentPlatform({ commit, dispatch, getters }, { projectId, platformId }) {
    commit(mtypes.SET_CURRENT_PLATFORM, {
      projectId,
      platformId,
    });
    if (!getters.currentPlatform.loaded ||
      (getters.currentPlatform.loaded + CACHE_TIME < Date.now())) {
      dispatch('loadPlatformData', { projectId, platformId });
    }
  },
  loadProjectList(context) {
    axios.get(`${API_URL}/projects`)
      .then((response) => {
        context.commit(mtypes.SET_PROJECT_LIST, {
          projects: response.data.projects,
        });
        context.commit(mtypes.SET_PLATFORMS_LIST, {
          platforms: response.data.platforms,
        });
      })
      .catch((e) => {
        this[VUE_INSTANCE_FIELD].$notify({
          title: 'Error',
          message: e.message,
          type: 'error',
        });
        context.commit(mtypes.SET_PROJECT_LIST, {
          projects: [],
        });
      });
  },
  loadGlobalPlatformData(context, { platformId }) {
    axios.get(`${API_URL}/submodules/${platformId}`)
      .then((response) => {
        context.commit(mtypes.SET_GLOBAL_PLATFORM_DATA, {
          platformId,
          ...response.data,
        });
      })
      .catch((e) => {
        this[VUE_INSTANCE_FIELD].$notify({
          title: 'Error',
          message: e.message,
          type: 'error',
        });
        context.commit(mtypes.SET_GLOBAL_PLATFORM_DATA, {
          platformId,
          submodules: [],
          projects: [],
        });
      });
  },
  loadPlatformLibsDependencies(context, { platformId }) {
    axios.get(`${API_URL}/submodules/${platformId}/dependencies`)
      .then((response) => {
        context.commit(mtypes.SET_PLATFORM_LIBS_DEPENDENCIES, {
          platformId,
          dependencyGraph: response.data,
        });
      })
      .catch((e) => {
        this[VUE_INSTANCE_FIELD].$notify({
          title: 'Error',
          message: e.message,
          type: 'error',
        });
        context.commit(mtypes.SET_PLATFORM_LIBS_DEPENDENCIES, {
          platformId,
          dependencyGraph: null,
        });
      });
  },
  loadPlatformData(context, { projectId, platformId }) {
    const platformTableTask = axios.get(`${API_URL}/report/${projectId}/${platformId}`);
    const platformChartTask = axios.get(`${API_URL}/report/${projectId}/${platformId}/chart`);
    Promise.all([platformTableTask, platformChartTask])
      .then((responses) => {
        const platformTableData = responses[0].data;
        const platformChartData = responses[1].data;
        const dateNow = new Date();
        const nowPoint = {
          date: +dateNow,
          data: [0, 0, 0],
        };
        platformTableData.submodules.forEach((submodule) => {
          switch (submodule.matchingType) {
            case 'UNDEFINED': {
              nowPoint.data[0] += 1;
              break;
            }
            case 'BRANCH': {
              nowPoint.data[1] += 1;
              break;
            }
            default: {
              nowPoint.data[2] += 1;
            }
          }
        });
        if (platformChartData.length) {
          const lastDate = new Date(platformChartData[platformChartData.length - 1].date)
            .setHours(0, 0, 0, 0);
          dateNow.setHours(0, 0, 0, 0);
          if (lastDate === +dateNow) {
            platformChartData.pop();
          }
        }
        platformChartData.push(nowPoint);
        context.commit(mtypes.SET_PLATFORM_DATA, {
          projectId,
          platformId,
          platformTableData,
          platformChartData,
        });
      })
      .catch((e) => {
        this[VUE_INSTANCE_FIELD].$notify({
          title: 'Error',
          message: e.message,
          type: 'error',
        });
        context.commit(mtypes.SET_PLATFORM_DATA, {
          projectId,
          platformId,
          platformTableData: {
            submodules: [],
          },
          platformChartData: [],
        });
      });
  },
};
