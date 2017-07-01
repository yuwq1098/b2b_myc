<!--  
 **  @description 车源信息盒子组件
 --> 

 <template>
    <div class="sourceBox">
        <div class="m-source-box">
            <a href="javascript:;" class="m-lk">
                <div class="m-pic-box">
                    <div class="u-pic">
                        <img :src="sourceInfo.imgUrl" :alt="sourceInfo.title"/>
                    </div>
                </div>
                <div class="m-mask">
                    
                </div><!-- 遮罩内容（操作部分） -->
                <div class="m-con">
                    
                </div><!-- 车源主要信息 -->
            </a>
        </div>
    </div>
</template>

<script>

    export default {

        name: "sourceBox",
        // 在当前模块注册组件
        components:{

        },
        // 数据
        data() {
            return{
                
            }
        },
        props:{
            // 车源信息
            sourceInfo: Object,
            // 盒子类型
            boxType: {
                type: String,
                default: ""
            } 
        },
        // 自定义函数(方法)
        methods: {
            
        },    
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-source-box
        width 225px
        height 265px
        _boxShadow(12px,rgba(0,0,0,.15),1px,1px)
        position relative
        .m-lk
            _display()
            width 100%
            height 100%
            _overflow()
            position relative
            .m-pic-box
                width @width
                height 165px
                position relative
                .u-pic
                    width @width
                    height @height
                    _completeCenter()
                    _imgwrap()
            .m-mask
                width 100%
                height 120px
                _completeCenter(,,165px,auto)
            .m-con
                width 100%
                height 180px
                _completeCenter(,,165px,auto)
                z-index 99
                background #e42
                _transitionAll(.4s)
                _translate3d(0,-80px)

</style>
