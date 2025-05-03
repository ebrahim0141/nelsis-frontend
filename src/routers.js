import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Add from "./components/Add.vue";
import Update from "./components/Update.vue";
import {createRouter,createWebHistory} from 'vue-router';

const routes=[
    {
        name:'Login',
        component:Login,
        path:'/'
    },
    {
        name:'Home',
        component:Home,
        path:'/home'
    },
    {
        name:'SignUp',
        component:SignUp,
        path:'/sign-up'
    },
    {
        name:'Add',
        component:Add,
        path:'/add'
    },
    {
        name:'Update',
        component:Update,
        path:'/update/:id'
    },
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;
