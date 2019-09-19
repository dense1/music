<template>
    <div class="singer">
        <!-- <h1>这是歌手的页面</h1> -->
        <singer-list :singers="singerList"></singer-list>
    </div>
</template>

<script>
import {getSingerList} from '@/api'
import SingerList from '@/components/singerList'
export default {
    data() {
        return {
            singerList:[]
        }
    },
    created() {
        this.geSList();
    },
    components:{
        SingerList
    },
methods: {
    geSList(){
        getSingerList().then(res =>{
            console.log(res)
            this.singerList = this.newsinger(res.data.list)
            // this.newsinger(res.data.list)
            // console.log(this.newsinger(res.data.list))
        })
    },
    newsinger(list){
        let nList = {
            hot:{
                title:"热门",
                list:[]
            }
        }
        //取前十条作为热门
        list.forEach((items,index)=>{
            if(index<10){
                nList.hot.list.push({
                    id:items.Fsinger_mid,
                    name:items.Fsinger_name,
                    img:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${items.Fsinger_mid}.jpg?max_age=2592000 `
                })
            }
            //通过首字母进行排序
            let key = items.Findex
            if(!nList[key]){
                nList[key] = {
                    title:key,
                    list:[]
                }
            }
            nList[key].list.push({
                id:items.Fsinger_mid,
                name:items.Fsinger_name,
                img:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${items.Fsinger_mid}.jpg?max_age=2592000 `
            })
        })
        //把对象排成有序的数组
        let hot = []
        let other = []
        for(let i in nList){
            if(nList[i].title.match(/[a-zA-Z]/)){
                other.push(nList[i])
            }else if(nList[i].title=="热门"){
                hot.push(nList[i])
            }
        }
        other.sort((a,b) =>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0)
        })
        return hot.concat(other)
        // console.log(hot.concat(other))
    // console.log(nList)
    }
},
}
</script>

<style lang="less" scoped>
.singer{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%
}
</style>

