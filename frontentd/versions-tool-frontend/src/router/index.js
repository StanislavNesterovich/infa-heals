import Vue from 'vue';
import Router from 'vue-router';
import ProjectsListView from '@/views/ProjectsListView';
import ProjectView from '@/views/ProjectView';

const ProjectSubmodulesView = () => import('@/views/ProjectsSubmodulesView');

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'ProjectsList',
    component: ProjectsListView,
  },
  {
    path: '/projects/:projectId/:platformId',
    name: 'ProjectView',
    component: ProjectView,
    props: true,
  },
  {
    path: '/submodules/:platformId/:mode',
    name: 'ProjectsSubmodulesView',
    component: ProjectSubmodulesView,
    props: true,
  },
  {
    path: '*',
    redirect: '/',
  },
];

export default new Router({
  routes,
});
