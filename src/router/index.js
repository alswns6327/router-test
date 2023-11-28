import { createRouter, createWebHashHistory, createWebHistory, isNavigationFailure } from 'vue-router';

const  Home = () => import(/* webpackChunkName : "home" */ '../pages/Home.vue');
const  About = () => import(/* webpackChunkName : "home" */ '../pages/About.vue');
const  Members = () => import(/* webpackChunkName : "members" */ '../pages/Members.vue');
const  MemberInfo = () => import(/* webpackChunkName : "members" */ '../pages/MemberInfo.vue');
const  Videos = () => import(/* webpackChunkName : "videos" */ '../pages/Videos.vue');
const  ViedoPlayer = () => import(/* webpackChunkName : "videos" */ '../pages/VideoPlayer.vue');
const  NotFound = () => import(/* webpackChunkName : "home" */ '../pages/NotFound.vue');

const memberInfoGuard = (to, from)=>{
    if(from.name !== 'members' && from.name !== "members/id"){
        return false;
    }
}
const htmlHistory = createWebHistory();
const router = createRouter({
    history : htmlHistory,
    routes : [
        {path: '/' , name:'home', component: Home},
        {path: '/about', name:'about' , component: About},
        {path: '/members', name:'members' , component: Members},
        {
            path: '/members/:id(\\d+)+', name:'memberInfo' , component: MemberInfo,
            beforeEnter : memberInfoGuard, props:true
        },
        {
            path: '/videos', name:'videos' , component: Videos,
            children: [
                {path: ':id', name:'videos/id', component: ViedoPlayer}
            ]
        },
        {path: '/:paths(.*)*', name:'NotFound', component: NotFound}
    ]
});

router.beforeEach((to, from) =>{
    // to.query에 속성이 존재할 경우 제거한 뒤 이동
    if(to.query && Object.keys(to.query).length > 0){
        return {path:to.path, query:{}, params:to.params}
    }
});

router.afterEach((to, from, failure) => {
    console.log(from);
    if(isNavigationFailure(failure)){
        console.log("@@내비게이션 중단 : ", failure);
    }
});

export default router;