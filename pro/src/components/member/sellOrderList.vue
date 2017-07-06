<!--  
 **  @description 卖车 订单列表组件
 --> 

 <template>
    <div class="sellOrderList">
        <div class="m-order-lst">
            <div class="m-tb-hd f__clearfix">
                <span class="m-hd-item w-373 text-lt">订单信息</span>
                <span class="m-hd-item w-140 text-rt">交易金额</span>
                <span class="m-hd-item w-165 text-rt">交易状态</span>
                <span class="m-hd-item w-150 text-rt">操作</span>
            </div>
            <div class="m-tb-con">
                <ul class="m-tb-lst" v-if="orderList.length>0">
                    <template v-for="(item,index) in orderList">
                        <li class="m-tb-row">
                            <order-box
                                :orderInfo="item"
                                >
                            </order-box>
                        </li>
                    </template>
                </ul>
                <div class="no-data" v-if="orderList.length==0">
                    <not-content
                        speak="不好意思，您没有此类订单信息，可以去看看自己的车源哟~"
                        >
                        <router-link :to="{path:'/member/sourceHome'}" class="u-lk" tag="a">车源管理&gt;</router-link>
                        <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">发布新车&gt;</router-link>
                    </not-content><!-- 缺省组件 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    // 会员中心缺省组件
    import notContent from 'components/member/notCon.vue' 
    // 订单信息盒子组件
    import orderBox from 'components/member/sellOrderBox.vue' 

    export default {

        name: "sellOrderList",
        // 在当前模块注册组件
        components:{
            notContent,
            orderBox,
        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 订单列表信息
            orderList: {
                type: Array,
                default(){
                    return [];
                }
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
    .m-order-lst
        width 948px
        padding 15px 0 0
        .m-tb-hd
            width @width
            height 42px
            line-height 42px
            background #4B5861
            color #e2e2e2
            .m-hd-item
                _display()
                width 140px
                padding 0 15px
                font-size 14px
                _spacingPlus(2px)
                float left
        .m-tb-con
            .m-tb-lst
                .m-tb-row
                    margin 10px 0 0

        .m-tb-hd,
        .m-tb-con .m-tb-lst .m-tb-row
            .w-373
                width 373px
            .w-140
                width 140px
            .w-165
                width 165px
            .w-150
                width 150px
            .text-lt
                text-align left
            .text-rt
                text-align right
            .text-cr
                text-align center

</style>
