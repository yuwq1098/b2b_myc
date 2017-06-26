<template>
    <div id="sidebar">
        <div class="m-sdb-box">
            <div class="m-hd">
                <div class="u-pic">
                    <img :src="memberInfo.imgUrl" :alt="memberInfo.name" />
                    <div class="u-auth">{{memberInfo.auth}}</div><!-- 身份 -->
                </div><!-- 头像 -->
                <div class="u-info">
                    <div class="u-name">{{memberInfo.name}}</div><!-- 用户名 -->
                    <div class="u-tel">{{memberInfo.tel}}</div><!-- 手机号 -->
                </div><!-- 用户信息 -->
            </div><!-- 头部信息 -->

            <div class="m-menu">
                <ul class="m-gp-lst">
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-huiyuan"></i>
                            <span class="gp-tit">个人中心</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">车行认证</li>
                        </ul>
                    </li>
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-asmkticon0126"></i>
                            <span class="gp-tit">我的订单</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">买车订单</li>
                            <li class="u-item">卖车订单</li>
                        </ul>
                    </li>
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-yuan"></i>
                            <span class="gp-tit">车源管理</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">我的车源</li>
                        </ul>
                    </li>
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-qianbao"></i>
                            <span class="gp-tit">我的钱包</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">现金账户</li>
                        </ul>
                    </li>
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-wodeshoucang"></i>
                            <span class="gp-tit">我的收藏</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">车辆收藏</li>
                            <li class="u-item">车行收藏</li>
                        </ul>
                    </li>
                    <li class="m-gp-item">
                        <div class="m-gp-hd">
                            <i class="iconfont icon-shezhi"></i>
                            <span class="gp-tit">账户设置</span>
                        </div>
                        <ul class="m-menu-lst">
                            <li class="u-item">完善个人资料</li>
                            <li class="u-item">安全中心</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    
    // vuex状态管理
    import {mapGetters,mapActions} from 'vuex'
    // 会员中心侧边栏用户信息构造类
    import {sidebarMember} from "base/class/member.js"

	export default {
        name: "sidebar",
        // 在当前模块注册组件
        components:{
            
        },

        // 数据
        data() {
            return{
                memberInfo:"",
            }
        },
        created() {

        },
        //切换会当前组件
        activated() {
            
        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        // 属性计算
        computed:{
            // vuex扩展运算
            ...mapGetters(['loginStatus','userData']),
        },
        //数据侦听
        watch:{
            //侦听vuex的userData数据变化
            userData(val){
                if(val){
                    this.memberInfo = new sidebarMember(val);
                }
            }
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['getUserData']),
            //获取/更新用户基本数据
            _updateUserData(){
                let data = {
                    a:'0'
                };
                this.getUserData(data);
            },
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'sidebar.styl'
</style>
