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
                                <p class="u-greet">您好，<span class="vital">{{memberData.name}}</span></p><!-- 问候 -->
                                <p class="u-payPass f__clearfix">
                                    <router-link 
                                        :to="{path:'/member/cardManage'}" 
                                        class="lk" tag="a" 
                                        title="绑定或者修改您的银行卡"
                                        >管理银行卡
                                    </router-link>
                                    <span class="cut">|</span>
                                    <template v-if="!memberData.hasPaypwd">
                                        <router-link
                                            :to="{path:'/member/payPass',query:{showType:1}}" 
                                            class="lk" tag="a"
                                            title="设置或者修改您的支付密码"
                                            >开启支付密码
                                        </router-link>
                                        <p class="tips"><i class="iconfont icon-xinxi2"></i>
                                        <span class="txt">开启支付密码后，账户资金更安全！</span></p>
                                    </template>
                                    <template v-if="memberData.hasPaypwd">
                                        <router-link
                                            :to="{path:'/member/payPass',query:{showType:2}}" 
                                            class="lk" tag="a"
                                            title="设置或者修改您的支付密码"
                                            >修改支付密码
                                        </router-link>
                                    </template>
                                </p><!-- 支付密码 -->
                            </div><!-- 头部内容 -->
                            <div class="m-mn">
                                <div class="u-balance">
                                    <div class="balance">
                                        现金余额：￥{{accountData.balance | priceFormat(2)}}
                                        <router-link :to="{path:'/member/recharge',query:{type:1}}" class="u-btn">充值</router-link>
                                    </div>
                                    <div class="credit">
                                        信誉保证金余额：￥{{accountData.xinyu | priceFormat(2)}}
                                        <router-link :to="{path:'/member/recharge',query:{type:2}}" class="u-btn">充值</router-link>
                                    </div>
                                </div><!-- 余额 -->
                                <div class="u-deposit">
                                    <ul class="deposit-list">
                                        <li class="u-item">
                                            <span class="u-attr">买车保证金：</span>
                                            <span class="u-data">{{accountData.buyDeposit | priceFormat(2)}}元</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">卖车保证金：</span>
                                            <span class="u-data">{{accountData.sellDeposit | priceFormat(2)}}元</span>
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">买车委托款：</span>
                                            <span class="u-data">{{accountData.managed | priceFormat(2)}}元</span>
                                        </li>
                                    </ul>
                                </div><!-- 冻结金信息 -->
                                <div class="u-withdraw">
                                    <router-link :to="{path:'/member/withdraw'}" class="u-btn">提现</router-link>
                                    <p>每次提现额度最少为￥100.00</p>
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
                            </div><!-- 切换 -->
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
    // 账户余额的构造类
    import {balanceData} from 'base/class/account.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue' 
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

	export default {

        name: "walletHome",
        // 在当前模块注册组件
        components: {
            memberLayout,
            memberInner,
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


                // 我的分页（每页数据大小）
                pageSize: 15,
                
                sortType: 'DESC',  // 排序规则，按交易时间正序(DESC)，倒序(ASC)
                // 是否有更多的集合
                isNotMoreItems:[false,false,false,false,false,false,false]
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
            userData:{
                handler(curVal,oldVal){
                    this.getMemberInfo();
                },
                deep:true
            }
        },
        // 自定义函数(方法)
        methods: {
            // 获取用户信息
            getMemberInfo(){
                this.memberData = new memberInfo(this.userData);
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
            },
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
