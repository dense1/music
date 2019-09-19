<template>
    <div class="load">
        <img src="./logo2.gif">
        <p v-text="text"></p>
    </div>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:"loading..."
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.load{
    width: 100%;
    text-align: center;
    margin-top: 60%;
    img{
        height: 70px;
        width: 70px;
    }
    p{
        line-height: 20px;
        font-size: @font-size-small;
        color: @color-text-l
    }
}
</style>
