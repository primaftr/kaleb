import { useCookieManager } from '@/utils/cookies'
import { computed } from 'vue'
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory
} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      name: 'home',
      component: DashboardView,
      meta: {
        authRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        authRequired: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        authRequired: false
      }
    }
  ]
})

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const isAuthenticated = computed(() => useCookieManager().getTokenCookie())

    if (to.meta.authRequired && !isAuthenticated.value) {
      next('/')
      return
    }
    if (isAuthenticated.value && ['login', 'register'].includes(to.name as string)) {
      next('/dashboard')
      return
    }
    next()
  }
)

export default router
