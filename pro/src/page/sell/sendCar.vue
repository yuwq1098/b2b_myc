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
                                
                                <div class="m-bill-box">

                                    <div class="m-gp-wrap f__clearfix">
                                        <el-row :gutter="formStyleData.gutter">
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">车辆所在地</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">品牌车型</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">车牌归属地</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">上牌时间</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">过户次数</span>
                                                        <p class="u-error"></p>
                                                    </div>
                                                    <div class="u-item-box">
                                                        <gk-select
                                                            placeholder="请填写过户次数"
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">出厂日期</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">一口价</span>
                                                        <p class="u-error"></p>
                                                    </div>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写一口价" v-model="form.price"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">零售价</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">行驶里程</span>
                                                        <p class="u-error"></p>
                                                    </div>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写行驶里程" v-model="form.mileage"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col :span="8">
                                                <div class="m-item">
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">排放标准</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">排量</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">交强险（到期时间）</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd"> 
                                                        <span class="u-tit">使用性质</span>
                                                        <p class="u-error"></p>
                                                    </div>
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
                                                    <div class="u-item-hd">
                                                        <span class="u-tit">车架号</span>
                                                        <p class="u-error"></p>
                                                    </div>
                                                    <div class="u-item-box">
                                                        <el-input placeholder="请填写车架号" v-model="form.price"></el-input>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>

                                    <div class="m-gp-other color">
                                        <div class="m-other-hd">
                                            <span class="u-tit">车身颜色</span>
                                            <p class="u-error"></p>
                                        </div>
                                    </div><!-- 车身颜色选择 -->
                                    
                                    <div class="m-gp-other pictures">
                                        <div class="m-other-hd">
                                            <span class="u-tit">上传车辆铭牌</span>
                                            <p class="u-error"></p>
                                        </div>
                                    </div><!-- 车辆铭牌 -->

                                    <div class="m-gp-other pictures">
                                        <div class="m-other-hd">
                                            <span class="u-tit">上传车辆照片</span>
                                            <p class="u-error"></p>
                                        </div>
                                    </div><!-- 车辆图片 -->

                                    <div class="m-gp-other desc">
                                        <div class="m-other-hd">
                                            <span class="u-tit">车主留言(对车况进行描述)</span>
                                            <p class="u-error"></p>
                                        </div>
                                        <div class="m-other-con">
                                            <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                placeholder="请输入内容"
                                                v-model="form.carInCity"
                                                >
                                            </el-input>
                                        </div>
                                    </div><!-- 车况描述 -->
                                    
                                    <div class="m-gp-btn">
                                        <el-button type="primary">上传</el-button>
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


    // 获取m卖车填单页的本地相关数据
    import * as sendCarData from "api/localJson/sendCar.js"

	export default {
        name: "sendCar",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,           
            appBox,
            promptInfo,
            modelCascader,
            cityCascader,
            gkSelect,
            datePicke,
        },
        // 数据
        data() {
            return{
                
                bannerInfo: sendCarData.sendBanner,                  // 发布订单页面的banner图信息
                promptInfoText: sendCarData.promptInfo,              // 发布订单页面的温馨提示
                
                // 表单样式集中管理
                formStyleData:{  
                    gutter: 20,
                },
                
                // 级联选择组件的options
                options: {
                    // 车型级联选择
                    brandModel:[{
                        label: '江苏',
                        value: '1',
                        children: []
                    }, {
                        label: '浙江',
                        value: '5',
                        children: []
                    }],
                },
                

                // 级联选择组件的props
                props: {
                    // 车型级联选择
                    brandModel:{
                        value: 'value',
                        children: 'children'    
                    }
                },
                
                // 车辆订单的表单信息（供双向绑定及提交）
                form:{
                    carInCity: "",          // 车辆所在地
                    selectedModel: [],      // 品牌车型选择的结果
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
            
        },

        // $el 挂载的时候
        mounted() {
            
        },

        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){
            
        },

        //退出的生命周期钩子
        deactivated(){

        },
        // 自定义函数(方法)
        methods: {
            
            // 车型级联()
            modelChangeEnd(selected){
                console.log("车型级联你少扯淡,",selected);
            },
            // 城市级联(车辆所属地)
            carInCityChangeEnd(selected){
                console.log("城市级联你少扯淡,",selected);
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
                console.log("排放标准是",val)
            },
            
        },


	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './sendCar.styl'
</style>
