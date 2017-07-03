<!--  
 **  @description 账单列表组件
 --> 

 <template>
    <div class="billList">
        <div class="m-bill-lst">
            <div class="m-tb-hd">
                
            </div>
            <div class="m-tb-con">
                
            </div>
        </div>
    </div>
</template>

<script>
    

    export default {

        name: "billList",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 账单列表信息
            billList: {
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
    .m-bill-lst
        width 948px

</style>
