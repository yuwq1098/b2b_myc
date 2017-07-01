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
                
                <div class="m-con-box">
                    <div class="u-mask">
                    
                    </div><!-- 遮罩内容（操作部分） -->
                    <div class="u-con">
                        
                    </div><!-- 信息内容 -->
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
        _boxShadow(12px,rgba(0,0,0,.08))
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
            .m-con-box
                width 100%
                height 180px
                _completeCenter(,,165px,auto)
                _transitionAll(.3s)
                .u-mask
                    width 100%
                    height 120px
                    _completeCenter(0,auto,0,auto)
                    background rgba(0,0,0,.65)
                    _transitionAll(.25s)
                .u-con
                    width @width
                    height @height
                    background #fff
                    _completeCenter(0,auto,auto,0)
                    z-index 2
            &:hover
                _boxShadow(15px,rgba(0,0,0,.10),-4px,4px)
                .m-con-box
                    _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                    _translate3d(0,-80px)
                    .u-mask
                        _transitionAll(.3s,cubic-bezier(0.14, 0.46, 0.46, 1.02))
                        _translate3d(0,-85px)
</style>
