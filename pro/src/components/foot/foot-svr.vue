<template>
	<div class="foot-svr">
		<div class="m-site-svr">
            <div class="f__w1200">
                <ul class="u-svr-lst f__clearfix">
                    <li class="u-item" v-for="item in serverInfoList">
                        <i :class="item.icoClasName"></i>{{item.title}}
                    </li>
                </ul>
            </div>
        </div><!-- 网站服务保障 -->
	</div>
</template>

<script>

    export default {
    	name: 'foot-svr',
    	data () {
    		return {
    			serverInfoList:[
                    {
                        icoClasName: "i-ser-tk",
                        title: "14天可退"
                    },
                    {
                        icoClasName: "i-ser-yz",
                        title: "100%优质车源"
                    },
                    {
                        icoClasName: "i-ser-zj",
                        title: "资金托管安全放心"
                    },
                    {
                        icoClasName: "i-ser-bz",
                        title: "车质保障"
                    },
                    {
                        icoClasName: "i-ser-lc",
                        title: "一站式服务"
                    },
                ]
    		}
    	},
        mounted(){

        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
    @import '~assets/css/mixin.styl'
    .m-site-svr
        height 95px
        width 100%
        background #fff
        _border(top,#e2e2e2,2px)
        .u-svr-lst
            width 1150px
            margin-left 25px
            line-height 95px
            .u-item
                float left
                width 230px
                text-align center
                _spacingPlus(1px)
                font-size 14px
                i
                    font-size 17px
                    margin-right 28px
                    position relative
                    vertical-align: middle;
                    &::before
                        content ""
                        _display()
                        width 22px
                        height 22px
                        position absolute
                        top 0
                        left 0
                    &.i-ser-tk::before
                        background url(../../assets/img/i-ser-tk.png) 0 0 no-repeat
                        background-size 100% 100%
                    &.i-ser-yz::before
                        background url(../../assets/img/i-ser-yz.png) 0 0 no-repeat
                        background-size 100% 100%
                    &.i-ser-zj::before
                        background url(../../assets/img/i-ser-zj.png) 0 0 no-repeat
                        background-size 100% 100%
                    &.i-ser-bz::before
                        background url(../../assets/img/i-ser-bz.png) 0 0 no-repeat
                        background-size 100% 100%
                    &.i-ser-lc::before
                        background url(../../assets/img/i-ser-lc.png) 0 0 no-repeat
                        background-size 100% 100%

</style>