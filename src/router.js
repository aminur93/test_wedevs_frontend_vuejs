import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

import Home from './views/Home.vue'
import Login from './views/login.vue'

const routes = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('./views/Dashboard.vue')
            },
        ],
        beforeEnter(to, from, next){
            if (!store.getters['authenticated']){
                return next({
                    name: 'login'
                });
            }else {
                next();
            }
        },
    },

    {
        path: '/',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next){
            if(!store.state.token)
            {
                next();
            }else {
                next('/home');
            }
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export default router