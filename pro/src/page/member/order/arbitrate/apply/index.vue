<template>
    <div class="arbitrateApply">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="申请仲裁维权"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-arbitrate-con"
                        >
                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">订单相关</span>
                            </div>
                            <div class="m-con">
                                <div class="info-line">
                                    <div class="attr">订单编号：</div>
                                    <div class="data no">{{orderData.id}}</div>
                                </div>
                                <template v-if="auth=='buyer'">
                                    <div class="info-line">
                                        <div class="attr">卖方车行名称：</div>
                                        <div class="data">{{sellerData.cdgName}}</div>
                                    </div>
                                    <div class="info-line">
                                        <div class="attr">联系人：</div>
                                        <div class="data">{{sellerData.contacter}}</div>
                                    </div>
                                    <div class="info-line">
                                        <div class="attr">联系人电话：</div>
                                        <div class="data">{{sellerData.tel}}</div>
                                    </div>
                                </template>
                                <template v-else-if="auth=='seller'">
                                    <div class="info-line">
                                        <div class="attr">买家：</div>
                                        <div class="data">{{orderData.buyerName}}</div>
                                    </div>
                                    <div class="info-line">
                                        <div class="attr">买家电话：</div>
                                        <div class="data">{{orderData.buyerTel}}</div>
                                    </div>
                                </template>
                                
                            </div>
                        </div><!-- 提示 -->

                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">商品信息</span>
                            </div>
                            <div class="m-con">
                                <div class="order-con">
                                    <div class="product-info">
                                        <div class="u-pic-box">
                                            <div class="u-pic">
                                                <img :src="orderData.imgUrl" :alt="orderData.carTitle"/>
                                            </div>
                                        </div><!-- 图片容器 -->
                                        <div class="info-con">
                                            <div class="u-title"
                                                >{{orderData.carTitle}}
                                            </div>
                                            <div class="u-other"
                                                >   <span class="attr">车辆所在地</span>
                                                    <span class="data">{{orderData.inCity}}</span>

                                                    <span class="cut">|</span>
                                                  
                                                    <span class="attr">上牌时间</span>
                                                    <span class="data">{{orderData.plateDate | dateYearFormat}}</span>

                                                    <span class="cut">|</span>

                                                    <span class="attr">表显里程</span> 
                                                    <span class="data">{{orderData.mileage | mileFn(2)}}</span>
                                            </div>
                                            <div class="u-other"
                                                >   <span class="attr">排放标准</span>
                                                    <span class="data">{{basicInfo.dischargeStandard}}</span>

                                                    <span class="cut">|</span>
                                                  
                                                    <span class="attr">营运类型</span>
                                                    <span class="data">{{basicInfo.serviceType}}</span>

                                                    <span class="cut">|</span>
                                                    
                                                    <span class="attr">牌照归属地</span> 
                                                    <span class="data">{{basicInfo.inProvince}}</span>
                                            </div>
                                            <div class="u-price"
                                                >订单总额：
                                                <span class="price">
                                                    <em class="vital">{{orderData.price | priceFormat(2)}}</em>万元
                                                </span>
                                            </div>
                                        </div><!-- 信息内容 -->
                                    </div><!-- 商品信息 -->
                                </div><!-- 内容 -->
                            </div>
                        </div><!-- 商品信息 -->

                        <div class="m-section">
                            <div class="m-tit"
                                ><span class="tit">申请仲裁原因</span>
                            </div>
                            <div class="m-con">
                                <div class="u-line-box v2">
                                    <div class="attr">选择仲裁原因</div>
                                    <div class="box-inner">
                                        <div class="ipt radio-ipt"  v-if="arbitrateList.length>0">
                                            <template
                                                v-for="(item,index) in arbitrateList"
                                                >
                                                <el-radio class="radio" v-model="aCause" :label="item.label">{{item.value}}</el-radio>
                                            </template>
                                        </div><!-- 单项选择框 -->
                                    </div>
                                </div>
                                <div class="u-line-box">
                                    <div class="attr">请填写具体仲裁理由</div>
                                    <div class="box-inner">
                                        <div class="ipt-textarea">
                                            <div class="line-error" v-if="errors.has('aReplenish')">
                                                <p class="error-txt">
                                                    <i class="iconfont icon-jinggao1"></i>{{errors.first('aReplenish')}}</p>
                                            </div><!-- 错误验证 -->
                                            <textarea class="u-textarea" 
                                                v-model="aReplenish" 
                                                type="text" placeholder="请在此处输入具体的仲裁理由">
                                            </textarea>
                                        </div><!-- 选择框 -->
                                    </div>
                                </div>
                            </div>
                        </div><!-- 信息 -->

                        <div class="m-operate">
                            <div class="u-btn-box">
                                <a class="u-btn"
                                    @click="goArbitration()"
                                    >确认申请仲裁</a>
                            </div>
                        </div><!-- 申请仲裁（请求） -->

                    </div><!-- 维权申请页 -->
                </member-inner>

            </div><!-- 维权申请页 -->
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

    // 获取仲裁相关数据的本地化资源
    import * as arbitrateData from "api/localJson/arbitrate.js"

    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'
    // 卖家车行信息的构造类
    import {basicInfo,otherInfo} from 'base/class/carDetails.js'


    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    // 引入表单验证
    import { Validator } from 'vee-validate';

    export default {
        
        name: "arbitrateApply",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 订单id
                orderId: "",
                // 买/卖家支付保证金
                auth: "",
                // 订单详情信息
                orderData: new orderInfo({}),
                // 车辆基本信息
                basicInfo:{},
                // 卖家车行信息
                sellerData: {},

                // 申请仲裁的原因
                aCause: "",
                // 申请仲裁的原因（的补充）
                aReplenish: "",
                arbitrateList: [],
                
                // 表单验证报错集合
                errors: null,
            }
        },
        //生命周期,开始的时候
        created(){

            this.validator = new Validator({ 
                aReplenish: 'required|min:10|max:300',     // 申请仲裁的原因（的补充）
            });
            this.$set(this, 'errors', this.validator.errorBag);

        },
        mounted(){

        },
        activated(){

            // 数据重置
            this.reset();
            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";
            // 买卖家身份
            
            this.auth = this.$router.currentRoute.query.auth||"";

            if(this.auth=='buyer'){
                // 默认选择第一个
                this.aCause = arbitrateData.buyArbitrateList[0].value;
                this.arbitrateList = arbitrateData.buyArbitrateList;
            }else if(this.auth=="seller"){
                // 默认选择第一个
                this.aCause = arbitrateData.sellArbitrateList[0].value;
                this.arbitrateList = arbitrateData.sellArbitrateList;
            }
            // 获取订单详情信息
            this.getOrderDetail();

        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

            // 申请仲裁的原因（的补充）
            aReplenish(val){
                this.validator.validate('aReplenish',val);
            },

        },
        // 自定义函数(方法)
        methods: {

            // 格式化订单信息
            _normalizeOrderInfo(data) {
                return new orderInfo(data);
            },

            // 获取订单详情
            getOrderDetail(){
                var data = {
                    OrderId : this.orderId,
                }
                api.getB2BOrderDetail(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.orderData = this._normalizeOrderInfo(res.data[0]);
                        this.payAmount = this.orderData.price;
                        // 获取卖家车行信息
                        this.getCarDetailsInfo(this.orderData.carId);

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

            // 格式化车辆基本信息
            _normalizeBasicInfo(data) {
                return new basicInfo(data);
            },

            // 格式化车辆其他信息
            _normalizeOtherInfo(data) {
                return new otherInfo(data);
            },
            
            // 卖家车行信息
            getCarDetailsInfo(carId){

                var data = {
                    CarId : carId,
                }

                api.getCarDetalis(data).then((res) => {

                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)
                        // 获取车辆其他相关信息
                        this.sellerData = this._normalizeOtherInfo(res.data.OtherInfo);

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

            // 确认申请仲裁
            goArbitration(){

                this.validator.validateAll({    
                    aReplenish: this.aReplenish,              
                }).then((res) => {
                    
                    // 验证成功
                    if(res){
                        this.$confirm('确认申请仲裁后，系统即判定本次交易终止，将对责任方作出相应的惩罚，请认真考虑后作出决定，祝您生活愉快！', '确认申请仲裁吗？', {
                                confirmButtonText: '确认仲裁',
                                cancelButtonText: '再想想',
                                type: 'warning'
                            }).then(() => {
                                // 发起仲裁
                                this.putArbitration(this.orderId);
                            }).catch(() => {
                                
                            });
                    }

                }).catch(error => {
                    console.log(error);
                });
                
            },
            
            // 发起仲裁
            putArbitration(orderId){
                let data = {
                    OrderId: orderId,
                    StatusRemark: this.aCause+" => "+this.aReplenish,
                    OrderStatus: "-10",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功申请仲裁',
                            message: "您已成功申请仲裁，平台将在1至3个工作日内作出决断，请您耐心等待！",
                            type: 'success',
                            duration: 2500,
                        });
                        // 维权详情
                        setTimeout(()=>{
                            if(this.auth=='buyer'){
                                this.$router.push({path:'/member/arbitrateBuy',query:{cid:this.orderId}})
                            }else if(this.auth=="seller"){
                                this.$router.push({path:'/member/arbitrateSell',query:{cid:this.orderId}})
                            }
                        },300)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '仲裁申请异常',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 数据重置
            reset(){


                // 申请仲裁的原因
                this.aCause = "";
                // 申请仲裁的原因（的补充）
                this.aReplenish = "";

                setTimeout(() => {
                    this.errors.clear();
                })

            },

        },
        
    }
</script>


<!-- 限定作用域"scoped" -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-arbitrate-con
        .u-line-box
            .radio-ipt
                _display()
                .el-radio
                    color #4b5861
                    & *
                        cursor pointer
                .el-radio__label
                    padding-left 8px
                .el-radio__input
                    vertical-align top
                    _translate3d(0,11px)

</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
