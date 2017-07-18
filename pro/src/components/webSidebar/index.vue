<template>
	<div class="webSidebar">
	    <div class="m-sidebar-wrap">
            <div class="m-expand-bg"></div><!-- 防抖动背景 -->
            <div class="m-sidebar-con">
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-member">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-huiyuanguanli1"></i>
                            </div>
                        </a>
                    </li><!-- 会员中心 -->
                    <li class="u-side-item u-shopCart">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-gouwuche8"></i>
                            </div>
                            <p class="tit">购物车</p>
                            <span class="data"
                                :class="{'v3':myShopingNumber>99}"
                                >{{myShopingNumber}}</span>
                        </a>
                    </li><!-- 购物车 -->
                    <li class="u-side-item u-collect">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-shoucang5"></i>
                            </div>
                        </a>
                    </li><!-- 收藏 -->
                    <li class="u-side-item u-wallet">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-qianbao2"></i>
                            </div>
                        </a>
                    </li><!-- 钱包 -->
                </ul>
            </div><!-- 真实的导航条内容 -->
            <div class="m-sidebar-other">
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-ewm">
                        <a href="javascript:;" class="u-lk">
                            <div class="icon">
                                <i class="iconfont icon-erweima3"></i>
                            </div>
                        </a>
                    </li><!-- 二维码 -->
                    <li class="u-side-item u-backTop" ref="js__gotop">
                        <a href="javascript:;" class="u-lk" id="js__gotop" 
                            @click="goTop()"
                            >
                            <div class="icon">
                                <i class="iconfont icon-fanhuidingbu"></i>
                            </div>
                        </a>
                    </li><!-- 返回顶部 -->
                </ul>
            </div><!-- 其他内容 -->
        </div>
	</div>
</template>

<script>
    
    // 获取数据的api
    import api from "api/getData.js"
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作类
    import * as geekDom from "assets/js/dom.js"
    // vuex状态管理
    import { mapGetters } from 'vuex'

	export default {
        name: "webSidebar",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                // 返回顶部的定时器
                timer: null,
                // 返回顶部的方法是否已结束
                tf: true,
                
                // 购物车数量
                myShopingNumber: 0,
            }
        },
        created () {

        },
        mounted(){
            
        },
        //keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {
            
            setTimeout(()=>{
                if(this.loginStatus){
                    // 获取购物车数量
                    this.getShoppingNumber();
                }else{
                    this.myShopingNumber = 0;
                }
                // 页面初始化
                this.init();
            },20);

        },
        //退出的生命周期钩子
        deactivated(){

        },
        computed:{
            ...mapGetters(['loginStatus','shopingCartNumber']),
        },
        // 数据侦听
        watch:{
            // 侦听购物车数量的变化
            shopingCartNumber(val){
                this.myShopingNumber = val;
            },
            // 侦听登录状态
            loginStatus(val){
                if(val){
                    // 获取购物车数量
                    this.getShoppingNumber();
                }else{
                    this.myShopingNumber = 0;
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            
            // 获取购物车数量
            getShoppingNumber(){
                api.getMyShoppingCartNumber().then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.myShopingNumber = res.data.length;
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })   
            },
            // 页面初始化
            init(){
                this.gotop = this.$refs.js__gotop;
                document.documentElement.scrollTop=document.body.scrollTop = 0;
                this.gotop.style.display="none";
                // 绑定该页面的滚动条事件
                window.onscroll = this.onScrollEvent;
            },
            // 滚动事件
            onScrollEvent(){
                //获取滚动条高度
                let ostop=geekDom.getScrollTop();
                let ch = geekDom.getClientHeight();
                
                //如果页面超过一屏高度按钮显示，否则隐藏
                if(ostop>=ch){
                    this.gotop.style.display="block";
                }else{
                    this.gotop.style.display="none";
                }
                // 如果滚动方法执行结束，那么就清除定时器
                if(!this.tf){
                    clearInterval(this.timer);             
                }
                this.tf = false;
            },
            // 返回顶部
            goTop(){
                //创建定时器
                this.timer = setInterval(() => {
                    //获取滚动条高度
                    let ostop=geekDom.getScrollTop();
                    //每次上升高度的20%
                    let speed;
                    if(ostop<10){
                        speed=Math.ceil(ostop/2);
                    }else if(ostop<=2){
                        speed=Math.floor(ostop);
                    }else{
                        speed=Math.ceil(ostop/5);
                    }
                    // 每次上升当前高度的80%
                    geekDom.setScrollTop(ostop-speed);
                    //如果滚动条高度为0，清除定时器
                    if(ostop<=0){
                        clearInterval(this.timer);
                    }
                    // 函数执行中 
                    this.tf = true;
                },20);         
            }
            
        },
        
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
