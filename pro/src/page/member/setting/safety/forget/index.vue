<template>
    <div class="safetyForget">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="safety">

                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            :errorText="errors.first('tel')"
                            :errorShow="errors.has('tel')"
                            title="手机号"
                            >
                            <input placeholder="请输入您的手机号"
                                class="u-ipt" 
                                v-model="telephone"
                                type="text" 
                                />
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('smsCode')"
                            :errorShow="errors.has('smsCode')"
                            title="短信验证码"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="smsCode"
                                    type="text" 
                                    />
                                <a href="javascript:;" class="code-btn">获取验证码</a>
                            </div>
                            
                        </g-form-item>

                        <div slot="btnBox">
                            <a href="javascript:;" @click="onSubmit" class="u-btn primary">
                                提交
                            </a>
                        </div>
                    </g-form>
                    
                </div>

            </div>
        </member-layout>

    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 引入会员中心 表单组件
    import gForm from "components/member/form.vue"
    // 引入会员中心 表单item组件
    import gFormItem from "components/member/formItem.vue"

    //引入表单验证
    import { Validator } from 'vee-validate';

    export default {
        
        name: "safetyForget",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            gForm,
            gFormItem,
        },
        // 数据
        data() {
            return{
                telephone: '',
                smsCode: '',
                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                tel: 'required|mobile',
                smsCode: 'required|min:4|max:4',
            });
            this.$set(this, 'errors', this.validator.errorBag);
            
        },
        activated(){
            this.errors.clear();
            
        },
        //退出的生命周期钩子
        deactivated(){
            this.errors.clear();
        },
        //数据侦听
        watch:{
            telephone(val){
                this.validator.validate('tel',val);
            },
            smsCode(val){
                this.validator.validate('smsCode',val);
            }
        },
        // 自定义函数(方法)
        methods: {
            // 提交
            onSubmit(){
                console.log("提交")
            }
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .m-form-wrap
        width 450px
        margin 0 auto 40px
        .user-form
            width @width
</style>
