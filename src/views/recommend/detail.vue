<template>
      <songs-list :title="title" :bgimg="bgImg" :list="songList"></songs-list>
</template>

<script>
import SongsList from '@/components/songsList'
import {getCdInfo} from '@/api'
export default {
    data() {
        return {
            songList:[],
            title:"",
            bgImg:""
        }
    },
    created() {
        this.getCdInfoList()
    },
    methods: {
        getCdInfoList(){
           getCdInfo().then(res =>{
               console.log(res.data)
               if(res){
                   this.title = res.data.cdlist[0].dissname
                   this.bgImg = res.data.cdlist[0].logo
                //    console.log(res.data.cdlist[0].logo)
                   this.songList = this.editSongs(res.data.cdlist[0].songlist)
                //    https://y.gtimg.cn/music/photo_new/T002R150x150M0000010UePb4dyfoi.jpg?max_age=2592000
                // 0045TaOz0D7Irr
               }
           })
        },
        //对数据(songList)进行处理
        editSongs(list){
            console.log(list)
            let nlist = [];
            for(var i=0;i<list.length;i++){
            // var key = ""
                let item = {
                    //歌曲id
                    id:list[i].songid,
                    //歌曲名
                    name:list[i].songname,
                    //歌手名(数组)
                    singer:list[i].singer,
                    //专辑名
                    album:list[i].albumname,
                    // 专辑图片
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                    //歌曲时长
                    interval:list[i].interval,
                    songmid:list[i].songmid
                    //http://isure.stream.qqmusic.qq.com/C400001ICKOc3U0Lbs.m4a?guid=1432606436&vkey=10F0BDBFAB91769D1418C64C1F630365D102FFD98D089B840AE464E753922361437E25DE39B8006083D92741D491C73A79652ADC2FDDFC6B&uin=0&fromtag=66
                    // 001ICKOc3U0Lbs
                    // 106584827
                }
                // nlist.push(item)
            // getkey(list[i].songmid).then(res => {
            //     item.url = `http://isure.stream.qqmusic.qq.com/C400${res.data.item[0].songmid}.m4a?guid=1432606436&vkey=${res.data.item[0].vkey}&uin=0&fromtag=66`
            //     // key = res.data.items[0].vkey
            // })
                nlist.push(item)
            }
            console.log(nlist)
            return nlist
        }
    },
    components:{
        SongsList
    }
}
</script>

<style lang="less" scoped>
// .slide-enter,.slide-leave-to{
//     transform: translate3d(100%,0,0)
// }
// .slide-enter-active,.slide-leave-active{
//     transition: all 1s
// }
// .silde-leave-to{}
// .silde-leave-active{}
</style>

