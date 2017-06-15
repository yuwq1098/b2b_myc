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

                        <city-choose v-show="isCityChooseShow" @setCityChooseShow="setCityChooseShow"></city-choose>
                        <!-- 城市选择 -->

		            </div><!-- 城市 -->

		            <div class="m-site-lk f__fr">
		                <ul class="m-lk-list">
		                    <li class="u-item login" v-if="!loginStatus">
		                        <a href="javascript:;" class="u-lk lg" @click="openSignIn(1)"><i class="i-user-lgn"></i>登录</a>
		                        <span>/</span>
		                        <a href="javascript:;" class="u-lk" @click="openSignUp(1)">注册</a>
		                    </li>
                            <li class="u-item member" v-if="loginStatus">
                                <div class="u-member-box">
                                    <router-link :to="{path:'/member'}" class="u-person"><img :src="memberInfo.imgUrl" :alt="memberInfo.name"/></router-link>
                                    <span class="u-name">{{memberInfo.name}}</span>
                                    <a href="javascript:;" @click="_signOut" class="u-lk">注销</a>
                                </div>
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
            v-if="signInShow" 
            @closeSignIn="openSignIn(0)" 
            @openSignUp="openSignUp(1,true)" 
            @openForget="openForgetPwd(1)"
            >
        </sign-in><!-- 登录框 -->

        <sign-up 
            v-if="signUpShow" 
            @closeSignUp="openSignUp(0)" 
            @openSignIn="openSignIn(1,true)"
            @openForget="openForgetPwd(1)"
            >
        </sign-up><!-- 注册框 -->
        
        <forget-pwd 
            v-if="forgetShow" 
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
    import {mapGetters,mapActions} from 'vuex'
    import {navItemList} from 'api/localJson/head.js'
    import {headMember} from 'base/class/member.js'
    
    export default {
    	name: 'c-header',
    	data () {
    		return {
                //是否显示登录框
    			signInShow: false,
    			signUpShow: false,         //是否显示注册框
    			forgetShow: false,         //是否显示忘记密码框
                cityChooseLeft: '',        //城市选择left
                isCityChooseShow: false,   //城市选择框是否显示
                memberInfo: {},            //用户信息
                navItemList: navItemList,  

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
                
                //获取用户信息
                if(this.loginStatus){
                    this._updateUserData();
                }

            });

        },
        //切换会当前组件
        activated() {
              
        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        //属性值计算
        computed:{
            ...mapGetters({
                loginStatus: 'loginStatus',
                curCityName: 'currentCityName',
                userData: 'userData',
            }),
        },
        //数据侦听
        watch:{
            curCityName(val) {
                // 数据发生变化
                console.log("城市数据更新了",val);
                // 关闭盒子
                // this.userIcons = val;
            },
            loginStatus(val){
                if(val){
                    this._updateUserData();
                }
            },
            //侦听vuex的userData数据变化
            userData(val){
                if(val){
                    this.memberInfo = new headMember(val);
                }
            }
        },
        methods:{
            ...mapActions(['getUserData','setSignOut']),
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
            },
            
            //获取/更新用户基本数据
            _updateUserData(){
                let data = {};
                this.getUserData(data);
            },
            
            //注销登录
            _signOut(){
                this.$notify({
                    title: '注销成功',
                    message: '注销成功，请重新登录',
                    type: 'success',
                    duration: 800,
                });
                this.$router.push({ path: '/'})
                //调用vuex的注销方法
                this.setSignOut();
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