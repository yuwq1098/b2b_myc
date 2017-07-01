<!--  
 **  @description 车源信息列表组件
 --> 

 <template>
    <div class="sourceList">
        <div class="m-source-lst">
            <ul class="m-lst f__clearfix">
                <template v-for="item in sourceList">
                    <li class="m-item">
                        <source-box
                            :sourceInfo="item"
                            ><!-- 车源组件 -->
                        </source-box>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    
    // 车源信息盒子组件
    import sourceBox from 'components/member/sourceBox.vue'

    export default {

        name: "sourceList",
        // 在当前模块注册组件
        components:{
            sourceBox,
        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 车源信息
            sourceList: {
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
    .m-source-lst
        width 948px
        .m-lst
            width 100% + 16px
            margin 0 0 -14px -16px
            .m-item
                width 225px
                min-height 180px
                margin 0 0 16px 16px
                float left

</style>
