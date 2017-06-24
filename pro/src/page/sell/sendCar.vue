<!--
-  @description 填写卖车单子的页面（仿造第一车网）,未登录不可访问
-->

<template>
	<div class="sendCar">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                </section><!-- 1200px布局 -->
                <div class="m-send-con">
                    <div class="m-banner-box">
                        <img :src="bannerInfo.imgUrl" :alt="bannerInfo.title"/>
                    </div><!-- 填写表单的小广告图 -->
                    <section class="f__w1200">
                        <div class="m-bill-wrap">
                            <div class="m-bill-hd">
                                <p class="u-tit">
                                    <span class="text">请认真填写个人车辆信息，</span>
                                    <span class="vital">极速审核发车</span>
                                </p>
                            </div><!-- 头部标题 -->
                            <div class="m-bill-con">
                                <prompt-info :info="promptInfoText"></prompt-info><!-- 温馨提示 -->
                                
                                <div class="m-bill-box" ref="sendBill">
                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="车辆所在地"
                                                        :errorTetx="sendError.first('carInCity')"
                                                        :isShow="sendError.has('carInCity')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <city-cascader
                                                            @valChangeEnd="carInCityChangeEnd"
                                                            placeholder="请选择车辆所在地"
                                                            >
                                                        </city-cascader>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="16">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="品牌车型"
                                                        errorTetx="请选择车型"
                                                        :errorTetx="sendError.first('selectedModel')"
                                                        :isShow="sendError.has('selectedModel')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <model-cascader
                                                            @valChangeEnd="modelChangeEnd"
                                                            placeholder="请选择车品牌、车系及车型"
                                                            >
                                                        </model-cascader>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="车牌归属地"
                                                        errorTetx="请选择车牌归属地"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <city-cascader
                                                            @valChangeEnd="plateInCityChangeEnd"
                                                            placeholder="请选择车牌归属地（城市）"
                                                            >
                                                        </city-cascader>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="上牌时间"
                                                        errorTetx="请选择上牌时间"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <date-picke
                                                            @dateChangeEnd="plateDateEnd"
                                                            :disabledPrevYear="20"
                                                            placeholder="请选择上牌时间"
                                                            >
                                                        </date-picke>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="过户次数"
                                                        errorTetx="请选择过户次数"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-select
                                                            placeholder="请选择过户次数"
                                                            @selectedEnd="changeNumEnd"
                                                            :options="selectData.changeNumList"
                                                            >
                                                        </gk-select>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="出厂日期"
                                                        errorTetx="请选择出厂日期"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <date-picke
                                                            @dateChangeEnd="outFactoryDateEnd"
                                                            :disabledPrevYear="30"
                                                            placeholder="请选择出厂日期"
                                                            >
                                                        </date-picke>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="一口价"
                                                        errorTetx="请填写一口价"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写一口价" v-model="form.price"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="零售价"
                                                        errorTetx="请填写零售价"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写零售价" v-model="form.price2"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="行驶里程"
                                                        errorTetx="请填写行驶里程"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写行驶里程" v-model="form.mileage"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">

                                                    <gk-input-error
                                                        title="排放标准"
                                                        errorTetx="请选择排放标准"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-select
                                                            placeholder="请选择排放标准"
                                                            @selectedEnd="dischargeStandardEnd"
                                                            :options="selectData.dischargeStandardList"
                                                            >
                                                        </gk-select>
                                                    </div>
                                                </div>
                                            </el-col>
                                            
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="排量"
                                                        errorTetx="请填写排量"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写排量，1.0L ~ 7.0L" v-model="form.Liter"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="交强险（到期时间）"
                                                        errorTetx="请填写交强险"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <date-picke
                                                            @dateChangeEnd="insuranceDateEnd"
                                                            :disabledPrevYear="3"
                                                            placeholder="请选择交强险（到期时间）"
                                                            >
                                                        </date-picke>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="使用性质"
                                                        errorTetx="请填写使用性质"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-select
                                                            placeholder="请选择使用性质"
                                                            @selectedEnd="serviceEnd"
                                                            :options="selectData.ServiceCharacteristics"
                                                            >
                                                        </gk-select>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="车架号"
                                                        errorTetx="请填写车架号"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写车架号" v-model="form.price"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-other color">
                                        <div class="m-other-hd">
                                            <gk-input-error
                                                title="车身颜色"
                                                errorTetx="请选择车身颜色"
                                                errorAlign="left"
                                                >
                                            </gk-input-error>
                                        </div>
                                        <div class="m-color-wrap">
                                            <color-select
                                                @selectedEnd="carColorEnd"
                                                >
                                            </color-select>
                                        </div>
                                    </div><!-- 车身颜色选择 -->
                                    
                                    <div class="m-gp-other nameplate">
                                        <div class="m-other-hd">
                                            <gk-input-error
                                                title="上传车辆铭牌"
                                                errorTetx="请上传车辆铭牌"
                                                errorAlign="left"
                                                >
                                            </gk-input-error>
                                        </div>
                                        <div class="m-nameplate-upload">
                                            <nameplate-upload
                                                @changeFiles="nameplateEnd"
                                                >
                                            </nameplate-upload>
                                        </div>
                                    </div><!-- 车辆铭牌 -->

                                    <div class="m-gp-other photo">
                                        <div class="m-other-hd">
                                            <gk-input-error
                                                title="上传车辆照片"
                                                errorTetx="请最少上传2张车辆图片"
                                                errorAlign="left"
                                                
                                                >
                                            </gk-input-error>
                                        </div>
                                        <div class="m-photo-upload">
                                            <photo-upload
                                                @changeFiles="photoEnd"
                                                >    
                                            </photo-upload>
                                        </div>
                                    </div><!-- 车辆图片 -->

                                    <div class="m-gp-other desc">
                                        <div class="m-other-hd">
                                            <span class="u-tit"></span>
                                            <p class="u-error"></p>
                                            <gk-input-error
                                                title="车主留言(对车况进行描述)"
                                                errorTetx="请输入10-300字内容"
                                                errorAlign="left"
                                                >
                                            </gk-input-error>
                                        </div>
                                        <div class="m-other-con">
                                            <gk-textarea
                                                @inputEnd="descEnd"
                                                :maxLength="300"
                                                placeholder="填写车况描述，提高资料完善度，让购车人更容易搜到你！"
                                                tips="*请填写10~300之间的车况描述，其他无关信息会影响车辆通过审核"
                                                >
                                            </gk-textarea>
                                        </div>
                                    </div><!-- 车况描述 -->

                                    <div class="m-gp-other postRetail">
                                        <div class="m-switch-box">
                                            <gk-switch
                                                text="是否发布到普通二手车市场"
                                                @switchEnd="postRetailEnd"
                                                >
                                            </gk-switch>
                                        </div>
                                    </div><!-- 发布到普通b2c市场 -->
                                    
                                    <div class="m-gp-btn">
                                        <div class="m-submit-box">
                                            <gk-submit
                                                btnText="立即发布"
                                                @submitTrigger="putOut"
                                                >
                                            </gk-submit>
                                        </div><!-- 提交按钮 -->
                                    </div>

                                </div>


                            </div><!-- 车单内容 -->
                        </div><!-- 用户填单(发单) -->

                        <app-box></app-box><!-- APP发布车辆 -->
                    </section>
                </div><!-- 填写表单处 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>

    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 温馨提示组件
    import promptInfo from "components/common/promptInfo.vue"
    // 手机扫码盒子
    import appBox from "components/common/appBox.vue"
    // 车型级联选择组件
    import modelCascader from "components/cascader/brandModel.vue"
    // 城市级联选择组件
    import cityCascader from "components/cascader/citySelect.vue"
    // 下拉组件
    import gkSelect from "components/common/gkSelect.vue"
    // 日期选择器
    import datePicke from "components/common/datePicke.vue"
    // 表单错误提示头组件
    import gkInputError from "components/common/inputError.vue"
    // 汽车颜色选择插件
    import colorSelect from "components/common/colorSelect.vue"
    // 多行文本输入器
    import gkTextarea from "components/common/gkTextArea.vue"
    // switch开关
    import gkSwitch from "components/common/gkSwitch.vue"
    // 表单提交按钮
    import gkSubmit from "components/common/submitBtn.vue"
    // 铭牌上传
    import nameplateUpload from "components/common/nameplateUpload.vue"
    // 图片上传
    import photoUpload from "components/common/photoUpload.vue"

    // 获取m卖车填单页的本地相关数据
    import * as sendCarData from "api/localJson/sendCar.js"
    
    //引入表单验证
    import { Validator } from 'vee-validate';

	export default {
        name: "sendCar",
        validator: null,
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,           
            appBox,
            promptInfo,
            modelCascader,
            cityCascader,
            gkSelect,
            datePicke,
            gkInputError,
            colorSelect,
            gkTextarea,
            gkSwitch,
            gkSubmit,
            nameplateUpload,
            photoUpload,
        },

        // 数据
        data() {
            return{
                
                dialogImageUrl: '',
                dialogVisible: false,
                bannerInfo: sendCarData.sendBanner,                  // 发布订单页面的banner图信息
                promptInfoText: sendCarData.promptInfo,              // 发布订单页面的温馨提示
                
                // 表单样式集中管理
                formStyleData:{  
                    gutter: 20,
                },
                
                // 发布订单的表单验证报错集合
                sendError: null,
                
                // 车辆订单的表单信息（供双向绑定及提交）
                form:{
                    carInCity: "",          // 车辆所在地
                    selectedModel: "",      // 品牌车型选择的结果
                    plateInCity: "",        // 车牌归属地
                    plateDate: "",          // 上牌日期
                    changeNum: "",          // 过户次数
                    OutFactoryDate: "",     // 出厂日期
                    price: "",              // 一口价/最低价   对应api字段 => B2BPrice
                    price2: "",             // 零售价   对应api字段 => RetailPrice
                    mileage: "",            // 行驶里程
                    dischargeStandard: "",  // 排放标准
                    liter: "",              // 排量
                    insuranceDate: "",      // 交强险日期
                    serviceType: "",        // 使用性质（运营类型）
                    vin: "",                // 车架号
                    color: "",              // 颜色
                    desc: "",               // 车主留言
                    nameplate: [],          // 铭牌图片
                    photo: [],              // 车辆图片
                    isPostRetail: "",    // 是否发布到二手市场
                },

                // 数据源（下拉选择的数据）
                selectData:{
                    carColorList: "",                       // 车辆颜色列表
                    changeNumList: sendCarData.changeNum,   // 过户次数列表
                    // 排放标准
                    dischargeStandardList: sendCarData.dischargeStandard,    
                    // 运营类型
                    ServiceCharacteristics: sendCarData.ServiceCharacteristics,
                },
                
                // 真实发单向api发起请求的字段
                sendForm:{
                    CarBaseInfo:{
                        CarId: "",                    // 修改时必填原先记录主键，如果是新增加则不传
                        CarModelId: "",               // 车型id
                        B2BPrice: "",                 // B2B价格 单位：万元
                        RetailPrice: "",              // 普通分享价格 单位：万元
                        OutFactoryDate: "",           // 出厂日期2015-01-01，如果没填就传空字符传
                        OnLicensePlateDate: "",       // 上牌时间2015-01-01
                        Liter: "",                    // 排量(1.0~7.0)
                        DischargeStandard: "",        // 排放标准：国12345
                        Mileage: "",                  // 真实里程
                        Color: "",                    // 颜色：红色
                        VehicleConfiguration: "",     // 车辆配置
                        TransferTimes: "",            // 过户次数
                        LicensePlateInCity: "",       // 车牌归属地：110000
                        //（先写了车牌所在地后，自动填写车身所在地，客户如果需要修改，可以自行修改车身所在地）
                        CarInCity: "",                // 车身所在城市：110000
                        //强险到期时：有强险时，以本机时间+1年（如：2018-01-02），无强险时以本机时间-1年（如2016-01-02）
                        CompulsoryInsuranceExpiration:"",
                        CarDescription: "",           // 车况描述
                        PostToRetailMarket: "",       // 是否发布到普通二手车市场
                        Vin: "",                      // 车架号
                        ServiceCharacteristics: "",   // 使用性质（非营运，非营运租赁，营运，营转非）
                    },
                    CarOtherInfo: [],                 // 其他车况内容补充，参考示例(可不填)
                    CarFileInfo: [],                  // 录音描述、车辆照片、（选填）出厂铭牌
                }
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
            this.validator = new Validator({
                // email: 'required|email',
                // name: 'required|alpha|min:3',
                carInCity: 'required',
                selectedModel: 'required',
            });
            this.$set(this, 'sendError', this.validator.errorBag);
        },

        // $el 挂载的时候
        mounted() {
            
        },

        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
        },

        //退出的生命周期钩子
        deactivated(){
            // this.$destroy();
            // this.clearErrors();
        },
        // 自定义函数(方法)
        methods: {
            // 车型级联()
            modelChangeEnd(selected){
                let carModelId = selected[2];
                this.form.selectedModel = carModelId;
                this.validator.validate('selectedModel',carModelId);

                console.log("车型级联你少扯淡,",selected);
            },
            // 城市级联(车辆所属地)
            carInCityChangeEnd(selected){
                let curCityCode = selected[1];
                this.form.carInCity = curCityCode;
                this.validator.validate('carInCity',curCityCode);
            },
            // 城市级联(车牌归属地)
            plateInCityChangeEnd(selected){
                console.log("城市级联你少扯淡,",selected);
            },
            // 上牌日期
            plateDateEnd(selected){
                console.log("上牌日期选择",selected);
            },
            // 出厂日期
            outFactoryDateEnd(date){
                console.log("出厂日期",date);
            },
            // 交强险(到期时间)
            insuranceDateEnd(date){
                console.log("交强险",date);
            },
            // 过户次数
            changeNumEnd(val){
                console.log("过户次数",val);
            },
            // 运营性质
            serviceEnd(val){
                console.log("运营性质",val);
            },
            // 选择排放标准
            dischargeStandardEnd(val){
                console.log("排放标准是",val);
            },
            // 汽车颜色
            carColorEnd(val){
                console.log("汽车颜色是",val);
            },
            // 车辆铭牌图片
            nameplateEnd(val){
                console.log("车辆铭牌图片数据更新了",val);
            },
            // 车辆图片
            photoEnd(val){
                console.log("车辆图片数据更新了",val);
            },
            // 车主留言值变化（blur事件触发）
            descEnd(val){
                console.log("车主留言",val);
            },
            // 是否发布到普通二手车市场
            postRetailEnd(val){
                console.log("是否发布到普通二手车市场",val)
            },
            // 立即发布
            putOut(){
                this.validator.validateAll({
                    carInCity: this.form.carInCity,
                    selectedModel: this.form.selectedModel,
                }).then(() => {
                    console.log('恭喜了，我的歌，验证通过');
                }).catch(() => {
                    document.body.scrollTop = 500
                });
            },
            // 清除表单验证的错误
            clearErrors() {
                this.sendError.clear();
            }
            
        },
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-bill-con
        .el-cascader
            color $c_blue
            span
                color @color
            &:hover
                .el-input__inner
                    _borderAll(#b8b8b8)    
        .el-input__inner,
        .el-textarea__inner
            _borderAll(#e2e2e2)
            _borderRadius(2px)
            color $c_blue
            _placeholder(#b2b2b2,13px,28px)
            &:hover
                _borderAll(#b8b8b8)
        .el-input__icon,
        .el-select .el-input .el-input__icon
            color #DEDFE0
        .el-select:hover
            .el-input__inner
                _borderAll(#b8b8b8)

</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './sendCar.styl'
</style>
