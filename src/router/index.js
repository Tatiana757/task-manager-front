import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { 
      requiresAuth: false 
    }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: '/',
    redirect: '/tasks'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/tasks')
  } else {
    next()
  }
})

export default router 