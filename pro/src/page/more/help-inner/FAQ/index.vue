<!--  
 **  @description 网站更多功能 - 常见问题
 --> 

<template>
    <div class="FAQ">
        
        <!-- 关于我们内容的布局组件 -->
        <about-layout
            title="常见问题"
            articleType="v2"
            >
            <div class="m-help-con">
                <ul class="m-lst">
                    <template v-for="item in FAQData">
                        <li class="u-item">
                            <div class="tit"
                                >{{item.title}}
                            </div>
                            <div class="text-box"
                                >
                                <template v-for="info in item.info">
                                    <p class="u-line">{{info}}</p>
                                </template>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </about-layout>

    </div>
</template>

<script>
    
    // 常见问题的本地数据
    import {FAQData} from "api/localJson/more.js"
    // 网站更多功能内容布局组件
    import aboutLayout from 'page/more/common/layout/index.vue' 

    export default {
        name: "FAQ",
        // 在当前模块注册组件
        components:{
            aboutLayout,
        },
        // 数据
        data() {
            return{
                FAQData: FAQData,
            }
        },
        // 自定义函数(方法)
        methods: {
            
        },
        
    }

</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
