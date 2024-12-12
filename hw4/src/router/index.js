import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import auth from "../auth"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: async (_to, _from, next) => {
      let authResult = await auth.authenticated()

      if (!authResult) {
        next("/login")
      } else {
        next()
      }
    },
  },
  {
    path: "/contact",
    name: "Contact",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ContactView.vue"),
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUpView.vue"),
  },
  {
    path: "/login",
    name: "Log In",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LogInView.vue"),
  },
  {
    path: "/addpost",
    name: "Add Post",
    component: () =>
      import(/* webpackChunkName: "addpost" */ "../views/AddPostView.vue"),
    beforeEnter: async (_to, _from, next) => {
      let authResult = await auth.authenticated()

      if (!authResult) {
        next("/login")
      } else {
        next()
      }
    },
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/PostView.vue"),
    beforeEnter: async (_to, _from, next) => {
      let authResult = await auth.authenticated()

      if (!authResult) {
        next("/login")
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
