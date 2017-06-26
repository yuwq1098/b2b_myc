<template>
    <div v-if="isShowLoading">
        <div class="m-load-mask"></div><!-- 遮罩层 -->
        <div class="m-loading">
            <img width="24" height="24" src="./loading.gif">
            <p class="desc">{{title}}</p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        props: {
            title: {
                type: String,
                default: '正在载入...'
            }
        },
        computed: {
            ...mapState([
                'isShowLoading',
            ]),
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-load-mask
        height 100%
        width 100%
        position fixed
        top 0
        left 0
        background #282828
        _opacity(.6)
        z-index 1000001
    .m-loading
        width 180px
        height 180px
        position fixed
        background #282828
        _opacity(.9)
        top 0
        bottom 0
        left 0
        right 0
        margin auto
        text-align: center
        z-index 1000001
        .desc
            line-height: 20px
            font-size: 14px
            color: #545454
</style>
