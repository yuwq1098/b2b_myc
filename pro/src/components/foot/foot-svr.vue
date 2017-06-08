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
    @import './svr.styl'
</style>