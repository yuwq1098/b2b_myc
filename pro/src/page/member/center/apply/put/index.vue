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
                                    <div class="u-upload-wrap">
                                        
                                    </div><!-- 上传容器 -->
                                </div>

                                <div class="m-tb-con"
                                    v-if="tabShowIndex==3">
                                    <div class="m-res-box">
                                        结果页
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
    // 城市级联选择组件
    import cityCascader from "components/cascader/citySelect.vue"

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

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
        },
        // 数据
        data() {
            return{

                // 选项卡显示
                tabShowIndex: "",
                // 结果流程的文本显示
                lastFlowTetx: "上传完毕",
                
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
                // 车行所在详细地址
                cdgAddress: "",
                // 车行描述
                cdgDesc: "",

                // 表单验证报错集合
                errors: null,
                
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
            this.$set(this, 'errors', this.validator.errorBag);
        },
        mounted(){

        },
        activated(){
            // 重置数据
            this.reset();
            this.tabShowIndex = 2;
        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

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
                }).then(() => {
                    this.tabShowIndex = 2
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
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            },
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
            span
                color @color
            .el-cascader__label
                line-height 40px
            &:hover
                .el-input__inner
                    _borderAll(#e2e2e2)
            .el-input__icon
                color #dedede

</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
