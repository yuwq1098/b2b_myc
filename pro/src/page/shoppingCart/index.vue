<!--
-  @description 我的购物车
-->

<template>
	<div class="shoppingCart">
	    <div class="g-doc">
            <div class="g-bd">    
                <section class="f__w1200">
                
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                    <div class="m-cart-wrap">
                        <div class="m-cart-con"
                            v-if="cartList.length>0">
                            <div class="m-lst-wrap">
                                <ul class="m-goods-lst f__clearfix">
                                    <template v-for="(item,index) in cartList">
                                        <li class="m-item">
                                            <div class="u-pic-box">
                                                <a href="javascript:;" class="u-box"
                                                    @click="enterCarDetails(item.id,item.status)">
                                                    <p class="u-label">
                                                        <span class="txt">{{item.authType}}</span>
                                                    </p><!-- 标签 -->
                                                    <div class="u-pic">
                                                        <img :src="item.imgUrl" :alt="item.title"/>
                                                    </div>
                                                </a>
                                            </div><!-- 图片容器 -->
                                            <div class="u-con">
                                                <div class="u-goods-name">
                                                    <a href="javascript:;" class="u-lk"
                                                        @click="enterCarDetails(item.id,item.status)"
                                                        >{{item.title}}
                                                    </a>
                                                </div>
                                                <div class="u-info"
                                                    >{{item.inCity}} | {{item.plateDate | dateYearFormat}} | {{item.mileage | mileFn(1)}}
                                                </div><!-- 基本信息 -->
                                                <div class="u-other"
                                                    >
                                                    <span class="u-part cdgName">{{item.cdgName}}</span><!-- 所属车行 -->
                                                    <span class="u-part refreshTime">{{item.addedTime}}</span><!-- 最后刷新时间 -->
                                                </div><!-- 其他信息 -->
                                            </div><!-- 内容 -->
                                            
                                            <div class="u-status"
                                                :class="{'success':item.statusText=='在售'}"
                                                >{{item.statusText}}
                                            </div><!-- 状态 -->

                                            <div class="u-price"
                                                >
                                                <template v-if="!hasAuth=='1'">
                                                    <span class="info">请先通过认证</span>
                                                </template>
                                                <template v-else-if="!hasCredit">
                                                    <span class="info">信誉保证金不足</span>
                                                </template>
                                                <template v-else>
                                                    <span class="attr">B2B批发价：</span>
                                                    <span class="data"
                                                        >￥<em class="vital">{{item.price | priceFormat(2)}}</em>万
                                                    </span>
                                                </template>
                                            </div><!-- 价格 -->

                                            <div class="u-operate f__clearfix">
                                                <a class="u-btn remove"
                                                    title="移出购物车"
                                                    @click="removeCart(item.id,index)" 
                                                    >移出购物车</a>
                                                <template v-if="!hasAuth=='1'||!hasCredit"
                                                    >
                                                    <a class="u-btn buy" title="秒杀下单"
                                                        v-if="item.status=='1'"
                                                        @click="judgeHasPrivilege()"
                                                        >秒杀下单
                                                    </a>
                                                    <a href="javascript:;" class="u-btn not" 
                                                        title="秒杀下单"
                                                        v-else
                                                        >秒杀下单
                                                    </a>
                                                </template>
                                                <template v-else>
                                                    <a class="u-btn buy" title="秒杀下单" 
                                                        v-if="item.status=='1'"
                                                        @click="addOrder(item.id,index)"
                                                        >秒杀下单
                                                    </a>
                                                    <a href="javascript:;" class="u-btn not" 
                                                        title="秒杀下单"
                                                        v-else
                                                        >秒杀下单
                                                    </a>
                                                </template>
                                            </div><!-- 操作 -->
                                        </li>     
                                    </template>
                                </ul><!-- 商品列表 -->
                            </div><!-- 车辆信息列表容器 -->

                            <div class="m-page" v-show="resultPage.totalPage>0">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="resultPage.currentPage"
                                    :page-size="resultPage.pageSize"
                                    layout="prev, pager, next"
                                    :total="resultPage.totalPage">
                                </el-pagination>
                            </div>
                        </div><!-- 购物车内容 -->

                        <div class="m-not-box"
                            v-if="cartList.length==0"
                            >
                            <div class="u-pic">
                                <img :src="noConImg" alt="缺省车辆图"/>
                            </div><!-- 图片 -->
                            <div class="u-con">
                                <div class="u-speak">您的购物车现在空空如页，立即去B2B车辆大厅寻找合适自己的爱车吧!</div><!-- 描述 -->
                                <div class="u-other f__clearfix">
                                    <router-link :to="{path:'/'}" class="u-lk" tag="a">返回首页&gt;</router-link>
                                    <router-link :to="{path:'/b2bHall'}" class="u-lk" tag="a">二手车B2B大厅&gt;</router-link>
                                </div><!-- 按钮拓展 -->
                            </div><!-- 内容 -->
                        </div>
                    </div><!-- 购物车容器 -->

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 购物车商品信息构造类
    import {goodsInfo} from "base/class/shoppingCart.js"
    // 工具函数
    import {dataToJson} from "assets/js/util.js"
    // vuex状态管理
    import { mapActions } from 'vuex'

    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"

    //每页显示八条
    const RESULE_PAGE_SIZE = 8

	export default {
        name: "shoppingCart",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{

                // 面包屑列表信息
                crumbItems: crumbsInfo['shoppingCart'],
                // 购物车列表
                cartList: [],
                // 是否登录
                hasLogin: "",
                // 是否认证
                hasAuth: "",
                // 是否有足额的信誉保证金
                hasCredit: "",
                noConImg: require("assets/img/no-content.jpg"),

                /**
                  * @description 结果集分页信息
                  */
                resultPage:{ 
                    currentPage : 1,
                    pageSize : RESULE_PAGE_SIZE,
                    totalPage : 0
                },

            }
        },
        // 计算数据
        computed:{
            
        },
        // 数据侦听
        watch:{
            
        },
        //生命周期,开始的时候
        created(){
            
        },
        // $el 挂载的时候
        mounted() {
            
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            this.resultPage.currentPage = 1;
            // 获取购物车列表信息
            this.getShoppingCartData();
        },
        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {
            ...mapActions(['getMyShoppingNumber']),

            // 判断是不是有相关的权限
            judgeHasPrivilege(){
                let bool = !this.hasLogin==""||this.hasAuth=="1"||!this.hasCredit;
                if(!bool) return;
                if(!this.hasLogin){
                    this.$notify({
                        title: '您尚未登录',
                        message: "请先登录，登录后可进行相关操作",
                        type: 'error',
                        duration: 2000,
                    });
                }else if(!this.hasAuth=='1'){
                    this.$confirm('尊贵的用户，您好！通过认证并交纳一定的保证金，方可在我司平台办理业务，谢谢！', '您尚未通过认证', {
                        confirmButtonText: '前往认证',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往车行认证页面
                        this.$router.push({path:'/member/applyHome'});
                    }).catch(() => {
                        
                    });
                }else if(!this.hasCredit){
                    this.$confirm('尊贵的用户，您好！您的保证金余额不足'+SYSTEM.MIN_CREDIT_GOLD+'元，我司部分业务无法为您展开，请前往充值！', '保证金不足', {
                        confirmButtonText: '前往充值',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 前往保证金充值页面
                        this.$router.push({path:'/member/recharge',query:{type:2}});
                    }).catch(() => {
                        
                    });
                }
            },

            // 格式化商品列表信息cartList
            _normalizeGoodsList(list){
                let goodsList = [];
                list.forEach((item, index) => {
                    goodsList.push(new goodsInfo(item))
                });
                return goodsList;
            },

            // 获取购物车列表信息
            getShoppingCartData(curPage){

                let data = {
                    ActType: 'MyList',
                    PageSize: RESULE_PAGE_SIZE,
                    PageIndex: curPage||1,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取权限相关的信息
                        this.hasLogin = res.HasLogin;
                        this.hasAuth = res.HasAuth;
                        this.hasCredit = res.HasCredit;

                        // 分页总数更新
                        this.resultPage.totalPage = parseInt(res.count);
                        
                        // 获取购物车列表信息
                        this.cartList = this._normalizeGoodsList(res.data);

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

            //分页每页展示数据大小变化后出发
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            //分页页号切换触发
            handleCurrentChange(val) {
                // 刷新购物车
                this.getShoppingCartData(val);
                // this.searchFilterList.PageIndex = val;
                // // 重新渲染页面
                // this.carListResultRender();
            },
            
            // 移出购物车
            removeCart(carId,index){
                let data = {
                    ActType: 'Delete',
                    CarId: carId,
                }
                api.manageShoppingCart(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功移出购物车',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        // 重新获取购物车内车辆数量
                        this.getMyShoppingNumber();
                        // 删除对应商品，同步数据
                        this.cartList.splice(index, 1)
                        setTimeout(()=>{
                            // 获取购物车列表信息
                            this.getShoppingCartData();
                        })

                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '移出购物车失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 下单
            addOrder(carId,index){
                
                this.$alert(
                        `1.点击“立即秒杀”键之前，请与卖方对接车况，谈好成交价格
                         2.一旦确认“立即秒杀”，任何一方反悔，将自动扣除信誉保证金200元给守约方`
                        , '温馨提示', {
                        confirmButtonText: '立即秒杀',
                        type: 'warning',
                    }).then(() => {
                        this.$confirm('点击“确认秒杀”后，平台将锁定双方信誉保证金，同时该车辆也将被锁定，并显示正在交易中，卖家将发送电子购车合同，请认真考虑后下单！', '秒杀下单提示', {
                                confirmButtonText: '确认秒杀',
                                cancelButtonText: '再考虑看看',
                                type: 'warning'
                            }).then(() => {
                                this.putB2BOrder(carId);
                            }).catch(() => {
                                
                            });
                    }).catch(() => {
                        return;
                    });
            },

            // 提交下单申请
            putB2BOrder(carId,index){
                let data = {
                    CarId: carId,
                }
                api.getAddB2BOrder(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '下单成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500,
                        });
                        this.cartList[index].status = "2";
                        setTimeout(()=>{
                            this.$router.push({path:'/member/buyOrder'})
                        },300)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '下单失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 进入车辆详情
            enterCarDetails(id,status){
                if(!(status == '1'||status == '2')){
                    this.$alert('很抱歉，该车辆的信息或无效或过期，我们希望您尝试访问别的车辆信息', '温馨提示', {
                            confirmButtonText: '我知道了',
                            type: 'error'
                        });
                }else{
                    this.$router.push({path:'/b2bCar', query: { CarId: id }});
                }
            },
        },

	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'

</style>

