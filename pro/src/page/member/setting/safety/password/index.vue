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
                            ref="pass"
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
                            ref="newPass"
                            >
                        </g-form-item>
                        <g-form-item
                            placeholder="请输入确认密码"
                            :errorText="errors.first('checkPass')"
                            :errorShow="errors.has('checkPass')"
                            inputType="password"
                            @inputChangeEnd="checkPassEnd"
                            title="确认密码"
                            ref="checkPass"
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
                   <!--  <div class="codeImg">
                        <img @click="changeCode" :src="'http://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp" />
                    </div> --><!-- 图形验证码 -->
                    
                </div>
            </div>
        </member-layout>

        
    </div>
</template>

<script>
    
    import $ from "jquery"
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
                form:{
                    pass: "",
                },
                codeUrl: "",
                timestamp: (+new Date()).valueOf(),
                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,开始的时候
        created(){
            
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
        activated(){
            this.errors.clear();
            this.validator.validate('pass', this.pass).then((res) => {});
        },
        //退出的生命周期钩子
        deactivated(){
            this.errors.clear();
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['setSignOut']),
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
                let me = this;
                this.validator.validateAll({
                    pass: this.pass,
                    newPass: this.newPass,
                    checkPass: this.checkPass
                }).then(() => {
                     
                    // 密码修改的数据
                    let data = {
                        OldPwd: me.pass,
                        NewPwd: me.checkPass
                    }
                    me.putCommit(data);
                    
                }).catch(error => {
                    console.log(error);
                });
            },
            // 提交修改
            putCommit(data){
                // 清空输入框
                this.reset();
                api.editPassword(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '密码修改成功',
                            message: '请重新登录！',
                            type: 'success',
                            duration: 1500,
                        });
                        this.$router.push({ path: '/'})
                        //调用vuex的注销方法
                        this.setSignOut();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.errors.add('pass', res.msg, 'auth');
                    }
                });
            },
            // 重置（清空）
            reset(){

                $(this.$refs.pass.$el).find("input").val("来回切换");
                $(this.$refs.newPass.$el).find("input").val("来回切换");
                $(this.$refs.checkPass.$el).find("input").val("来回切换");
                $(this.$refs.pass.$el).find("input").val("");
                $(this.$refs.newPass.$el).find("input").val("");
                $(this.$refs.checkPass.$el).find("input").val("");
                setTimeout(()=>{
                    console.dir(this.errors);
                    
                })
                // $(this.$refs.checkPass.$el).find("input").val("");
                
            },
            // 更新验证码
            changeCode(){
                this.timestamp = (+new Date()).valueOf();

            }
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
