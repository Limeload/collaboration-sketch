import Vue from 'vue';
import VueRouter from 'vue-router';
import DrawingBoard from './components/DrawingBoard.vue';
import TextInsertion from './components/TextInsertion.vue';
import ImageInsertion from './components/ImageInsertion.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/drawing', component: DrawingBoard },
  { path: '/text', component: TextInsertion },
  { path: '/image', component: ImageInsertion },
  // Add more routes if needed
];

const router = new VueRouter({
  routes,
});

export default router;
