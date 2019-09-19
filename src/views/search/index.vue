<template>
    <div class="search">
        <!-- <h1>这是搜索的页面</h1> -->
            <i class="icon-search"></i>
        <input type="search" placeholder="输入歌曲、歌手">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.search{
    background: #333;
    display: flex;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    input{
        position: relative;
        height: 100%;
        width: 100%;
        background: #333;
        border-radius: 6px;
        // display: none;
    }
}
</style>

