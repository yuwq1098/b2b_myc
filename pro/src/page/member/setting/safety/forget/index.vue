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
                            :errorText="errors.first('newPass')"
                            :errorShow="errors.has('newPass')"
                            title="新密码"
                            >
                            <input placeholder="设置您的新密码"
                                class="u-ipt" 
                                v-model="newPass"
                                type="password" 
                                />
                        </g-form-item>
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
                            :errorText="errors.first('imgCode')"
                            :errorShow="errors.has('imgCode')"
                            title="图形验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入图形验证码"
                                    class="code-ipt" 
                                    v-model="imgCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="img-btn" 
                                    @click="getImgCode()"
                                    >
                                    <img class="u-pic" 
                                        :src="'http://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+timestamp"/>
                                </a>
                            </div>
                            
                        </g-form-item>

                        <g-form-item
                            :errorText="errors.first('smsCode')"
                            :errorShow="errors.has('smsCode')"
                            title="短信验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="smsCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="code-btn" 
                                    @click="getCode()"
                                    v-if="!waitSeconds"
                                    >获取验证码
                                </a>
                                <a 
                                    href="javascript:;" 
                                    class="code-btn disable"
                                    v-if="waitSeconds"
                                    >
                                    {{waitSeconds}}s后重新发送
                                </a>
                            </div>
                            
                        </g-form-item>

                        <div slot="btnBox">
                            <a href="javascript:;" @click="onSubmit" class="u-btn primary">
                                提交
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

    
    // 最大等待秒数
    const MAX_WAIT_SECONDS = 120;

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
                newPass: '',
                telephone: '',
                imgCode: '',
                smsCode: '',
                timestamp: (+new Date()).valueOf(),
                // 表单验证报错集合
                errors: null,
                // 我的定时器
                myInterval: null,
                // 验证码等待时间
                waitSeconds: 0,
            }
        },
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                newPass: 'required|alpha_dash|min:6|max:22',
                tel: 'required|mobile',
                imgCode: 'required|min:4|max:4',
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
            newPass(val){
                this.validator.validate('newPass',val);
            },
            telephone(val){
                this.validator.validate('tel',val);
            },
            imgCode(val){
                this.validator.validate('imgCode',val);
            },
            smsCode(val){
                this.validator.validate('smsCode',val);
            }
        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['setSignOut']),
            // 获取图形验证码
            getImgCode(){
                this.timestamp = (+new Date()).valueOf();
            },
            // 获取验证码
            getCode(){
                if(this.telephone==""||this.errors.first('tel')){
                    this.errors.remove('tel');
                    this.errors.add('tel', "请正确输入您的手机号", 'auth');
                }else{
                    if(this.imgCode==""||this.errors.first('imgCode')){
                        this.errors.remove('imgCode');
                        this.errors.add('imgCode', "请输入图形验证码", 'auth');
                        return;
                    }
                    //验证手机号是否已被注册
                    this.verifyPhone(this.telephone,(res)=>{

                        if(res){    // 已注册（平台已有）
                            
                            // 获取短信验证码
                            this.getSMSCode('text',(state,msg)=>{

                                if(state){ //成功

                                    this.waitSeconds = MAX_WAIT_SECONDS;
                                    this.myInterval = setInterval(() => {
                                        this.waitSeconds--;
                                        if(this.waitSeconds==0){
                                            clearInterval(this.myInterval)
                                        }
                                    },1000);

                                }else{  //失败
                                    this.errors.remove('imgCode');
                                    this.errors.add('imgCode', msg, 'auth');
                                }
                            });

                        }else{      // 未注册（平台没有）
                            this.errors.remove('tel');
                            this.errors.add('tel', "此手机号未被注册", 'auth');
                        }
                        
                    })
                    
                }
            },
            // 验证手机号是否重复
            verifyPhone(mobile,callBack){
                let data = {
                    Mobile: mobile
                }
                let isRepeat;
                api.checkMobileCanReg(data).then(res=>{
                    if(res.code==-1) {
                        isRepeat = true;
                    }else{
                        isRepeat = false;
                    }
                    if(callBack){
                        callBack(isRepeat);
                    }
                })
            },
            // 向后台获取短信验证码，发送到用户手机上
            getSMSCode(type,callBack){
                let data = {
                    Mobile: this.telephone,
                    ImgCode: this.imgCode,
                    CodeType: type||'text',
                }
                let isSuccess;
                api.getSMSCode(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK) {
                        isSuccess = true;
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        isSuccess = false;
                    }
                    if(callBack){
                        callBack(isSuccess,res.msg);
                    }
                })
            },
            // 提交
            onSubmit(){
                let me = this;
                this.validator.validateAll({
                    newPass: this.newPass,
                    tel: this.telephone,
                    imgCode: this.imgCode,
                    smsCode: this.smsCode,
                }).then(() => {
                    // 密码修改的数据
                    let data = {
                        Mobile: me.telephone,
                        SMSCode: me.smsCode,
                        NewPwd: me.newPass
                    }
                    me.putCommit(data);
                    
                }).catch(error => {
                    console.log(error);
                });
            },
            // 提交修改
            putCommit(data){
                api.forgotPassword(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '密码找回成功',
                            message: '请重新登录！',
                            type: 'success',
                            duration: 1500,
                        });
                        this.$router.push({ path: '/'})
                        //调用vuex的注销方法
                        this.setSignOut();
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.errors.remove('newPass');
                        this.errors.add('newPass', "无效的短信验证码", 'auth');
                    }
                });
            },
            // 重置（清空）
            reset(){
                this.newPass = "";
                this.telephone = "";
                this.imgCode = "";
                this.smsCode = "";
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
