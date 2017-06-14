<template>
	<div class="c-header">
		<div class="g-hd">
		    <div class="m-hd">
		        <div class="f__w1200 f__clearfix">
		            <div class="m-logo f__fl">
		                <a href="javascript:;" class="u-lk">
		                    <img src="../../assets/img/logo.png" alt="logo" />
		                </a>
		            </div><!-- 网站LOGO -->

		            <div class="m-city f__fl" id="f__city_choose">
		                <a href="javascript:;" id="city_cur" class="u-lk" ref="city_cur" :class="{on:isCityChooseShow}">{{curCityName}}<i class="iconfont icon-arrowdown1"></i></a>
                        <!-- <city-choose></city-choose> -->
                        <city-choose v-show="isCityChooseShow" @setCityChooseShow="setCityChooseShow"></city-choose>
                        <!-- 城市选择 -->
		            </div><!-- 城市 -->

		            <div class="m-site-lk f__fr">
		                <ul class="m-lk-list">
		                    <li class="u-item login">
		                        <a href="javascript:;" class="u-lk lg" @click="openSignIn(1)"><i class="i-user-lgn"></i>登录</a>
		                        <span>/</span>
		                        <a href="javascript:;" class="u-lk" @click="openSignUp(1)">注册</a>
		                    </li>
		                    <li class="u-item" v-for="item in navItemList">
		                        <router-link :to="item.path" class="u-lk">{{item.pathName}}</router-link>
		                    </li>
		                </ul>
		            </div><!-- 站点链接 -->
		        </div><!-- 1200px布局 -->
		        
		    </div>
		</div><!-- 头部 -->

        <sign-in 
            v-show="signInShow" 
            @closeSignIn="openSignIn(0)" 
            @openSignUp="openSignUp(1,true)" 
            @openForget="openForgetPwd(1)"
            >
        </sign-in><!-- 登录框 -->

        <sign-up 
            v-show="signUpShow" 
            @closeSignUp="openSignUp(0)" 
            @openSignIn="openSignIn(1,true)"
            @openForget="openForgetPwd(1)"
            >
        </sign-up><!-- 注册框 -->
        
        <forget-pwd 
            v-show="forgetShow" 
            @closeForgetPwd="openForgetPwd(0)"
            >
        </forget-pwd><!-- 注册框 -->

	</div>
</template>

<script>

    import $ from 'jquery'
    import {getLeftToBrowser,addEvent,removeEvent} from "assets/js/dom.js"
    import signIn from "components/sign/signin"
    import signUp from "components/sign/signup"
    import forgetPwd from "components/sign/forget_pwd"
    import cityChoose from "components/citySel/citySel.vue"
    import {mapGetters} from 'vuex'
    
    export default {
    	name: 'c-header',
    	data () {
    		return {
    			signInShow: false,
    			signUpShow: false,
    			forgetShow: false,
                cityChooseLeft: '',
                isCityChooseShow: false,
                navItemList: [
                    { 
                        pathName: "首页",
                        path: "/home"
                    },{
                        pathName: "二手车b2b大厅",
                        path: "/buyCar"
                    },{
                        pathName: "我要卖车",
                        path: "/sellCar"
                    },{
                        pathName: "服务保障",
                        path: "/assurance"
                    },{
                        pathName: "下载APP",
                        path: "/download"
                    }
                ],
    		}
    	},
        created () {
            //reverse 方法颠倒数组中元素的位置，并返回该数组的引用。
            this.navItemList.reverse();
        },
        mounted(){
            //获取浏览器的左值
            this._getCityChooseLeft();
            //侦听浏览器窗口大小变化
            // removeEvent(window,'resize',this._getCityChooseLeft)
            // addEvent(window,'resize',this._getCityChooseLeft)
            // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
            this.$nextTick(function(){
                var cityChooseDom = $("#f__city_choose");
                var currentCity = $("#city_cur");
                let me = this;
                currentCity.on("mouseover",function(){
                    me.isCityChooseShow = true;
                });
                cityChooseDom.on("mouseleave",function(){
                    me.isCityChooseShow = false;
                });
                // window.console.log("获取本地存储的数据",localStorage.getItem('currentCity')||null);

            });

        },
        //退出组件
        activated() {

        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        //属性值计算
        computed:{
            ...mapGetters({
                curCityName: 'currentCityName'
            }),
        },
        //数据侦听
        watch:{
            curCityName(val) {
                // 数据发生变化
                console.log("城市数据更新了",val);
                // 关闭盒子

                // this.userIcons = val;
            }
        },
        methods:{
        	//打开/关闭登录框
        	openSignIn(type,closeThat=false){
        		//关闭忘记密码的输入框
        		this.forgetShow = false
        		if(type==1){
        		    this.signInShow = true
        		    if(closeThat){
        		    	this.signUpShow = false
        		    }
        		}else if(type==0){
        			this.signInShow = false
        		}
        	},

        	//打开/关闭注册框
        	openSignUp(type,closeThat=false){
        		//关闭忘记密码的输入框
        		this.forgetShow = false
        		if(type==1){
                    this.signUpShow = true
                    if(closeThat){
        		    	this.signInShow = false
        		    }
        		}else if(type==0){
                    this.signUpShow = false
        		}
                
        	},
            
            //打开/关闭 忘记密码/找回密码框
        	openForgetPwd(type){
        		//登录注册框都关闭
        		this.signInShow = false
        		this.signUpShow = false
                if(type==1){
                    this.forgetShow = true
        		}else if(type==0){
                    this.forgetShow = false
        		}
        	},

            //获取城市选择盒子left值
            _getCityChooseLeft(){
                let cityCurrentDom = document.getElementById("city_cur");
                //传入dom查询其相对于浏览器的left值
                let curCiBoxLeft = getLeftToBrowser(cityCurrentDom);
                // console.log(curCiBoxLeft);
                this.cityChooseLeft = curCiBoxLeft - 40 + "px";
            },

            //城市选择框开关
            setCityChooseShow(onOff) {    
                this.isCityChooseShow = onOff;
            }

        },
        components:{
            signIn,
            signUp,
            forgetPwd,
            cityChoose,
        },
    }
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './header.styl'
</style>