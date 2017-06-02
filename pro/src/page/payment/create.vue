<template>
    <div id="payCreate">
        <div class="m-order-wrap">
            <div class="m-car-info f__clearfix">
                <div class="u-pic f__fl">
                    <img src="../../assets/img/car_02.jpg" alt="交易车辆的图片" />
                </div><!-- 图片 -->
                <div class="m-info-box f__fl">
                    <div class="u-tit">长城-M4 2012款 1.5L 手动豪华型 </div><!-- 车辆名称 -->
                    <div class="u-info">
                        <span class="u-nub">长城</span><!-- 汽车品牌 -->
                        <span class="u-nub">行驶3.56万公里</span><!-- 行驶里程 -->
                        <span class="u-nub">2次过户</span><!-- 过户次数 -->
                        <span class="u-nub">欧3</span><!-- 排放标准 -->
                        <span class="u-nub">2014年01月</span><!-- 生产时间 -->
                        <span class="u-nub">南昌</span><!-- 车辆归属地 -->
                        <span class="u-nub">非营运</span><!-- 使用性质 -->
                    </div>
                </div><!-- 订单信息 -->
                <div class="m-price f__fr">
                    <p class="u-price">成交价：<span class="vital"><em>4.00</em>万</span></p><!-- 成交价 -->
                    <p class="u-deposit">定金：<span class="vital"><em>3000</em>元</span></p><!-- 支付定金 -->
                </div><!-- 价格 -->
            </div><!-- 车辆订单信息 -->
            <div class="m-pay-box f__clearfix">
                <div class="u-pay-info f__fl">支付定金：<em class="vital">3000元</em></div>
                <router-link :to="{path:'/pay/contract'}" class="u-btn f__fr">支付定金</router-link>
            </div><!-- 支付信息 -->
        </div>
    </div>
</template>


<script>
   export default{
        name: "payCreate",
        //数据
        data(){
           return{
               step: 2,
           }
        },
        // 组件值传递（单向传递）
        props:{

        },
        //自定义函数（方法）
        methods:{
            stepFn(){
                this.$emit("showParentComp",this.step)
            }
        },
        //属性计算
        computed: {

        },
        //当el被$el替换，并挂载到实例上去之后调用该钩子
        mounted(){
            //子组件向父组件传值
            this.stepFn();
        },
        // 字段变化侦听
        watch: {
            
        },
        // 在当前模块注册组件
        components:{

        }
   }

</script>

<!-- 引入支付环节的页面样式 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
   @import "./create.styl"
</style>