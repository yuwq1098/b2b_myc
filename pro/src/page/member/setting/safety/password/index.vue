<template>
    <div class="safetyPass">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            >
            <div slot="safety">
                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            placeholder="请输入当前密码"
                            :errorText="errors.first('pass')"
                            :errorShow="errors.has('pass')"
                            inputType="password"
                            title="当前密码"
                            @inputChangeEnd="passEnd"
                            >
                        </g-form-item>
                        <g-form-item
                            placeholder="请输入新密码"
                            :errorText="errors.first('newPass')"
                            :errorShow="errors.has('newPass')"
                            inputType="password"
                            @inputChangeEnd="newPassEnd"
                            inputName="newPass"
                            title="新密码"
                            :readonly="errors.has('pass')"
                            >
                        </g-form-item>
                        <g-form-item
                            placeholder="请输入确认密码"
                            :errorText="errors.first('checkPass')"
                            :errorShow="errors.has('checkPass')"
                            inputType="password"
                            @inputChangeEnd="checkPassEnd"
                            title="确认密码"
                            :readonly="errors.has('pass')||errors.has('newPass')"
                            >
                        </g-form-item>

                        <div slot="btnBox">
                            <a href="javascript:;" @click="onSubmit" class="u-btn primary">
                                确认修改
                            </a>
                            <a href="javascript:;" @click="reset" class="u-btn hollow">
                                重置
                            </a>
                        </div>
                    </g-form>
                </div>
            </div>
        </member-layout>

        
    </div>
</template>

<script>
    
    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 

    // 引入会员中心 表单组件
    import gForm from "components/member/form.vue"
    // 引入会员中心 表单item组件
    import gFormItem from "components/member/formItem.vue"

    //引入表单验证
    import { Validator } from 'vee-validate';

    export default {

        name: "safetyPass",
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
                pass: "",
                newPass: "",
                checkPass: "",

                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,开始的时候
        created(){
            // console.log("走了这吗")
            this.validator = new Validator({
                pass: 'required|alpha_dash|min:6|max:22',
                newPass: 'required|alpha_dash|min:6|max:22',
                checkPass: 'required|confirmed:newPass'
            });
            this.$set(this, 'errors', this.validator.errorBag);
            this.validator.validate('pass', this.pass).then((res) => {});

        },
        mounted(){
            
        },
        // 自定义函数(方法)
        methods: {
            passEnd(val){
                this.pass = val;
                this.validator.validate('pass',val);
            },
            newPassEnd(val){
                this.newPass = val;
                this.validator.validate('newPass',val);
            },
            checkPassEnd(val){
                this.checkPass = val;
                this.validator.validate('checkPass',val);
            },
            // 提交修改
            onSubmit(){
                this.validator.validateAll({
                    pass: this.pass,
                    newPass: this.newPass,
                    checkPass: this.checkPass
                }).then(() => {

                    this.errors.add('pass', '这不是您的当前密码', 'auth');
                }).catch(error => {
                    console.log("挺蛋疼吧")
                });
            },
            // 重置（清空）
            reset(){
                this.pass = "";
                this.newPass = "";
                this.checkPass = "";
                this.errors.clear();
            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
