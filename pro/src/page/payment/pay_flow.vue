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
                flowfill: "#0479cc",
                fontpure: "#f4f4f4",
                fontdark: "#545454",
                flowItems: [
                    {
                        title: '1.创建订单',
                        width: 160,
                        isActive: true,
                        dx: -5,
                        points: '0,0 145,0 160,20 145,40 0,40',
                    },
                    {
                        title: '2.在线签订电子合同',
                        width: 240,
                        isActive: false,
                        dx: 3,
                        points: '0,0 225,0 240,20 225,40 0,40 15,20',
                    },
                    {
                        title: '3.支付定金',
                        width: 160,
                        isActive: false,
                        dx: 3,
                        points: '0,0 145,0 160,20 145,40 0,40 15,20',
                    },
                    {
                        title: '4.过户完毕',
                        width: 160,
                        isActive: false,
                        dx: 3,
                        points: '0,0 145,0 160,20 145,40 0,40 15,20',
                    },
                ],
           }
        },
        // 组件值传递（单向传递）
        props:{
            step:{
                type: Number,
                default: 1,
            },
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

<!-- 引入支付环节的页面样式 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
   @import "./pay_flow.styl"
</style>