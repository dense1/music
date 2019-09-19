<template>
      <rank-list :bgimg="bgImg" :ranklist="ranklist" :title="title"></rank-list>
</template>

<script>
import RankList from '@/components/rankList'
import {getRankInfo} from '@/api'
export default {
    data() {
        return {
            ranklist:[],
            bgImg:"",
            title:""
        }
    },
    components:{
        RankList
    },
    created() {
        this.getRankInfoData()
    },
    methods: {
        getRankInfoData(){
            let id = this.$route.params.id
            console.log(id)
            getRankInfo(id).then(res =>{
                console.log(res)
                this.bgImg = res.topinfo.pic
                this.ranklist = this.rankData(res.songlist)
                this.title = res.topinfo.ListName
                // this.songname = res.songlist[0].data.songname
                // console.log(res.topinfo.pic_v12)
            })
        },
            //对数据进行处理
            rankData(index){
                // console.log(index)
                let Nbc = []
                for(var a=0;a<index.length;a++){
                    for(var b=0;b<index[a].data.singer.length;b++){
                        var item = {
                            singername:index[a].data.singer[b].name,
                            songname:index[a].data.songname
                        }
                    }
                    Nbc.push(item)
                }
                return Nbc
            }
    },
}
</script>

<style lang="less" scoped>
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
.slide-enter-active,.slide-leave-active{
    transition: all 1s
}
// .silde-leave-to{}
// .silde-leave-active{}
</style>

