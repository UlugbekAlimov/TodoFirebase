import { createRouter, createWebHistory } from 'vue-router/auto';
import { auth } from '@/firebase.js'; 
import { onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      name:'/main',
      component: ()=>import ('../views/main.vue')
    },
    {
      path:'/login',
      name:'/login',
      component: ()=>import ('../pages/login.vue')
    },
    {
      path:'/signup',
      name:'/signup',
      component: ()=>import ('../pages/signup.vue')
    },
    {
      path:'/forgotPassword',
      name:'/forgotPassword',
      component: ()=>import ('../pages/forgotPassword.vue')
    },
    {
      path:'/todos',
      name:'/todos',
      component: ()=>import ('../pages/todos.vue'),
      meta: { requiresAuth: true }
    },
  ] 
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/todos');
  } else {
    next();
  }
});

onAuthStateChanged(auth, user => {
  if (!user) {
    localStorage.removeItem('token');
    router.push('/login');
  }
});

export default router;
