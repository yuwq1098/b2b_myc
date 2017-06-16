<!--  
 **  @description b2b搜索大厅中点击更多品牌 展示更多品牌信息
 --> 

<template>
	<div class="brandMoreBox">
        <div class="m-brand-more" id="js__more_brand_inline">
            <div class="m-hd-wrap">
                <ul class="u-hd-lst f__clearfix">
                    <li class="u-hd-item" 
                        v-for="(item,index) in normalizeBrandItems" 
                        :class="{'on':index==0}"
                        >{{item.title}}
                    </li>
                </ul>
            </div>
            <div class="m-lst-box">
                <ul class="u-gp-lst f__clearfix" 
                    v-for="(group,index) in normalizeBrandItems" 
                    :class="{'active':index==0}"
                    >
                    <li class="u-item" v-for="item in group.items">
                        <a href="javascript:;" class="u-lk"
                            @click.stop="brandFilterMore($event.target,item.id,item.name)"
                            >{{item.name}}{{item.code}}</a>
                    </li>
                </ul>
            </div>
        </div><!-- 更多品牌 -->
    </div>
</template>

<script>
    
    import $ from "jquery"
    import {brandInfo} from "base/class/brand.js"

	export default {
        name: "brandMoreBox",
        // 数据
        data() {
            return{
                
            }
        },
        // 父页面传入的值，调用方式与data一样
        props:{
            brandList: Array,
        },
        mounted(){
            //切换品牌显示
            this.cutAllBrandEvent();
        },
        activated(){
            
        },
        deactivated(){
            
        },
        //计算属性值
        computed:{
            normalizeBrandItems: function () {
                // 返回排好序的品牌列表
                return this._normalizeBrandInfo(this.brandList);
            },
        },
        // 自定义函数(方法)
        methods: {
            //使用b2c抽象类完成brandInfo
            _normalizeBrandInfo(list){
                let map = {}
                list.forEach((item, index) => {
                    const key = item.key_word
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new brandInfo(item));
                })
                // 为了得到有序列表，我们需要处理 map
                let nature = []
                //循环map分别得到两个数组
                for (let key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) {
                        nature.push(val)
                    }
                }

                //根据字母A-Za-z规则顺序排序
                nature.sort((a,b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                })
                return nature;
            },
            //切换品牌显示
            cutAllBrandEvent(){
                setTimeout(() => {
                    let js__more_brand_inline = $("#js__more_brand_inline");
                    let hdList = js__more_brand_inline.find(".u-hd-lst");
                    let gpList = js__more_brand_inline.find(".u-gp-lst");
                    
                    hdList.find(".u-hd-item").on("mouseover",function(){
                        let me = $(this);
                        let index = me.index();
                        me.addClass("on").siblings(".u-hd-item").removeClass("on");
                        gpList.eq(index).addClass("active").siblings().removeClass("active");
                    });

                },20)
            },
            //传递给父组件的事件
            brandFilterMore(e,id,value){
                this.$emit('brandFilterMore',e,id,value);
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
    .m-brand-more
        padding 12px 12px 4px
        .m-hd-wrap
            height 25px
            padding 5px 8px 0
            line-height 25px
            .u-hd-lst
                .u-hd-item
                    float left
                    height 25px
                    line-height 25px
                    width 25px
                    text-align center
                    margin-right 8px
                    color #777
                    background #fafafa
                    _borderRadius(2px)
                    cursor pointer
                    &:hover
                        background #f2f2f2
                        color $c_blue
                    &.on
                        background $c_blue
                        color #f4f4f4
                        &:hover
                            background @background
                            color @color
        .m-lst-box
            margin-top 15px
            .u-gp-lst
                min-height 28px
                _display(none)
                &.active
                    _display()
                .u-item
                    float left
                    height 28px
                    line-height 28px
                    margin-right 10px
                    margin-bottom 8px
                    _display(block)
                    .u-lk
                        padding 0 7px
                        height 28px
                        _display()
                        _borderRadius(2px)
                        color #545454
                        &:hover
                            color $c_blue
                    &.on
                        .u-lk
                            background #0479cc
                            color #f4f4f4
                            &:hover
                                color @color
</style>
