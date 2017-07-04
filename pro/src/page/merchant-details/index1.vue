<template>
    <div class="merchantDetails">
        <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <div class="m-merchant-hd">
                        
                        <div class="u-cdgName">
                            {{merchantData.name}}
                        </div>
                        <!-- <div class="u-cdgName f__clearfix">
                            <span class="u-name">{{merchantData.name}}</span>
                            <span class="u-type">{{merchantData.authType}}</span>
                        </div> --><!-- 车行名称 -->

                        <div class="u-info">
                            <p class="txt">
                                <span>联系人：{{merchantData.username}}</span>
                                <span>联系电话：{{merchantData.tel}}</span>
                            </p>
                            <p class="txt">
                                <span>地址：{{merchantData.address}}</span>
                            </p>
                        </div><!-- 联系人信息 -->

                        <div class="u-grade">
                            <div>
                                <el-rate
                                    v-model="gradeNum"
                                    disabled
                                    show-text
                                    text-color="#ff6533"
                                    text-template="5.0"
                                    >
                                </el-rate>
                            </div>
                            <div>成交数：120单</div>
                        </div><!-- 车行成绩 -->

                        <div><i class="iconfont"></i>已关注</div><!-- 关注 -->

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


    export default {
        name: "merchantDetails",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{

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
        },
        
    }
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
