<template>
    <div class="buyArbitrateList">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="买车仲裁列表"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-arbitrate-con"
                        >
                        <div class="m-tab-box">
                            <ul class="m-tab-lst f__clearfix">
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(1)"
                                        :class="{'on':tabShowIndex==1}"
                                        class="u-tab-lk">维权中
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;"
                                        @click="tabChange(2)"
                                        :class="{'on':tabShowIndex==2}"
                                        class="u-tab-lk">维权完成
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="m-tab-wrap">
                            <order-list
                                :orderList= "buyerOrderList"
                                auth="buyer"
                                >
                            </order-list>
                        </div>
                    </div><!-- 买车仲裁列表 -->
                </member-inner>

            </div><!-- 买车仲裁列表 -->
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
    import {orderInfo} from 'base/class/order.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    // 账单信息列表组件
    import orderList from 'components/member/arbitrateOrderList.vue'

    export default {
        
        name: "buyArbitrateList",
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
                buyerOrderList: [],
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
                    path:'/member/buyArbitrateList',
                    query:{tabIndex:index},
                })
                // 在组件内切换
                this.tabShowIndex = index
                // 获取订单列表数据
                this.getOrderListData(index);
            },

            // 根据tabIndex 获取 status
            _getStatusByIndex(index){
                let curIndex = "";
                switch(index){
                    case '1':
                        return curIndex = '-10'
                        break;
                    case '2':
                        return curIndex = '-1'
                        break;
                }
                return curIndex;
                
            },
            
            // 格式化订单列表
            _normalizeOrder(list){
                let arr = []
                list.forEach((item, index) => {
                    arr.push(new orderInfo(item));
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
                    this.buyerOrderList = this._normalizeOrder(res);
                })
            },

            // 获取数据
            getData(status,curPage=1,callBack){
                let data = {
                    OrderAscription: 'buyer',
                    OrderStatus: status,
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

        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'buy.styl'
</style>
