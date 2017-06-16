<template>
	<div class="buy-car-list">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb></gk-bread-crumb><!-- 面包屑组件 -->
                    
                    <div class="m-sch-wrap f__clearfix">
                        <div class="m-sch f__fr">
                            <input class="u-sch-ipt" type="text" placeholder="请输入关键词，如宝马X3" />
                            <button class="u-sch-btn">
                                <i class="iconfont icon-search"></i>
                            </button>
                        </div>
                    </div><!-- 搜索条 -->

                    <div class="m-select-filter">
                        <div class="m-sel-gp f__clearfix">
                            <span class="m-gp-tit">品牌：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list f__clearfix" id="js__brand_list">
                                        <li class="u-item" :class="{'on':!currentBrand}" @click.stop="brandFilter($event.target,-1,-1)"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item" v-for="(item,index) in allCarBrandList" v-if="index<13" @click.stop="brandFilter($event.target,item.brand_id,item.brand_name)">
                                            <a href="javascript:;"  class="u-lk">{{item.brand_name}}</a>
                                        </li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld"></div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more" v-if="allCarBrandList.length>=13">
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div><!-- 品牌选择 -->

                        <div class="m-sel-gp f__clearfix" v-show="!isNotBrand">
                            <span class="m-gp-tit">车系：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list f__clearfix" id="js__series_list">
                                        <li class="u-item" :class="{'on':!currentSeries}"  @click.stop="seriesFilter($event.target,-1,-1)"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item" v-for="(item,index) in allsearchCarSeries" v-if="index<10" @click.stop="seriesFilter($event.target,item.series_id,item.series_name)"><a href="javascript:;" class="u-lk">{{item.series_name}}</a></li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld"></div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more" v-if="allsearchCarSeries.length>=12">
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div><!-- 车系选择 -->

                        <div class="m-sel-gp">
                            <span class="m-gp-tit">价格：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info f__clearfix" id="js__price_box">
                                    <ul class="m-lk-list c__clearfix" id="js__price_list">
                                        <li class="u-item" :class="{'on':!currentPrice}"  @click.stop="priceFilter($event.target,-1)"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item" v-for="(item,index) in searchDataItems.price" :min="item.min" :max="item.max" @click.stop="priceFilter($event.target,item.min,item.max,item.title)">
                                            <a href="javascript:;" class="u-lk">{{item.title}}</a>
                                        </li>
                                    </ul>
                                    <div class="m-other-price f__clearfix">
                                        <div class="m-price" :class="{'focus':minPriceIptFocus}">
                                            <input name="min-price" 
                                                @focus="minPriceIptFocus=true" 
                                                @blur="minPriceIptFocus=false"
                                                v-model.number="minPriceIptVal"
                                                class="u-price-ipt" type="text" maxlength="5" />万</div>

                                        <span class="u-connect">-</span>
                                        <div class="m-price" :class="{'focus':maxPriceIptFocus}">
                                            <input name="max-price"
                                                @focus="maxPriceIptFocus=true"
                                                @blur="maxPriceIptFocus=false"
                                                v-model.number="maxPriceIptVal"
                                                class="u-price-ipt" type="text" maxlength="5" />万</div>
                                        <button class="u-btn">确定</button>
                                    </div>
                                </div><!-- 信息 -->
                            </div>
                        </div><!-- 价格选择 -->

                        <div class="m-sel-gp">
                            <span class="m-gp-tit">其他：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list no-overflow other">
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.age!=''&&userFilterData.age!='-1'}" 
                                                v-model="userFilterData.age" placeholder="车龄">
                                                <el-option
                                                  v-for="item in searchDataItems.age"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.dischargeStandard!=''&&userFilterData.dischargeStandard!='-1'}" 
                                                v-model="userFilterData.dischargeStandard" placeholder="排放标准">
                                                <el-option
                                                  v-for="item in searchDataItems.dischargeStandard"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.mileage!=''&&userFilterData.mileage!='-1'}" 
                                                v-model="userFilterData.mileage" placeholder="里程">
                                                <el-option
                                                  v-for="item in searchDataItems.mileage"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.gearType!=''&&userFilterData.gearType!='-1'}" 
                                                v-model="userFilterData.gearType" placeholder="手/自动挡">
                                                <el-option
                                                  v-for="item in searchDataItems.gearType"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.color!=''&&userFilterData.color!='-1'}" 
                                                v-model="userFilterData.color" placeholder="颜色">
                                                <el-option
                                                  v-for="(item,index) in carColor"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.transferCount!=''&&userFilterData.transferCount!='-1'}" 
                                                v-model="userFilterData.transferCount" placeholder="过户次数">
                                                <el-option
                                                  v-for="item in searchDataItems.changeNum"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.serviceType!=''&&userFilterData.serviceType!='-1'}" 
                                                v-model="userFilterData.serviceType" placeholder="营运类型">
                                                <el-option
                                                  v-for="item in searchDataItems.serviceType"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select 
                                                :class="{'on':userFilterData.keyCount!=''&&userFilterData.keyCount!='-1'}" 
                                                v-model="userFilterData.keyCount" placeholder="钥匙数">
                                                <el-option
                                                  v-for="item in searchDataItems.keyCount"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        
                                    </ul>
                                </div><!-- 信息 -->
                            </div>
                        </div><!-- 其他信息选择 -->
                        
                        <div class="m-sel-check">
                            <div class="m-check-none" v-show="!isShowByHasFilter">请选择筛选条件</div><!-- 当用户没有选择任何条件的时候 -->
                            <div class="m-check-box" v-show="isShowByHasFilter">
                                <div class="m-check-tit">当前已选条件：</div>
                                <div class="m-check-con f__clearfix">
                                    <ul class="u-check-lst f__clearfix">
                                        <template v-for="item in filterShowDataItems">
                                            <li class="f__fl u-check-item" v-if="item">
                                                <span class="u-label">{{item.label}}</span>
                                                <a class="u-lk"><i class="iconfont icon-guanbi1"></i></a><!-- 关闭按钮 -->
                                            </li>    
                                        </template>
                                    </ul>
                                    <a href="javascript:;" @click="clearFilterData" class="u-all-clear">清空选择</a>
                                </div>
                            </div>
                        </div><!-- 当前用户已选择过滤条件 -->

                    </div><!-- 选择过滤条件 -->
                    
                    <div class="m-b2b-svr">
                        <div></div>
                    </div><!-- b2b服务专享 -->

                    <div class="m-lst-gp-sel">
                        <div class="m-hd f__clearfix">
                            <h3 class="u-tit f__fl">全部车源</h3>
                            <div class="m-filtrate f__fr">
                                <ul class="m-filter-lst f__clearfix" id="js__sort_list">
                                    
                                    <template v-for="(item,index) in searchDataItems.sortType">
                                        <li class="u-item" 
                                            :class="{'on':index==0&&searchFilterList.SortType=='-1'}"
                                            @click.stop="sortTypeFilter($event.target,item.value)"
                                            >
                                            <a href="javascript:;" class="u-lk">{{item.label}}</a>
                                        </li>
                                    </template>

                                </ul><!-- 排序方式选择 -->
                            </div><!-- 条件过滤筛选 -->
                        </div>
                        <div class="m-con">
                            <div class="m-gp-lst">
                                <ul class="m-car-lst f__clearfix">
                                    <li class="m-item" v-for="n in 8">
                                        <router-link to="/carDetails" class="u-box">
                                            <div class="u-pic">
                                                <img src="../../assets/img/car_02.jpg" alt="大众朗逸 2011款 1.6L手动品悠版"/>
                                            </div>
                                            <div class="u-con">
                                                <h5 class="u-tit">
                                                    大众朗逸 2011款 1.6L手动品悠版
                                                </h5>
                                                <p class="u-des">南昌/2006年/10.0万里</p>
                                                <div class="u-price">
                                                    批发价:<em>5.0万</em>
                                                </div>
                                                <a href="javascript:;" class="u-lk">
                                                    <p class="u-count">
                                                        <strong>215</strong>
                                                        次
                                                    </p>
                                                    <p>围观</p>
                                                </a>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>    
                            </div>
                            <div class="m-page">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="resultPage.currentPage"
                                    :page-size="resultPage.pageSize"
                                    layout="prev, pager, next"
                                    :total="resultPage.totalPage">
                                </el-pagination>
                            </div>
                        </div>
                    </div><!-- 列表盒子 -->

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>
    import $ from 'jquery'
    import api from 'api/getData.js'
    // 本地数据搜索价格
    import {searchPriceList} from "api/localJson/home.js"
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // 工具函数
    import {dataToJson} from "assets/js/util.js"
    // 数据hash匹配
    import * as hashData from "api/localJson/hashData.js"
    // b2b条件过滤相关构造类
    import {filterShowData} from "base/class/b2bFilter.js"
    
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"

    import * as filterData from "api/localJson/filter.js"
    
	export default {
        name: "buy-car-list",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
        },
        // 数据
        data() {
            return{

                currentBrand: '',                    //当前选中的汽车品牌
                currentSeries: '',                   //当前选中的汽车车系
                currentPrice: '',                    //当前选中的价格
                
                // 价格的最小值和最大值
                minPriceIptVal: '',
                maxPriceIptVal: '',

                //价格输入获得/失去焦点样式控制
                minPriceIptFocus: false,
                maxPriceIptFocus: false,

                allCarBrandList: [],                 //全部的汽车品牌列表
                allsearchCarSeries: [],              //全部的根据汽车品牌查询到的车系
                carColor: [],                        //车体颜色

                isNotBrand: true,                    //品牌不限时不显示车系

                
                /**
                  * @description 用以展示的用户所选条件
                  */
                filterShowDataItems: [],

                /**
                  * @description 用户选择的筛选条件
                  */
                userFilterData: {
                    brand: "",                   //车牌
                    series: "",                  //车系
                    price: "",                   //价格
                    age: "",                     //车龄
                    dischargeStandard: "",       //排放标准
                    mileage: "",                 //里程
                    gearType: "",                //手/自动挡
                    color: "",                   //颜色
                    transferCount: "",           //过户次数
                    serviceType: "",             //营运类型
                    keyCount: "",                //钥匙数
                    sortType: "",                //搜索结果排序结果
                },
                
                /**
                  * @description 搜索条件集合(向后台发起数据请求是以此种数据结构)
                  */
                searchFilterList:{
                    carBrand: "",                    //汽车品牌
                    Series: "",                      //车系
                    B2BPriceFrom: "",                //最低价格
                    B2BPriceTo: "",                  //最高价格
                    dischargeStandard: "",           //排放标准
                    MileageFrom: "",                 //最低里程
                    MileageTo: "",                   //最高里程
                    GearType: "",                    //手/自动挡
                    Color: "",                       //颜色
                    OnLicensePlateDateFrom: "",      //上牌日期起（计算车龄）
                    OnLicensePlateDateTo: "",        //上牌日期止（计算车龄）
                    TransferTimesFrom: "",           //最少过户次数
                    TransferTimesTo: "",             //最多过户次数
                    ServiceCharacteristics: "",      //营运类型选择
                    SortType: "-1",                  //排序规则
                    keyCount: "",                    //钥匙
                },
                
                /**
                  * @description 搜索条件列表信息集合(通过本地的数据获取+通过线上的数据获取)
                  */
                searchDataItems:{
                    price: searchPriceList,                              //本地数据中的价格搜索条件列表
                    changeNum: filterData.changeNum,                            //过户次数
                    age: filterData.carAge,                                     //车龄
                    mileage: filterData.mileage,                                //行驶里程
                    gearType: filterData.GearType,                              //手/自动挡
                    dischargeStandard: filterData.dischargeStandard,            //排放标准
                    serviceType: filterData.ServiceCharacteristics,             //营运类型
                    sortType: filterData.SortTypeList,                          //排序规则
                    keyCount: filterData.keyCount,                              //钥匙数
                },

                /**
                  * @description 结果集分页信息
                  */
                resultPage:{
                    currentPage: 5,                      //查询结果的当前页
                    pageSize : 8,                        //每页所含的数据数量
                    totalPage: 400,                      //总数据条数
                },
                
            }

        },
        computed:{
            //已选条件框控制显示隐藏
            isShowByHasFilter(){
                return geekDom.isObjHasValue(this.userFilterData);
            }
        },
        created(){

        },
        mounted() {
            
        },
        activated(){
            this._getCarBrandList();
            this._getCarColor();
        },
        //数据侦听
        watch:{
            //限制用户输入最小价格（只能输入后两位小数点的数字）
            minPriceIptVal(val){
                this.minPriceIptVal = geekDom.valReplace(val,2);
            },
            //限制用户输入最大价格（只能输入后两位小数点的数字）
            maxPriceIptVal(val){
                this.maxPriceIptVal = geekDom.valReplace(val,2);
            },
            
            //用户选择条件发生变化
            userFilterData:{
                handler(curVal,oldVal){ //车型选择变化 @param curVal 当前数据, @param oldVal 过去的数据
                    console.log("数据发生变化")
                    this._getFilterShowDataItems(curVal);
                },
                deep:true
            }
        },
        // 自定义函数(方法)
        methods: {

            //获取车辆品牌
            _getCarBrandList(){
                api.getCarBrand().then((res) => {
                    this.allCarBrandList = res.data
                })
            },

            //获取对应汽车品牌的车系
            _getDefaultCarSeries(id){
                api.getCarSeriesByBrand(id).then((res) => {
                    this.allsearchCarSeries = res.data;
                })
            },

            //获取车辆颜色
            _getCarColor(){
                api.getAllCarColor().then((res) => {
                    let carColor = [];
                    res.data.map(function(value, index, array) {
                        let obj = {}
                        // obj.value = value.ColorCode;
                        obj.value = value.ColorName;
                        obj.label = value.ColorName;
                        carColor.push(obj)
                    });
                    let first = [{
                        value: -1,
                        label: "不限"
                    }]
                    this.carColor = first.concat(carColor);
                    //由于车辆颜色是在获取到数据后再渲染,导致每次都会直接显示最后一项，所以直接设为false,设为‘’无效
                    this.userFilterData.color = false;
                })   
            },

            //汽车品牌切换
            brandFilter(e,id,value){
                this.isNotBrand = id>-1 ? false :true; 
                var js__brand_list = $("#js__brand_list");
                js__brand_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
                //如果不是不限的汽车品牌，那么就调用对应的接口数据
                if(id>-1){
                    this._getDefaultCarSeries(id);
                    var js__series_list = $("#js__series_list");
                    js__series_list.find(">.u-item").removeClass("on");
                    js__series_list.find(">.u-item").eq(0).addClass("on");
                }
                this.userFilterData.brand = value; 
            },

            //车系切换
            seriesFilter(e,id,value){
                var js__series_list = $("#js__series_list");
                js__series_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
                this.userFilterData.series = value; 
            },

            //价格切换
            priceFilter(e,min,max,value){
                var js__price_list = $("#js__price_list");
                js__price_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
                this.userFilterData.price = value; 
            },

            //排序切换
            sortTypeFilter(e,value){
                var js__sort_list = $("#js__sort_list");
                js__sort_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
                this.userFilterData.sortType = value; 
            },

            //获取用以展示的用户所选条件集合
            _getFilterShowDataItems(dataObj){
                //清空
                this.filterShowDataItems=[];
                let [key,value,thisHash,label] = [null,null,null,null]
                for (key in dataObj) {
                    if(dataObj[key]&&dataObj[key]!="-1"){  //判断是否有数据，并且数据不为无限
                        
                        //当hash表有这个key对应值时,用hash数据，否则都用原本的label
                        if(hashData.userFilterLabel[key]){  
                            value = dataObj[key];
                            thisHash = hashData.userFilterLabel[key];
                            label = thisHash[value];
                        }
                        else{//用原本的label
                            value = dataObj[key];
                            label = dataObj[key];
                        }
                        this.filterShowDataItems.push(new filterShowData(key,value,label))
                        
                    }
                }
                console.log("用户所选条件集合",this.filterShowDataItems);
            },

            //清空搜索记录
            clearFilterData(){
                console.log("清空条件搜索记录")
            },

            //分页每页展示数据大小变化后出发
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            //分页页号切换触发
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './car_list.styl'
</style>
