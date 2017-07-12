<!--
-  @description 填写卖车单子的页面（仿造第一车网）,未登录不可访问
-->

<template>
	<div class="sendCar">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb
                        :crumbItems="crumbItems">
                    </gk-bread-crumb><!-- 面包屑组件 -->

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
                                                        :errorTetx="sendError.first('plateInCity')"
                                                        :isShow="sendError.has('plateInCity')"
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
                                                        :errorTetx="sendError.first('plateDate')"
                                                        :isShow="sendError.has('plateDate')"
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
                                                        :errorTetx="sendError.first('changeNum')"
                                                        :isShow="sendError.has('changeNum')"
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
                                                        :errorTetx="sendError.first('outFactoryDate')"
                                                        :isShow="sendError.has('outFactoryDate')"
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
                                                        :errorTetx="sendError.first('fixedPrice')"
                                                        :isShow="sendError.has('fixedPrice')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-input
                                                            placeholder="请填写一口价, 例：32.88"
                                                            unit="万元"
                                                            @inputChangeEnd="fixedPriceEnd"
                                                            >
                                                        </gk-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <gk-input-error
                                                        title="零售价"
                                                        :errorTetx="sendError.first('retailPrice')"
                                                        :isShow="sendError.has('retailPrice')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-input
                                                            placeholder="请填写零售价, 例：38.00"
                                                            unit="万元"
                                                            @inputChangeEnd="retailPriceEnd"
                                                            >
                                                        </gk-input>
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
                                                        :errorTetx="sendError.first('mileage')"
                                                        :isShow="sendError.has('mileage')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-input
                                                            placeholder="请填写行驶里程, 例：6.35"
                                                            unit="万公里"
                                                            @inputChangeEnd="mileageEnd"
                                                            >
                                                        </gk-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">

                                                    <gk-input-error
                                                        title="排放标准"
                                                        :errorTetx="sendError.first('dischargeStandard')"
                                                        :isShow="sendError.has('dischargeStandard')"
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
                                                        :errorTetx="sendError.first('liter')"
                                                        :isShow="sendError.has('liter')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-input
                                                            placeholder="请填写排量，1.0L ~ 7.0L"
                                                            unit="L"
                                                            @inputChangeEnd="literEnd"
                                                            >
                                                        </gk-input>
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
                                                        title="交强险"
                                                        :errorTetx="sendError.first('insuranceDate')"
                                                        :isShow="sendError.has('insuranceDate')"
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
                                                        :errorTetx="sendError.first('serviceType')"
                                                        :isShow="sendError.has('serviceType')"
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
                                                        :errorTetx="sendError.first('vin')"
                                                        :isShow="sendError.has('vin')"
                                                        >
                                                    </gk-input-error>
                                                    <div class="u-item-box">
                                                        <gk-input
                                                            placeholder="请填写车架号"
                                                            @inputChangeEnd="vinEnd"
                                                            >
                                                        </gk-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-other color">
                                        <div class="m-other-hd">
                                            <gk-input-error
                                                title="车身颜色"
                                                errorAlign="left"
                                                :errorTetx="sendError.first('color')"
                                                :isShow="sendError.has('color')"
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
                                                errorAlign="left"
                                                :errorTetx="sendError.first('nameplate')"
                                                :isShow="sendError.has('nameplate')"
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
                                                errorAlign="left"
                                                :errorTetx="sendError.first('photo')"
                                                :isShow="sendError.has('photo')"
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
                                                errorAlign="left"
                                                :errorTetx="sendError.first('desc')"
                                                :isShow="sendError.has('desc')"
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
                                                :submiting="isSubmitState"
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
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 发布订单的向后端请求的构造类
    import {sendCarForm} from "base/class/sendCar.js"
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
    // 输入框组件
    import gkInput from "components/common/gkInput.vue"
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
            gkInput,
            gkSwitch,
            gkSubmit,
            nameplateUpload,
            photoUpload,
        },

        // 数据
        data() {
            return{
                
                // 面包屑列表信息
                crumbItems: crumbsInfo['sendCar'],
                
                //是不是表单提交的状态
                isSubmitState: false,

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
                    outFactoryDate: "",     // 出厂日期
                    fixedPrice: "",         // 一口价/最低价   对应api字段 => B2BPrice
                    retailPrice: "",             // 零售价   对应api字段 => RetailPrice
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
                    isPostRetail: false,    // 是否发布到二手市场
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
                carInCity: 'required',
                selectedModel: 'required',
                plateInCity: 'required',
                plateDate: 'required',
                changeNum: 'required',
                outFactoryDate: 'required',
                fixedPrice: 'required|between:1,3000|decimal:2',
                retailPrice: 'required|between:1,3000|decimal:2',
                mileage: 'required|between:0,200|decimal:2',
                dischargeStandard: 'required',
                liter: 'required|between:1,7|decimal:2',
                insuranceDate: 'required',
                serviceType: 'required',
                vin: 'required|alpha_dash|min:17|max:17',
                color: 'required',
                desc: 'required|min:10|max:300',
                nameplate: 'between:1,6|max:6',
                photo: 'between:2,6|max:6',
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
            },

            // 城市级联(车辆所属地)
            carInCityChangeEnd(selected){
                let curCityCode = selected[1];
                this.form.carInCity = curCityCode;
                this.validator.validate('carInCity',curCityCode);
            },

            // 城市级联(车牌归属地)
            plateInCityChangeEnd(selected){
                let curCityCode = selected[1];
                this.form.plateInCity = curCityCode;
                this.validator.validate('plateInCity',curCityCode);
            },

            // 上牌日期
            plateDateEnd(selected){
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.form.plateDate = curDateTime;
                this.validator.validate('plateDate',curDateTime);
            },

            // 过户次数
            changeNumEnd(val){
                let curNumber = +val;
                this.form.changeNum = curNumber;
                this.validator.validate('changeNum',curNumber);
            },

            // 出厂日期
            outFactoryDateEnd(selected){
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.form.outFactoryDate = curDateTime;
                this.validator.validate('outFactoryDate',curDateTime);
            },
            
            // 一口价
            fixedPriceEnd(val){
                this.form.fixedPrice = val;
                this.validator.validate('fixedPrice',val);
            },

            // 零售价
            retailPriceEnd(val){
                this.form.retailPrice = val;
                this.validator.validate('retailPrice',val);
            },
            
            // 行驶里程
            mileageEnd(val){
                this.form.mileage = val;
                this.validator.validate('mileage',val);
            },

            // 选择排放标准
            dischargeStandardEnd(val){
                this.form.dischargeStandard = val;
                this.validator.validate('dischargeStandard',val);
            },

            // 排量
            literEnd(val){
                this.form.liter = val;
                this.validator.validate('liter',val);
            },

            // 交强险(到期时间)
            insuranceDateEnd(selected){
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.form.insuranceDate = curDateTime;
                this.validator.validate('insuranceDate',curDateTime);
            },

            // 选择运营性质
            serviceEnd(val){
                this.form.serviceType = val;
                this.validator.validate('serviceType',val);
            },

            // 车架号
            vinEnd(val){
                this.form.vin = val;
                this.validator.validate('vin',val);
            },
            
            // 选择汽车颜色
            carColorEnd(val){
                this.form.color = val;
                this.validator.validate('color',val);
            },

            // 车辆铭牌图片
            nameplateEnd(val){
                this.form.nameplate = val;
                this.validator.validate('nameplate',val.length);
            },

            // 车辆图片
            photoEnd(val){
                this.form.photo = val;
                this.validator.validate('photo',val.length);
            },

            // 车主留言值变化（blur事件触发）
            descEnd(val){
                this.form.desc = val;
                this.validator.validate('desc',val);
            },

            // 是否发布到普通二手车市场
            postRetailEnd(val){
                this.form.isPostRetail = val;
            },

            // 立即发布
            putOut(){
                this.validator.validateAll({
                    carInCity: this.form.carInCity,
                    selectedModel: this.form.selectedModel,
                    plateInCity: this.form.plateInCity,
                    plateDate: this.form.plateDate,
                    changeNum: this.form.changeNum,
                    outFactoryDate: this.form.outFactoryDate,
                    fixedPrice: this.form.fixedPrice,
                    retailPrice: this.form.retailPrice,
                    mileage: this.form.mileage,
                    dischargeStandard: this.form.dischargeStandard,
                    liter: this.form.liter,
                    insuranceDate: this.form.insuranceDate,
                    serviceType: this.form.serviceType,
                    vin: this.form.vin,
                    color: this.form.color,
                    desc: this.form.desc,
                    nameplate: this.form.nameplate.length,
                    photo: this.form.photo.length,
                }).then(() => {

                    //验证通过那么久将按钮设置为提交中状态
                    this.isSubmitState = true;
                    this.issue();

                }).catch(() => {
                    document.body.scrollTop = 500
                });

            },
            
            //整理数据并发布
            issue(){
                let me = this;
                // 获取数据
                this._normalizeData(this.form,function(data){

                    api.addOrEditB2BCar(data).then(res => {
                        if(res.code==SYSTEM.CODE_IS_OK){
                            console.log("去你妹的，我发成功了",res)
                        }else if(res.code==SYSTEM.CODE_IS_ERROR){
                            me.$notify.error({
                                title: '发布失败',
                                message: res.msg,
                                duration: 2000,
                            });
                            setTimeout(() => {
                                me.$router.push('/member');
                            },2000)
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                });
            },
            
            //格式化数据
            _normalizeData(list,callBack){
                let _sendForm = new sendCarForm(list);
                if(callBack){  
                    callBack(_sendForm);  
                }  
            },

            // 清除表单验证的错误
            clearErrors() {
                this.sendError.clear();
            },

        },
	}
</script>

<!-- 改变elementUI的样式，所以不能使用"scoped"限制作用域 -->
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
