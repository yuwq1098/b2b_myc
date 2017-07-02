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
                            @addedSource="addedSource"
                            @editSource="editSource"
                            @soldOutSource="soldOutSource"
                            @delSource="delSource"
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
            // 上架车源(当已是上架时，刷新置顶，每天一次)
            addedSource(id,acted){
                this.$emit("addedSource",id,acted);
            },
            // 编辑车源 
            editSource(id){
                this.$emit("editSource",id);
            },
            // 下架车源 
            soldOutSource(id){
                this.$emit("soldOutSource",id);
            },
            // 删除车源
            delSource(id){
                this.$emit("delSource",id);
            }
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
