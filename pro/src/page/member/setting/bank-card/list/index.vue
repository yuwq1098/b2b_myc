<template>
	<div class="bankCardManage">

        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="绑定银行卡"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-bankCard-wrap">
                        <div class="m-member-tips">
                            木有车携手农业银行，为了方便您的交易，我们强烈建议您绑定农业银行卡！
                        </div><!-- 银行卡绑定 -->
                        <div class="m-card-wrap">
                            <ul class="m-card-lst f__clearfix">
                                <template v-for="n in 4">
                                    <li class="m-item info">
                                        
                                    </li>
                                </template>
                                
                                <li class="m-item add">
                                    <router-link 
                                        :to="{path:'/member/cardAdd'}"
                                        class="u-lk"
                                        title="新增绑定银行卡">
                                        <div class="icon"><i class="iconfont icon-tianjia5"></i></div>
                                        <p class="tit">添加快捷卡</p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div><!-- 银行卡容器 -->
                </member-inner>
            </div><!-- 银行卡管理内容 -->
        </member-layout>

	</div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'



	export default {
        name: "bankCardManage",
        // 自定义表单验证
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 银行卡列表信息
                bankCardList: [],

            }
        },
        //生命周期,开始的时候
        created(){

        },
        mounted(){

        },
        activated(){
            // 获取银行卡列表信息
            this.getBankCardInfo();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            // 获取用户信息
            getBankCardInfo(){
                let data = {
                    ActType: 'MyList',
                }
                api.manageBankCard(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        console.log("得到信息",dataToJson(res.data));
                        // this.memberData = new memberInfo(res.data);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })   
            },
        },
        
	}
</script>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>
