<!--  
 **  @description 网站更多功能 - 关于我们
 --> 

<template>
	<div class="about">
	    <!-- <p class="">关于我们</p> -->
        <div class="g-bd">
            <div class="f__w1200">

                <div class="m-about f__clearfix">
                    
                    <div class="m-aside-wrap f__fl">
                        <sidebar
                            sideTitle="关于我们"
                            :sideMenu="sideMenu"
                            ></sidebar>
                    </div>
                    
                    <div class="m-mn f__fr">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div><!-- 主要内容 -->

                </div><!-- 关于我们 -->

            </div><!-- 1200px布局 -->
        </div>
	</div>
</template>

<script>
    
    // 更多网站功能的本地数据
    import {aboutMenu} from "api/localJson/more.js"
    // 侧边栏
    import sidebar from "page/more/common/aside/index.vue"

	export default {
        name: "about",
        // 在当前模块注册组件
        components:{
            sidebar,
        },
        // 数据
        data() {
            return{
                sideMenu: aboutMenu,
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        
	}

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
