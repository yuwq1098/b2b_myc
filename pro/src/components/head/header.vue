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

                        
                        <city-choose 
                            v-show="isCityChooseShow" 
                            :isShow="isCityChooseShow"
                            @setCityChooseShow="setCityChooseShow"
                            >
                        </city-choose><!-- 城市选择 -->

		            </div><!-- 城市 -->

		            <div class="m-site-lk f__fr">
		                <ul class="m-lk-list">
		                    <li class="u-item login" v-if="!loginStatus">
		                        <a href="javascript:;" class="u-lk lg" @click="openSignIn(1)">hi,请登录</a>
		                        <span class="u-join">|</span>
		                        <a href="javascript:;" class="u-lk" @click="openSignUp(1)">免费注册</a>
		                    </li>
                            <li class="u-item member" v-if="loginStatus">
                                <div class="u-member-box">
                                   <el-dropdown menu-align="end">
                                        <span class="u-person el-dropdown-link">
                                            <img :src="memberInfo.imgUrl" class="u-pic" :alt="memberInfo.name"/>
                                            {{memberInfo.name}}
                                        </span>
                                        <el-dropdown-menu slot="dropdown" class="member-dropdown">
                                            <el-dropdown-item>
                                                <router-link :to="{path:'/member'}" class="u-lk" tag="a">会员中心</router-link>
                                            </el-dropdown-item>
                                            <el-dropdown-item>车行认证</el-dropdown-item>
                                            <el-dropdown-item>我的收藏</el-dropdown-item>
                                            <el-dropdown-item>个人设置</el-dropdown-item>
                                            <el-dropdown-item divided>
                                                <a href="javascript:;" @click="_signOut" class="u-lk">注销</a>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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
    // 城市选择组件
    import cityChoose from "components/citySel/citySel.vue"
    import {mapGetters,mapActions} from 'vuex'
    import {navItemList} from 'api/localJson/head.js'
    import {headMember} from 'base/class/member.js'
    
    export default {
    	name: 'c-header',
    	data () {
    		return {

                
    			signInShow: false,         //是否显示登录框
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

            //城市选择框开关
            setCityChooseShow(onOff) {    
                this.isCityChooseShow = onOff;
            },
            
            //获取/更新用户基本数据
            _updateUserData(){
                let data = {
                    a:'0'
                };
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

<!-- hender中用户下拉组件 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .member
        .u-member-box
            height 84px
            min-width 120px
            position relative
            .el-dropdown
                color #7A7F86
                margin-top 21px
                height 42px
                line-height 42px
                cursor pointer
                .u-person
                    _display(inline-block)
                    position relative
                    padding-left 40px
                    cursor @cursor
                    .u-pic
                        height 30px
                        width 30px
                        _borderAll(rgba(255,255,255,.42),2px)
                        _borderRadius()
                        _completeCenter(0,auto,2px)
                    .iconfont
                        height 24px
                        line-height 24px
                        width 24px
                        _completeCenter(0,auto,2px)
                        font-size 24px
                        color #65E693
    .member-dropdown
        margin 5px 0 0
        padding 4px 0
        _borderAll(#ededed)
        _borderRadius(1px)
        _boxShadow(12px,rgba(0,0,0,.25),5px,5px)
        .el-dropdown-menu__item
            width 140px
            font-size 13px
            line-height 40px
            color #959595
            padding 0 15px
            _spacingPlus()
            .u-lk
                _display()
                width 100%
                height 100%
            &:hover
                background #E8F1F7
                color $c_blue
                .u-lk
                    color $c_blue
        .el-dropdown-menu__item--divided
            margin-top 4px
            _border(top,#e2e2e2)
            &:before
                height 4px
                margin 0 -15px

</style>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'header.styl'
</style>