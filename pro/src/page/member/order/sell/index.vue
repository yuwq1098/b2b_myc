<template>
    <div class="sellOrder">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的订单"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-order-con">
                        <div class="m-tab-box">
                            <ul class="m-tab-lst f__clearfix">
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(1)"
                                        :class="{'on':tabShowIndex==1}"
                                        class="u-tab-lk">发起合同
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(2)"
                                        :class="{'on':tabShowIndex==2}"
                                        class="u-tab-lk">待买方签署合同
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(3)"
                                        :class="{'on':tabShowIndex==3}"
                                        class="u-tab-lk">待买方支付保证金
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(4)"
                                        :class="{'on':tabShowIndex==4}"
                                        class="u-tab-lk">待支付保证金
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(5)"
                                        :class="{'on':tabShowIndex==5}"
                                        class="u-tab-lk">待买方支付托管车款
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(6)"
                                        :class="{'on':tabShowIndex==6}"
                                        class="u-tab-lk">待发货
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(7)"
                                        :class="{'on':tabShowIndex==7}"
                                        class="u-tab-lk">待买方验收
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(8)"
                                        :class="{'on':tabShowIndex==8}"
                                        class="u-tab-lk">交易成功
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="m-tab-wrap">
                            <order-list
                                :orderList= "sellerOrderList"
                                @cancelOrder="cancelOrder"
                                @safeguard="safeguard"
                                @sponsorContract="sponsorContract"
                                @payDeposit="payDeposit"
                                @delivery="delivery"
                                >
                            </order-list>
                        </div>
                    </div>
                </member-inner>

            </div><!-- 卖车订单内容 -->
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

    // 订单信息的构造类
    import {sellOrderInfo} from 'base/class/order.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    // 账单信息列表组件
    import orderList from 'components/member/sellOrderList.vue'

    export default {
        
        name: "sellOrder",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            orderList,
        },
        // 数据
        data() {
            return{
                // 选项卡显示
                tabShowIndex: "",
                // 买家订单列表数据
                sellerOrderList: [],
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 获取当前选项卡索引并显示对应的数据
            this.tabShowIndex = this.$router.currentRoute.query.tabIndex||1;
            this.tabChange(this.tabShowIndex);
        },
        // 退出的生命周期钩子
        deactivated(){

        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{
            
        },

        // 自定义函数(方法)
        methods: {
            // 选项卡切换方法
            tabChange(index){
                // 清除所有数据
                this.clearData();
                // 开始切换
                this.$router.push({
                    path:'/member/sellOrder',
                    query:{tabIndex:index},
                })
                // 在组件内切换
                this.tabShowIndex = index
                // 获取订单列表数据
                this.getOrderListData(index);
            },

            // 根据tabIndex 获取 status
            _getStatusByIndex(index){
                return ((+index)-1).toString();
            },
            
            // 格式化订单列表
            _normalizeOrder(list){
                let arr = []
                list.forEach((item, index) => {
                    arr.push(new sellOrderInfo(item));
                });
                return arr;
            },

            // 获取订单列表数据
            getOrderListData(index){
                let me = this;
                let _index = index.toString();
                let status = this._getStatusByIndex(_index);

                // 获取数据，然后回调赋值
                this.getData(status,1,(res) => {
                    this.sellerOrderList = this._normalizeOrder(res);
                })
            },

            // 获取数据
            getData(status,curPage=1,callBack){

                let data = {
                    OrderAscription: 'seller',
                    OrderStatus: status,
                    ClientAppType: 'pc',
                }
                api.getB2BOrder(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(callBack){
                            callBack(res.data);
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '订单列表信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 清空所有列表数据
            clearData(){
                
            },

            // 取消订单
            cancelOrder(id,status){
                let addStr = (status>2)?'，以及3000元交易保证金':''
                this.$confirm('您正在进行取消订单的操作，取消订单成功后，我司平台将会扣除您一定的信誉保证金'+addStr+'，请认真考虑后再确认取消订单！', '取消订单提示', {
                        confirmButtonText: '继续取消订单',
                        cancelButtonText: '再考虑看看',
                        type: 'warning'
                    }).then(() => {
                        this.cancelSellOrder(id);
                    }).catch(() => {
                        
                    });
            },
            
            // 卖方强制取消订单
            cancelSellOrder(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "-1",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功取消订单',
                            message: "您已成功取消订单，平台将自动扣取您一定的信誉保证金，祝您生活愉快！",
                            type: 'success',
                            duration: 2000,
                        });
                        this.tabChange(this.tabShowIndex);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '取消订单失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },
            

            // 申请维权
            safeguard(id){
                console.log("申请维权");
            },
            // 卖家发起合同
            sponsorContract(id){
                this.$router.push({path:'/member/contractSell',query:{cid:id}})
            },
            // 支付保证金
            payDeposit(id){
                this.$router.push({path:'/member/orderPay',query:{cid:id,auth:'seller'}})
            },
            // 确认发货
            delivery(id){
                this.$confirm('确认发货后，请您尽快出货给买方，买方收到交易的车辆后，即完成交易，若买方长时间未收到货或者无法与您取得联系，可能会申请仲裁进行维权！', '您确认发货吗？', {
                        confirmButtonText: '确认发货',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.sellDelivery(id);
                    }).catch(() => {
                        
                    });
            },

            // 卖方确认发货
            sellDelivery(orderId){
                let data = {
                    OrderId: orderId,
                    OrderStatus: "6",
                }
                api.changeB2BOrderStatus(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '确认发货成功',
                            message: "您已成功确认发货，买家有权发起仲裁维权，为保证您的信誉不受影响，请与买家保持沟通，诚信交易！",
                            type: 'success',
                            duration: 2000,
                        });
                        this.$router.push({path:'/member/buyOrderDetails',query:{cid:id}})
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '确认发货失败失败',
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
