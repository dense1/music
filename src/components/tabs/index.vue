<template>
    <div class="tabs">
        <!-- <h2>我是导航的模块</h2> -->
        <router-link class="tab-item" to="recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link class="tab-item" to="singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link class="tab-item" to="rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link class="tab-item" to="search">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.tabs{
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: @font-size-medium;
    .tab-item{
        flex: 1;
        text-align: center;
        .tab-link{
        padding-bottom: 4px;
            color: @color-text-l ;
        }
        &.router-link-active{//&.router-link-active当前选中的元素
            .tab-link{
                color:@color-theme;
                border-bottom: 2px solid @color-theme;
            }
            
        }
    }
}
</style>
