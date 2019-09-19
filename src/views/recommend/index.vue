<template>
    <div class="recommend">
      <scroll class="recommend-content" :data="songList">
          <div>
           <!-- 轮播 -->
           <div class="swiper-container slide">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="itme in slider" :key="itme.key"><img :src="itme.picUrl" width="100%"></div>
            </div>
            <div class="swiper-pagination"></div>
           </div>
           <!-- <h1>这是推荐的页面</h1> -->
           <div class="recommend-list">
            <h2 class="list-title">热门歌曲推荐</h2>
            <ul>
                <li class="itme" v-for="itme in songList" :key="itme.key" @click="toDetail(itme.listid)">
                    <div class="icon"><img :src="itme.pic"></div>
                    <div class="text">
                        <h3 v-text="itme.title"></h3>
                    <p v-text="itme.tag"></p>
                    </div>
                    
                </li>
            </ul> 
           </div>
          </div>
      </scroll>
      <div class="loading" v-show="isLoading">
          <loading :text="text"></loading>
      </div>
      <transition name="slide">
         <router-view></router-view>
      </transition>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import {getRecommend,getRList} from '@/api'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
// import Bscroll from 'better-scroll'
export default {
    data() {
        return {
            slider:[],
            songList:[],
            pulldown: true,
            text:"加载中...",
            isLoading : true
        }
    },
    components:{
        Swiper,
        Scroll,
        Loading
    },
    created() {
        this.getRecommendData();
        this.getRData();
        // this.toDetail(listid)
    },
    methods: {
        getRecommendData(){
            getRecommend().then(res =>{
            // console.log(res)
            this.slider = res.data.slider
            // this.songList = res.data.songList
            this.isLoading = false
        })
        },
        getRData(){
            getRList().then(res => {
                // console.log(res)
                // this.slider = res.data.result
                this.songList = res.result
                // this.isLoading = false
            })
        },
        //这是跳转页面
        toDetail(tid){
            // console.log("111")
            this.$router.push({path:`/recommend/:${tid}`})
        }
    },
    //挂载之前去实例化swiper
    mounted() {
        var slide = new Swiper('.slide',{
            pagination:{
                el:'.swiper-pagination'
            },
            observer:true,
            observeParents:true,
        })
        // this.$nextTick(()=>{
        //     this.scroll = new Bscroll(this.$refs.wrapper,{})
        // })
    },
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .loading{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #1a1a1a;
        left: 0;
        top: 0;
        }
    .recommend-content{
        height: 100%;
        overflow: hidden;
    .recommend-list{
        h2{
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: @font-size-medium-x;
            color: @color-theme;
        }
        .itme{
				display: flex;
				box-sizing:border-box;
				padding: 0 20px 20px 20px;
				.icon{
					flex:0 0 60px;
					width: 60px;
					height: 60px;
					padding-right: 20px;
					img{
						width: 60px;
						height: 60px;
					}
				}
				.text{
					flex:1;
					display: flex;
					flex-direction:column;
					justify-content:center;
					line-height: 20px;
					overflow: hidden;
					font-size:@font-size-medium;
					h3{
						margin-bottom: 10px;
						color:@color-text;
					}
					p{
						color: @color-text-d ;
					}
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
