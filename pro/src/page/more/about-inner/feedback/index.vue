<!--
 **  @description 网站更多功能 - 意见反馈
 -->

<template>
	<div class="feedback">

        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="意见反馈"
            >
            <div class="m-about-box">
                <p class="u-hd-attr">请选择反馈类型：</p>
                <ul class="m-tap-choose f__clearfix">
                    <li class="u-item" :class="{'on':tapChoose==1}"
                        @click="changeType(1)"
                        >产品建议</li>
                    <li class="u-item" :class="{'on':tapChoose==2}"
                        @click="changeType(2)"
                        >程序错误</li>
                </ul>

                <div class="item-error" v-if="errors.has('feedbackContent')">
                    <p class="error-txt">
                        <i class="iconfont icon-jinggao1"></i>{{errors.first('feedbackContent')}}</p>
                </div>
                <div class="u-iptText-box">
                    <textarea class="ipt" v-model="feedbackContent" placeholder="请在此处描述您需要反馈的内容"></textarea>
                    <p class="tips">您还可以输入200字</p>
                </div><!-- 反馈内容 -->
                <div class="contact-type">
                    <span class="u-attr">如您需要得到回复，可选择以下联系方式：</span>
                    <div class="u-radio-box">
                        <el-radio class="ipt-radio" v-model="contactType" label="手机号">手机号</el-radio>
                        <el-radio class="ipt-radio" v-model="contactType" label="微信号">微信号</el-radio>
                        <el-radio class="ipt-radio" v-model="contactType" label="QQ号">QQ号</el-radio>
                    </div>
                </div>

                <div class="multiUpload-box">
                    <multi-files></multi-files>
                </div><!-- 图片上传组件 -->

                <div class="item-error" v-if="errors.has('contactText')">
                    <p class="error-txt">
                        <i class="iconfont icon-jinggao1"></i>{{errors.first('contactText')}}</p>
                </div>
                <div class="contact-number">
                    <input class="u-ipt tel" v-show="contactType=='手机号'" type="text" placeholder="请输入手机号" v-model="contactText"/>
                    <input class="u-ipt wechat" v-show="contactType=='微信号'" type="text" placeholder="请输入微信号" v-model="contactText" />
                    <input class="u-ipt qq" v-show="contactType=='QQ号'" type="text" placeholder="请输入QQ号" v-model="contactText" />
                </div><!-- 联系号码 -->
                <button class="u-btn submit" @click="onSubmit">提交</button>

            </div>
        </about-layout>

	</div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue'

    // 多图拖拽裁切上传组件
    import multiFiles from 'components/dragClip/multiFiles.vue'

    //引入表单验证
    import { Validator } from 'vee-validate';

	export default {
        name: "feedback",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            aboutLayout,
            multiFiles,
        },
        // 数据
        data() {
            return{

                // 反馈类型选择
                tapChoose: 1,
                // 反馈类型数据
                feedbackData: {},
                // 反馈内容
                feedbackContent: "",
                // 联系方式选择
                contactType: "手机号",
                // 联系方式内容
                contactText: "",
                // 表单验证报错集合
                errors: null,

            }
        },
        //生命周期,开始的时候
        created(){
            
            this.validator = new Validator({
                feedbackContent: 'required',
                contactText: 'required',
            });
            this.$set(this, 'errors', this.validator.errors);

        },
        mounted(){
            
        },
        activated(){
            // 获取反馈类别可用类型
            // this.getFeedback();

        },

        //退出的生命周期钩子
        deactivated(){
            this.reset();
        },
        computed:{
            ...mapGetters(['loginStatus']),
        },
        //数据侦听
        watch:{
            feedbackContent(val){
                this.validator.validate('feedbackContent',val);
            },
            contactText(val){
                this.validator.validate('contactText',val);
            },
        },

        // 自定义函数(方法)
        methods: {
            
            // 获取反馈类别可用类型
            getFeedback(){
                api.getFeedback().then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '请先登录',
                            message: res.msg,
                            type: 'warning',
                            duration: 2000,
                        });
                    }
                })
            },
            
            // 切换反馈类型
            changeType(type){
                
                // 如果重复点击当前的反馈类型
                if(type==this.tapChoose) return;
                // 
                this.tapChoose = type;

            },
            
            // 提交修改
            onSubmit(){
                
                if(!this.loginStatus){
                    this.$notify({
                        title: '尚未未登录',
                        message: "请登录之后再进行意见反馈，我们为您保留意见",
                        type: 'error',
                        duration: 2000,
                    });
                    return false;
                }
                let me = this;
                this.validator.validateAll({
                    feedbackContent: this.feedbackContent,
                    contactText: this.contactText,
                }).then((res) => {
                    
                    // 验证成功
                    if(res) {
                        let fdType = "";
                        switch(this.tapChoose){
                            case 1:
                                fdType = "产品建议"
                                break;
                            case 2:
                                fdType = "程序错误"
                                break;
                        }
                        // 对应数据
                        let data = {
                            FdType: fdType,
                            FdContent: this.feedbackContent,
                            FdImgIdList: [],
                            ContactType: this.contactType,
                            ContactWay: this.contactText,
                        }
                        me.putCommit(data);
                    };
                    
                }).catch(error => {
                    console.log(error);
                });
            },

            // 上传提交
            putCommit(data){
                
                api.feedbackSubmit(data).then((res)=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '提交反馈成功',
                            message: '恭喜您成功提交反馈，我们将尽快处理',
                            type: 'success',
                            duration: 1500,
                        });
                        this.reset();
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '提交意见反馈失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                        this.reset();
                    }
                });
            },


            // 重置（清空）
            reset(){

                // 反馈类型选择
                this.tapChoose = 1;
                // 反馈内容
                this.feedbackContent = "";
                // 联系方式选择
                this.contactType = "手机号";
                // 联系方式内容
                this.contactText = "";
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
    @import 'index.styl'
</style>
