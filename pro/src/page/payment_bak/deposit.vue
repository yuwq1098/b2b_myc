<template>
    <div id="payDeposit">
        <div class="m-pay-deposit">
            <div class="m-tip">请在<span class="u-time">72小时</span>内支付定金，逾期将关闭订单</div><!-- 提示信息 -->

            <div class="m-order-box f__clearfix">
                <div class="m-price f__fl">支付定金：
                    <em class="vital">￥3000</em>
                </div><!-- 定金 -->
                <div class="m-info f__fr">
                    <div class="m-con-box f__clearfix">
                        <div class="u-pic f__fl">
                            <img src="../../assets/img/car_02.jpg" alt="交易车辆的图片" />
                        </div>
                        <div class="u-con f__fl">
                            <p class="u-tit">长城-M4 2012款 1.5L 手动豪华型</p>
                            <div class="u-info">
                                <span class="u-nub">长城</span><!-- 汽车品牌 -->
                                <span class="u-nub">行驶3.56万公里</span><!-- 行驶里程 -->
                                <span class="u-nub">2次过户</span><!-- 过户次数 -->
                                <span class="u-nub">欧3</span><!-- 排放标准 -->
                                <span class="u-nub">2014年01月</span><!-- 生产时间 -->
                                <span class="u-nub">南昌</span><!-- 车辆归属地 -->
                                <span class="u-nub">非营运</span><!-- 使用性质 -->
                            </div>
                        </div>
                    </div>
                    <div class="u-price">成交价：￥<span class="vital">4.00万</span></div><!-- 价格 -->
                </div><!-- 订单主要信息 -->
            </div><!-- 订单信息 -->

            <div class="m-pay-choose">
                <div class="m-bank">
                    <div class="u-hd">网上银行（需要开通网上银行，支持绝大多数银行）</div>
                    <div class="m-lst-box">
                        <ul class="m-bankcard-lst f__clearfix">
                            <li class="u-item" v-for="(item,index) of bankList" @click="icoClick(1,index)">

                                <i class="iconfont icon-round" v-show="!bankSel[index]"></i>
                                <i class="iconfont icon-yuanxingxuanzhongfill on" v-show="bankSel[index]"></i>
                                <div class="u-pic">
                                    <img :src="item.imgUrl" :alt="item.name"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div><!-- 银行卡选择 -->
                <div class="m-ohter">
                    <div class="u-hd">第三方支付平台</div>
                    <div class="m-lst-box">
                        <ul class="m-other-lst f__clearfix">
                            <li class="u-item" v-for="(item,index) of otherPayList" @click="icoClick(2,index)">

                                <i class="iconfont icon-round" v-show="!otherSel[index]"></i>
                                <i class="iconfont icon-yuanxingxuanzhongfill on" v-show="otherSel[index]"></i>
                                <div class="u-pic">
                                    <img :src="item.imgUrl" :alt="item.name"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div><!-- 其他 -->
            </div><!-- 支付方式选择 -->

            <div class="m-btn-box f__clearfix">
                <a href="javascript:;" class="u-btn f__fr">确认支付</a>
            </div><!-- 支付按钮 -->

        </div>
    </div>
</template>


<script>
    
    import $ from "jquery"

    //银行支付
    var bankList = [{
        "name":"农业银行",
        "imgUrl":require("../../assets/img/bank-NY.png"),
    },{
        "name":"农业银行",
        "imgUrl":require("../../assets/img/bank-NY.png"),
    },{
        "name":"农业银行",
        "imgUrl":require("../../assets/img/bank-NY.png"),
    },{
        "name":"农业银行",
        "imgUrl":require("../../assets/img/bank-NY.png"),
    },{
        "name":"农业银行",
        "imgUrl":require("../../assets/img/bank-NY.png"),
    }];
    


    var otherPayList = [{
        "name":"支付宝",
        "imgUrl":require("../../assets/img/pay-alipay.png"),
        class: "aliPay",  //为特殊的元素加上对应类名
    },{
        "name":"微信支付",
        "imgUrl":require("../../assets/img/pay-weChat.png"),
        class: "weCahtPay",   //为特殊的元素加上对应类名
    }]

    export default{
        name: "payDeposit",
        //数据
        data(){
           return{
               bankList: bankList,
               otherPayList: otherPayList,
               bankSel: [],
               otherSel: [],
               selectArr: [],
           }
        },
        // 组件值传递（单向传递）
        props:{

        },
        //自定义函数（方法）
        methods:{

            //模拟的单选按钮单击触发
            icoClick(type,index){
                this.bankSelUpdate();
                this.otherSelUpdate();
                if(type==1){
                    this.bankSelUpdate(index,true);
                }else if(type==2){
                    this.otherSelUpdate(index,true);
                }
            },
            //银行卡支付方式选中更新
            bankSelUpdate(index=-1,bool=false){
                var _this = this;
                if(index==-1){
                    _this.bankSel = []
                    _this.bankList.forEach(function(item) {
                        _this.bankSel.push(bool);
                    });
                }else{
                    _this.$set(_this.bankSel,index,bool);
                }
            },
            //其他支付方式选中更新
            otherSelUpdate(index=-1,bool=false){
                var _this = this;
                if(index==-1){
                    _this.otherSel = []
                    _this.otherPayList.forEach(function(item) {
                        _this.otherSel.push(bool);
                    });
                }else{
                    _this.$set(_this.otherSel,index,bool);
                }
            },

        },
        //属性计算
        computed: {
            
        },
        //当el被$el替换，并挂载到实例上去之后调用该钩子
        mounted(){
            this.bankSelUpdate();
            this.otherSelUpdate();
        },
        // 字段变化侦听
        watch: {
            
        },
        // 在当前模块注册组件
        components:{

        }
   }

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "./deposit.styl"
</style>