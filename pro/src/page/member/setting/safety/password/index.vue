<template>
    <div class="safetyPass">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            :isSafety="true"
            >
            <div slot="safety">
                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            :errorText="errors.first('pass')"
                            :errorShow="errors.has('pass')"
                            title="原密码"
                            >
                            <input placeholder="请输入原密码"
                                class="u-ipt" 
                                v-model="pass"
                                type="password" 
                                />
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('newPass')"
                            :errorShow="errors.has('newPass')"
                            title="新密码"
                            >
                            <input placeholder="请输入新密码"
                                class="u-ipt"
                                v-model="newPass"
                                name="newPass"
                                type="password" 
                                />
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('checkPass')"
                            :errorShow="errors.has('checkPass')"
                            title="确认密码"
                            >
                            <input placeholder="请输入确认密码"
                                class="u-ipt"
                                v-model="checkPass"
                                name="checkPass"
                                type="password" 
                                />
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
            this.reset();
            setTimeout(()=>{
                this.validator.validate('pass', this.pass).then((res) => {});
            });
        },
        //退出的生命周期钩子
        deactivated(){
            this.reset();
            setTimeout(()=>{
                this.validator.validate('pass', this.pass).then((res) => {});
            });
        },
        //数据侦听
        watch:{
            pass(val){
                this.validator.validate('pass',val);
            },
            newPass(val){
                this.validator.validate('newPass',val);
            },
            checkPass(val){
                this.validator.validate('checkPass',val);
            },
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['setSignOut']),
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
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.errors.remove('pass');
                        this.errors.add('pass', res.msg, 'auth');
                    }
                });
            },
            // 重置（清空）
            reset(){
                this.pass = "";
                this.newPass = "";
                this.checkPass = "";
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
                
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
