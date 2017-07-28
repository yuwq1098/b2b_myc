<template>
    <div class="merchantApply">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">
                       
                        <div class="m-upload-wrap">
                            <div class="u-hd">
                                补交营业执照，升级认证为企业车行
                            </div>
                            <div class="u-line-box">
                                <div class="upload-inner">
                                    <div class="u-con">
                                        <div class="u-upload">
                                            <voucher-upload
                                                tips="上传身份证正面照"
                                                @changeFiles="voucherOne"
                                                ref="voucherThree"
                                                >
                                            </voucher-upload><!-- 文件上传组件 -->
                                        </div><!-- 上传盒子按钮 -->
                                        <div class="u-example v1">
                                            <span class="tit">示例</span>
                                            <div class="u-pic"></div>
                                        </div><!-- 图片示例 -->
                                    </div>
                                </div>
                            </div><!-- 上传身份证正面照 -->

                            <div class="u-line-box">
                                <div class="upload-inner">
                                    <div class="u-con">
                                        <div class="u-upload">
                                            <voucher-upload
                                                tips="上传身份证反面照"
                                                @changeFiles="voucherTwo"
                                                ref="voucherThree"
                                                >
                                            </voucher-upload><!-- 文件上传组件 -->
                                        </div><!-- 上传盒子按钮 -->
                                        <div class="u-example v2">
                                            <span class="tit">示例</span>
                                            <div class="u-pic"></div>
                                        </div><!-- 图片示例 -->
                                    </div>
                                </div>
                            </div><!-- 上传身份证反面照 -->

                            <div class="u-line-box">
                                <div class="upload-inner">
                                    <div class="u-con">
                                        <div class="u-upload">
                                            <voucher-upload
                                                tips="上传营业执照"
                                                @changeFiles="voucherThree"
                                                ref="voucherThree"
                                                >
                                            </voucher-upload><!-- 文件上传组件 -->
                                        </div><!-- 上传盒子按钮 -->
                                        <div class="u-example v3">
                                            <span class="tit">示例</span>
                                            <div class="u-pic"></div>
                                        </div><!-- 图片示例 -->
                                    </div>
                                </div>
                            </div><!-- 上传营业执照容器盒子 -->
                            <div class="u-btn-box">
                                <a class="u-btn" 
                                    @click="onSubmit()"
                                    >上传完毕，立即升级认证</a>
                            </div><!-- 提交按钮 -->
                        </div>
                           
                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 车行认证营业执照补交 -->
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

    // 证件上传组件
    import voucherUpload from 'components/member/voucherUpload.vue'


    export default {
        
        name: "merchantApply",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            voucherUpload,
        },
        // 数据
        data() {
            return{
                // 用户信息
                memberData: "",
                // 认证信息
                applyData: "",
                // 认证id
                authId: "",

                voucherId__1:"",           // 身份证正面
                voucherId__2:"",           // 身份证背面
                voucherId__3:"",           // 营业执照
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            this.authId = this.$router.currentRoute.query.authId||false;
            // 获取当前认证的信息
            this.getApplyInfo(this.authId);
            // 获取用户信息
            this.getMemberInfo();
        },
        // 退出的生命周期钩子
        deactivated(){
            this.$destroy();
        },
        // 属性值计算
        computed:{

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
                        // 格式化用户信息
                        this.memberData = this._normalizeMember(res.data);
                        console.log("获取用户信息",dataToJson(this.memberData));

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

            // 获取认证信息
            getApplyInfo(authId){
                let data = {
                    AuthId : authId,
                }
                api.getAuthDetails(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        // 格式化认证信息
                        this.applyData = res.data;
                        console.log("获取认证信息",dataToJson(this.applyData));

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '认证信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                });
            },

            // 身份证正面
            voucherOne(id){
                this.voucherId__1 = id;
            },

            // 身份证背面
            voucherTwo(id){
                this.voucherId__2 = id;
            },

            // 营业执照
            voucherThree(id){
                this.voucherId__3 = id;
            },

            // 提交
            onSubmit(){

                if(this.memberData=="") return;

                // 如果想企业认证
                let condition = this.voucherId__1!=""&&
                                    this.voucherId__2!=""&&
                                    this.voucherId__3!="";
                if(!condition){
                    this.$alert('您尚未上传相关证件，无法进行下一步操作', '未上传相关证件', {
                        confirmButtonText: '确定',
                        type: 'error',
                        callback: () => {
                            return;
                        }
                    });
                    return;
                }

                let myAuthId = "";

                this.memberData.cdgAuth.forEach((item,index)=>{
                    if(this.memberData.cdgAuth[index].AuthInfo.AuthType=="企业车行"){
                        myAuthId = this.memberData.CdgAuth[index].AuthInfo.AuthId;
                    }
                })
                    
                // 回调
                setTimeout(()=>{

                    // 提交给后台的信息
                    let data = {
                        AuthId: myAuthId,
                        AuthType: '企业车行',
                        CertificateType: "身份证",              // 证件类别：身份证
                        CertificateNumber: this.applyData.AuthInfo.CertificateNumber,     // 证件号码
                        SubmitDescription: this.applyData.AuthInfo.SubmitDescription,        // 申请备注内容，后台审核时可做参考
                        CertificateName: this.applyData.AuthInfo.CertificateName,         // 证件持有人
                        data: {
                            Name: this.applyData.CdgInfo.Name,
                            Type: '企业',
                            Address: this.applyData.CdgInfo.Address,
                            Description: this.applyData.CdgInfo.Description,
                        }
                    }
                    data.ImgInfo = [
                        {
                            imgId : this.voucherId__1,
                            imgTitle : "身份证正面",
                        },
                        {
                            imgId : this.voucherId__2,
                            imgTitle : "身份证背面",
                        },
                        {
                            imgId : this.voucherId__3,
                            imgTitle : "营业执照",
                        }
                    ]
                     
                    // 向后台提交审核申请
                    this.putCommit(data);
                });

            },

            // 提交操作（与后台交互）
            putCommit(data){
                api.authApply(data).then(res=>{
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功提交审核',
                            message: res.msg,
                            type: 'success',
                            duration: 2000,
                        });

                        // 刷新数据
                        setTimeout(()=>{
                            this.$router.push({path:'/member/applyHome'});
                        },400)

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '提交审核失败',
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
