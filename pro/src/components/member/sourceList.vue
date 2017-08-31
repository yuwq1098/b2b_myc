<!--  
 **  @description 车源信息列表组件
 --> 

 <template>
    <div class="sourceList">
        <div class="m-source-lst">
            <ul class="m-lst f__clearfix" :class="{'onEdit':onEdited}">
                <el-checkbox-group v-model="theStick" @change="theStickChange">
                    <template v-for="(item,index) in sourceList">
                        
                        <li class="m-item">
                            <!-- <el-checkbox v-model="theStick"
                                class="u-checkbox"
                                >
                            </el-checkbox> -->
                            <el-checkbox v-show="onEdited" class="u-checkbox" :label="item.id" :key="item.id"></el-checkbox>
                            <source-box
                                :data-id="item.id"
                                @addedSource="addedSource"
                                @editSource="editSource"
                                @soldOutSource="soldOutSource"
                                @delSource="delSource"
                                :sourceInfo="item"
                                :onEdit="onEdited"
                                @changeCheck="changeCheck"
                                ><!-- 车源组件 -->
                            </source-box>
                        </li>
                    </template>
                </el-checkbox-group>
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
                allTheStick: [],
                theStick: [],
                testCheck: false,
            }
        },
        computed:{
            // newSourceList(){
            //     var newArr = []; 
            //     this.sourceList.forEach((item,index)=>{
            //         item.checked = false;
            //         newArr.push(item);
            //     })
            //     return newArr;
            // }
        },
        props:{
            // 车源信息
            sourceList: {
                type: Array,
                default(){
                    return [];
                }
            },
            // 是否是在售
            isOnSale:{
                type: Boolean,
                default: false,
            },
            // 是否在编辑
            onEdited:{
                type: Boolean,
                default: false,
            },
            // 是否全选
            allInChecked:{
                type: Boolean,
                default: false,
            }

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

        },
        // 数据侦听
        watch:{
            allInChecked(val){
                this.allInOnOff(val);
            },
            theStick(val){
                if(val.length==0
                    ||val.length==this.allTheStick.length){
                    this.$emit('indeterminateCheck',false);
                }else{
                    this.$emit('indeterminateCheck',true);
                }
            },
            onEdited(val){
                if(val){
                    this.allTheStick = this.getAllTheStick();
                    // 获取编辑选择的所有项
                    this.theStick = [].concat(this.allTheStick);
                    // 首次触发变化
                    this.theStickChange();
                }
            },
            // 车源变化
            sourceList:{
                handler(curVal,oldVal){
                    this.allTheStick = this.getAllTheStick();
                    // 获取编辑选择的所有项
                    this.theStick = [].concat(this.allTheStick);
                    // 首次触发变化
                    this.theStickChange();
                },
                deep:true
            },
        },
        // 自定义函数(方法)
        methods: {
            getAllTheStick(){
                let arr = [];
                this.sourceList.forEach((item,index)=>{
                    arr.push(item.id);
                })
                return arr;
            },
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
            },
            theStickChange(){
                this.$emit('theStickChange',this.theStick);
            },
            // 改变单个check
            changeCheck(id){
                let i =0, len=this.theStick.length;
                if(len){
                    let hasVal = false;

                    for(;i<len;i++){
                        if(this.theStick[i] == id){
                            hasVal = true;
                            this.theStick.splice(i,1);
                            break;
                        }
                    }
                    if(!hasVal){
                        this.theStick.push(id);
                    }    
                }else{
                    this.theStick.push(id);
                }
                // 自动触发全选全部选
                if(this.theStick.length==0){
                    this.$emit('onOffAllCheckFn',false);
                }else if(this.theStick.length==this.allTheStick.length){
                    this.$emit('onOffAllCheckFn',true);
                }
                // 触发变化
                this.theStickChange();
            },
            // 全选/全不选
            allInOnOff(val){
                this.theStick = val?[].concat(this.allTheStick):[];
                // 非不确定选择
                this.$emit('indeterminateCheck',false);
                // 触发变化
                this.theStickChange();
            }
        },    
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .m-source-lst
        .el-checkbox
            .el-checkbox__label
                display none!important
            .el-checkbox__inner
                cursor pointer!important

</style>

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
            &.onEdit
                .m-item
                    width 200px
                    padding 0 0 0 25px
                    position relative
                    .u-checkbox
                        _completeCenter(0,auto,0,auto)

</style>
