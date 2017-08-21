<!--  
 **  @description 网站更多功能 - 帮助中心
 --> 

<template>
    <div class="help">
        <!-- <p class="">帮助中心</p> -->
        <div class="g-bd">
            <div class="f__w1200">

                <div class="m-help f__clearfix">
                    
                    <div class="m-aside-wrap f__fl">
                        <sidebar
                            sideTitle="帮助中心"
                            :sideMenu="sideMenu"
                            ></sidebar>
                    </div>
                    
                    <div class="m-mn f__fr">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div><!-- 主要内容 -->

                </div><!-- 帮助中心 -->

            </div><!-- 1200px布局 -->
        </div>
    </div>
</template>

<script>
    
    // 更多网站功能的本地数据
    import {helpMenu} from "api/localJson/more.js"
    // 侧边栏
    import sidebar from "page/more/common/aside/index.vue"

    export default {
        name: "help",
        // 在当前模块注册组件
        components:{
            sidebar,
        },
        // 数据
        data() {
            return{
                sideMenu: helpMenu,
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
