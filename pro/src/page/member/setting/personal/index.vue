<template>
	<div class="personalSetting">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="个人资料设置"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-personal-wrap">
                        <div class="m-personal-box info" v-show="isInfoShow">
                            <div class="m-hd">
                                <a href="javascript:;" class="u-edit">
                                    <i class="iconfont icon-bianji1"></i>编辑
                                </a>
                                <div class="m-face">
                                    <img :src="memberData.imgUrl" />
                                </div><!--用户头像展示 -->
                            </div>
                            <div class="m-info">
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">昵称：</span>
                                    <div class="u-data">
                                        <span class="data">{{memberData.name}}</span>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">真实姓名：</span>
                                    <div class="u-data">
                                        <span class="data">{{memberData.authName}}</span>
                                        <router-link :to="{path:'/member/apply'}" 
                                            class="u-lk operate"
                                            tag="a"
                                            >立即认证</router-link>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">绑定手机号：</span>
                                    <div class="u-data">
                                        <span class="data">{{memberData.tel}}</span>
                                        <router-link :to="{path:'/member/safetyTel'}" 
                                            class="u-lk operate"
                                            tag="a"
                                            >更换绑定</router-link>
                                    </div>
                                </div>
                                <div class="m-line-box f__clearfix">
                                    <span class="u-attr">性别：</span>
                                    <div class="u-data">{{memberData.sex}}</div>
                                </div>
                            </div><!-- 用户信息展示 -->
                        </div>
                        <div class="m-personal-box edit" v-show="!isInfoShow">

                        </div>
                    </div><!-- 个人资料 -->
                </member-inner>
            </div><!-- 个人资料设置内容 -->
        </member-layout>

	</div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

	export default {
        name: "personalSetting",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 控制展示页和编辑页的显隐
                isInfoShow: true,
                memberData: {},
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 获取用户信息
            this.getMemberInfo();
        },
        //退出的生命周期钩子
        deactivated(){
            this.isInfoShow = true;
        },
        // 自定义函数(方法)
        methods: {
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = new memberInfo(res.data);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })   
            }
        },
        
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
