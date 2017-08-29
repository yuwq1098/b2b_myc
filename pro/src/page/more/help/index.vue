<!--  
 **  @description 网站更多功能 - 帮助中心
 --> 

<template>
    <div class="help">
        <!-- <p class="">帮助中心</p> -->
        <div class="g-bd">
            <div class="f__w1200">
                
                <gk-bread-crumb
                    :crumbItems="crumbItems"
                    ></gk-bread-crumb><!-- 面包屑组件 -->

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
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    export default {
        name: "help",
        // 在当前模块注册组件
        components:{
            sidebar,
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{
                sideMenu: helpMenu,
                // 面包屑列表信息
                crumbItems: [],
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            // 获取面包屑数据
            this.getCrumbData();
        },
        //退出的生命周期钩子
        deactivated(){
            // 实例销毁
            this.$destroy();  
        },
        // 数据侦听
        watch:{
            // 侦听路由变化
            $route (to, from) {
                // 判断前往的路径中是否存在helpCenter
                // var reg = new RegExp("\\helpCenter/\\\w+",'g');
                var reg = /\helpCenter\/\w+/g;

                if(to.path.match(reg)){
                    // 获取面包屑数据
                    var newPath = this.$route.path.substr(1,to.path.length-1);
                    var cutStr = newPath.replace(/.*\//g,"");
                    this.crumbItems = crumbsInfo[cutStr];
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            
            // 获取面包屑数据
            getCrumbData(){
                var newPath = this.$route.path;
                var cutStr = newPath.replace(/.*\//g,"");
                this.crumbItems = crumbsInfo[cutStr];
            },

        },
        
    }

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
