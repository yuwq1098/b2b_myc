<!-- 车商圈 -->

<template>
	<div class="dealerCircle">
	    <div>我是车商圈，蛋疼</div>
	</div>
</template>


<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'
    // 车行信息的构造类
    import {basicInfo,carDetails,fileInfoList,otherInfo} from 'base/class/carDetails.js'

    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    // 双向控制焦点图组件
    import fcSlide from "components/slide/fc_slide.vue"

    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"
    // 相似推荐信息列表盒子
    import remdListBox from "components/boxLayout/remdListBox.vue"

    // 社会分享组件
    import gkShare from "components/common/gkShare.vue"
    
    
	export default {
        name: "dealerCircle",
        // 在当前模块注册组件
        components:{
            
        },
        // 数据
        data() {
            return{
                              
            }
        },
        // 生命周期,开始的时候
        created(){

        },
        // 当dom挂载到$el上的钩子事件
        mounted(){
            
        },
        activated(){

        },

        // 退出的生命周期钩子
        deactivated(){
            
        },

        // 数据侦听
        watch:{

        },

        // 属性计算
        computed:{

        },
        methods:{
            
        }
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
