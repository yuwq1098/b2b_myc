<template>
    <div class="safetyTel">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="safety">

                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            :errorText="errors.first('oldTel')"
                            :errorShow="errors.has('oldTel')"
                            title="原手机号"
                            >
                            <input placeholder="请输入您上次绑定的手机号"
                                class="u-ipt" 
                                v-model="oldTelephone"
                                type="text" 
                                />
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('oldCode')"
                            :errorShow="errors.has('oldCode')"
                            title="短信验证码"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="oldCode"
                                    type="text" 
                                    />
                                <a href="javascript:;" class="code-btn">获取验证码</a>
                            </div>
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('newTel')"
                            :errorShow="errors.has('newTel')"
                            title="新手机号"
                            >
                            <input placeholder="请输入您更绑的手机号"
                                class="u-ipt" 
                                v-model="newTelephone"
                                type="text" 
                                />
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('newCode')"
                            :errorShow="errors.has('newCode')"
                            title="短信验证码"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="newCode"
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
        
        name: "safetyTel",
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
                oldTelephone: '',
                oldCode: '',
                newTelephone: '',
                newCode: '',
                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                oldTel: 'required|mobile',
                oldCode: 'required|min:4|max:4',
                newTel: 'required|mobile',
                newCode: 'required|min:4|max:4',
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
            oldTelephone(val){
                this.validator.validate('oldTel',val);
            },
            oldCode(val){
                this.validator.validate('oldCode',val);
            },
            newTelephone(val){
                this.validator.validate('newTel',val);
            },
            newCode(val){
                this.validator.validate('newCode',val);
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
