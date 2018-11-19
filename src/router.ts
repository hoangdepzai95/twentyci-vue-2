import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/Login.vue';
import PostList from './pages/PostList.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'post-list',
            component: PostList,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '*',
            redirect: '/post-list',
        },
    ],
});
