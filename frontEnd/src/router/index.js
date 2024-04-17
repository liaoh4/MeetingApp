import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Messages from '../views/Messages.vue'
import Notification from '../views/Notification.vue'
import Register from '../views/Register.vue'
import Query from '../views/Query.vue'
import Ask from '../views/Ask.vue'
import Login from '../views/Login.vue'

const routes =[
    {path:'/', name: 'Home', component: Home},
    {path:'/explore', name: 'Explore', component: Explore},
    {path:'/messages', name: 'Messages', component: Messages},
    {path:'/notification', name: 'Notification', component: Notification},
    {path:'/user/register', name: 'Register', component: Register},
    {path:'/query', name: 'Query', component: Query},
    {path:'/ask', name: 'Ask', component: Ask},
    {path:'/user/login', name: 'Login', component: Login},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

