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
                    <div class="u-tel">{{memberInfo.tel | telFormat}}</div><!-- 手机号 -->
                </div><!-- 用户信息 -->
            </div><!-- 头部信息 -->

            <div class="m-menu">
                <ul class="m-gp-lst">
                    <template v-for="group in memberMenu">
                        <li class="m-gp-item">
                            <div class="m-gp-hd">
                                <i class="iconfont"
                                    :class="[group.icon]"></i>
                                <span class="gp-tit">{{group.title}}</span>
                            </div>
                            <ul class="m-menu-lst">
                                <template v-for="item in group.children">
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk"
                                            v-if="!item.hash">{{item.title}}</a>
                                        <router-link class="u-lk"
                                            :to="item.hash"
                                            v-if="item.hash" tag="a">
                                            {{item.title}}
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </template>
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
    //本地的会员中心侧导航信息
    import {sidebarMenu} from "api/localJson/sidebar.js"

	export default {
        name: "sidebar",
        // 在当前模块注册组件
        components:{
            
        },

        // 数据
        data() {
            return{
                memberInfo:"",
                memberMenu: sidebarMenu,
            }
        },
        // 生命周期被创建时
        created() {

        },
        // 切换回本组件时
        activated() {
            this.memberInfo = new sidebarMember(this.userData);
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
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'sidebar.styl'
</style>
