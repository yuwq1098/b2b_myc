<template>
    <div class="contractBuy">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="买方签署合同"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-buy-con"
                        >
                        <div class="m-hd" v-show="false">
                            <div class="tit">发起卖车合同</div>
                        </div><!-- 头部 -->
                        <div class="m-con">
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">签署双方</span>
                                </div>
                                <div class="u-con sign-all">
                                    <div class="u-gp-line f__clearfix">
                                        <div class="gp-item u-name">
                                            <div class="attr">甲方（卖方）：</div>
                                            <div class="data">{{contractBodyData.seller}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractBodyData.sellerIdcNo}}</div>
                                        </div>
                                    </div>
                                    <div class="u-gp-line f__clearfix">
                                        <div class="gp-item u-name">
                                            <div class="attr">乙方（买方）：</div>
                                            <div class="data">{{contractBodyData.buyer}}</div>
                                        </div>
                                        <div class="gp-item u-identity">
                                            <div class="attr">身份证号码：</div>
                                            <div class="data no">{{contractBodyData.buyerIdcNo}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车辆基本信息</span>
                                </div>
                                <div class="u-con car-details">
                                    
                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车牌号码：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.plateNumber}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车牌号码 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车架号：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.vin}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车架号 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">发动机号：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.engineNumber}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 发动机号 -->
                                </div>
                            </div>

                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">车况描述</span>
                                </div>
                                <div class="u-con car-other">

                                    <div class="u-line-box f__clearfix">
                                        <div class="box-inner radio-two">
                                            <div class="attr">抵押按揭：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.hasMortgage | boolFormat}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner radio-two">
                                            <div class="attr">能否过户：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.transfer | canFormat }}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">提档预计时间：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.pickArchiveDate}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 提档预计时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">最晚提档时间：</div>
                                            <div class="ipt text-show">
                                                <div class="txt no"
                                                    >{{contractBodyData.buyerPickCarDate}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 最晚提档时间 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">车况说明：</div>
                                            <div class="ipt long-text">
                                                <div class="txt"
                                                    >{{contractBodyData.carOtherDesc}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 车况说明 -->

                                    <div class="u-line-box">
                                        <div class="box-inner">
                                            <div class="attr">成交价：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.finalPrice | priceFormat(2)}}</em>万元
                                                </div>
                                            </div>

                                        </div>
                                    </div><!-- 成交价 -->

                                    <div class="u-line-box f__clearfix">
                                        <div class="box-inner text-two">
                                            <div class="attr">卖方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.sellerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                        <div class="box-inner text-two">
                                            <div class="attr">买方保证金：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.buyerDeposit | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 卖/买方保证金 -->

                                    <div class="u-line-box">
                                        <div class="box-inner long-attr">
                                            <div class="attr">使用平台托管部分尾款：</div>
                                            <div class="ipt text-show">
                                                <div class="txt"
                                                    >{{contractBodyData.needEntrust | boolFormat}}
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->

                                    <div class="u-line-box" v-if="contractBodyData.needEntrust=='true'">
                                        <div class="box-inner">
                                            <div class="attr">托管尾款：</div>
                                            <div class="ipt text-show">
                                                <div class="txt price"
                                                    ><em class="vital">{{contractBodyData.entrustMoney | priceFormat(2)}}</em>元
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 尾款金额 -->

                                </div>
                            </div>
                            
                            <div class="m-section">
                                <div class="u-hd"
                                    ><span class="tit">注意事项及合同签名</span>
                                </div>
                                <div class="u-con more">
                                    <div class="u-line-box">
                                        <div class="box-inner more-box">
                                            <div class="attr">注意事项：</div>
                                            <div class="ipt text-info">
                                                <div class="txt">
                                                    <div>1.【保证金】双方协商好价格并在平台签订电子购车合同后，双方各自缴纳3000元交易保证金，交易成功后，将原路返回。</div>
                                                    <div>2.【托运车】买家接车后，与合同描述不符，卖家无条件退还保证金，并承担损失费用。若卖方要求退车，卖方必须无条件接受。</div>
                                                    <div>3.【上门验车】买方上门验车，如与合同描述不符，卖家无条件退还保证金，并承担损失费用。若卖方要求退车，卖方必须无条件接受。</div>
                                                    <div>4.【交易完成】买方验车完成签收后，出现任何问题与卖方无关。</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                     <div class="u-line-box">
                                        <div class="box-inner more-box v2">
                                            <div class="attr">甲方（卖方）签名：</div>
                                            <div class="ipt sign-box">
                                                <div class="u-pic">
                                                    <img class="sign-img"
                                                        v-show="contractDetails.sellerSignImg"
                                                        :src="contractDetails.sellerSignImg" 
                                                        alt="签名图片" />
                                                </div><!-- 签名图片 -->
                                                <div class="other-info">
                                                    <span class="o-attr">卖方联系电话：</span>
                                                    <p class="o-data">{{contractDetails.sellerTel}}</p>
                                                    <span class="o-attr">卖方签署时间：</span>
                                                    <p class="o-data">{{contractDetails.sellerSignTime}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                    <div class="u-line-box">
                                        <div class="box-inner more-box v2">
                                            <div class="attr">乙方（买方）签名：</div>
                                            <div class="ipt sign-box">
                                                <div class="u-pic">
                                                    <img class="sign-img"
                                                        v-if="signImg" 
                                                        :src="signImg" 
                                                        alt="签名图片" />
                                                    <p class="not-pic" v-if="!signImg"
                                                        >请先完成签名
                                                    </p>
                                                </div><!-- 签名图片 -->
                                                <template v-if="!signImg">
                                                    <a href="javascript:;" class="u-btn"
                                                        @click="goSign()">立即签名</a><!-- 签名 -->
                                                </template>
                                                <template v-else-if="signImg">
                                                    <a href="javascript:;" class="u-btn"
                                                        @click="goSign()">重新签名</a><!-- 签名 -->
                                                </template>
                                            </div>
                                        </div>
                                    </div><!-- 有无抵押/能否过户 -->
                                </div>
                            </div><!-- 注意事项及合同签名 -->

                            <div class="m-operate">
                                <div class="u-btn-box">
                                    <div class="agr-info">
                                        <div class="info" 
                                            >已阅读
                                            <a href="javascript:;" class="u-lk"
                                                >《车辆转让协议》
                                            </a>
                                        </div>
                                        <div class="ipt-check">
                                            <el-checkbox 
                                                v-model="isAgree"
                                                >
                                            </el-checkbox>
                                        </div>
                                    </div>
                                    <a href="javascript:;"
                                        class="u-btn"
                                        @click="signContract()"
                                        >确认签署合同</a>
                                </div>
                            </div><!-- 确认发起合同/操作区域 -->

                        </div><!-- 内容 -->
                    </div><!-- 买方签署合同 -->
                    
                </member-inner>

            </div><!-- 买方签署合同 -->
        </member-layout>

        <div class="m-sign-alerts" v-if="isShow_signBox">
            <div class="m-mask"></div><!-- 遮罩层 -->
            <div class="m-alert-box">
                <div class="inner">
                    <div class="u-hd">
                        <p class="txt">乙方（买方）签名</p>
                        <a class="u-btn close"
                            @click="closeAlertsBox()"
                            >
                            <i class="iconfont icon-guanbi1"></i></a>
                    </div><!-- 头部 -->
                    <div class="u-con">
                        
                        <div class="u-sign-wrap" id="js__signParent">
                            <canvas id="js__signWrap" ref="signWrap" width="280" height="100"></canvas>
                        </div><!-- 签名区域 -->                        

                    </div><!-- 内容 -->
                    <div class="u-operate-btn">
                        <a href="javascript:;" class="u-btn reset"
                            @click="resetSign()"
                            >重新签名
                        </a>
                        <a href="javascript:;" class="u-btn success"
                            @click="signSuccess()"
                            >确认完成
                        </a>
                    </div><!-- 操作区 -->
                </div><!-- 内容容器 -->
            </div>
        </div><!-- 签名弹出框 -->

    </div>
</template>

<script>

    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // 工具类
    import {dataToJson} from "assets/js/util.js"

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    // 合同详情信息/合同内容信息的构造类
    import {contractDetails,contractBody} from 'base/class/order.js'

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue'

    export default {
        
        name: "contractBuy",
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
        },
        // 数据
        data() {
            return{
                // 订单id
                orderId: "",
                // 合同详情信息
                contractDetails: new contractDetails({}),
                // 合同内容信息
                contractBodyData: new contractBody({}),
                
                // 签名框显示
                isShow_signBox: false,
                
                // canvas签名图片
                canvasImg: "",
                // 签名图片
                signImg: "",
                // 签名图片Id
                signImgId: "",

                // 同意转让协议
                isAgree: true,
            }
        },
        //生命周期,开始的时候
        created(){
            
        },
        mounted(){

        },
        activated(){
            
            // 重置数据
            this.reset();
            // canvas画布
            this.canvasBox = document.getElementById('js__signParent');

            // 获取订单Id
            this.orderId = this.$router.currentRoute.query.cid||"";
            // 获取合同详情信息
            this.getContractDetails();

        },
        // 退出的生命周期钩子
        deactivated(){

            // 重置数据
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

            // 格式化合同详情信息
            _normalizeContractDetails(data) {
                return new contractDetails(data);
            },

            // 格式化合同内容信息
            _normalizeContractBody(data) {
                return new contractBody(data);
            },

            // 获取合同详情信息
            getContractDetails(){
                var data = {
                    OrderId : this.orderId,
                }
                api.orderContractView(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 合同详情内容
                        this.contractDetails = this._normalizeContractDetails(res.data);
                        // 合同内容信息
                        this.contractBodyData = this._normalizeContractBody(this.contractDetails.contractBody);

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
            
            // 确认签署合同
            signContract(){
                let me = this;
                // 未同意协议
                if(!this.isAgree){
                    this.$alert('请先同意并阅读协议，同意协议后，方可完成签署合同', '温馨提示', {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    return;
                }
                // 未上传签名
                if(!this.signImg||!this.signImgId){
                    this.$alert('请先完成签名，签名完成后，方可确认签署合同', '未上传签名', {
                            confirmButtonText: '我知道了',
                            type: 'warning',
                            callback: () => {
                                return;
                            }
                        });
                    return;
                }

                this.$confirm('亲爱的买家，您好！请认真确认卖家发起的合同内容信息是否合理，避免给您带来不必要的麻烦！', '温馨提示', {
                        confirmButtonText: '没问题，可以签了',
                        cancelButtonText: '再仔细看看',
                        type: 'warning'
                    }).then(() => {
                        // 立即签署合同
                        this.putCommit();
                    }).catch(() => {
                        return;
                    });

            },

            // 卖家提交发起合同的请求
            putCommit(){

                let data = {
                    // 订单ID
                    OrderId : this.orderId,
                    // 签名文件ID
                    ContractFileId: this.signImgId,
                    // 时间戳
                    ContractTimeStamp: this.contractDetails.timeStamp,
                }

                // 请求发起（签）合同接口
                api.signContractBuyer(data).then(res => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        this.$notify({
                            title: '成功签署合同',
                            message: "恭喜您成功成功签署合同，请继续交易流程的下一步吧",
                            type: 'success',
                            duration: 2000,
                        });
                        setTimeout(() => {
                            this.$router.push({path:'/member/buyOrderDetails',query:{cid:this.orderId}});
                        },800)
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '签署合同失败',
                            message: res.msg,
                            type: 'error',
                            duration: 1500,
                        });
                    }
                })
            },

            // 立即去签名
            goSign(){
                this.isShow_signBox = true;
                setTimeout(()=>{
                    // 开始签名
                    this.signBrush();
                })
                
            },

            // 关闭签名弹出框
            closeAlertsBox(){
                this.isShow_signBox = false;
            },

            // 重置签名 
            resetSign(){

                // 清空签名图片
                this.canvasImg = "";
                
                let signWrap = document.getElementById("js__signWrap");
                this.canvasBox.removeChild(signWrap);
                let newCanvas = document.createElement('canvas');

                newCanvas.id = "js__signWrap"; 
                newCanvas.width = "280"; 
                newCanvas.height = "100"; 
                
                this.canvasBox.appendChild(newCanvas);
                
                // 签名方法
                this.signBrush();
            },

            // 完成签名
            signSuccess(){
                this.fileUpload("乙方（买家）签名",this.canvasImg);
            },

            //图片上传
            fileUpload(name,base64str){
                let me = this;
                let data = {
                    title: name,
                    dataUrl: base64str,
                }
                // 上传至隐私类图片
                api.uploadPrivateFileBase64(data).then(res=>{
                    this.isLoading = false;
                    if(res.code==SYSTEM.CODE_IS_OK){

                        this.signImg = res.data.imgUrl;
                        this.signImgId = res.data.imgId;
                        // 关闭签名框
                        this.isShow_signBox = false;
                        
                    }else if(res.code==SYSTEM.CODE_IS_ERROR){
                        this.$notify({
                            title: '签名图片上传失败',
                            message: res.msg,
                            type: 'error',
                            duration: 2000,
                        });
                    }
                })
            },
            
            // 签名方法
            signBrush(){
                let me = this;
                let signWrap = document.getElementById("js__signWrap");
                // let signWrap = this.$refs.signWrap;
                geekDom.brush(signWrap,2,"#222",function(base64Img){
                    me.canvasImg = base64Img;
                });
            },
            
            // 重置数据
            reset(){

                this.isShow_signBox= false;
                this.canvasImg= "";
                this.signImg= "";
                this.signImgId= "";
                this.isAgree= true;

            },

        },
        
    }
</script>


<!-- 限定作用域"scoped" -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-buy-con
        .u-line-box
            .radio-ipt
                _display()
                .el-radio
                    color #4b5861
                    & *
                        cursor pointer
                .el-radio__label
                    padding-left 8px
                .el-radio__input
                    vertical-align top
                    _translate3d(0,10px)
            .date-ipt
                .el-date-editor
                    .el-input__inner
                        height 38px
                        line-height 38px
                        _borderAll(#4B5861 + 75%)
                        _placeholder(#b2b2b2)
                        _borderRadius(0)
                        &:hover,&:focus
                            _borderAll(#4B5861)
                    .el-input__icon
                        color #4B5861 + 75%
        .el-checkbox__input
            .el-checkbox__inner
                cursor pointer

</style>

<!-- 二维码提示弹窗组件 -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../sign_alerts.styl'
</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
