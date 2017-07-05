<template>
    <div class="merchantDetails">
        <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-merchant-box">
                        <div class="m-merchant-hd">

                            <div class="m-cdgName f__clearfix">
                                <span class="u-name">{{merchantData.name}}</span>
                                <span class="u-type">{{merchantData.authType}}</span>
                            </div><!-- 车行名称 -->

                            <div class="m-collect f__clearfix">
                                <div class="grade">
                                    <el-rate
                                        v-model="gradeNum"
                                        disabled
                                        show-text
                                        text-color="#F1AD0D"
                                        text-template="5.0"
                                        >
                                    </el-rate>
                                </div>
                                <div class="attention not"
                                    @mouseover="attentionFn(0,1)"
                                    @mouseleave="attentionFn(0,2)"
                                    v-if="merchantData.isFavorite"
                                    >
                                    <span class="txt">{{attentionNot.text}}</span><i class="iconfont"
                                        :class="[attentionNot.isHover?'icon-like_fill':'icon-like']"></i>
                                </div>
                                <div class="attention yes"
                                    @mouseover="attentionFn(1,1)"
                                    @mouseleave="attentionFn(1,2)"
                                    v-if="!merchantData.isFavorite"
                                    >
                                    <span class="txt">{{attentionYes.text}}</span><i class="iconfont"
                                        :class="[attentionYes.isHover?'icon-like':'icon-like_fill']"></i>
                                </div>
                            </div><!-- 评分与收藏 -->

                            <div class="m-contact">
                                <span class="name">{{merchantData.username}}</span>
                                <span class="tel">{{merchantData.tel}}</span>
                            </div><!-- 联系人信息 -->

                            <div class="m-result f__clearfix">
                                <p class="u-info">
                                    <span class="attr">在售：</span>
                                    <span class="data">{{merchantData.fixtureNumber}}</span>
                                </p>
                                <p class="u-info">
                                    <span class="attr">已成交：</span>
                                    <span class="data">{{merchantData.onSale}}</span>
                                </p>
                            </div><!-- 在售及已成交 -->

                            <div class="m-address">
                                <p class="u-address">
                                    <span class="attr">车行地址：</span>
                                    <span class="data">{{merchantData.address | addressFormat}}</span>
                                </p>
                            </div><!-- 地址 -->
                        </div><!-- 头部车商信息 -->
                        <div class="m-merchant-con">
                            <div class="m-hd">
                                <p class="u-tit">在售车辆</p>
                            </div><!-- 标题 -->
                            <div class="m-lst-wrap">
                                <ul class="m-car-lst">
                                    <template v-for="n in 10">
                                        <li>车信息</li>
                                    </template>
                                </ul><!-- 车辆列表 -->
                                <div class="u-more">
                                    <p>更多车源</p>
                                </div><!-- 更多车源 -->
                            </div><!-- 列表容器 -->
                        </div><!-- 所属车辆列表信息 -->
                    </div><!-- 盒子 -->
                    
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 车行信息的构造类
    import {merchantInfo} from 'base/class/merchantInfo.js'
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"


    export default {
        name: "merchantDetails",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{
                // 车行（或卖家）ID
                merchantId: "",
                // 车行数据
                merchantData: "",
                // 分数
                gradeNum: 5,
                 
                // 未关注的信息
                attentionNot:{
                    text: "关注",
                    isHover: false,
                },
                // 已关注的信息
                attentionYes:{
                    text: "已关注",
                    isHover: false,
                },
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取卖家ID
            this.merchantId = this.$router.currentRoute.query.cid||0;
            // 获取卖家信息
            this.getMerchantInfo(this.merchantId);
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 格式化车行信息
            _normalizeMerchant(data) {
                return new merchantInfo(data);
            },
            // 获取卖家信息
            getMerchantInfo(id){
                let data = {
                    SellerId: id,
                }
                api.CDGStoreDetails(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.merchantData = this._normalizeMerchant(res.data);
                        console.log("劳资看看你",this.merchantData)
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
            attentionFn(isFavorite,mouseFn){
                if(isFavorite==0){
                    if(mouseFn==1){
                        this.attentionNot = {
                            text: "立即关注",
                            isHover: true,
                        }
                    }else{
                        this.attentionNot = {
                            text: "关注",
                            isHover: false,
                        }
                    }
                }else{
                    if(mouseFn==1){
                        this.attentionYes = {
                            text: "取消关注",
                            isHover: true,
                        }
                    }else{
                        this.attentionYes = {
                            text: "已关注",
                            isHover: false,
                        }
                    }
                }
            }
        },
        
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-merchant-hd
        .m-collect
            .grade
                margin-top 4px
                .el-rate
                    height 20px
                    line-height 20px
                .el-rate__icon
                    font-size 15px
                    _spacingPlus(-1px)
                .el-rate__text
                    font-size 15px
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
