import { createRouter, createWebHashHistory, createWebHistory, isNavigationFailure } from 'vue-router';

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Members from '../pages/Members.vue';
import MemberInfo from '../pages/MemberInfo.vue';
import Videos from '../pages/Videos.vue';
import ViedoPlayer from '../pages/VideoPlayer.vue';

const memberInfoGuard = (to, from)=>{
    if(from.name !== 'members' && from.name !== "members/id"){
        return false;
    }
}
const hashHistory = createWebHashHistory();
const htmlHistory = createWebHistory();
const router = createRouter({
    history : htmlHistory,
    routes : [
        {path: '/' , name:'home', component: Home},
        {path: '/about', name:'about' , component: About},
        {path: '/members', name:'members' , component: Members},
        {
            path: '/members/:id(\\d+)+', name:'memberInfo' , component: MemberInfo,
            beforeEnter : memberInfoGuard
        },
        {
            path: '/videos', name:'videos' , component: Videos,
            children: [
                {path: ':id', name:'videos/id', component: ViedoPlayer}
            ]
        },
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