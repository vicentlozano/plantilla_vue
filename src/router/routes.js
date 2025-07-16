
const routes  = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'aboutme', name: 'aboutme', component: () => import('pages/AboutPage.vue') },
      { path: 'example', name: 'example', component: () => import('pages/ExamplePage.vue') },
     
     
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
