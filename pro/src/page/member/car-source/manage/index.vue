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
                                class="u-tab-lk">交易中
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(3)"
                                :class="{'on':tabShowIndex==3}"
                                class="u-tab-lk">审核中
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(4)"
                                :class="{'on':tabShowIndex==4}"
                                class="u-tab-lk">已售
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(5)"
                                :class="{'on':tabShowIndex==5}"
                                class="u-tab-lk">已下架
                            </a>
                            <a href="javascript:;" 
                                @click="tabChange(6)"
                                :class="{'on':tabShowIndex==6}"
                                class="u-tab-lk">审核失败
                            </a>
                        </div><!-- 切换 -->
                        <div class="m-tab-wrap">

                            <div class="m-tab-con"
                                v-if="tabShowIndex==1"
                                >
                                <source-con v-if="forSaleList.length>0"
                                    :isShowMore="forSaleList.length>=pageSize">
                                    <div slot="content">
                                        <source-list
                                            :sourceList="forSaleList"
                                            >    
                                        </source-list>
                                    </div>
                                </source-con>
                                <no-content
                                    v-if="forSaleList.length==0"
                                    speak="您没有在售车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 在售 -->

                            <div class="m-tab-con"
                                v-if="tabShowIndex==2"
                                >
                                <source-con v-if="tradingList.length>0"
                                    :isShowMore="tradingList.length>=pageSize">
                                    <div slot="content"></div>
                                </source-con>
                                <no-content
                                    v-if="tradingList.length==0"
                                    speak="您没有交易中车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 交易中 -->

                            <div class="m-tab-con"
                                v-if="tabShowIndex==3"
                                >
                                <source-con v-if="auditList.length>0"
                                    :isShowMore="auditList.length>=pageSize">
                                    <div slot="content"></div>
                                </source-con>
                                <no-content
                                    v-if="auditList.length==0"
                                    speak="您没有审核中车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 审核中 -->

                            <div class="m-tab-con"
                                v-if="tabShowIndex==4"
                                >
                                <source-con v-if="soldList.length>0"
                                    :isShowMore="soldList.length>=pageSize">
                                    <div slot="content"></div>
                                </source-con>
                                <no-content
                                    v-if="soldList.length==0"
                                    speak="您没有已售车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 已售 -->

                            <div class="m-tab-con"
                                v-if="tabShowIndex==5"
                                >
                                <source-con v-if="notOnList.length>0"
                                    :isShowMore="notOnList.length>=pageSize">
                                    <div slot="content"></div>
                                </source-con>
                                <no-content
                                    v-if="notOnList.length==0"
                                    speak="您没有已下架车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 已下架 -->

                            <div class="m-tab-con"
                                v-if="tabShowIndex==6"
                                >
                                <source-con v-if="failureList.length>0"
                                    :isShowMore="failureList.length>=pageSize">
                                    <div slot="content"></div>
                                </source-con>
                                <no-content
                                    v-if="failureList.length==0"
                                    speak="您没有审核失败车源哦，可以点击下方的发车按钮，前往发布车辆界面去发布新的车辆!"
                                    >
                                    <router-link :to="{path:'/sellSend'}" class="u-lk" tag="a">前往发车&gt;</router-link>
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                </no-content><!-- 缺省组件 -->
                            </div><!-- 审核失败 -->

                        </div>
                    </div>
                </member-inner>

            </div><!-- 车源管理内容 -->
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
    // 车源管理父容器组件
    import sourceCon from 'components/member/sourceCon.vue'
    // 车源信息列表组件
    import sourceList from 'components/member/sourceList.vue'
    // 会员中心缺省组件(二号风格)
    import noContent from 'components/member/noContent.vue' 

    export default {
        
        name: "sourceManage",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
            sourceCon,
            sourceList,
            noContent,
        },
        // 数据
        data() {
            return{
                // 选项卡显示
                tabShowIndex: "",
                // 在售列表
                forSaleList: [],
                // 交易中列表
                tradingList: [],
                // 审核中列表
                auditList: [],
                // 已售列表
                soldList: [],
                // 已下架列表
                notOnList: [],
                // 审核失败列表
                failureList: [],

                // 我的分页（每页数据大小）
                pageSize: 12,
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            this.tabShowIndex = this.$router.currentRoute.query.tabIndex||1;
            this.tabChange(this.tabShowIndex);
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
                this.getManageListData(index);
            },
            // 获取管理列表数据
            getManageListData(index){
                let me = this;
                let status = null;
                let _index = index.toString();
                switch(_index){
                    case "1":   // 在售
                        status = 1;
                        break;
                    case "2":   // 交易中
                        status = 2;
                        break;
                    case "3":   // 审核中
                        status = 0;
                        break;
                    case "4":   // 已售
                        status = 3;
                        break;
                    case "5":   // 已下架
                        status = -1;
                        break;
                    case "6":   // 审核失败
                        status = -2;
                        break;
                }
                // 获取数据，然后回调赋值
                this.getData(status,(res) => {
                    switch(_index){
                        case "1":   // 在售
                            me.forSaleList = this._normalizeSource(res);
                            break;
                        case "2":   // 交易中
                            me.tradingList = this._normalizeSource(res);
                            break;
                        case "3":   // 审核中
                            me.auditList = this._normalizeSource(res);
                            break;
                        case "4":   // 已售
                            me.soldList = this._normalizeSource(res);
                            break;
                        case "5":   // 已下架
                            me.notOnList = this._normalizeSource(res);
                            break;
                        case "6":   // 审核失败
                            me.failureList = this._normalizeSource(res);
                            break;
                    }
                })
            },
            // 格式化车源列表
            _normalizeSource(list){
                let arr = []
                list.forEach((item, index) => {
                    arr.push(new sourceInfo(item));
                });
                return arr;
            },
            // 获取数据
            getData(status,callBack){
                let data = {
                    status : status,
                    pageIndex : 1,
                    pageSize : this.pageSize,
                }
                api.getMyB2BCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(callBack){
                            callBack(res.data);
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '信息获取失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            }
        },
        
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
