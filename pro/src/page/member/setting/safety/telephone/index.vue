<template>
    <div class="safetyTel">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="安全中心"
            :isSafety="true"
            >
            <div slot="safety">

                <div class="m-form-wrap">
                    <g-form>
                        <g-form-item
                            title="原手机号"
                            >
                            <div class="u-txt">{{memberData.tel | telFormat}}</div>
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('oldImgCode')"
                            :errorShow="errors.has('oldImgCode')"
                            title="图形验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入图形验证码"
                                    class="code-ipt" 
                                    v-model="oldImgCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="img-btn" 
                                    @click="getOldImgCode()"
                                    >
                                    <img class="u-pic" 
                                        :src="'https://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+oldTimestamp"/>
                                </a>
                            </div>
                            
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('oldCode')"
                            :errorShow="errors.has('oldCode')"
                            title="短信验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="oldCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="code-btn" 
                                    @click="getOldCode()"
                                    v-if="!oldWaitSeconds"
                                    >(旧)获取验证码
                                </a>
                                <a 
                                    href="javascript:;" 
                                    class="code-btn disable"
                                    v-if="oldWaitSeconds"
                                    >
                                    {{oldWaitSeconds}}s后重新发送
                                </a>
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
                            :errorText="errors.first('newImgCode')"
                            :errorShow="errors.has('newImgCode')"
                            title="图形验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入图形验证码"
                                    class="code-ipt" 
                                    v-model="newImgCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="img-btn" 
                                    @click="getNewImgCode()"
                                    >
                                    <img class="u-pic" 
                                        :src="'https://www.muyouche.com/action2/ImgRandomCode.ashx?FS=18&a='+newTimestamp"/>
                                </a>
                            </div>
                            
                        </g-form-item>
                        <g-form-item
                            :errorText="errors.first('newCode')"
                            :errorShow="errors.has('newCode')"
                            title="短信验证码"
                            :isCode="true"
                            >
                            <div slot="code">
                                <input placeholder="输入短信验证码"
                                    class="code-ipt" 
                                    v-model="newCode"
                                    type="text" 
                                    />
                                <a href="javascript:;"
                                    class="code-btn" 
                                    @click="getNewCode()"
                                    v-if="!newWaitSeconds"
                                    >(新)获取验证码
                                </a>
                                <a 
                                    href="javascript:;" 
                                    class="code-btn disable"
                                    v-if="newWaitSeconds"
                                    >
                                    {{newWaitSeconds}}s后重新发送
                                </a>
                            </div>
                        </g-form-item>

                        <div slot="btnBox">
                            <a href="javascript:;" @click="onSubmit()" class="u-btn primary">
                                提交
                            </a>
                            <a href="javascript:;" @click="reset()" class="u-btn hollow">
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
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

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
                // 用户数据
                memberData: {},

                oldTelephone: '',
                oldImgCode: '',
                oldCode: '',
                newTelephone: '',
                newImgCode: '',
                newCode: '',
                oldTimestamp: (+new Date()).valueOf(),
                newTimestamp: (+new Date()).valueOf()+1,
                // 表单验证报错集合
                errors: null,
                // 旧短信验证码的定时器
                oldInterval: null,
                // 旧验证码等待时间
                oldWaitSeconds: 0,
                // 新短信验证码的定时器
                newInterval: null,
                // 新验证码等待时间
                newWaitSeconds: 0,
            }
        },
        //生命周期,该组件被创建的时候
        created(){
            
            this.validator = new Validator({
                oldTel: 'required|mobile',
                oldImgCode: 'required|min:4|max:4',
                oldCode: 'required|min:4|max:4',
                newTel: 'required|mobile',
                newImgCode: 'required|min:4|max:4',
                newCode: 'required|min:4|max:4',
            });
            this.$set(this, 'errors', this.validator.errorBag);
            
        },
        activated(){
            // 数据重置
            this.reset();
            // 获取用户信息
            this.getMemberInfo();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        //数据侦听
        watch:{
            oldTelephone(val){
                this.validator.validate('oldTel',val);
            },
            oldImgCode(val){
                this.validator.validate('oldImgCode',val);
            },
            oldCode(val){
                this.validator.validate('oldCode',val);
            },
            newTelephone(val){
                this.validator.validate('newTel',val);
            },
            newImgCode(val){
                this.validator.validate('newImgCode',val);
            },
            newCode(val){
                this.validator.validate('newCode',val);
            }
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

            // 获取图形验证码(对应旧手机号)
            getOldImgCode(){
                this.oldTimestamp = (+new Date()).valueOf();
            },
            // 获取图形验证码(对应新手机号)
            getNewImgCode(){
                this.newTimestamp = (+new Date()).valueOf();
            },
            
            // (旧手机号)获取短信验证码
            getOldCode(){

                if(this.oldImgCode==""||this.errors.first('oldImgCode')){
                    this.errors.remove('oldImgCode');
                    this.errors.add('oldImgCode', "请输入(旧)图形验证码", 'auth');
                    return;
                }

                let data = {
                    telephone: this.memberData.tel,
                    imgCode: this.oldImgCode,
                    type: 'text'
                }
                // 获取短信验证码
                this.getSMSCode(data,(state,msg)=>{

                    if(state){ //成功

                        this.oldWaitSeconds = MAX_WAIT_SECONDS;
                        this.oldInterval = setInterval(() => {
                            this.oldWaitSeconds--;
                            if(this.oldWaitSeconds==0){
                                clearInterval(this.oldInterval)
                            }
                        },1000);

                    }else{  //失败
                        this.errors.remove('oldImgCode');
                        this.errors.add('oldImgCode', msg, 'auth');
                    }
                });
                    
            },

            // (新手机号)获取短信验证码
            getNewCode(){
                if(this.newTelephone==""||this.errors.first('newTel')){
                    this.errors.remove('newTel');
                    this.errors.add('newTel', "请正确输入您的新手机号", 'auth');
                }else{
                    if(this.newTelephone==this.oldTelephone){
                        this.errors.remove('newTel');
                        this.errors.add('newTel', "不允许新/原手机号码重复", 'auth');
                        return;
                    }
                    if(this.newImgCode==""||this.errors.first('newImgCode')){
                        this.errors.remove('newImgCode');
                        this.errors.add('newImgCode', "请输入(新)图形验证码", 'auth');
                        return;
                    }
                    //验证手机号是否已被注册
                    this.verifyPhone(this.newTelephone,(res)=>{

                        if(res){    // 已注册（平台已有）
                            let data = {
                                telephone: this.newTelephone,
                                imgCode: this.newImgCode,
                                type: 'text'
                            }
                            // 获取短信验证码
                            this.getSMSCode(data,(state,msg)=>{

                                if(state){ //成功

                                    this.newWaitSeconds = MAX_WAIT_SECONDS;
                                    this.newInterval = setInterval(() => {
                                        this.newWaitSeconds--;
                                        if(this.newWaitSeconds==0){
                                            clearInterval(this.newInterval)
                                        }
                                    },1000);

                                }else{  //失败
                                    this.errors.remove('newImgCode');
                                    this.errors.add('newImgCode', msg, 'auth');
                                }
                            });

                        }else{      // 未注册（平台没有）
                            this.errors.remove('newTel');
                            this.errors.add('newTel', "此手机号未被注册", 'auth');
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
            getSMSCode(params,callBack){
                let data = {
                    Mobile: params.telephone,
                    ImgCode: params.imgCode,
                    CodeType: params.type||'text',
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
                    oldImgCode: this.oldImgCode,
                    oldCode: this.oldCode,
                    newTel: this.newTelephone,
                    newImgCode: this.newImgCode,
                    newCode: this.newCode,
                }).then(() => {
                    // 密码修改的数据
                    let data = {
                        OldMobile: me.memberData.tel,
                        OldMobileCode: me.oldCode,
                        NewMobile: me.newTelephone,
                        NewMobileCode: me.newCode,
                    }
                    me.putCommit(data);
                    
                }).catch(error => {
                    console.log(error);
                });
            },
            // 提交修改
            putCommit(data){
                api.editMobile(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '更改手机绑定成功',
                            message: res.msg,
                            type: 'success',
                            duration: 2000,
                        });
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '更改手机绑定失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                });
            },
            // 重置（清空）
            reset(){
                this.oldTelephone = "";
                this.oldImgCode = "";
                this.oldCode = "";
                this.newTelephone = "";
                this.newImgCode = "";
                this.newCode = "";
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
