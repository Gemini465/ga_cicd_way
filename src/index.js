import router from './router';

router.beforeEach((to, from, next) => {
  // console.log('====>>>>>beforeEach', to.path, from.path);
  next();
});
