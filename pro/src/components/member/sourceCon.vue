<!--  
 **  @description 车源管理父容器组件
 --> 

 <template>
    <div class="sourceCon">
        <div class="m-manage-con">
            <div v-show="isOnSale" class="m-bulk-box">
                <div class="u-choose">
                    <el-checkbox v-model="isAllStick" 
                        v-show="isSelected"
                        :indeterminate="isIndeterminate"
                        >{{theText}}
                    </el-checkbox>
                </div><!-- 全部置顶 -->

                <div class="btn-wrap f__clearfix">
                    <a class="u-btn bulk-edit" @click="bulkEdit()" v-show="!isSelected">批量置顶</a>
                    <a class="u-btn affirm" @click="onPut()" v-show="isSelected">确认</a>
                </div><!-- 批量编辑按钮 -->
            </div>
            <slot name="content">

            </slot>
            <div class="m-more" v-show="isShowMore">
                <a href="javascript:;" class="u-lk" 
                    @click="getMoreData()"
                    v-if="!isNotMore"
                    >获取更多...</a>
                <p class="u-txt" v-if="isNotMore">没有更多了~</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        name: "sourceCon",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                // 是否为批量编辑
                isAllStick: this.allInChecked,
                
                // 是否为正在选择的状态
                isSelected: false,
                // 全选/全不选
                theText: "全不选",
            }
        },
        props:{
            // 是否到底了(是否没有更多)
            isNotMore: {
                type: Boolean,
                default: false,
            },
            // 显示只选择了部分
            isIndeterminate: {
                type: Boolean,
                default: false,
            },
            // 是否显示更多
            isShowMore:{
                type: Boolean,
                default: false,
            },
            tabShowIndex: {
                type: Number,
                default: 1,
            },
            // 车源信息
            sourceList: {
                type: Array,
                default(){
                    return [];
                }
            },
            // 是否为全选和全不选
            allInChecked: {
                type: Boolean,
                default: false,
            },
            // 是否是在售
            isOnSale:{
                type: Boolean,
                default: false,
            },
        },
        // 数据侦听
        watch:{
            // 正在编辑中的值传递
            isSelected(val){
                if(val){
                    this.$emit("sourceEdited",true);
                    this.isAllStick = this.allInChecked;
                }
            },
            allInChecked(val){
                this.isAllStick = val;
                if(val){
                    this.theText = "全不选";
                }
                else{
                    this.theText = "一键全选";
                }
            },
            // 是否全选，向上派发事件
            isAllStick(val){
                this.$emit("onOffAllChange",val)
            },
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            
        },
        // 退出的生命周期钩子
        deactivated(){
            this.reset();
        },
        // 自定义函数(方法)
        methods: {
            // 获取更多数据
            getMoreData(){
                this.$emit("getMoreData")
            },
            // 批量编辑
            bulkEdit(){
                // 开始编辑
                this.isSelected = true;
            },
            // 确认编辑
            onPut(){
                // 关闭编辑
                this.$emit("sourceEdited",false)
                // this.reset();
            },
            
            // 重置
            reset(){
                this.isAllStick = this.allInChecked;
                this.isSelected = false;
            }

        },    
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    .m-manage-con
        .u-choose
            .el-checkbox__input
                -webkit-transform translate3d(0,-1px,0)!important;
                -moz-transform translate3d(0,-1px,0)!important;
                -o-transform translate3d(0,-1px,0)!important;
                transform translate3d(0,-1px,0)!important;

            .el-checkbox__inner
                cursor pointer!important
                
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-manage-con
        width 100%
        min-height 420px
        margin 15px 0 0
        _unUserSelect()
        .m-bulk-box
            height 32px
            width 100%
            margin 0 0 15px
            position relative
            .u-choose
                line-height @height
            .btn-wrap
                width 250px
                height @height
                _completeCenter(auto,0,)
                .u-btn
                    float right
                    _display()
                    background #4B5861
                    height @height
                    line-height @height
                    padding 0 20px
                    _borderRadius(3px)
                    font-size 13px
                    _spacingPlus(3px)
                    color #f0f0f0
                    _transitionAll(.15s)
                    &:hover
                        background @background + 12%
                    &:active
                        background @background + 4%
                    &.affirm
                        _borderRadius(16px)
                        background $c_blue
                        &:hover
                            _borderRadius(3px)
                            background @background + 12%
                        &:active
                            background @background + 4%
                    &.bulk-edit:hover
                        _borderRadius(16px)
                        _transitionAll(.2s,ease-out)
        .m-more
            margin 30px 0 0
            padding 0 0 45px
            height 42px
            line-height 42px
            text-align center
            position relative
            .u-lk
                _display(inline-block)
                height 40px
                line-height @height
                padding 0 50px
                font-size 16px
                color #4B5861
                _borderAll(#4B5861)
                _spacingPlus(3px)
                _borderRadius(21px)
                &:hover
                    color #2f98e2
                    _borderAll(#2f98e2)
            .u-txt
                color #40474A
                font-size 16px
                _spacingPlus(2px)

        
</style>
