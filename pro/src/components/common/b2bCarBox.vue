<!--  
 **  @description b2b车辆信息盒子组件
 --> 

 <template>
    <div class="b2bCarBox">
        <div class="m-car-box">
            <router-link 
                :to="{path:carToPath, query: { CarId: item.id }}" 
                target="_blank"  
                class="u-box" 
                tag="a"
                >
                <div class="u-pic">
                    <img v-lazy="item.imgUrl" :alt="item.name"/>
                </div>
                <div class="u-con">
                    <h5 class="u-tit">
                        {{item.name}}
                    </h5>
                    <p class="u-des">{{item.city}}/{{item.plateDate | dateFnToYear }}/{{item.mileage | mileFn}}</p>
                    <div class="u-price">
                        <em>{{item.retailPrice | priceToFixed(1)}}</em>
                    </div>

                    <a href="javascript:;" class="u-lk" v-if="boxType=='b2b'">
                        <p class="u-count">
                            <strong>215</strong>
                            次
                        </p>
                        <p>围观</p>
                    </a>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    
    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"

    export default {

        name: "b2bCarBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            carInfo: {
                type: Object,
                default(){
                    return new b2bCarInfo({});
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
    .m-car-box
        width 285px
        height 400px
        background #e2e2e2
        _boxShadow(12px,rgba(0,0,0,.15))


</style>
