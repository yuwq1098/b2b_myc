<template>
    <div class="applyHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">
                        <div class="m-mn not">
                            <div class="u-tit">您尚未认证</div><!-- 标题 -->
                            <div class="u-speak">无法在B2B进行交易</div><!-- 说些什么 -->
                            <router-link class="u-btn open-up"
                                :to="{path:'/member/putApply'}"
                                >
                            </router-link><!-- 开通认证 -->
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（未通过认证） -->
                        <div class="m-mn success">
                            <div class="u-tit">恭喜您，您已认证成功！</div><!-- 标题 -->
                            <div class="u-speak">认证类型：个人认证</div><!-- 说些什么 -->
                            <router-link class="u-btn download"
                                :to="{path:'/download'}"
                                >
                            </router-link><!-- 下载APP -->
                        </div><!-- 认证内容（认证成功） -->
                        <div class="m-other">
                            <div class="u-info">
                                <div class="u-tit">认证资料更新上传</div><!-- 标题 -->
                                <div class="u-speak">营业执照补交</div><!-- 说些什么 -->
                            </div><!-- 信息区 -->
                            <router-link class="u-btn replenish"
                                :to="{path:'/member/merchantApply'}"
                                >立即上传
                            </router-link>
                        </div><!-- 认证资料补充 -->
                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 我的认证主页页面内容 -->
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
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'


    export default {
        
        name: "applyHome",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                memberData: {},            //用户信息
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
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{
            curAuthType(){
                if(this.memberData.cdgAuth.length==1){

                }

                return ;
            }
        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = this._normalizeMember(res.data);
                        console.log("我的个人信息",this.memberData)
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
    @import 'index.styl'


</style>
