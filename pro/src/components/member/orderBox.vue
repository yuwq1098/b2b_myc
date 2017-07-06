<!--  
 **  @description 订单信息盒子组件
 --> 

 <template>
    <div class="orderBox">
        <div class="m-order-box">
            还蛋疼不
        </div>
    </div>
</template>

<script>
    
    // 订单信息的构造类
    import {orderInfo} from 'base/class/order.js'

    export default {

        name: "orderBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 订单列表信息
            orderInfo:{
                type: Object,
                default(){
                    return new orderInfo({})   
                },
            },
        },
        // 自定义函数(方法)
        methods: {

        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'


</style>
