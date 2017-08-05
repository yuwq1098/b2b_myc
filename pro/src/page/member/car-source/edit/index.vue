<template>
    <div class="editSource">
        <!-- 会员中心内容布局组件 -->
        <member-layout
            title="车源管理"
            >
            <div slot="content">
                
                <member-inner>
                    <div class="m-edit-con"
                        >
                        <div class="m-info-box">

                            <div class="m-gp-wrap f__clearfix">
                                <el-row :gutter="formStyleData.gutter">
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="车辆所在地"
                                                :errorTetx="errors.first('carInCity')"
                                                :isShow="errors.has('carInCity')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <city-cascader
                                                    @valChangeEnd="carInCityChangeEnd"
                                                    placeholder="请选择车辆所在地"
                                                    :initValue="iv_carInCity"
                                                    >
                                                </city-cascader>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="品牌车型"
                                                :errorTetx="errors.first('selectedModel')"
                                                :isShow="errors.has('selectedModel')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <model-cascader
                                                    @valChangeEnd="modelChangeEnd"
                                                    placeholder="请选择车品牌、车系及车型"
                                                    :initValue="iv_selectedModel"
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
                                                :errorTetx="errors.first('plateInCity')"
                                                :isShow="errors.has('plateInCity')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <city-cascader
                                                    @valChangeEnd="plateInCityChangeEnd"
                                                    placeholder="请选择车牌归属地（城市）"
                                                    :initValue="iv_plateInCity"
                                                    >
                                                </city-cascader>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="上牌时间"
                                                :errorTetx="errors.first('plateDate')"
                                                :isShow="errors.has('plateDate')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <date-picke
                                                    @dateChangeEnd="plateDateEnd"
                                                    :disabledPrevYear="20"
                                                    placeholder="请选择上牌时间"
                                                    :initValue="form.plateDate"
                                                    >
                                                </date-picke>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="交强险"
                                                :errorTetx="errors.first('insuranceDate')"
                                                :isShow="errors.has('insuranceDate')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <date-picke
                                                    @dateChangeEnd="insuranceDateEnd"
                                                    :disabledPrevYear="3"
                                                    placeholder="请选择交强险（到期时间）"
                                                    :initValue="form.insuranceDate"
                                                    >
                                                </date-picke>
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
                                                title="过户次数"
                                                :errorTetx="errors.first('changeNum')"
                                                :isShow="errors.has('changeNum')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-select
                                                    placeholder="请选择过户次数"
                                                    @selectedEnd="changeNumEnd"
                                                    :options="selectData.changeNumList"
                                                    :initValue="form.changeNum"
                                                    >
                                                </gk-select>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="一口价"
                                                :errorTetx="errors.first('fixedPrice')"
                                                :isShow="errors.has('fixedPrice')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-input
                                                    placeholder="请填写一口价, 例：32.88"
                                                    unit="万元"
                                                    @inputChangeEnd="fixedPriceEnd"
                                                    :initValue="form.fixedPrice"
                                                    >
                                                </gk-input>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="零售价"
                                                :errorTetx="errors.first('retailPrice')"
                                                :isShow="errors.has('retailPrice')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-input
                                                    placeholder="请填写零售价, 例：38.00"
                                                    unit="万元"
                                                    @inputChangeEnd="retailPriceEnd"
                                                    :initValue="form.retailPrice"
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
                                                :errorTetx="errors.first('mileage')"
                                                :isShow="errors.has('mileage')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-input
                                                    placeholder="请填写行驶里程, 例：6.35"
                                                    unit="万公里"
                                                    @inputChangeEnd="mileageEnd"
                                                    :initValue="form.mileage"
                                                    >
                                                </gk-input>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="m-item">

                                            <gk-input-error
                                                title="排放标准"
                                                :errorTetx="errors.first('dischargeStandard')"
                                                :isShow="errors.has('dischargeStandard')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-select
                                                    placeholder="请选择排放标准"
                                                    @selectedEnd="dischargeStandardEnd"
                                                    :options="selectData.dischargeStandardList"
                                                    :initValue="form.dischargeStandard"
                                                    >
                                                </gk-select>
                                            </div>
                                        </div>
                                    </el-col>
                                    
                                    <el-col :span="8">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="排量"
                                                :errorTetx="errors.first('liter')"
                                                :isShow="errors.has('liter')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-input
                                                    placeholder="请填写排量，1.0L ~ 7.0L"
                                                    unit="L"
                                                    @inputChangeEnd="literEnd"
                                                    :initValue="form.liter"
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
                                                title="使用性质"
                                                :errorTetx="errors.first('serviceType')"
                                                :isShow="errors.has('serviceType')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-select
                                                    placeholder="请选择使用性质"
                                                    @selectedEnd="serviceEnd"
                                                    :options="selectData.ServiceCharacteristics"
                                                    :initValue="form.serviceType"
                                                    >
                                                </gk-select>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="m-item">
                                            <gk-input-error
                                                title="车架号"
                                                :errorTetx="errors.first('vin')"
                                                :isShow="errors.has('vin')"
                                                >
                                            </gk-input-error>
                                            <div class="u-item-box">
                                                <gk-input
                                                    placeholder="请填写车架号"
                                                    @inputChangeEnd="vinEnd"
                                                    :initValue="form.vin"
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
                                        :errorTetx="errors.first('color')"
                                        :isShow="errors.has('color')"
                                        >
                                    </gk-input-error>
                                </div>
                                <div class="m-color-wrap">
                                    <color-select
                                        @selectedEnd="carColorEnd"
                                        :initValue="form.color"
                                        >
                                    </color-select>
                                </div>
                            </div><!-- 车身颜色选择 -->
                            
                            <div class="m-gp-other nameplate">
                                <div class="m-other-hd">
                                    <gk-input-error
                                        title="上传车辆铭牌"
                                        errorAlign="left"
                                        :errorTetx="errors.first('nameplate')"
                                        :isShow="errors.has('nameplate')"
                                        >
                                    </gk-input-error>
                                </div>
                                <div class="m-nameplate-upload">
                                    <nameplate-upload
                                        :maxUploadSize="3"
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
                                        :errorTetx="errors.first('photo')"
                                        :isShow="errors.has('photo')"
                                        >
                                    </gk-input-error>
                                </div>
                                <div class="m-photo-upload">
                                    <photo-upload
                                        :maxUploadSize="12"
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
                                        :errorTetx="errors.first('desc')"
                                        :isShow="errors.has('desc')"
                                        >
                                    </gk-input-error>
                                </div>
                                <div class="m-other-con">
                                    <gk-textarea
                                        @inputEnd="descEnd"
                                        :maxLength="300"
                                        placeholder="填写车况描述，提高资料完善度，让购车人更容易搜到你！"
                                        tips="*请填写10~300之间的车况描述，其他无关信息会影响车辆通过审核"
                                        :initValue="form.desc"
                                        >
                                    </gk-textarea>
                                </div>
                            </div><!-- 车况描述 -->

                            <div class="m-gp-other postRetail">
                                <div class="post-info">
                                    <div class="info" 
                                        >是否发布到普通二手车市场
                                    </div>
                                    <div class="ipt-check">
                                        <el-checkbox 
                                            v-model="form.isPostRetail"
                                            >
                                        </el-checkbox>
                                    </div>
                                </div>
                            </div><!-- 发布到普通b2c市场 -->
                            
                            <div class="m-gp-btn">
                                <div class="m-submit-box">
                                    <gk-submit
                                        btnText="立即修改"
                                        :submiting="isSubmitState"
                                        @submitTrigger="toModify()"
                                        :autoRight="true"
                                        >
                                    </gk-submit>
                                </div><!-- 提交按钮 -->
                            </div><!-- 立即修改 -->

                        </div>
                    </div><!-- 编辑车源 -->
                </member-inner>

            </div><!-- 编辑车源内容 -->
        </member-layout>
    </div>
</template>


<script>
    
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // 工具类
    import {dataToJson} from "assets/js/util.js"

    // 会员中心内容布局组件
    import memberLayout from 'components/layout/memberCon.vue'
    // 会员中心子内容组件
    import memberInner from 'components/layout/memberInner.vue' 

    // 发布订单的向后端请求的构造类
    import {sendCarForm} from "base/class/sendCar.js"
    // 车行信息的构造类
    import {basicInfo,fileInfoList} from 'base/class/carDetails.js'

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

    // 获取卖车填单页的本地相关数据
    import * as sendCarData from "api/localJson/sendCar.js"

    //引入表单验证
    import { Validator } from 'vee-validate';

    export default {
        
        name: "editSource",
        validator: null,
        // 在当前模块注册组件
        components:{
            memberLayout,
            memberInner,
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
                // 车辆基本信息
                basicInfo:{},
                // 文件列表
                fileInfoList:[],
                
                // 车辆图片信息
                carImgItems:[],


                //是不是表单提交的状态
                isSubmitState: false,

                // 表单样式集中管理
                formStyleData:{  
                    gutter: 20,
                },
                
                // 发布订单的表单验证报错集合
                errors: null,
            
                iv_carInCity: "",          // 车辆所在地
                iv_plateInCity: "",        // 车牌归属地
                iv_selectedModel: [],      // 品牌车型选择

                
                // 车辆订单的表单信息（供双向绑定及提交）
                form:{
                    carId: "",              // 车辆Id,修改时需带有
                    carInCity: "",          // 车辆所在地
                    selectedModel: "",      // 品牌车型选择的结果
                    plateInCity: "",        // 车牌归属地
                    plateDate: "",          // 上牌日期
                    changeNum: "",          // 过户次数
                    fixedPrice: "",         // 一口价/最低价   对应api字段 => B2BPrice
                    retailPrice: "",        // 零售价   对应api字段 => RetailPrice
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
                    isPostRetail: true,    // 是否发布到二手市场
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
        //生命周期,开始的时候
        created(){
            
            this.validator = new Validator({
                carInCity: 'required',
                selectedModel: 'required',
                plateInCity: 'required',
                plateDate: 'required',
                changeNum: 'required',
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
                nameplate: 'between:1,3|max:3',
                photo: 'between:2,12|max:12',
            });
            this.$set(this, 'errors', this.validator.errors);

        },
        mounted(){

        },
        activated(){

            // 清空数据
            this.reset();
            // 获取hash 带参中的车辆ID
            this.carId = this.$router.currentRoute.query.id;
            // 获取车辆信息
            this.getCarDetailsInfo();

        },
        // 退出的生命周期钩子
        deactivated(){

            // 清空数据
            this.reset();
            // 由于绑定的是一些组件，所以要用vue实例销毁才有真实的作用
            this.$destroy();
        },
        // 属性值计算
        computed:{

        },
        // 数据侦听
        watch:{

        },
        // 自定义函数(方法)
        methods: {
            
            // 格式化车辆基本信息
            _normalizeBasicInfo(data) {
                return new basicInfo(data);
            },

            // 格式化车辆文件列表
            _normalizeFileList(list) {
                let arr = [];
                list.forEach((item,index) => {
                    arr.push(new fileInfoList(item));
                })
                return arr;
            },

            // 获取车辆详情信息
            getCarDetailsInfo(){
                var data = {
                    CarId : this.carId,
                }
                api.getCarDetalis(data).then((res) => {
                    if(res.code==SYSTEM.CODE_IS_OK){
                        
                        // 获取车辆详情基本信息
                        this.basicInfo = this._normalizeBasicInfo(res.data.CarInfo)
                        // 获取车辆图片列表信息
                        this.fileInfoList = this._normalizeFileList(res.data.CarFiles)
                        
                        // 获取车辆详情基本信息
                        // console.log("获取车辆详情基本信息",dataToJson(this.basicInfo))
                        // 获取车辆图片列表信息
                        // console.log("获取车辆图片列表信息",dataToJson(this.fileInfoList))

                        // 获取车辆图片数据
                        setTimeout(() => {
                            this.carImgItems = this.getCarImgsData(this.fileInfoList,this.otherInfo);
                            // console.log("获取车辆图片数据",dataToJson(this.carImgItems))
                        })
                        
                        // 编辑车源数据的初始化
                        setTimeout(() => {
                            this.setInitSourceData();
                        })

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

            // 获取车辆图片列表
            getCarImgsData(list,otherInfo){
                let arr = [];
                if(list.length<=0) return arr;
                list.forEach((item, index) => {
                    if(item.type=="img"&&item.groupName=="车辆照片"){
                        arr.push(item)
                    }
                });
                return arr;
            },
            
            // 编辑车源数据的初始化
            setInitSourceData(){
                // 车辆Id
                this.form.carId = this.carId;
                // 车辆所在地
                this.iv_carInCity = this.basicInfo.inProvince+"/"+this.basicInfo.inCity; 
                // 车辆所在地
                this.iv_plateInCity = this.basicInfo.plateInProvince+"/"+this.basicInfo.plateInCity; 
                // 品牌车系车型
                this.iv_selectedModel = [this.basicInfo.brandId,this.basicInfo.seriesId,this.basicInfo.modelId];
                // 上牌日期
                this.form.plateDate = this.basicInfo.plateDate;  
                // 过户次数
                this.form.changeNum = this.basicInfo.transferTimes.toString(); 
                // 一口价/最低价
                this.form.fixedPrice = this.basicInfo.price.toString();    
                // 零售价
                this.form.retailPrice = this.basicInfo.retailPrice.toString();
                // 行驶里程
                this.form.mileage = this.basicInfo.mileage.toString();
                
                // 排放标准
                this.form.dischargeStandard = this.basicInfo.dischargeStandard;        
                this.form.liter = this.basicInfo.liter.toString();        // 排量

                // 交强险日期
                this.form.insuranceDate = this.basicInfo.compulsoryData; 
                // 使用性质（运营类型）
                this.form.serviceType = this.basicInfo.serviceType; 

                this.form.vin = this.basicInfo.vin;           // 车架号
                this.form.color = this.basicInfo.color;       // 颜色
                this.form.desc = this.basicInfo.desc;         // 车主留言
                // 是否发布到二手市场
                this.form.isPostRetail = this.basicInfo.isPostToRetail;         

            },

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
                this.errors.remove('plateDate');
                let curDateTime = geekDom.formatDateByDate("yyyy-MM-dd",selected);
                this.form.plateDate = curDateTime;
                this.validator.validate('plateDate',curDateTime);

                let [theDate,newDate] = [ +new Date(this.form.plateDate),+new Date()];
                if(theDate>newDate){
                    this.errors.remove('plateDate');
                    this.errors.add('plateDate', "上牌日期必须早于当前日期", 'auth');
                }
            },

            // 过户次数
            changeNumEnd(val){
                let curNumber = +val;
                this.form.changeNum = curNumber;
                this.validator.validate('changeNum',curNumber);
            },
            
            // 一口价
            fixedPriceEnd(val){
                this.form.fixedPrice = val;
                this.validator.validate('fixedPrice',val);
                if(!this.errors.has('retailPrice')&&!this.errors.has('fixedPrice')){
                    let [rPrice,price] = [ parseFloat(this.form.retailPrice),parseFloat(this.form.fixedPrice)];
                    if(rPrice<=price){
                        this.errors.remove('retailPrice');
                        this.errors.add('retailPrice', "零售价必须大于批发价", 'auth');
                    }
                }else{
                    this.errors.remove('retailPrice');
                }
            },

            // 零售价
            retailPriceEnd(val){
                this.form.retailPrice = val;
                this.validator.validate('retailPrice',val);
                if(this.form.fixedPrice==""){
                    this.validator.validate('fixedPrice',this.form.fixedPrice);
                }else if(!this.errors.has('retailPrice')&&!this.errors.has('fixedPrice')){
                    let [rPrice,price] = [ parseFloat(this.form.retailPrice),parseFloat(this.form.fixedPrice)];
                    if(rPrice<=price){
                        this.errors.remove('retailPrice');
                        this.errors.add('retailPrice', "零售价必须大于批发价", 'auth');
                    }
                }
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

            // 立即修改
            toModify(){
                this.validator.validateAll({
                    carInCity: this.form.carInCity,
                    selectedModel: this.form.selectedModel,
                    plateInCity: this.form.plateInCity,
                    plateDate: this.form.plateDate,
                    changeNum: this.form.changeNum,
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
                }).then((res) => {
                    // 如果验证不成功
                    if(!res) {
                        this.$notify.error({
                            title: '填写不完整',
                            message: '请认真填写完所有车辆信息',
                            type: 'error',
                            duration: 2000,
                        });
                        document.body.scrollTop = 200
                        return;
                    };

                    // 验证零售价
                    if(!this.errors.has('retailPrice')&&!this.errors.has('fixedPrice')){
                        let [rPrice,price] = [ parseFloat(this.form.retailPrice),parseFloat(this.form.fixedPrice)];
                        if(rPrice<=price){
                            this.errors.remove('retailPrice');
                            this.errors.add('retailPrice', "零售价必须大于批发价", 'auth');
                            // 不合理填写提示
                            this.issueErrorTips();
                            return;
                        }
                    }

                    this.$confirm('尊贵的用户，您好！请确保您发布车辆信息的真实性，这将审核的通过率！', '温馨提示', {
                        confirmButtonText: '确认修改',
                        cancelButtonText: '再仔细看看',
                        type: 'warning'
                    }).then(() => {
                        // 验证通过那么就将按钮设置为提交中状态
                        this.isSubmitState = true;
                        // 立即发布
                        this.issue();
                    }).catch(() => {
                        return;
                    });

                }).catch(() => {
                    this.$notify.error({
                        title: '填写不完整',
                        message: '请认真填写完所有车辆信息',
                        type: 'error',
                        duration: 2000,
                    });
                    document.body.scrollTop = 200
                });

            },

            // 发布车辆信息填写不合逻辑
            issueErrorTips(){
                this.$notify.error({
                    title: '部分信息填写不合理',
                    message: '请认真填写完所有车辆信息',
                    type: 'error',
                    duration: 2000,
                });
                document.body.scrollTop = 200
            },
            
            //整理数据并发布
            issue(){
                let me = this;

                // 获取数据
                this._normalizeData(this.form,(data)=>{
                    
                    api.addOrEditB2BCar(data).then(res => {

                        // 请求成功将解除按钮的提交中状态
                        this.isSubmitState = false;
                        if(res.code==0){
                            me.$notify({
                                title: '成功',
                                message: "恭喜车源信息修改成功，前往车源管理界面",
                                type: 'success',
                                duration: 2000,
                            });
                            setTimeout(() => {
                                me.$router.push({path:'/member/sourceHome',query:{tabIndex:3}});
                            },800)
                        }else if(res.code==SYSTEM.CODE_IS_ERROR){
                            me.$notify({
                                title: '信息修改失败',
                                message: res.msg,
                                type: 'error',
                                duration: 2000,
                            });
                        }
                    }).catch(error => {
                        
                        // 修改失败将解除按钮的提交中状态
                        this.isSubmitState = false;
                        me.$notify({
                            title: '信息修改失败',
                            message: error,
                            type: 'error',
                            duration: 2000,
                        });
                    });
                });
            },
            
            //格式化数据
            _normalizeData(list,callBack){
                let _sendForm = new sendCarForm(list);
                // Object.assign(_sendForm, {CarId: this.carId} );
                if(callBack){  
                    callBack(_sendForm);  
                }  
            },

            // 重置数据
            reset(){
                this.form = {
                    carInCity: "",          // 车辆所在地
                    selectedModel: "",      // 品牌车型选择的结果
                    plateInCity: "",        // 车牌归属地
                    plateDate: "",          // 上牌日期
                    changeNum: "",          // 过户次数
                    outFactoryDate: "",     // 出厂日期
                    fixedPrice: "",         // 一口价/最低价   对应api字段 => B2BPrice
                    retailPrice: "",        // 零售价   对应api字段 => RetailPrice
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
                }
                this.isSubmitState = false;
                // 因为设置为空时会触发数据侦听的验证方法，所以给个setTimeOut
                setTimeout(() => {
                    this.errors.clear();
                })
            },

        },
        
    }
</script>


<!-- 改变elementUI的样式，所以不能使用"scoped"限制作用域 -->
<style lang="stylus" rel="stylesheet/stylus">
    @import '~assets/css/mixin.styl'
    .m-edit-con
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
        .el-checkbox__input
            .el-checkbox__inner
                cursor pointer

</style>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'index.styl'
</style>
