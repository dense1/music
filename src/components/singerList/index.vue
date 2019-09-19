<template>
    <scroll class="list-view" ref="listView" :listenScroll=true :probeType=3 @scroll="scroll">
        <ul>
            <li class="list-group" ref="lists" v-for="item in singers" :key="item.key">
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="(item1,index) in item.list" :key="item1.key" @click="addplayer(index)">
                        <img :src="item1.img" alt="" class="avatar">
                        <span class="name" v-text="item1.name"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- http://y.gtimg.cn/music/photo_new/T001R150x150M000001fNHEf1SFEFN.jpg?max_age=2592000 -->
        <!-- 右边快速定位列表 -->
        <div class="list-shortcut">
            <ul>
                <li class="item" v-for="(item3,index) in cutList" :class="{'current':currentIndex==index}" @touchstart="onTochStart" @touchmove.stop.prevent="onTouchMove" :key="item3.key" :data-index="index">{{item3}}</li>
                <!-- @touchmove.stop.prevent="onTouchMove" -->
            </ul>
        </div>
        <div class="loading" v-show="isLoading">
          <loading :text="text"></loading>
      </div>
    </scroll>
</template>

<script>
import {mapActions,mapMutations} from 'vuex'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
export default {
    props:{
        singers:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            scrollY:0,
            listHeight:[],
            currentIndex:0,
            touch:{},
            text:"加载中...",
            isLoading : true
        }
    },
    updated() {
        this.getLiH(),
        this.isLoading=false
    },
    components:{
        Scroll,
        Loading
    },
    methods: {
         addplayer(index){
            // console.log(index)
            this.addPlayer({
                list:this.list,
                index:index
            })
        },
        ...mapActions(['addPlayer']),
        onTochStart(ev){
            //获取当前点击的下标
            console.log(ev)
            let vIndex = ev.target.attributes['data-index'].value
            //记录鼠标点击时的位置
            this.touch.y = ev.touches[0].pageY
            this.touch.index = vIndex
            //调用scrollTo方法
            this.scrollTo(vIndex)
        },
        onTouchMove(ev){
            //记录手指滑动的位置
            this.touch.y2 = ev.touches[0].pageY
            //记录手指划过记得li，并向下取整
            let a1 = (this.touch.y2 - this.touch.y)/18|0
            let a2 = parseInt(this.touch.index) + a1
            if(a2<0){
                a2=0
            }else if(a2>=this.singers.length){
                a2 = this.singers.length-1
            }
            this.scrollTo(a2)
            // Math.floor和/18|0区别
        },
        scroll(obj){
            // console.log(obj)
            this.scrollY = obj.y
        },
        //获取list里每个li的高度
        getLiH(){
            // console.log(this.$refs.lists)
            let lists = this.$refs.lists
            let h = 0
            this.listHeight.push(0)
            for( var i=0;i<lists.length;i++){
                h+=lists[i].clientHeight
                this.listHeight.push(h)
            }
            // console.log(this.listHeight)
        },
        scrollTo(index){
            // this.currentIndex = index
            this.scrollY = -this.listHeight[index]
            this.$refs.listView.scrollToElement(this.$refs.lists[index],0)
        }
    },
    //监听scroollY,如果发生改变，我们就要改变class
    watch:{
        scrollY(v){
            // console.log(listHeight)
            if(v>=0){
                this.currentIndex = 0
            }
            for(let i=0;i<this.listHeight.length;i++){
                let h1 = this.listHeight[i]
                let h2 = this.listHeight[i+1]
                if(-v>=h1&&-v<h2){
                    this.currentIndex = i //阿斯蒂芬
                    return
                }
            }
            this.currentIndex = this.listHeight.length - 1
        }
    },
    computed: {
        cutList(){
            let arr = [];
            for(let a in this.singers){
                arr.push(this.singers[a].title.substring(0,1))
            }
            return arr
        }
    },
}
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";
.list-view{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .loading{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #1a1a1a;
        left: 0;
        top: 0;
        }
    .list-group{
      padding-bottom: 30px;
      .list-group-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size:@font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
      }
      .list-group-item{
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name{
          margin-left: 20px;
          color: @color-text-l;
          font-size: @font-size-medium;
        }
      }
    }
    .list-shortcut{
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: @color-background-d;
      font-family: Helvetica;
      .item{
        padding: 3px;
        line-height: 1;
        color: @color-text-l;
        font-size: @font-size-small;
        &.current{
          color: @color-theme;
        }
      }
    }
    .list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title{
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
}
.loading{
      position: absolute;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      left: 0;
      top:0;
    }
</style>
