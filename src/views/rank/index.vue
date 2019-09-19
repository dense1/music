<template>
    <div class="Rank-cd">
        <scroll class="rank-view">
            <ul>
                <li class="rank-li" v-for="item in ranklist" :key="item.key" @click="toDetail(item.id)">
                    <div class="li-cc">
                       <div class="li-img"><img :src="item.picUrl" alt="" width="100px" height="100px"></div>
                       <div class="li-text">
                           <p v-for="(item1,index) in item.songList" :key="item1.key">{{index+1}}.{{item1.songname}}--{{item1.singername}}</p>
                       </div>
                    </div>
                </li>
            </ul> 
            <div class="loading" v-show="isLoading">
               <loading :text="text"></loading>
            </div>
        </scroll>
        <transition name="slide">
         <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import {getRankList} from '@/api'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
// import Loading from '@/components/loading'
export default {
    data() {
        return {
            ranklist:[],
            text:"加载中...",
            isLoading : true,
        }
    },
    components:{
        Scroll,
        Loading,
    },
    created() {
        this.getrankData()
        // this.isLoading=false
    },
methods: {
    getrankData(){
        getRankList().then(res =>{
            this.ranklist = res.data.topList
            // console.log(res.data.topList)
        })
    },
    //这是跳转页面
    toDetail(tid){
        console.log(tid)
        // this.sid = tid
        this.$router.push({path:`/rank/${tid}`})
    }
},
}
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";
.Rank-cd{
    position: fixed;
    bottom:0;
    top: 88px;
    width: 100%;
}
.rank-view{
    position: relative;
    // position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .rank-li{
        width: 100%;
        height: 130px;
        padding: 15px 30px;
        box-sizing: border-box;
        .li-cc{
            display: flex;
            height: 100%;
            width: 100%;
            background: @color-text-d;
            .li-text{
                display: flex;
                flex-direction: column;
                padding: 5px 26px;
                font-size: @font-size-medium;
                p{
                   margin-top: 12px;
                //    margin-right: 20px;
                   width: 210px;
                   overflow:hidden;
                   text-overflow:ellipsis;
                   white-space:nowrap;
                }
            }
        }
    }
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
.slide-enter-active,.slide-leave-active{
    transition: all 0.4s
}
</style>

