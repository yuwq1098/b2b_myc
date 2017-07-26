<template>
    <div class="billDetails">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="现金账户"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-details-wrap">
                        <div class="m-hd f__clearfix">
                            <p class="u-greet">欢迎来到<span class="vital">{{memberData.name}}</span>的小金库！</p><!-- 问候 -->
                            <p class="u-payPass f__clearfix">
                                <template v-if="!memberData.hasPaypwd">
                                    <router-link
                                        :to="{path:'/member/payPass'}" 
                                        class="lk" tag="a"
                                        title="设置或者修改您的支付密码"
                                        >开启支付密码
                                    </router-link>
                                    <p class="tips"><i class="iconfont icon-xinxi2"></i>
                                    <span class="txt">开启支付密码后，账户资金更安全！</span></p>
                                </template>
                                <template v-if="memberData.hasPaypwd">
                                    <router-link
                                        :to="{path:'/member/editPayPass'}" 
                                        class="lk" tag="a"
                                        title="设置或者修改您的支付密码"
                                        >修改支付密码
                                    </router-link>
                                </template>
                            </p><!-- 支付密码 -->
                        </div><!-- 头部内容 -->
                        <div class="m-con">
                            <div class="u-status-tit">
                                <p class="txt">{{billData.statusText}}</p>
                            </div><!-- 交易状态 -->
                            <div class="u-trade-info">
                                <ul class="u-lst">
                                    <li class="u-item">
                                        <span class="attr">交易流水号：</span><!-- 属性 -->
                                        <div class="data no">{{billData.billId}}</div><!-- 值 -->
                                    </li>
                                    <li class="u-item">
                                        <span class="attr">收支说明：</span><!-- 属性 -->
                                        <div class="data">{{billData.desc}}</div><!-- 值 -->
                                    </li>
                                    <li class="u-item"
                                        v-if="billData.direction!='提现'">
                                        <template
                                            v-if="billData.direction=='充值'"
                                            >
                                            <span class="attr">充值类型：</span><!-- 属性 -->
                                        </template>
                                        <template v-else>
                                            <span class="attr">交易类型：</span><!-- 属性 -->
                                        </template>
                                        <div class="data">( {{billData.source}} ) {{billData.direction}}</div><!-- 值 -->
                                    </li>
                                    <li class="u-item">
                                        <template
                                            v-if="billData.direction=='充值'"
                                            >
                                            <span class="attr">充值方式：</span><!-- 属性 -->
                                        </template>
                                        <template
                                            v-else-if="billData.direction=='提现'"
                                            >
                                            <span class="attr">提现方式：</span><!-- 属性 -->
                                        </template>
                                        <template v-else>
                                            <span class="attr">交易方式：</span><!-- 属性 -->
                                        </template>
                                        <div class="data">{{billData.payTypeText}}</div><!-- 值 -->
                                    </li>
                                    <li class="u-item" 
                                        v-if="billData.isBuyProduct"
                                        >
                                        <span class="attr">买方：</span><!-- 属性 -->
                                        <div class="data">{{orderData.buyerName}}（{{orderData.buyerTel}}）</div><!-- 值 -->
                                    </li>
                                    <li class="u-item" 
                                        v-if="billData.isBuyProduct"
                                        >
                                        <span class="attr">卖方：</span><!-- 属性 -->
                                        <div class="data">{{orderData.sellerName}}（{{orderData.sellerTel}}）</div><!-- 值 -->
                                    </li>
                                    <li class="u-item"
                                        v-if="billData.isBuyProduct"
                                        >
                                        <span class="attr">交易商品：</span><!-- 属性 -->
                                        <div class="data product">[{{orderData.inCity}}] {{orderData.carTitle}}</div><!-- 值 -->
                                    </li>
                                </ul>
                                <div class="u-price" 
                                    >共计：
                                    <span class="price">
                                        <em class="vital"
                                            >{{billData.price | priceFormat(2)}}</em> 元
                                    </span>
                                </div>
                            </div><!-- 交易信息 -->

                            <div class="u-progress-box" v-if="billData.progress&&billData.progress.length>0">
                                <div class="u-hd">
                                    <div class="tit">交易进度</div>
                                </div>
                                <div class="u-con">
                                    <ul class="u-progress-lst">
                                        <template v-for="(item,index) in billData.progress">
                                            <li class="u-item">
                                                <div class="desc">{{index+1}}. {{item.ProgressText}}</div>
                                                <div class="time">{{item.ProgressTime}}</div>
                                            </li>
                                        </template>
                                    </ul>
                                </div>    
                            </div><!-- 交易进度 -->

                            <div class="u-result-box">
                                <ul class="u-result-lst f__clearfix">
                                    <li class="u-item">
                                        <div class="attr">开始时间：</div>
                                        <p class="data">{{billData.startTime}}</p>
                                    </li>
                                    <li class="u-item">
                                        <div class="attr">成交时间：</div>
                                        <p class="data">{{billData.endTime}}</p>
                                    </li>
                                </ul>
                            </div><!-- 交易结果 -->

                        </div><!-- 交易内容 -->
                    </div>
                </member-inner>
            </div><!-- 账单详情页面内容 -->
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
    // 账单详情的构造类
    import {billDetails} from 'base/class/account.js'
    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'


    export default {
        name: "billDetails",
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
                // 用户信息
                memberData: {},
                // 账单详情信息
                billData: {},
                // 订单详情信息
                orderData: new orderInfo({}),
                // 账单ID
                billId: 0,
            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            
            // 获取用户信息
            this.getMemberInfo();

            // 获取hash 带参中的账单ID
            this.billId = this.$router.currentRoute.query.cid;

            // 获取账单详情信息
            this.getBillDetailsInfo();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{
            statusText(){
                
            }
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

            // 格式化账单详情
            _normalizeBillDetails(data) {
                return new billDetails(data);
            },
            
            // 获取账单详情信息
            getBillDetailsInfo(){
                var data = {
                    TradeId : this.billId,
                }
                api.getBillDetails(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.billData = this._normalizeBillDetails(res.data);
                        // 是否是车辆（商品）交易
                        if(this.billData.isBuyProduct){
                            this.getOrderDetail(this.billData.orderNo);
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
            
            // 格式化订单信息
            _normalizeOrderInfo(data) {
                return new orderInfo(data);
            },

            // 获取订单详情
            getOrderDetail(orderId){
                var data = {
                    OrderId : orderId,
                }
                api.getB2BOrderDetail(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.orderData = this._normalizeOrderInfo(res.data[0]);

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            }
        },
        
    }
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
