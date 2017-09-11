<template>
    <div class="sourceManage">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车源管理"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-source-con" 
                        v-loading="loading"
                        :element-loading-text="loadingText">
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
                                    @getMoreData="getMoreData(1,forSaleList)"
                                    :isNotMore="isNotMoreItems[0]"
                                    :isShowMore="forSaleList.length>=pageSize"
                                    :isOnSale="true"
                                    @sourceEdited="sourceEdited"
                                    @onOffAllChange="onOffAllChange"
                                    :allInChecked="onOffAllChecked"
                                    :isIndeterminate="isIndeterminate"
                                    >
                                    <div slot="content">
                                        <source-list
                                            @addedSource="addedSource"
                                            @editSource="editSource"
                                            @seeOffer="seeOffer"
                                            @soldOutSource="soldOutSource"
                                            :sourceList="forSaleList"
                                            :isOnSale="true"
                                            :onEdited="onEdited"
                                            @theStickChange="theStickChange"
                                            @onOffAllCheckFn="onOffAllCheckFn"
                                            :allInChecked="onOffAllChecked"
                                            @indeterminateCheck="indeterminateCheck"
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
                                    @getMoreData="getMoreData(2,tradingList)"
                                    :isNotMore="isNotMoreItems[1]"
                                    :isShowMore="tradingList.length>=pageSize">
                                    <div slot="content">
                                        <source-list
                                            :sourceList="tradingList"
                                            >    
                                        </source-list>
                                    </div>
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
                                    @getMoreData="getMoreData(3,auditList)"
                                    :isNotMore="isNotMoreItems[2]"
                                    :isShowMore="auditList.length>=pageSize">
                                    <div slot="content">
                                        <source-list
                                            :sourceList="auditList"
                                            >    
                                        </source-list>
                                    </div>
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
                                    @getMoreData="getMoreData(4,soldList)"
                                    :isNotMore="isNotMoreItems[3]"
                                    :isShowMore="soldList.length>=pageSize">
                                    <div slot="content">
                                        <source-list
                                            :sourceList="soldList"
                                            >
                                        </source-list>
                                    </div>
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
                                    @getMoreData="getMoreData(5,notOnList)"
                                    :isNotMore="isNotMoreItems[4]"
                                    :isShowMore="notOnList.length>=pageSize"
                                    >
                                    <div slot="content">
                                        <source-list
                                            @addedSource="addedSource"
                                            @editSource="editSource"
                                            @delSource="delSource"
                                            :sourceList="notOnList"
                                            >
                                        </source-list>
                                    </div>
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
                                    @getMoreData="getMoreData(6,failureList)"
                                    :isNotMore="isNotMoreItems[5]"
                                    :isShowMore="failureList.length>=pageSize">
                                    <div slot="content">
                                        <source-list
                                            @editSource="editSource"
                                            @delSource="delSource"
                                            :sourceList="failureList"
                                            >
                                        </source-list>
                                    </div>
                                </source-con>
                                <no-content
                                    v-if="failureList.length==0"
                                    speak="真赞，您车源全部审核通过！可以点击下方的发车按钮，去发布新的车辆!"
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
                pageSize: 8,

                // 是否有更多的集合
                isNotMoreItems:[false,false,false,false,false,false],

                // 选择批量编辑的车源
                theStick: [],
                // 是否全选
                onOffAllChecked: true,
                // 选择只选择了部分
                isIndeterminate: false,
                onEdited: false,

                loading: false,
                loadingText: "置顶中，请稍后...",
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
            // 清除所有数据
            this.reset();
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
                // 清除所有数据
                this.reset();
                // 开始切换
                this.$router.push({
                    path:'/member/sourceHome',
                    query:{tabIndex:index},
                })
                // 在组件内切换
                this.tabShowIndex = index
                this.getManageListData(index);
            },
            // 根据tabIndex 获取 status
            _getStatusByIndex(index){
                let status;
                switch(index){
                    case "1":   // 在售
                        return status = 1;
                        break;
                    case "2":   // 交易中
                        return status = 2;
                        break;
                    case "3":   // 审核中
                        return status = 0;
                        break;
                    case "4":   // 已售
                        return status = 3;
                        break;
                    case "5":   // 已下架
                        return status = -1;
                        break;
                    case "6":   // 审核失败
                        return status = -2;
                        break;
                }
                return status;
            },
            // 获取管理列表数据
            getManageListData(index){
                
                let me = this;
                let _index = index.toString();
                let status = this._getStatusByIndex(_index);

                // 获取数据，然后回调赋值
                this.getData(status,1,(res) => {
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
            getData(status,curPage=1,callBack){
                let data = {
                    status : status,
                    pageIndex : curPage,
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
            },
            // 获取更多数据
            getMoreData(tabIndex,list){

                let index = tabIndex.toString();
                let status = this._getStatusByIndex(index);
                let listSize = list.length;
                if(listSize%this.pageSize!=0) return;

                let nextPageNo = Math.ceil(listSize/this.pageSize) + 1;

                // 获取数据，然后回调赋值
                this.getData(status,nextPageNo,(res) => {
                    switch(index){
                        case "1":   // 在售
                            this._setIsNotMore(res,0)
                            this.forSaleList.push(...this._normalizeSource(res));
                            break;
                        case "2":   // 交易中
                            this._setIsNotMore(res,1)
                            this.tradingList.push(...this._normalizeSource(res));
                            break;
                        case "3":   // 审核中
                            this._setIsNotMore(res,2)
                            this.auditList.push(...this._normalizeSource(res));
                            break;
                        case "4":   // 已售
                            this._setIsNotMore(res,3)
                            this.soldList.push(...this._normalizeSource(res));
                            break;
                        case "5":   // 已下架
                            this._setIsNotMore(res,4)
                            this.notOnList.push(...this._normalizeSource(res));
                            break;
                        case "6":   // 审核失败
                            this._setIsNotMore(res,5)
                            this.failureList.push(...this._normalizeSource(res));
                            break;
                    }
                })
            },
            // 设置是否没有更多数据
            _setIsNotMore(res,index){
                if(res.length==0||res.length<this.pageSize){
                    this.isNotMoreItems[index] = true;     
                }
            },

            sourceEdited(params){
                if(!params){
                    this.batchToTop();
                    return;
                }
                this.onEdited = params;
            },
            
            // 选择车源编辑的变化
            theStickChange(sourceArr){
                this.theStick = sourceArr;
            },
            
            // list组件中
            onOffAllCheckFn(params){
                this.onOffAllChecked = params;
            },
            // con组件中是否全选的变化，传递给list组件
            onOffAllChange(params){
                this.onOffAllChecked = params;
            },
          
            // 是否为模糊选择
            indeterminateCheck(params){
                this.isIndeterminate = params;
            },
            
            // 批量置顶
            batchToTop(){
                
                let idArr = this.theStick;
                if(!idArr.length){
                    this.$notify({
                        title: '温馨提示',
                        message: "请至少选择一辆车源进行编辑！",
                        type: 'warning',
                        duration: 1500,
                    });
                    return;
                }
                
                this.loading = true;
                var carIds;
                // 计算出需要批量操作的id数据
                if(idArr.length==this.forSaleList.length){
                    carIds = 'all';
                }else{
                    carIds = idArr.join(",");
                }
                
                let data = {
                    CarIds: carIds,
                }
                api.batchRefresh(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.onEdited = false;
                        this.$notify({
                            title: '成功批量刷新/置顶',
                            message: res.msg,
                            type: 'success',
                            duration: 2000,
                        });
                        this.loading = false;
                        this.tabChange(1);
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '批量刷新/置顶失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                        this.loading = false;
                    }
                })

            },

            // 清空所有列表数据
            reset(){
                this.forSaleList= [];
                this.tradingList= [];
                this.auditList= [];
                this.soldList= [];
                this.notOnList= [];
                this.failureList= [];
                this.isNotMoreItems = [false,false,false,false,false,false];
                
                // 选择批量编辑的车源
                this.theStick = [];
                // 是否全选
                this.onOffAllChecked = true;
                // 选择只选择了部分
                this.isIndeterminate = false;
                this.onEdited = false;

                this.loading = false;
                this.loadingText = "置顶中，请稍后...";

            },
            // 上架车源(当已是上架时，刷新置顶，每天一次)
            addedSource(id,acted){
                // 操作码 -1失败，1上架，2下架
                this.operateSource(1,id,(msg)=>{
                    if(acted&&acted=="置顶"){
                        this.$notify({
                            title: '置顶成功',
                            message: msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }else{
                        this.$notify({
                            title: '上架成功',
                            message: msg,
                            type: 'success',
                            duration: 1500,
                        });
                    }
                    // 跳转到在售列表
                    this.tabChange(1);
                })
            },
            // 编辑车源 
            editSource(id){
                this.$router.push(
                    {path:'/member/sourceEdit',query:{id:id}}
                );
            },
            // 查看出价
            seeOffer(){
                console.log("查看出价")
            },
            // 下架车源
            soldOutSource(id){
                // 操作码 -1失败，1上架，2下架
                this.operateSource(2,id,(msg)=>{
                    this.$notify({
                        title: '下架成功',
                        message: msg,
                        type: 'success',
                        duration: 2000,
                    });
                    // 跳转到下架列表
                    this.tabChange(5);
                })
            },
            // 删除车源
            delSource(id){
                // 操作码 -1失败，1上架，2下架
                this.operateSource(-1,id,(msg)=>{
                    this.$notify({
                        title: '删除成功',
                        message: msg,
                        type: 'success',
                        duration: 1500,
                    });
                    // 刷新当前tab的列表数据
                    this.tabChange(this.tabShowIndex);
                })
            },
            // 向api发出对车源的操作请求
            operateSource(actCode,id,callBack){
                let actName = "";
                switch(actCode){
                    case -1:
                        actName = "删除"
                        break;
                    case 1:
                        actName = "上架"
                        break;
                    case 2:
                        actName = "下架"
                        break;
                }
                let data = {
                    CarId: id,
                    Operate: actName,
                }
                api.operateB2BCar(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        if(callBack){
                            callBack(res.msg);
                        }
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '操作失败',
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

<style lang="stylus" rel="stylesheet/stylus">
    .m-source-con
        .el-loading-spinner
            top 30%!important
</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
