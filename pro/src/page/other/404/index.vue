<template>
    <div class="page404">
        <div class="g-doc">
            <div class="g-bd">
                <div class="f__w1200">
                    <div class="m-404-wrap">
                        <div class="m-bg-box">
                            
                        </div><!-- 图片背景区 -->
                        <div class="m-tips-box">
                            <div class="u-hd"
                                >哎呀亲...您访问的页面找不到了！
                            </div><!-- 标题 -->
                            <p class="u-desc"
                                ><em class="vital">{{secondLast}}s</em>后自动跳转至上一页面，如果没有跳转，请点击下方链接
                            </p><!-- 描述 -->
                        </div><!-- 文本提示区 -->

                        <div class="m-btn-box">
                            <router-link class="u-btn home"
                                :to="{path:'/'}"
                                >
                                <i class="iconfont home"></i>
                                <span class="u-txt">前往首页</span>
                            </router-link>
                            <a href="javascript:;" class="u-btn"
                                @click="goBack()"
                                >
                                <i class="iconfont back"></i>
                                <span class="u-txt">返回上一页</span>
                            </a>    
                        </div><!-- 按钮提示区 -->

                    </div><!-- 404页面容器 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'


    export default {
        name: "page404",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                // 秒针倒计时
                secondLast: 5,
                // 定时器
                myInterval: null,
                // 倒计时器
                myTimeOut: null,
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 自动跳转
            this.autoGoto();
        },
        //退出的生命周期钩子
        deactivated(){
            clearInterval(this.myInterval);
            this.myInterval = null;
            clearInterval(this.myTimeOut);
            this.myTimeOut = null;
            this.$destroy();
        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 返回上一页
            goBack(){
                // 中间层遇到阻塞，所以需要返回两层
                this.$router.go(-2);
            },
            // 倒计时自动跳转
            autoGoto(){
                this.myInterval = setInterval(()=>{
                    this.secondLast--;
                    if(this.secondLast==1){
                        this.myTimeOut = setTimeout(()=>{
                            this.$router.go(-2);
                        },800);
                    }
                },1000);
            }
        },
        
    }
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
