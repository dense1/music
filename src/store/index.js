import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    //状态
    state:{
        //播放状态 Boolean
        playing:false,
        //播放是否全屏 Boolean
        fullScreen:false,
        //播放列表Array
        playList:[],
        //当前播放歌曲在在播放列表的索引
        currentIndex:-2,
        //播放模式 顺序0 随机1 单曲循环2
        mode:0
    },
    //过滤和计算状态
    getters:{
        playing:state => state.playing,
        fullScreen:state => state.fullScreen,
        playList:state => state.playList,
        currentIndex:state => state.currentIndex,
        mode:state => state.mode,
        //当前播放的歌曲
        currenSong:state =>{
            return state.playList[state.currentIndex]
        }
    },
    //改变状态
    mutations:{
        //改变播放状态
        changePlaying(state,playing){
            state.playing = playing
        },
        //改变播放是否全屏
        changeFullScreen(state,fullScreen){
            state.fullScreen = fullScreen
        },
        //改变播放列表Array
        changePlayList(state,playList){
            //[...playList]深复制
            state.playList = [...playList]
        },
        //改变播放歌曲在在播放列表的索引
        changeCurrentIndex(state,currentIndex){
            state.currentIndex = currentIndex
        },
        //改变播放模式
        changeMode(state,mode){
            state.mode = mode
        },
    },
    //action 类似于mutations 而不是直接改变状态 异步改变
    actions:{
        //添加歌曲
        // 1、改变播放状态--播放
        // 2、设置为全屏
        // 3、添加播放列表
        // 4、指定播放哪一首
        // 添加歌曲
        addPlayer({commit},{list,index}){
            commit('changePlaying',true)
            commit('changeFullScreen',true)
            commit('changePlayList',list)
            commit('changeCurrentIndex',index)
        },
        //删除歌曲
        delSong({commit},song){
            let index = 0
            let playList = state.playList
            for(let a=0;a<playList.length;a++){
                if(playList[a].id=song.id){
                    index = a
                }
            }
            playList.splice(index,1)
            if(state.currentIndex == playList.length){
                currentIndex --
            }
            commit('changePlaying',true)
            commit('changePlayList',playList)
            commit('changeCurrentIndex',currentIndex)
        },
        //清空播放列表
        clearPlayList({commit}){
            commit('changePlaying',false)
            commit('changePlayList',[])
            commit('changeCurrentIndex',-1)
        }
    }
})