<template>
	<div class="webSidebar">
	    <div class="m-sidebar-wrap">
            <div class="m-expand-bg"></div><!-- 防抖动背景 -->
            <div class="m-sidebar-con">
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-member slide">
                        <template v-if="loginStatus">
                            <router-link class="u-lk"
                                :to="{path:'/member/home'}"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-huiyuanguanli1"></i>
                                </div>
                                <span class="u-txt">会员中心</span>
                            </router-link>
                        </template>
                        <template v-else="!loginStatus">
                            <a class="u-lk"
                                @click="openSignIn()"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-huiyuanguanli1"></i>
                                </div>
                                <span class="u-txt">请先登录</span>
                            </a>
                        </template>
                    </li><!-- 会员中心 -->

                    <li class="u-side-item u-shopCart">
                        <router-link class="u-lk"
                            :to="{path:'/shoppingCart'}"
                            >
                            <div class="icon">
                                <i class="iconfont icon-gouwuche8"></i>
                            </div>
                            <p class="tit">购物车</p>
                            <span class="data"
                                :class="{'v3':myShopingNumber>99}"
                                >{{myShopingNumber}}</span>
                        </router-link>
                    </li><!-- 购物车 -->

                    <li class="u-side-item u-collect slide">
                        <template v-if="loginStatus">
                            <router-link class="u-lk"
                                :to="{path:'/member/collectCar'}"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-shoucang5"></i>
                                </div>
                                <span class="u-txt">车辆收藏</span>
                            </router-link>
                        </template>
                        <template v-else="!loginStatus">
                            <a class="u-lk"
                                @click="noLoginTips()"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-shoucang5"></i>
                                </div>
                                <span class="u-txt">车辆收藏</span>
                            </a>
                        </template>

                    </li><!-- 收藏 -->

                    <li class="u-side-item u-wallet slide">
                        <template v-if="loginStatus">
                            <router-link class="u-lk"
                                :to="{path:'/member/wallet'}"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-qianbao2"></i>
                                </div>
                                <span class="u-txt">我的钱包</span>
                            </router-link>
                        </template>
                        <template v-else="!loginStatus">
                            <a class="u-lk"
                                @click="noLoginTips()"
                                >
                                <div class="icon">
                                    <i class="iconfont icon-qianbao2"></i>
                                </div>
                                <span class="u-txt">我的钱包</span>
                            </a>
                        </template>
                    </li><!-- 钱包 -->

                    <li class="u-side-item u-tencent" 
                        ref="uTencent"
                        >
                        <a class="u-lk" 
                            @click="showQQ(2)"    
                            >
                            <div class="icon">
                                <i class="iconfont icon-qq9"></i>
                            </div>
                            <span class="u-txt">QQ在线咨询</span>
                        </a>
                    </li><!-- QQ在线咨询 -->

                    <div class="service-box" ref="serviceBox">
                        <div class="box-inner">
                            <a class="u-close" title="点击关闭"
                                @click.stop="showQQ(1)"
                                ></a>
                            <div class="qq-box">
                                <a target="_blank" class="u-box" href="http://wpa.qq.com/msgrd?v=3&uin=2166659470&site=qq&menu=yes">
                                    <div class="qq-icon">
                                        <img :src="qqIcon_IMG" alt="QQ在线咨询" />
                                    </div><!-- qq的ICON -->
                                    <div class="u-tit">QQ在线咨询</div>
                                </a>
                            </div><!-- qq -->
                            <div class="other-box">
                                <div class="u-group">
                                    <div class="tit">客服热线</div>
                                    <p class="desc">400-900-9936</p>
                                </div>
                            </div><!-- 其他内容 -->
                        </div>
                    </div><!-- QQ在线咨询 -->

                </ul>
            </div><!-- 真实的导航条内容 -->
            <div class="m-sidebar-other">
                <div class="ewm-box" ref="ewmBox">
                    <div class="box-inner">
                        <div class="u-pic">
                            <img :src="ewmWX_IMG" alt="木有车官方微信公众号" />
                        </div><!-- 图片 -->
                        <div class="u-con">
                            <div class="tit">木有车官方公众号</div>
                            <div class="desc">使用微信扫描二维码关注我们，掌握最新车源资讯</div>
                        </div><!-- 内容 -->
                    </div>
                </div><!-- 微信公众号二维码框 -->
                <ul class="u-side-lst f__clearfix">
                    <li class="u-side-item u-ewm">
                        <a href="javascript:;" class="u-lk"
                            @mouseover="showEWM(0)"
                            @mouseleave="showEWM(1)"
                            >
                            <div class="icon">
                                <i class="iconfont icon-erweima3"></i>
                            </div>
                        </a>
                    </li><!-- 二维码 -->
                    <li class="u-side-item u-backTop slide" ref="js__gotop">
                        <a class="u-lk" id="js__gotop" 
                            @click="goTop()"
                            >
                            <div class="icon">
                                <i class="iconfont icon-fanhuidingbu"></i>
                            </div>
                            <span class="u-txt">返回顶部</span>
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
    import {mapGetters,mapActions} from 'vuex'
    
    // 网页头部
    import cHead from "components/head/header.vue"
    
    // 非父子组件通信--中央事件总线：
    import {app} from "@/main.js"

	export default {
        name: "webSidebar",
        // 在当前模块注册组件
        components:{
            cHead,
        },
        // 数据
        data() {
            return{
                ewmWX_IMG: require("assets/img/myc_ewm_wechat.jpg"),
                qqIcon_IMG: require("assets/img/img-qq.png"),
                // 返回顶部的定时器
                timer: null,
                // 返回顶部的方法是否已结束
                tf: true,
                
                // 购物车数量
                myShopingNumber: 0,
            }
        },
        created () {
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
        mounted(){

        },
        // keep-alive之后页面会缓存，不会执行created(),和mounted(),但是会执行activated()
        activated() {
            
        },
        // keep-alive时使用，退出的生命周期钩子
        deactivated(){

        },
        // 实例销毁之前调用
        beforeDestroy(){

        },
        // 实例销毁之后
        destroyed(){
            // 实例销毁之后
            window.onscroll = null;
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
            // 侦听路由变化
            $route (to, from) {
                // 如果路由地址发生了变化
                if(to.path!=from.path){
                    // 销毁实例
                    window.onscroll = null;
                    this.init();
                }
            }
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['changeSignInBox']),
            // 获取购物车数量
            getShoppingNumber(){
                api.getMyShoppingCartNumber().then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.myShopingNumber = res.count;
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
                if(document.body.scrollTop>=0){
                    document.documentElement.scrollTop=document.body.scrollTop = 0;
                    this.gotop.style.display="none";
                }
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
            
            // 显示QQ
            showQQ(type){

                let uTencent = this.$refs.uTencent;
                let serviceBox = this.$refs.serviceBox;
                
                if(type===2){
                    geekDom.toggleClass(uTencent,"on");
                    geekDom.toggleClass(serviceBox,"active");
                }else if(type===1){
                    geekDom.removeClass(uTencent,"on");
                    geekDom.removeClass(serviceBox,"active");
                }

                let me = this;
                if(geekDom.hasClass(uTencent,"on")){
                    geekDom.cancelBubbleTwo(uTencent,serviceBox,function(){
                        me.showQQ(1);
                    });
                }else{
                    document.onclick = null;
                }
                
            },

            // 显示二维码
            showEWM(type){

                let ewmBox = this.$refs.ewmBox;
                if(type===0){
                    geekDom.addClass(ewmBox,"active");                    
                }else{
                    geekDom.removeClass(ewmBox,"active");
                }
                
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
            },

            // 打开登录框
            openSignIn(){

                // 新方式实现打开登录框
                app.$emit('openSignInBox_new') //中转站bus 触发openSignInBox_new

                // 打开头部组件中的登录框
                // this.changeSignInBox(true);
            },
            
            // 未登录提示
            noLoginTips(){
                this.$notify({
                    title: '您尚未登录',
                    message: "请先登录，登录后可进行相关操作",
                    type: 'error',
                    duration: 2000,
                });
            }
            
        },
        
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
