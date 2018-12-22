import Vue from 'vue';
import './elementUI/install';

import ProjectCardComponent from './ProjectCardComponent';
import LoadingComponent from './LoadingComponent';
import ErrorComponent from './ErrorComponent';


Vue.component('project-card', ProjectCardComponent);
Vue.component('page-loading', LoadingComponent);
Vue.component('page-error', ErrorComponent);
