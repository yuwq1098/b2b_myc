<template>
    <div class="memberHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="个人主页"
            >
            <div slot="content">
                <member-inner>
                    <div class="m-home-wrap">
                        <div class="m-hd-box">
                            <div class="m-pic">
                                <img :src="memberData.imgUrl" :alt="memberData.name" />
                            </div><!-- 头像 -->
                            <div class="m-con">
                                <div class="m-info">
                                    <div class="u-name">
                                        <span class="greet">{{'' | greetByDate}}</span>
                                        <span class="name">{{memberData.name}}</span></div><!-- 用户昵称 -->
                                    <div class="u-tel">
                                        <span class="telephone"><i class="iconfont icon-shouji3"></i>已绑定手机号{{memberData.tel | telFormat}}</span>
                                        <router-link 
                                            :to="{path:'/member/safetyTel'}" class="u-lk"
                                            >更绑手机号
                                        </router-link>
                                    </div><!-- 手机绑定 -->
                                    <div class="u-other">
                                        <span class="info">{{memberData.regDate | dateFnToDay}}加入木有车</span>
                                        <span class="cut">|</span>
                                        <router-link
                                            :to="{path:'/member/personal'}" class="u-lk"
                                            >编辑个人资料
                                        </router-link>
                                    </div><!-- 更改信息 -->
                                </div>
                                <div class="m-wallet">
                                    <ul class="m-wallet-lst f__clearfix">
                                        <li class="wallet-item">
                                            <div class="u-tit">账户余额</div>
                                            <p class="u-data"><em class="vital">{{memberData.blance | priceFormat(2)}}</em>元</p>
                                        </li>
                                        <li class="wallet-item">
                                            <div class="u-tit">信誉保证金</div>
                                            <p class="u-data"><em class="vital">{{memberData.credit | priceFormat(2)}}</em>元</p>
                                        </li>
                                        <li class="wallet-item other">
                                            <router-link
                                                :to="{path:'/member/wallet'}"
                                                class="u-lk"
                                                >前往我的钱包&gt;
                                            </router-link>
                                        </li>
                                    </ul>
                                </div><!-- 我的账户金额信息 -->
                            </div><!-- 内容 -->
                        </div><!-- 头部 -->
                        
                        <div class="m-mn-box">
                            <div class="">
                                
                            </div><!-- 我的订单 -->
                            
                            <div class="">
                                
                            </div><!-- 我的收藏 -->

                            <div class="">
                                
                            </div><!-- 我的车源 -->

                        </div><!-- 主要内容 -->

                    </div><!-- 主页容器 -->
                </member-inner>
            </div><!-- 会员中心主页内容 -->
        </member-layout>
    </div>
</template>

<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import {mapGetters,mapActions} from 'vuex'
    // 工具类
    import {dataToJson} from "assets/js/util.js"
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    export default {
        
        name: "memberHome",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                memberData: {},            //用户信息
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            // 获取用户信息
            this.getMemberInfo();
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
            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },
            // 获取用户信息
            getMemberInfo(){
                let data = {}
                api.getMyMemberInfo(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.memberData = this._normalizeMember(res.data);
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
