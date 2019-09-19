import Vue from 'vue'
import Axios from 'axios'
// 获取推荐的接口
export function getRecommend(){
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg"
    const params = {
        g_tk:5318,
        uin:0,
        format:"jsonp",
        inCharset:"utf-8",
        outCharset:"utf-8",
        notice:0,
        platform:'h5',
        needNewCode:1,
        _:new Date().getTime()
    }
    const data = Object.assign(params,{jsonp:"jsonpCallback"})
    return Vue.http.jsonp(url,data).then((res) =>{
        return Promise.resolve(res.data)
    })
}
//获取歌手列表
export function getSingerList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=1000&pagenum=1&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0';
    const data = Object.assign({},{
        jsonp:'jsonpCallback'
    })
    
    return Vue.http.jsonp(url,data).then((res) => {
        return Promise.resolve(res.data)
    })
}
//获取排行榜
export function getRankList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    const params = {
        format: 'jsonp',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
    }
    const data = Object.assign(params,{
        jsonpCallback:'MusicJsonCallback',
        jsonp:"jsonpCallback"
    })
    return Vue.http.jsonp(url,data).then((res) => {
        return Promise.resolve(res.data)
    })
}
//获取排行榜详情
export function getRankInfo(id){
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()
    const url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&needNewCode=1&page=detail&type=top&tpl=3&topid=${id}`
    const data = Object.assign({},{
        jsonpCallback:"tan2",
        jsonp:"jsonpCallback"
    })
    return Vue.http.jsonp(url,data).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getRList(){
    let url = "http://musicapi.taihe.com/v1/restserver/ting?from=webapp_music&format=json&param=3439c2FrnrLpMcYisj59nw%3D%3D&timestamp=1553522022&sign=eafb07f9cda49d7fd2b82c2c6bb37eaa&method=baidu.ting.recommend.getRecDiyList";
    return Vue.http.jsonp(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
//获取歌单详情（QQ音乐不能获取，模拟）
export function getCdInfo(){
    const url = "https://www.easy-mock.com/mock/5bc00da00b3a4e257d956bbc/songsList";
    return Vue.http.get(url).then(res => {
        return Promise.resolve(res.data)
    })
}
//获取token
export function getKey(songmid){
    let url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=${songmid}&filename=C400${songmid}.m4a&guid=126548448`
    return Vue.http.jsonp(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
//获取歌词
export function getLyric(id){
    let t = new Date().getTime()
    let url = `https://api.darlin.me/music/lyric/${id}/`
    let data = Object.assign({},{
        jsonp:'jsonp',
        jsonpCallback:"MusicJsonCallback",
    })
    return Vue.http.jsonp(url,data).then((res,reject) => {
        return Promise.resolve(res.data)
    })
}
//搜索歌曲
export function search(keyword,p,n){
    const url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=54453227511471822&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&g_tk=1695008182&loginUin=983915916&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&w=${keyword}&p=${p}&n=${n}`;
    const data = Object.assign({},{
        jsonp:'jsonpCallback',
        jsonpCallback:"MusicJsonCallback738146078219388",
    })
    return Vue.http.jsonp(url,data).then((res) => {
        return Promise.resolve(res.data)
    })
}
//https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=简单爱
//http://ws.stream.qqmusic.qq.com/C400003lghpv0jfFXG.m4a?fromtag=0&guid=126548448&vkey=D661E5DF19B8FEB2FBFC554276746AC608AE98B0F30595B3B3BAD5C1C89ECCDD7BE599E306F786621856D22D6BD6B96F5DD344CF3814DB71
// export function getRList(){
//     let url = "http://musicapi.taihe.com/v1/restserver/ting?from=webapp_music&format=json&param=3439c2FrnrLpMcYisj59nw%3D%3D&timestamp=1553522022&sign=eafb07f9cda49d7fd2b82c2c6bb37eaa&method=baidu.ting.recommend.getRecDiyList";
//     return Axios.get(url).then(res => {
//         return Promise.resolve(res.data)
//     })
// }
// http://musicapi.taihe.com/v1/restserver/ting?from=webapp_music&format=json&param=3439c2FrnrLpMcYisj59nw%3D%3D&timestamp=1553522022&sign=eafb07f9cda49d7fd2b82c2c6bb37eaa&method=baidu.ting.recommend.getRecDiyList