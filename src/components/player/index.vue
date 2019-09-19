<template>
  <div class="player" v-if="playList.length > 0">
  <!-- 播放页面全屏 -->
    <transition >
      <div class="normal-player" v-show="fullScreen">
          <!-- 背景模糊 -->
        <div class="background">
          <img width="100%" height="100%" :src="currenSong.img">
        </div>
        <!-- 顶部 -->
        <div class="top">
          <div class="back" @click="changeFull1">
            <i class="icon-back" ></i>
          </div>
          <h1 class="title">{{currenSong.name}}</h1>
          <h2 class="subtitle">
              <span v-for="item in currenSong.singer" :key="item.key">{{item.name}}</span>
          </h2>
        </div>
        <!-- 中间CD部分 -->
        <div class="middle swiper-container" >
         <div class="swiper-wrapper">
          <div class="middle-l swiper-slide"  ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdstate">
                <img class="image" :src="currenSong.img">
              </div>
            </div>
            <!-- 一条歌词滚动 -->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!-- 歌词滚动 -->
          <scroll class="middle-r swiper-slide" ref="lyricList">
            <div class="lyric-wrapper">
              <div>
                <p ref="lyricLine" class="text" v-for="(item,index) in lyric.lines" :key="item.key"
                :class="{'current':currentLineNum == index}">{{item.txt}}
                </p>
              </div>
            </div>
          </scroll>
         </div>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{stareTime}}</span>
            <!-- 播放进度条 -->
            <div class="progress-bar-wrapper">
                <progress-bar :percent="percent" @changePercent="changeTime"></progress-bar> 
            </div>
            <span class="time time-r">{{songTime}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="modeStyle"></i>
            </div>
            <div class="icon i-left" @click="prev">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center" @click="changeState">
              <i :class="btnstate"></i>
            </div>
            <div class="icon i-right" @click="next">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <transition>
      <div class="mini-player" v-show="!fullScreen">
        <div class="icon" :class="cdstate">
          <img width="40" height="40" :src="currenSong.img">
        </div>
        <div class="text">
          <h2 class="name">{{currenSong.name}}</h2>
          <p class="desc"><span v-for="item in currenSong.singer" :key="item.key">{{item.name}}</span></p>
        </div>
        <div class="control" @click="changeState">
            <i :class="btnstate"></i>
        </div>
        <div class="control" @click="songlist">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <!-- h5音乐播放器 -->
    <!-- 播放列表 -->
    <transition>
        <div class="play-list" v-show="islist">
          <div class="list-tab">
            <span class="shoucang">收藏</span><i class="iconfont icon32">&#xe616;</i><i class="iconfont icon33" @click="listdel">&#xe614;</i>
          </div>
          <scroll class="list-content">
            <ul>
              <li v-for="(item,index) in playList" :key="item.key">
                <div class="list-song">
                  <div class="list-songname" @click="playlist(index)">{{item.name}}-{{item.singer[0].name}}</div>
                  <div class="list-del"><i class="iconfont icon33" @click="delsong(item)">&#xe632;</i></div>
                </div>
              </li>
            </ul>
          </scroll>
        </div>
    </transition>
      <audio ref="audio" :src="url" @canplay="readystate" @error="readystate" @ended="ended" @timeupdate="timeupdate"></audio> 
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
import { mapGetters ,mapMutations ,mapActions} from 'vuex'
import { getKey,getLyric } from "@/api"
import {Base64} from 'js-base64'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import ProgressBar from '@/components/progressBar'
import Lyric from 'lyric-parser'
export default {
      data(){ 
          return {
            url:"",
            isReady:false,
            lyric:{},
            playingLyric:"",
            currentLineNum:0,
            currentTime:0,
            islist:false,
            // playList1:[]
          }
      },
      components:{
        Scroll,
        Swiper,
        ProgressBar
      },
      computed: {
          // this.playList1 = playList,
          ...mapGetters(['playList','currentIndex','currenSong','fullScreen','playing']),
          //根据播放状态来判断图片是否旋转
          cdstate(){
            return this.playing?'play':'pause'
          },
          //根据播放状态来判断显示播放还是暂停按钮
          btnstate(){
            return this.playing?'icon-pause':'icon-play'
          },
          //当前播放时间
          stareTime(){
            // this.currentTime =
             let m = this.currentTime/60 | 0
             let s = this.currentTime%60 | 0
             if(s.toString().length < 2){
               s ="0" + s
             }
             return `${m}:${s}`
          },
          //总时间
          songTime(){
            let m = this.currenSong.interval/60 | 0
            let s = this.currenSong.interval%60 | 0
            if(s.toString().length < 2){
              s ="0" + s
            }
            return `${m}:${s}`
          },
          //当前时间占总时间的百分比
          percent(){
            return this.currentTime/this.currenSong.interval
          },
      },
      updated() {
        this.aaa()
      },
      methods: {
        aaa(){
          // console.log(this.playList)
        },
        //全屏
        changeFull1(){
          this.changeFullScreen(false)
        },
        //停放
        changeState(){
          // console.log(this.playList)
          this.changePlaying(!this.playing)
          this.lyric.togglePlay()
        },
        //上一首
        prev(){
          let index = this.currentIndex - 1
          if(index==-1){
            index = this.playList.length - 1
          }
          this.changeCurrentIndex(index)
          this.changePlaying(this.playing=true)
          // this.playing=true
        },
        //下一首
        next(){
          let index = this.currentIndex + 1
          if(index==this.playList.length){
            index = 0
          }
          this.changeCurrentIndex(index)
          this.changePlaying(this.playing=true)
        },
        //获取当前播放时间
        timeupdate(e){
          // console.log(e)
          this.currentTime = e.target.currentTime
        },
        //根据歌曲加载改变播放器的加载状态
        readystate(){
          this.isReady = true
        },
        //播放结束之后
        ended(){
          this.next()
        },
        //歌词
        getLyricc(){
          this.lyric = {},
          getLyric(this.currenSong.id).then((res) =>{
            // console.log(Base64.decode(res.lyric))
            // let lyric = new LyricPaser(Base64.decode(res.lyric))
            this.lyric = new Lyric(Base64.decode(res.lyric),this.hanlder)
            if(this.playing){
              this.lyric.play()
            }
            // this.lryic = new LyricPaser(Base64.decode(res.lyric))
            // console.log(lyric)
          })
        },
        //播放列表
        songlist(){
          this.islist = !this.islist
        },
        //单机播放列表
        playlist(index){
          // this.currentIndex(index)
          this.changeCurrentIndex(index)
          this.changePlaying(this.playing=true)
        },
        //清空播放列表
        listdel(){
          this.clearPlayList()
        },
        //删除歌曲
        delsong(v){
          console.log(v)
          this.delSong(v)
        },
        hanlder({lineNum, txt}){
          if(this.playing){
            this.currentLineNum = lineNum
          console.log(lineNum,txt)
          this.playingLyric = txt
          if(lineNum >5){
            let lineEl = this.$refs.lyricLine[lineNum - 5]
            this.$refs.lyricList.scrollToElement(lineEl,1000)
          }else{
            this.$refs.lyricList.scrollTo(0,0,1000)
          }
          }
          
        },
        changeTime(v){
          let t = this.currenSong.interval * v
          this.$refs.audio.currentTime = t
          this.lyric.seek(t)
        },
        ...mapMutations(['changeFullScreen','changePlaying','changeCurrentIndex','changePlayList']),
        ...mapActions(['clearPlayList','delSong'])
      },
      watch: {
        currenSong(newValue,oldValue){
          if(!newValue){
            return
            console.log(newValue.songmid)
          }
          if(newValue == oldValue){
            return
          }
          getKey(newValue.songmid).then(res =>{
            console.log(res.data)
            this.url = `http://ws.stream.qqmusic.qq.com/${res.data.items[0].filename}?fromtag=0&guid=126548448&vkey=${res.data.items[0].vkey}`
            this.$nextTick(() =>{
              var banner = new Swiper(".middle",{
                   pagination:{
                        el:'.dot-wrapper',
                        bulletClass:'dot',
                        bulletActiveClass:'active'
                        },
                        observer:true,
                        observeParents:true,
        })
              this.getLyricc()
              this.$refs.audio.play()
            })
            // console.log(this.url)
          })
        },
        //监听playing的状态来控制音乐的播放状态
        playing(v){
          this.$nextTick(() => {
            v?this.$refs.audio.play():this.$refs.audio.pause()
          })
        }
      },
}

</script>
<style lang="less" scoped>
@import "~@/common/less/variable.less";
@font-face {
  font-family: 'iconfont';  /* project id 1124321 */
  src: url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.eot');
  src: url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.woff2') format('woff2'),
  url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.woff') format('woff'),
  url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_1124321_l6fddmdoiz.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .player {
    .normal-player{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom:0;
      z-index:150;

      background: @color-background;
      .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px); 
      }

      .top {
        position: relative;
        margin-bottom: 25px;

        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;

          .icon-back {
            display: block;
            padding: 9px;
            font-size: @font-size-large-x;
            color: @color-theme;
            transform: rotate(-90deg);
          }
        }

        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          font-size: @font-size-large;
          color: @color-text;
        }

        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-text;
        }
      }

      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;

        .middle-l {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;

          .cd-wrapper {
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;

            .cd {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;

              &.play {
                animation: rotate 20s linear infinite; 
              }

              &.pause {
                animation-play-state: paused;
              }

              .image {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }

          .playing-lyric-wrapper {
            width: 80%;
            margin: 30px auto 0 auto;
            overflow: hidden;
            text-align: center;

            .playing-lyric {
              height: 20px;
              line-height: 20px;
              font-size: @font-size-medium;
             color: @color-text-l;
            }
          }
        }

        .middle-r {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;

          .lyric-wrapper {
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;

            .text {
              line-height: 32px;
              color: @color-text-l;
              font-size: @font-size-medium;

              &.current {
                color: @color-text;
              }
            }
          }
        }
      }

      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;

        .dot-wrapper {
          text-align: center;
          font-size: 0;

          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
 
            &.active {
              width: 20px;
              border-radius: 5px;
              background: @color-text-ll;
            }
          }
        }

        .progress-wrapper {
          display: flex; 
          align-items: center;
          width: 80%;
          margin: 0px auto;
          padding: 10px 0;

          .time {
            color: @color-text;
            font-size: @font-size-small;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;

            &.time-l {
              text-align: left;
            }

            &.time-r {
              text-align: right;
            }
          }

          .progress-bar-wrapper {
            flex: 1;
          }
        }

        .operators {
          display: flex;
          align-items: center;

          .icon {
            flex: 1;
            color: @color-theme;
            &.disable {
            color: @color-theme-d;
            }
            i {
              font-size: 30px;
            }
          }

          .i-left {
            text-align: right;
          }

          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
          font-size: 40px;
        }
          }

          .i-right {
            text-align: left;
          }

          .icon-favorite {
            color: @color-sub-theme;

            &.normal-enter-active,
          &.normal-leave-active {
            transition: all 0.4s;
          }
          }

        }

      }

      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);

        &.normal-enter,
        &.normal-leave-to {
          opacity: 0;
          .top {transform: translate3d(0, -100px, 0)};
          .bottom {transform: translate3d(0, 100px, 0)};
        }
      }

    }

    .mini-player {
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 180;
      width: 100%;
      height: 60px;

      background: @color-highlight-background;
      &.mini-enter-active,
      &.mini-leave-active {
        transition: all 0.4s;
      }

      &.mini-enter,
      &.mini-leave-to {
        opacity: 0;
      }

      .icon {
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 10px;

        img {
          border-radius: 50%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;

        .name {
          margin-bottom: 2px;

          font-size: @font-size-medium;
            color: @color-text;
        }

        .desc {
       
          font-size: @font-size-small;
            color: @color-text-d;
        }
      }

      .control {
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;

        .icon-play-mini,
        .icon-pause-mini,
        .icon-playlist {
          font-size: 30px;
          color: @color-theme-d;
        }

        .icon-mini {
          font-size: 32px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
    .play-list{
      position: fixed;
      // overflow: hidden;
      width: 100%;
      height: 386px;
      border-radius: 16px 16px 0 0;
      background: #333;
      bottom: 60px;
      .list-tab{
        height: 30px;
        width: 100%;
        margin-top:10px;
        border-bottom: 1px solid #6666;
        .shoucang{
          padding-left: 14px;
          padding-right: 10px;
        }
        .icon33{
          padding-left: 300px;
        }
      }
      .list-content{
        top: 30px;
        height: 100%;
        overflow: hidden;
        .list-song{
          // position: absolute;
          display: flex;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #777;
          .list-songname{
            box-sizing: border-box;
            padding-left: 8px;
            width: 100%;
          }
          .list-del{
            padding-right: 14px;
          }
        }
      }
    }
  }
    &.play {
      animation: rotate 10s linear infinite;
    }

    &.pause {
      animation-play-state: paused;
    }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
