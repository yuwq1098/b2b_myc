<template>
    <div class="safetyCenter">
        
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            :isSafety="true"
            >
            <div slot="safety">

                <div class="m-center-box">
                    <ul class="m-safety-lst">
                        <li class="m-item">
                            <div class="m-bar-box f__clearfix">
                                <span class="u-tit">密码修改</span>
                                <div class="u-data">较安全</div>
                                <p class="u-tips">密码长度为6-22个字符，建议由数字、字母、符号组成，不宜与注册手机号相同</p><!-- 说明 -->
                                <router-link 
                                    :to="{path:'/member/safetyPass'}"
                                    class="u-lk"
                                    tag="a"
                                    title="密码修改"
                                    >
                                    修改&gt;
                                </router-link>
                            </div>
                        </li>
                        <li class="m-item">
                            <div class="m-bar-box f__clearfix">
                                <span class="u-tit">忘记密码</span>
                                <div class="u-data">较安全</div>
                                <p class="u-tips">通过短信验证码的方式，您可以重新重新设置登录密码</p><!-- 说明 -->
                                <router-link 
                                    :to="{path:'/member/safetyForget'}"
                                    class="u-lk"
                                    tag="a"
                                    title="找回密码"
                                    >
                                    找回&gt;
                                </router-link>
                            </div>
                        </li>
                        <li class="m-item">
                            <div class="m-bar-box f__clearfix">
                                <span class="u-tit">更改手机绑定</span>
                                <div class="u-data">{{memberData.tel | telFormat}}</div>
                                <p class="u-tips">绑定的手机号,可以用于手机登录和找回密码</p><!-- 说明 -->
                                <router-link 
                                    :to="{path:'/member/safetyTel'}"
                                    class="u-lk"
                                    tag="a"
                                    title="更改手机绑定"
                                    >
                                    更换&gt;
                                </router-link>
                            </div>
                        </li>
                        <li class="m-item" v-if="!memberData.hasPaypwd">
                            <div class="m-bar-box f__clearfix">
                                <span class="u-tit">设置支付密码</span>
                                <div class="u-data">谨防泄露</div>
                                <p class="u-tips">设置您的支付密码</p>
                                <router-link 
                                    :to="{path:'/member/payPass'}"
                                    class="u-lk"
                                    tag="a"
                                    title="设置支付密码"
                                    >
                                    去设置&gt;
                                </router-link>
                            </div>
                        </li>
                        <li class="m-item" v-if="memberData.hasPaypwd">
                            <div class="m-bar-box f__clearfix">
                                <span class="u-tit">修改支付密码</span>
                                <div class="u-data">谨防泄露</div>
                                <p class="u-tips">可以修改或者找回您的支付密码</p>
                                <router-link 
                                    :to="{path:'/member/editPayPass'}"
                                    class="u-lk"
                                    tag="a"
                                    title="修改支付密码"
                                    >
                                    修改&gt;
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>

            </div><!-- 安全中心内容 -->
        </member-layout>

    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapGetters,mapActions} from 'vuex'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

    export default {

        name: "safetyCenter",
        // 在当前模块注册组件
        components:{
            memberLayout,
        },
        // 数据
        data() {
            return{
                memberData: {},
            }
        },
        //属性值计算
        computed:{
            ...mapGetters(['userData']),
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
            // 获取用户信息
            this.getMemberInfo();
        },
        // 数据侦听
        watch:{
            userData:{
                handler(curVal,oldVal){
                    this.getMemberInfo();
                },
                deep:true
            },
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
