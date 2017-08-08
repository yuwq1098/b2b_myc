<template>
    <div class="putApply">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的认证"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-apply-wrap">

                        <div class="m-box-inner">
                            <div class="m-flow-hd">
                                <div class="u-flow-box">
                                    <div class="u-progress-wrap"
                                        :class="'flow'+tabShowIndex">
                                        <div class="progress-bar"></div>
                                    </div><!-- 进度条 -->

                                    <div class="u-part v1" 
                                        :class="{'on':tabShowIndex>=1}">
                                        <div class="part-no">1</div>
                                        <div class="txt">填写信息</div>
                                    </div>
                                    <div class="u-part v2"
                                        :class="{'on':tabShowIndex>=2}">
                                        <div class="part-no">2</div>
                                        <div class="txt">上传证件信息</div>
                                    </div>
                                    <div class="u-part v3"
                                        :class="{'on':tabShowIndex==3}">
                                        <div class="part-no">3</div>
                                        <div class="txt">{{lastFlowTetx}}</div>
                                    </div>
                                </div>
                            </div><!-- 流程进度 -->
                            <div class="m-flow-con">

                                <div class="m-tb-con" 
                                    v-if="tabShowIndex==1">
                                    <div class="u-tb-wrap">
                                        <div class="u-line-box">
                                            <div class="line-error" v-if="errors.has('authName')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('authName')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">认证人：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="authName" 
                                                        type="text" placeholder="请输入您的真实姓名" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box">
                                            <div class="line-error" v-if="errors.has('authNumber')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('authNumber')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">身份证号：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="authNumber" 
                                                        type="text" placeholder="请输入您的身份证号" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box">
                                            <div class="line-error" v-if="errors.has('cdgName')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('cdgName')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">车行名称：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="cdgName" 
                                                        type="text" placeholder="请输入车行名称" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box">
                                            <div class="line-error" v-if="errors.has('cdgCity')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('cdgCity')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">车行所在地：</span>
                                                <div class="u-ipt-box">
                                                    <city-cascader
                                                        @valChangeEnd="cdgCityChangeEnd"
                                                        placeholder="车行所在地"
                                                        ref="cdgCityDom"
                                                        :initValue="theCdgCity"
                                                        :startTwoInit="true"
                                                        >
                                                    </city-cascader>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box">
                                            <div class="line-error" v-if="errors.has('cdgAddress')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('cdgAddress')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">车行详细地址：</span>
                                                <div class="u-ipt-box">
                                                    <input class="u-ipt" 
                                                        v-model="cdgAddress" 
                                                        type="text" placeholder="请输入车行详细地址" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-line-box textarea">
                                            <div class="line-error" v-if="errors.has('cdgDesc')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('cdgDesc')}}</p>
                                            </div><!-- 错误验证 -->
                                            <div class="line-inner">
                                                <span class="u-attr">车行描述：</span>
                                                <div class="u-ipt-box">
                                                    <textarea class="u-textarea" 
                                                        v-model="cdgDesc" 
                                                        type="text" placeholder="请在此处描述您的车行内容">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="u-btn-box">
                                            <a href="javascript:;" class="u-btn"
                                                @click="goPartTwo()"
                                                >下一步</a>
                                        </div>

                                    </div>
                                </div>

                                <div class="m-tb-con"
                                    v-if="tabShowIndex==2">
                                    <div class="m-upload-wrap">
                                        <div class="u-line-box">
                                            <div class="upload-inner">
                                                <div class="u-con">
                                                    <div class="u-upload">
                                                        <voucher-upload
                                                            tips="上传身份证正面照"
                                                            @changeFiles="voucherOne"
                                                            ref="voucherOne"
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
                                                            ref="voucherTwo"
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
                                            <div class="other-box">
                                                <el-checkbox v-model="hasMerchantApply">是否同时上传营业执照（认证企业车行）</el-checkbox>
                                            </div><!-- 其他信息 -->
                                            <transition name="slide-top">
                                                <div class="upload-inner" v-show="hasMerchantApply">
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
                                            </transition>
                                        </div><!-- 上传营业执照容器盒子 -->
                                        <div class="u-btn-box">
                                            <a class="u-btn" 
                                                @click="onSubmit()"
                                                >上传完毕，立即提交</a>
                                            <a class="u-btn hollow" 
                                                @click="onBack()"
                                                >返回上一步</a>
                                        </div><!-- 提交按钮 -->
                                    </div><!-- 上传容器 -->
                                </div>

                                <div class="m-tb-con"
                                    v-if="tabShowIndex==3">
                                    <div class="m-res-box">
                                        <div class="sign">
                                            <template v-if="memberData.authStatus==0">
                                                <i class="iconfont v1 icon-shenhe01"></i>
                                            </template><!-- 审核中 -->
                                            <template v-if="memberData.authStatus==-1">
                                                <i class="iconfont v2 icon-shenheweitongguo1"></i>
                                            </template><!-- 审核失败 -->
                                            <template v-if="memberData.authStatus==1">
                                                <i class="iconfont v3 icon-approved"></i>
                                            </template><!-- 审核失败 -->
                                        </div><!-- 标记(审核中、审核失败) -->
                                        <div class="m-hd">
                                            
                                        </div><!-- 头部信息 -->
                                        <div class="m-info" v-if="applyData">
                                            <div class="u-line-box">
                                                <span class="attr">车行名称：</span>
                                                <p class="data">{{applyData.CdgInfo.Name}}</p>
                                            </div>
                                            <div class="u-line-box">
                                                <span class="attr">认证类型：</span>
                                                <p class="data">{{theAuthType}}</p>
                                            </div>
                                            <div class="u-line-box">
                                                <span class="attr">认证人：</span>
                                                <p class="data">{{applyData.AuthInfo.CertificateName}}</p>
                                            </div>
                                            <div class="u-line-box">
                                                <span class="attr">车行地址：</span>
                                                <p class="data">{{applyData.CdgInfo.Address}}</p>
                                            </div>
                                            <div class="u-line-box">
                                                <span class="attr">证件号码：</span>
                                                <p class="data">{{applyData.AuthInfo.CertificateNumber}}</p>
                                            </div>
                                        </div><!-- 文本信息 -->
                                        <div class="m-voucher-photo" v-if="applyData">
                                            <div class="u-hd"
                                                ><span>您提交的相关证件照</span>
                                            </div>
                                            <ul class="m-photo-inner f__clearfix"
                                                :class="[applyData.AuthImgs.length==2?'v2':'',applyData.AuthImgs.length==3?'v3':'']"
                                                >
                                                <template v-for="(item,index) in applyData.AuthImgs"
                                                    >
                                                    <li class="u-item">
                                                        <div class="u-pic">
                                                            <img :src="item.ImgPath" :title="item.Title" />
                                                        </div>
                                                        <p class="tit">· {{item.Title}} · </p>
                                                    </li>
                                                </template>
                                            </ul>
                                        </div><!-- 证件图信息 -->
                                        <div class="u-btn-box" 
                                            v-if="(memberData.curApplyType=='个人车行'&&memberData.authStatus!=-1)||
                                                    (memberData.authStatus==-1)">
                                            <template
                                                v-if="memberData.curApplyType=='个人车行'&&memberData.authStatus!=-1"
                                                >
                                                <router-link class="u-btn" 
                                                    :to="{path:'/member/merchantApply'}"
                                                    >升级认证为企业车商</router-link>
                                            </template>
                                            <template
                                                v-if="memberData.authStatus==-1"
                                                >
                                                <a class="u-btn"
                                                    @click="anewApply(applyData)"
                                                    >重新发起认证</a>
                                            </template>
                                            
                                        </div><!-- 按钮容器 -->

                                    </div><!-- 结果 -->
                                </div>

                            </div><!-- 流程内容 -->
                        </div>
                    </div><!-- 认证容器 -->
                </member-inner>

            </div><!-- 认证资料提交(上传审核) -->
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
    
    // 城市级联选择组件
    import cityCascader from "components/cascader/citySelect.vue"

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    // 证件上传组件
    import voucherUpload from 'components/member/voucherUpload.vue'

    // 引入表单验证
    import { Validator } from 'vee-validate';

    export default {
        
        name: "putApply",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            // 城市级联选择组件
            cityCascader,
            // 证件上传组件
            voucherUpload,

        },
        // 数据
        data() {
            return{

                // 用户信息
                memberData: "",
                // 认证信息
                applyData: "",
                // 选项卡显示
                tabShowIndex: "",
                // 结果流程的文本显示
                lastFlowTetx: "上传完毕",

                // 认证id
                authId: "",
                // 认证人真实姓名
                authName: "",
                // 身份证号
                authNumber: "",
                // 车行认证类别（企业、个人）
                authType: "",
                // 车行名称
                cdgName: "",
                // 车行所在城市
                cdgCity: "",
                // 车行所在城市(修改)
                theCdgCity: "",
                // 车行所在详细地址
                cdgAddress: "",
                // 车行描述
                cdgDesc: "",

                // 表单验证报错集合
                errors: null,

                voucherId__1:"",           // 身份证正面
                voucherId__2:"",           // 身份证背面
                voucherId__3:"",           // 营业执照

                // 是否需要上传营业执照，认证企业车行
                hasMerchantApply: false,
                
            }
        },
        //生命周期,开始的时候
        created(){

            this.validator = new Validator({
                authName: 'required|CN_EN',
                authNumber: 'required|identity',
                cdgName: 'required|CN_EN',
                cdgCity: 'required',
                cdgAddress: 'required',
                cdgDesc: 'required|min:10|max:300',
            });
            this.$set(this, 'errors', this.validator.errors);
        },
        mounted(){

        },
        activated(){
            
            // 重置数据
            this.reset();
            this.authId = this.$router.currentRoute.query.authId||false;
            // 获取用户信息
            this.getMemberInfo();
            this.tabShowIndex = 1;
        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{
            theAuthType(){
                if(this.applyData.AuthInfo.AuthType=="个人车行"){
                    return "个人车商"
                }else if(this.applyData.AuthInfo.AuthType=="企业车行"){
                    return "企业车商"
                }
            }
            
        },
        // 数据侦听
        watch:{
            authName(val){
                this.validator.validate('authName',val);
            },
            authNumber(val){
                this.validator.validate('authNumber',val);
            },
            cdgName(val){
                this.validator.validate('cdgName',val);
            },
            cdgCity(val){
                this.validator.validate('cdgCity',val);
            },
            cdgAddress(val){
                this.validator.validate('cdgAddress',val);
            },
            cdgDesc(val){
                this.validator.validate('cdgDesc',val);
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
                        // 格式化用户信息
                        this.memberData = this._normalizeMember(res.data);
                        if(this.memberData.authStatusText!=""){
                            // 获取当前认证的信息
                            this.getApplyInfo(this.memberData.curApplyId);

                            this.tabShowIndex = 3;
                            if(this.memberData.authStatus==0){
                                this.lastFlowTetx = "请等待审核"
                            }else if(this.memberData.authStatus==-1){
                                this.lastFlowTetx = "审核失败"
                                this.theErrorApply();
                            }else if(this.memberData.authStatus==1){
                                this.lastFlowTetx = "认证成功"
                            }
                        }
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
            
            // 审核失败，展示用户理由
            theErrorApply(){
                this.$alert('后台人员备注：'+this.memberData.errorApplyText, '未通过审核', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: () => {
                        return;
                    }
                });
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

            // 城市级联(车行所在地)
            cdgCityChangeEnd(selected){
                this.cdgCity = this.$refs.cdgCityDom._getCityAllName();
            },

            // 前往下一步
            goPartTwo(){
                let me = this;
                this.validator.validateAll({
                    authName: this.authName,
                    authNumber: this.authNumber,
                    cdgName: this.cdgName,
                    cdgCity: this.cdgCity,
                    cdgAddress: this.cdgAddress,
                    cdgDesc: this.cdgDesc,
                }).then((res) => {
                    // 如果验证成功
                    if(res){
                        this.tabShowIndex = 2
                    }
                }).catch(error => {
                    console.log(error);
                });
            },

            // 重置（清空）
            reset(){
                this.authName = "";
                this.authNumber = "";
                this.cdgName = "";
                this.cdgCity = "";
                this.cdgAddress = "";
                this.cdgDesc = "";
                this.voucherId__1 = "";
                this.voucherId__2 = "";
                this.voucherId__3 = "";
                this.hasMerchantApply = false;
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
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
                // 如果想企业认证
                if(this.hasMerchantApply){
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
                }else{
                    let condition = this.voucherId__1!=""&&
                                    this.voucherId__2!="";
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
                }

                this.validator.validateAll({
                    authName: this.authName,
                    authNumber: this.authNumber,
                    cdgName: this.cdgName,
                    cdgCity: this.cdgCity,
                    cdgAddress: this.cdgAddress,
                    cdgDesc: this.cdgDesc,
                }).then((res) => {
                    
                    // 如果验证不成功
                    if(!res) {
                        this.$notify({
                            title: '数据丢失',
                            message: "您之前填写的数据已不存在，请重新填写",
                            type: 'error',
                            duration: 2000,
                        });
                        this.tabShowIndex = 1;
                        // 清空证件信息
                        this.flowTwoReset();
                        return;   
                    }

                    let myAuthId = "";

                    // 如果用户想要认证企业车行
                    if(this.hasMerchantApply){
                        myAuthId = (this.authId&&this.memberData.curApplyType!='个人车行')?this.authId:'';
                    }else{
                        // 如果用户想要认证个人车行
                        if(this.memberData.curApplyType=='个人车行'){
                            myAuthId = this.authId;
                        }else{
                            if(this.memberData.hasApplyCount==1){
                                myAuthId = "";
                            }else{
                                this.memberData.cdgAuth.forEach((item,index)=>{
                                    if(this.memberData.cdgAuth[index].AuthInfo.AuthType=="个人车行"){
                                        myAuthId = this.memberData.cdgAuth[index].AuthInfo.AuthId;
                                        
                                    }
                                })
                            }
                        }
                    }
                    
                    // 回调
                    setTimeout(()=>{
                        // 提交给后台的信息
                        let data = {
                            AuthId: myAuthId,
                            AuthType: this.hasMerchantApply?'企业车行':'个人车行',
                            CertificateType: "身份证",              // 证件类别：身份证
                            CertificateNumber: this.authNumber,     // 证件号码
                            SubmitDescription: this.cdgDesc,        // 申请备注内容，后台审核时可做参考
                            CertificateName: this.authName,         // 证件持有人
                            data: {
                                Name: this.cdgName,
                                Type: this.hasMerchantApply?'企业':'个人',
                                Address: this.cdgCity + "/" + this.cdgAddress,
                                Description: this.cdgDesc,
                            }
                        }
                        if(this.hasMerchantApply){
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
                        }else{
                            data.ImgInfo = [
                                {
                                    imgId : this.voucherId__1,
                                    imgTitle : "身份证正面",
                                },
                                {
                                    imgId : this.voucherId__2,
                                    imgTitle : "身份证背面",
                                }
                            ] 
                        }

                        // 向后台提交审核申请
                        this.putCommit(data);
                    });
                    

                }).catch(error => {
                    this.$notify({
                        title: '数据丢失',
                        message: "您之前填写的数据已不存在，请重新填写",
                        type: 'error',
                        duration: 1500,
                    });
                    this.tabShowIndex = 1;
                    // 清空证件信息
                    this.flowTwoReset();
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
                            duration: 1500,
                        });
                        this.tabShowIndex = 3;
                        // 刷新数据
                        this.getMemberInfo();

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
            
            // 返回上一步
            onBack(){
                this.tabShowIndex = 1;
                // 清空证件信息
                this.flowTwoReset();
                // 清空城市选择信息
                this.cdgCity = "";
            },

            // 清空步骤二的数据
            flowTwoReset(){
                this.hasMerchantApply = false;
                this.voucherId__1 = "";
                this.voucherId__2 = "";
                this.voucherId__3 = "";
                this.$refs.voucherOne.clearImg();
                this.$refs.voucherTwo.clearImg();
                this.$refs.voucherThree.clearImg();
            },
            
            // 重新发起认证
            anewApply(applyInfo){
                this.tabShowIndex = 1;
                this.lastFlowTetx = "上传完毕"
                this.authName = applyInfo.AuthInfo.CertificateName;
                this.authNumber = applyInfo.AuthInfo.CertificateNumber;
                this.cdgName = applyInfo.CdgInfo.Name;
                
                // 车行所在城市
                this.cdgCity = applyInfo.CdgInfo.Province+"/"+applyInfo.CdgInfo.City;
                this.theCdgCity = this.cdgCity;
                console.log(this.theCdgCity);
                // 车行具体地址
                this.cdgAddress = applyInfo.CdgInfo.Address.split("/")[2];
                // 车行描述
                this.cdgDesc = applyInfo.CdgInfo.Description;
                
                this.voucherId__1 = "";
                this.voucherId__2 = "";
                this.voucherId__3 = "";
                this.hasMerchantApply = false;
            }

        },
        
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-apply-wrap
        .el-cascader
            color $c_blue
            .el-input
                margin 2px 0 0
                width 330px
                .el-input__inner
                    height 38px
                    _borderAll(#e2e2e2)
                    _borderRadius(2px)
                    _placeholder(#a5a5a5,13px)
                    line-height 38px
                    vertical-align top
            span
                color @color
            .el-cascader__label
                height 38px
                line-height 38px
            &:hover
                .el-input__inner
                    _borderAll(#e2e2e2)
            .el-input__icon
                color #dedede
    .m-upload-wrap
        .el-checkbox__input
            vertical-align top
            _translate3d(0,7px)
            margin 0 2px 0 0
            cursor pointer
            .el-checkbox__inner
                cursor @cursor
        .el-checkbox__label
            color #777
            font-size 13px
            _spacingPlus()

</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
