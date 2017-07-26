<template>
	<div class="walletHome">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="我的钱包"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-wallet-wrap">
                        <div class="m-wallet-hd">
                            <div class="m-top f__clearfix">
                                <p class="u-greet">欢迎来到<span class="vital">{{memberData.name}}</span>的小金库！</p><!-- 问候 -->
                                <p class="u-payPass f__clearfix">
                                    <template v-if="!memberData.hasPaypwd">
                                        <router-link
                                            :to="{path:'/member/payPass'}" 
                                            class="lk" tag="a"
                                            title="设置或者修改您的支付密码"
                                            >开启支付密码
                                        </router-link>
                                        <p class="tips"><i class="iconfont icon-xinxi2"></i>
                                        <span class="txt">开启支付密码后，账户资金更安全！</span></p>
                                    </template>
                                    <template v-if="memberData.hasPaypwd">
                                        <router-link
                                            :to="{path:'/member/editPayPass'}" 
                                            class="lk" tag="a"
                                            title="设置或者修改您的支付密码"
                                            >修改支付密码
                                        </router-link>
                                    </template>
                                </p><!-- 支付密码 -->
                            </div><!-- 头部内容 -->
                            <div class="m-mn">
                                <div class="u-balance">
                                    <div class="u-gp balance">
                                        <div class="u-attr">现金余额：</div>
                                        <div class="u-info">
                                            <span class="u-data"><i class="unit">￥</i>{{accountData.balance | priceFormat(2)}}</span>
                                            <router-link :to="{path:'/member/recharge',query:{type:1}}" class="u-btn">充值</router-link>
                                        </div>
                                    </div>
                                    <div class="u-gp credit">
                                        <div class="u-attr">信誉保证金余额：</div>
                                        <div class="u-info">
                                            <span class="u-data"><i class="unit">￥</i>{{accountData.xinyu | priceFormat(2)}}</span>
                                            <router-link :to="{path:'/member/recharge',query:{type:2}}" class="u-btn">充值</router-link>
                                        </div>
                                        
                                    </div>
                                </div><!-- 余额 -->
                                <div class="u-deposit">
                                    <ul class="deposit-list f__clearfix">
                                        <li class="u-item">
                                            <span class="u-attr">买车保证金</span>
                                            <p class="u-data">{{accountData.buyDeposit | priceFormat(2)}}
                                                <span class="unit">元</span>
                                            </p>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">卖车保证金</span>
                                            <p class="u-data">{{accountData.sellDeposit | priceFormat(2)}}
                                                <span class="unit">元</span>
                                            </p>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">买车委托款</span>
                                            <p class="u-data">{{accountData.managed | priceFormat(2)}}
                                                <span class="unit">元</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div><!-- 冻结金信息 -->
                                <div class="u-withdraw">
                                    <router-link :to="{path:'/member/withdraw'}" class="u-btn" tag="a">提现</router-link>
                                    <p class="tips">每次提现额度最少为￥100.00</p>
                                </div><!-- 提现 -->
                            </div><!-- 主要内容 -->
                            
                        </div><!-- 头部 -->
                        <div class="m-bill-wrap">
                            <div class="m-tab-box f__clearfix">
                                <a href="javascript:;" 
                                    @click="tabChange(1)"
                                    :class="{'on':tabShowIndex==1}"
                                    class="u-tab-lk">全部账单
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(2)"
                                    :class="{'on':tabShowIndex==2}"
                                    class="u-tab-lk">平台余额
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(3)"
                                    :class="{'on':tabShowIndex==3}"
                                    class="u-tab-lk">信誉保证金
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(4)"
                                    :class="{'on':tabShowIndex==4}"
                                    class="u-tab-lk">购车保证金
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(5)"
                                    :class="{'on':tabShowIndex==5}"
                                    class="u-tab-lk">卖车保证金
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(6)"
                                    :class="{'on':tabShowIndex==6}"
                                    class="u-tab-lk">买方购车托管款
                                </a>
                                <a href="javascript:;" 
                                    @click="tabChange(7)"
                                    :class="{'on':tabShowIndex==7}"
                                    class="u-tab-lk">交易保证金
                                </a>
                                <el-select class="m-sort-sel" v-model="sortType" placeholder="按交易时间排序">
                                    <el-option
                                      key="DESC"
                                      label="交易时间正序"
                                      value="DESC">
                                    </el-option>
                                    <el-option
                                      key="ASC"
                                      label="交易时间倒序"
                                      value="ASC">
                                    </el-option>
                                </el-select>
                            </div><!-- 切换 -->
                            <div class="m-con-box">
                                <bill-list
                                    @getMoreData="getMoreData()"
                                    :billList= "billList"
                                    :isNotMore="isNotMore"
                                    :isShowMore="billList.length>=pageSize">
                                    >
                                </bill-list>
                            </div><!-- 内容盒子 -->
                        </div><!-- 账单列表容器 -->
                    </div><!-- 我的钱包 -->
                </member-inner>

            </div><!-- 现金账户内容 -->
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
    // 账户余额及账单信息的构造类
    import {balanceData,billInfo} from 'base/class/account.js'


    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'
    // 账单信息列表组件
    import billList from 'components/member/billList.vue'


	export default {

        name: "walletHome",
        // 在当前模块注册组件
        components: {
            memberLayout,
            memberInner,
            billList,
        },
        // 数据
        data() {
            return{

                // 用户信息
                memberData: {},
                // 账户余额
                accountData: new balanceData({}),

                // 选项卡显示
                tabShowIndex: "",

                // 全部账单
                allList: [],
                // 平台余额（账单列表）
                platformList: [],
                // 信誉保证金（账单列表）
                creditList: [],
                // 购车保证金（账单列表）
                buyCarList: [],
                // 卖车保证金（账单列表）
                sellCarList: [],
                // 买方购车托管款（账单列表）
                managedList: [],
                // 交易保证金（账单列表）
                dealList: [],

                // 显示在列表的数据
                billList: [],


                // 我的分页（每页数据大小）
                pageSize: 15,
                
                sortType: 'DESC',  // 排序规则，按交易时间正序(DESC)，倒序(ASC)
                // 是否有更多的集合
                isNotMoreItems:[false,false,false,false,false,false,false],
                isNotMore: false,
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
            // 获取账户余额
            this.getUserAccount();

            // 获取当前选项卡索引并显示对应的数据
            this.tabShowIndex = this.$router.currentRoute.query.tabIndex||1;
            this.tabChange(this.tabShowIndex);
        },
        // 退出的生命周期钩子
        deactivated(){
            // 清除所有数据
            this.clearData();
        },
        // 属性值计算
        computed:{
            ...mapGetters(['userData']),
        },
        // 数据侦听
        watch:{
            // 排序规则切换
            sortType(val){
                // 刷新数据
                this.tabChange(this.tabShowIndex);
            }
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
            
            // 格式化账户余额
            _normalizeBalance(data) {
                return new balanceData(data);
            },
            // 获取账户余额
            getUserAccount(){
                let data = {}
                api.getUserAccount(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.accountData = this._normalizeBalance(res.data);
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

            // 选项卡切换方法
            tabChange(index){
                // 清除所有数据
                this.clearData();
                // 开始切换
                this.$router.push({
                    path:'/member/wallet',
                    query:{tabIndex:index},
                })
                // 在组件内切换
                this.tabShowIndex = index
                // 获取账单列表数据
                this.getBillListData(index);
            },
            
            // 根据tabIndex 获取 status
            _getStatusByIndex(index){
                let status;
                switch(index){
                    case "1":   // 全部账单
                        return status = "ALL";
                        break;
                    case "2":   // 平台余额（账单列表）
                        return status = "平台余额";
                        break;
                    case "3":   // 信誉保证金（账单列表）
                        return status = "信誉保证金";
                        break;
                    case "4":   // 购车保证金（账单列表）
                        return status = "B2B买方保证金";
                        break;
                    case "5":   // 卖车保证金（账单列表）
                        return status = "B2B卖方保证金";
                        break;
                    case "6":   // 买方购车托管款（账单列表）
                        return status = "B2B买方车款";
                        break;
                    case "7":   // 交易保证金（账单列表）
                        return status = "交易保证金";
                        break;
                }
                return status;
            },

            // 获取账单列表数据
            getBillListData(index){
                let me = this;
                let _index = index.toString();
                let status = this._getStatusByIndex(_index);

                // 获取数据，然后回调赋值
                this.getData(status,1,(res) => {
                    this.billList = this._normalizeBill(res);
                })
            },

            // 格式化车源列表
            _normalizeBill(list){
                let arr = []
                list.forEach((item, index) => {
                    arr.push(new billInfo(item));
                });
                return arr;
            },
            // 获取数据
            getData(status,curPage=1,callBack){
                let data = {
                    TradeSource : status,
                    SortDir : this.sortType,
                    pageIndex : curPage,
                    pageSize : this.pageSize,
                }
                api.getBillList(data).then(res => {
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
            getMoreData(){
                let index = this.tabShowIndex;
                let status = this._getStatusByIndex(index.toString());

                let listSize = this.billList.length;
                if(listSize%this.pageSize!=0) return;

                let nextPageNo = Math.ceil(listSize/this.pageSize) + 1;

                // 获取数据，然后回调赋值
                this.getData(status,nextPageNo,(res) => {
                    if(res.length==0||res.length<this.pageSize){
                        this.isNotMore = true;     
                    }
                    this.billList.push(...this._normalizeBill(res));
                })
            },

            // 清空所有列表数据
            clearData(){
                this.allList= [];
                this.platformList= [];
                this.creditList= [];
                this.buyCarList= [];
                this.sellCarList= [];
                this.managedList= [];
                this.dealList= [];
                this.isNotMoreItems = [false,false,false,false,false,false,false];
                this.isNotMore = false;
            },
        },
	}
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-bill-wrap
        .m-tab-box
            .m-sort-sel
                width 145px
                height 48px
                _completeCenter(auto,5px,auto,-4px)
                .el-input__inner
                    _borderAll(#d2d2d2)
                    _borderRadius(2px)
                    height 36px
                    line-height 36px
                    color #2e98e2
                .el-input__icon,
                .el-select .el-input .el-input__icon
                    color #DEDFE0
</style>


<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
