<template>
    <div class="sourceManage">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车源管理"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-source-con">
                        <div class="m-tab-box f__clearfix">
                            <a href="javascript:;" 
                                @click="tabChange(1)"
                                :class="{'on':tabShowIndex==1}"
                                class="u-tab-lk">在售
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(2)"
                                :class="{'on':tabShowIndex==2}"
                                class="u-tab-lk">已售
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(3)"
                                :class="{'on':tabShowIndex==3}"
                                class="u-tab-lk">未上架
                            </a>
                        </div><!-- 切换 -->
                        <div class="m-tab-wrap">
                            <div class="m-tab-con"
                                v-if="tabShowIndex==1"
                                >
                                在售
                            </div><!-- 在售 -->
                            <div class="m-tab-con"
                                v-if="tabShowIndex==2"
                                >
                                已售
                            </div><!-- 已售 -->
                            <div class="m-tab-con"
                                v-if="tabShowIndex==3"
                                >
                                未上架
                            </div><!-- 未上架 -->
                        </div>
                    </div>
                </member-inner>

            </div><!-- 车源管理内容 -->
        </member-layout>
    </div>
</template>

<script>

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "sourceManage",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 选项卡显示
                tabShowIndex: "",
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            this.tabShowIndex = this.$router.currentRoute.query.tabIndex||1;
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
            // 选项卡切换方法
            tabChange(index){
                // 开始切换
                this.$router.push({
                    path:'/member/sourceHome',
                    query:{tabIndex:index},
                })
                // 在组件内切换
                this.tabShowIndex = index
            }
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
