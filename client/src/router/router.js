import {createRouter, createWebHistory} from 'vue-router';


const routes = [
    {
        path: '/',
        component: () => import('@/pages/Home.vue') ,
        name: 'home'
    },
    {
        path: '/login',
        component: () => import('@/components/UsersAuth/Login.vue'),
        name: 'login'
    },
    {
        path: '/register',
        component: () => import('@/components/UsersAuth/Registration.vue'),
        name: 'register'
    },
    {
        path: '/users',
        component: () => import('@/pages/Users.vue') ,
        name: 'users'
    },
    {
        path: '/users/:_id',
        component: () => import('@/pages/UserEvents.vue') ,
        name: 'user-events'
    },
    {
        path: '/user-data',
        component: () => import('@/pages/UserData.vue'),
        name: 'user-data'
    },
    {
        path: '/users-events',
        component: () => import('@/pages/UsersEvents.vue'),
        name: 'users-events'
    }
]

const router = createRouter({
    routes,
    history: createWebHistory() 

})

export default router;
