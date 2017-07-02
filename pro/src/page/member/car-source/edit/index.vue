<template>
    <div class="editSource">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车源管理"
            >
            <div slot="content">
                
                <member-inner>
                    我是编辑车源页面
                </member-inner>

            </div><!-- 编辑车源内容 -->
        </member-layout>
    </div>
</template>


<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 车源信息的构造类
    import {sourceInfo} from 'base/class/sourceInfo.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "editSource",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{

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
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

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
