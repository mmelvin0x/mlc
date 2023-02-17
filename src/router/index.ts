import { createRouter, createWebHashHistory } from 'vue-router';
import CharityPage from '../pages/CharityPage.vue';
import ClubhousePage from '../pages/ClubhousePage.vue';
import GalleryPage from '../pages/GalleryPage.vue';
import HomePage from '../pages/HomePage.vue';
import IndexPage from '../pages/IndexPage.vue';
import InfoPage from '../pages/InfoPage.vue';
import PartnersPage from '../pages/PartnersPage.vue';
import PortalPage from '../pages/PortalPage.vue';
import ShopsPage from '../pages/ShopsPage.vue';

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      transitionName: 'fade',
    },
  },
  {
    path: '/home',
    component: HomePage,
    meta: {
      transitionName: 'fade',
    },
  },
  {
    path: '/clubhouse',
    component: ClubhousePage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/gallery',
    component: GalleryPage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/partnership-pavilion',
    component: PartnersPage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/info',
    component: InfoPage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/shop',
    component: ShopsPage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/charity',
    component: CharityPage,
    meta: {
      transitionName: 'slide',
    },
  },
  {
    path: '/portal',
    component: PortalPage,
    meta: {
      transitionName: 'slide',
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
