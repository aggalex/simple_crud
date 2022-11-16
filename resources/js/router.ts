import {createRouter, createWebHistory} from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import TasksView from "./views/TasksView.vue";

export default createRouter ({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: HomeView,
        },
        {
            name: 'Home',
            path: '/view/',
            component: HomeView,
        },
        {
            name: 'About',
            path: '/view/about',
            component: AboutView,
        },
        {
            name: 'tasks',
            path: '/view/tasks',
            component: TasksView
        }
    ]
})
