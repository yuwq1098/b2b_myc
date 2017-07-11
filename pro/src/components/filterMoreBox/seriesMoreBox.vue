<!--  
 **  @description b2b搜索大厅中点击更多车系 展示更多车系信息
 --> 

<template>
    <div class="seriesMoreBox">
        <ul class="m-lk-list f__clearfix">
            <template>
                <li class="u-item" 
                    v-for="(item,index) in seriesList"
                    @click.stop="seriesFilterMore($event.target,item.series_id,item.series_name)"
                    >
                    <a href="javascript:;" class="u-lk">{{item.series_name}}</a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    
    export default {
        name: "seriesMoreBox",
        // 数据
        data() {
            return{
                
            }
        },
        // 父页面传入的值，调用方式与data一样
        props:{
            seriesList: Array,
        },
        mounted(){
            
        },
        activated(){
            
        },
        deactivated(){
            
        },
        // 自定义函数(方法)
        methods: {
            // 传递给父组件的事件
            seriesFilterMore(e,id,value){
                this.$emit('seriesFilterMore',e,id,value);
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
    .m-lk-list
        padding 12px 12px 4px
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
                    background #2e98e2
                    color #f4f4f4
                    &:hover
                        color @color

</style>
