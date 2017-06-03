<template>
    <div id="payDeposit">
        <div class="m-pay-deposit">
            <div class="m-tip">请在<span class="u-time">72小时</span>内支付定金，逾期将关闭订单</div><!-- 提示信息 -->

            <div class="m-order-info">
                 
            </div><!-- 订单信息 -->

            <div class="m-pay-choose">
                <div class="m-bank">
                    <div class="u-hd">网上银行（需要开通网上银行，支持绝大多数银行）</div>
                    <div class="m-lst-box">
                        <ul class="m-bankcard-lst f__clearfix">
                            <li class="u-item">
                                <i class="iconfont"></i>
                                <div class="u-pic">
                                    <img src="../../assets/img/bank-NY.png" alt="农业银行"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div><!-- 银行卡选择 -->
                <div class="m-ohter">
                    <div class="u-hd">第三方支付平台</div>
                </div><!-- 其他 -->
            </div><!-- 支付方式选择 -->

            <div class="m-btn-box f__clearfix">
                <a href="javascript:;" class="u-btn f__fr">确认支付</a>
            </div><!-- 支付按钮 -->

            //单选测试
            <div class="hello"> 
                <ul>
                    <li v-for="(item, index) in proData"> 
                        
                        <p>{{item.name}}</p>
                        <p>{{selectArr[index]}}</p>   
                        
                    </li>
                </ul> 
                <button type="" @click="del">删除</button>{{selectArr}} 
                <label> 
                <input type="checkbox" class="checkbox" @click="selectAll" />全选 
                </label> 
            </div> 

        </div>
    </div>
</template>


<script>
    var proData = [{
        "name": "j1ax"
    },{
        "name": "j2ax"
    },{
        "name": "j3ax"
    },{
        "name": "j4ax"
    }]

    export default{
        name: "payDeposit",
        //数据
        data(){
           return{
               proData: proData,
               selectArr: []
           }
        },
        // 组件值传递（单向传递）
        props:{

        },
        //自定义函数（方法）
        methods:{
            del() {
                let arr = [];
                var len = this.proData.length;
                for (var i = 0; i < len; i++) {
                    if (this.selectArr.indexOf(i)>=0) {
                        console.log(this.selectArr.indexOf(i))
                }else{
                        arr.push(proData[i])
                    }
                }
                this.proData = arr;
                this.selectArr = []
            },
            selectAll(event) {
                var _this = this;
                console.log(event.currentTarget)
                if (!event.currentTarget.checked) {
                    this.selectArr = [];
                } else { //实现全选
                    _this.selectArr = [];
                    _this.proData.forEach(function(item, i) {
                        console.log(i)
                        _this.selectArr.push(i);
                    });
                }
            }
        },
        //属性计算
        computed: {
            
        },
        //当el被$el替换，并挂载到实例上去之后调用该钩子
        mounted(){
            var _this = this;
            _this.proData.forEach(function(item, i) {
                console.log(i);
                _this.selectArr.push(true);
            });
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