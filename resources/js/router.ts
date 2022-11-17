import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import TasksView from "./views/TasksView.vue";
import {store} from "./stores/UserStore";
import {computed} from "vue";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: '/view/',
            component: HomeView,
            alias: '/'
        },
        {
            name: 'About',
            path: '/view/about',
            component: AboutView,
        },
    ]
})
