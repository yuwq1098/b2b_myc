<!--  
 **  @description 车辆颜色选择器
 --> 

<template>
    <div class="colorSelect">
        <div class="m-color-wrap" v-if="colorItems">
            <div class="m-color-select">
                <ul class="u-color-lst f__clearfix" ref="colorBoxs" id="js__color_list">
                    <template v-for="(item,index) in colorItems">
                        <li class="u-item" @click.stop="changeColorSelected(index,item.name,item.code)">
                            <a href="javascript:;" class="u-lk">
                                <i class="icon u-block" 
                                    :style="'backgroundColor:'+item.code"
                                    v-if="item.name!='其它'"
                                    ></i>
                                <i class="icon u-block-other"
                                    v-if="item.name=='其它'"
                                    ></i>
                                <span class="u-txt">{{item.name}}</span>
                            </a>
                        </li>
                    </template>
                </ul>
            </div><!-- 颜色选择区 -->
            <div class="m-color-info">
                <p class="u-none" v-if="!selectedColor">请选择车辆颜色</p>
                <div class="m-selected" v-if="selectedColor">
                    <p class="u-text">您选择的车辆颜色是：<em class="vital">{{selectedColor}}</em></p>
                    <div class="u-icon" v-if="selectedColor!='其它'">
                        <i class="iconfont icon-qiche"
                            :style="'color:'+selectedCode"
                            >
                        </i>
                    </div>
                </div>
            </div><!-- 颜色选择提示 -->
        </div>
    </div>
</template>

<script>

    // 引入jq库
    import $ from "jquery"
    // 获取数据的api
    import api from "api/getData.js"

    export default {
        name: "colorSelect",
        // 数据
        data() {
            return{
                selectedColor: '',
                selectedCode: '',
                colorItems: [],
            }
        },
        props:{
            // 初始化的值
            initValue:{
                type: String,
                default: "",
            }
        },
        computed:{
            isNotKeepAlive(){
                return this.$router.currentRoute.meta.notKeepAlive;
            }
        },
        // 数据侦听
        watch:{
            initValue(val){
                if(this.colorItems.length==0) return;
                this.colorItems.forEach((item,index) => {
                    if(item.name==val){
                        this.changeColorSelected(index,item.name,item.code);
                    }
                })
            },
            // 当用户选中的值变化了，再将事件派发给父组件
            selectedColor(val){
                this.$emit("selectedEnd",this.selectedColor)
            }
        },
        // 不使用keep-alive时,走这个生命周期
        created(){
            // 如果不启用keep-alive
            if(this.isNotKeepAlive){
                this._getCarColor();   //获取颜色数据   
            }
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            // 如果启用keep-alive
            if(!this.isNotKeepAlive){
                this._getCarColor();   //获取颜色数据   
            }
        },
        // 自定义函数(方法)
        methods: {
            //获取车辆颜色
            _getCarColor(){
                api.getAllCarColor().then((res) => {
                    let carColor = [];
                    res.data.map(function(value, index, array) {
                        let obj = {}
                        obj.name = value.ColorName;
                        obj.code = value.ColorCode;
                        carColor.push(obj)
                    });
                    this.colorItems = carColor;
                })   
            },
            // 您选择的是第几个
            changeColorSelected(index,name,code){
                var js__color_list = $("#js__color_list");
                var selectedItem = js__color_list.find(".u-item").eq(index);
                selectedItem.addClass("on").siblings(".u-item").removeClass("on");
                this.selectedColor = name;
                this.selectedCode = code;
            }
        },
        // 在当前模块注册组件
        components:{

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-color-wrap
        padding-bottom 15px
        _border(bottom,#e2e2e2)
        margin-bottom 10px
        .m-color-select
            width 800px
            padding 4px 0 8px
            .u-color-lst
                width 800px + 16px
                margin-left -12px
                .u-item
                    float left
                    margin-left 12px
                    width 86px
                    margin-bottom 8px
                    height 36px
                    line-height 36px
                    text-align center
                    position relative
                    _borderRadius(4px)
                    _borderAll(transparent,1px)
                    &.on
                        _borderAll($c_blue,1px)

                    .u-lk
                        _display()
                        width 100%
                        height 100%
                    .icon
                        width 22px
                        height 22px
                        _display()
                        _completeCenter(14px,auto)
                        _boxShadow(5px,rgba(0,0,0,.35),1px,1px)
                        _borderRadius()
                    .u-block-other
                        &::after
                            content ""
                            _display()
                            width 8px
                            height 8px
                            background #4a5c69
                            _borderRadius()
                            _completeCenter()
                    .u-txt
                        line-height 36px
                        font-size 13px
                        _spacingPlus(2px)
                        color #959595
                        margin-left 30px
                    &:hover,&.on
                        .u-txt
                            color $c_blue

        .m-color-info
            line-height 22px
            height 22px
            font-size 13px
            .u-none
                color #959595
            .m-selected
                color #959595
                position relative
                .vital
                    color $c_blue
                .u-icon
                    _display()
                    width 28px
                    line-height 28px
                    _completeCenter(180px,auto)
                    .iconfont
                        font-size 28px
                        _display(inline-block)
                        _translate3d(0,-1px)
                        text-shadow rgba(0,0,0,.18) 0 0 4px 




</style>
