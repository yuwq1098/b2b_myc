<!--  
 **  @description 会员中心 - 侧边栏导航
 --> 

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
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // vuex状态管理
    import { mapGetters } from 'vuex'
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
                memberInfo: new sidebarMember({}),
                memberMenu: sidebarMenu,
            }
        },
        // 生命周期被创建时
        created() {

        },
        // 切换回本组件时
        activated() {
            // 获取用户信息
            this.getMemberInfo();
        },
        //退出的生命周期钩子
        deactivated(){
            
        },
        // 属性计算
        computed:{
            ...mapGetters(['userData','loginStatus']),
        },
        //数据侦听
        watch:{
            // vuex的用户数据变化
            userData(val){
                // 如果是登录的状态才重新拉取用户信息
                if(this.loginStatus){
                    this.getMemberInfo();
                }
            },
        },
        // 自定义函数(方法)
        methods: {
            // 格式化用户信息
            _normalizeMember(data) {
                return new sidebarMember(data);
            },
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 格式化用户信息
                        this.memberInfo = this._normalizeMember(res.data);
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
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'sidebar.styl'
</style>
