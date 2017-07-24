<template>
    <div id="payFlow">
        <div class="m-pay-flow">
            <ul class="m-flow-lst f__clearfix">
                <li class="u-item" v-for="(item , index) in flowItems">

                    <svg id="svgPolygonTutorial" :width="item.width" height="40" xmlns="http://www.w3.org/2000/svg">
                        <polygon 
                           id="myPolygon" 
                           :points="item.points"
                           rx="20" ry="20" 
                           :style="item.isActive?'fill:'+flowfill+';':'fill:'+flowgray+';'"/>

                        <text 
                           x="50%" y="50%" 
                           letter-spacing="1" 
                           font-size="14" 
                           :dx="item.dx" dy=".3em" 
                           :fill="item.isActive?fontpure:fontdark" 
                           text-anchor="middle"
                        >{{item.title}}
                        </text>
                       
                    </svg>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
   export default{
        name: "payFlow",
        //数据
        data(){
           return{
                flowgray: "#e2e2e2",
                flowfill: "#2e98e2",
                fontpure: "#f4f4f4",
                fontdark: "#545454",
           }
        },
        // 组件值传递（单向传递）
        props:{
            step:{
                type: Number,
                default: 1,
            },
            flowItems: Array,
        },
        //自定义函数（方法）
        methods:{
            //更新步骤高亮的显示
            stepShow(){
                for(let i =0; i<this.flowItems.length; i++){
                    this.flowItems[i].isActive = false
                }
                for(let i =0; i<this.step; i++){
                    this.flowItems[i].isActive = true
                }
            }
        },
        //属性计算
        computed: {
            
        },
        //当el被$el替换，并挂载到实例上去之后调用该钩子
        mounted(){
            this.stepShow();
        },
        // 字段变化侦听
        watch: {
            step(val){
                this.stepShow();
            }
        },
        // 在当前模块注册组件
        components:{

        }
   }

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import '~assets/css/mixin.styl'
    .m-pay-flow
        width 100%
        height 40px
        .m-flow-lst
            .u-item
                float left
                margin-right -8px
</style>