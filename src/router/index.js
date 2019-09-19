import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/views/recommend/'
import RecommendDetail from '@/views/recommend/detail'
import Rank from '@/views/rank/'
import RankDetail from '@/views/rank/detail'
import Search from '@/views/search/'
import Singer from '@/views/singer/'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    //路由重定向
      {
        path:'/',
        redirect:'/recommend'
      },
      {
        path:'/recommend',
        component:Recommend,
        children:[{
           path:'/recommend/:id',
           component:RecommendDetail
         }]
      },
      {
        path:'/rank',
        component:Rank,
        children:[{
          path:'/rank/:id',
          component:RankDetail
        }]
      },
      {
        path:'/search',
        component:Search
      },{
        path:'/singer',
        component:Singer
      }
  ]
})
