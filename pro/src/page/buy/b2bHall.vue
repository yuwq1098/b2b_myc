<template>
    <div class="buy-car-list">
        <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <gk-bread-crumb
                        :crumbItems="crumbItems"
                        ></gk-bread-crumb><!-- 面包屑组件 -->
                    
                    <div class="m-sch-wrap f__clearfix">
                        <div class="m-sch f__fr">
                            <div class="m-srh-result-box" v-show="isShowSchResultBox" ref="schResultBox">
                                <srh-result-box
                                    :selectList="srhResultList"
                                    >
                                </srh-result-box>
                            </div><!-- 查询结果列表盒子 -->

                            <input class="u-sch-ipt" type="text" 
                                placeholder="请输入关键词，如宝马X3"
                                @input="theSearchInput"
                                v-model="theSearchInputVal"
                                ref="theSearchInputBox"
                                />
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

                                        <li class="u-item" 
                                            :class="{'on':!curCarBrandId&&!userFilterData.brand}" 
                                            @click.stop="brandFilter($event.target,-1,-1)"
                                            >
                                            <a href="javascript:;" class="u-lk">不限</a>
                                        </li>

                                        <li class="u-item"
                                            v-for="(item,index) in allCarBrandList"
                                            :class="{'on':userFilterData.brand&&userFilterData.brand==item.brand_name}"
                                            v-if="index<13" 
                                            :data-id="item.brand_id"
                                            @click.stop="brandFilter($event.target,item.brand_id,item.brand_name)"
                                            >
                                            <a href="javascript:;"  class="u-lk">{{item.brand_name}}</a>
                                        </li>

                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld brand" v-show="isShowMoreBrand">
                                    <!-- 更多车品牌信息展示 -->
                                    <brand-more-box class="m-cld-box" id="js__brand_more_list"
                                        :brandList="allCarBrandList"
                                        @brandFilterMore="brandFilterMore"
                                        v-if="allCarBrandList&&allCarBrandList.length>0"
                                        >
                                    </brand-more-box>
                                </div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more"
                                @click="isShowMoreBrand=!isShowMoreBrand" 
                                v-if="allCarBrandList&&allCarBrandList.length>=13"
                                :class="{'on':isShowMoreBrand}" 
                                >
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div><!-- 品牌选择 -->

                        <div class="m-sel-gp f__clearfix" v-show="!isNotBrand">
                            <span class="m-gp-tit">车系：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list f__clearfix" id="js__series_list">
                                        <li class="u-item" 
                                            :class="{'on':!curSeriesId&&!userFilterData.series}"  
                                            @click.stop="seriesFilter($event.target,-1,-1)"
                                            >
                                            <a href="javascript:;" class="u-lk">不限</a>
                                        </li>
                                        <li class="u-item" 
                                            v-for="(item,index) in allsearchCarSeries" 
                                            v-if="index<10" 
                                            :class="{'on':userFilterData.series&&userFilterData.series==item.series_name}"
                                            @click.stop="seriesFilter($event.target,item.series_id,item.series_name)"
                                            >
                                            <a href="javascript:;" class="u-lk">{{item.series_name}}</a>
                                        </li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld series" v-show="isShowMoreSeries">
                                    <!-- 更多车系信息展示 -->
                                    <series-more-box class="m-cld-box" id="js__series_more_list"
                                        :seriesList="allsearchCarSeries"
                                        @seriesFilterMore="seriesFilterMore"
                                        >
                                    </series-more-box>
                                </div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more" 
                                @click="isShowMoreSeries=!isShowMoreSeries" 
                                v-if="allsearchCarSeries&&allsearchCarSeries.length>=12"
                                :class="{'on':isShowMoreSeries}" 
                                >
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div><!-- 车系选择 -->

                        <div class="m-sel-gp">
                            <span class="m-gp-tit">价格：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info f__clearfix" id="js__price_box">
                                    <ul class="m-lk-list c__clearfix" id="js__price_list">
                                        <li class="u-item" 
                                            :class="{'on':!curPriceVal&&!userFilterData.price}"  
                                            @click.stop="priceFilter($event.target,-1,-1,-1)"
                                            >
                                            <a href="javascript:;" class="u-lk">不限</a>
                                        </li>

                                        <li class="u-item" 
                                            v-for="(item,index) in searchDataItems.price"
                                            :class="{'on':userFilterData.price&&userFilterData.price==item.title}"
                                            :min="item.min" :max="item.max" 
                                            @click.stop="priceFilter($event.target,item.min,item.max,item.title)"
                                            >
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
                                        <button class="u-btn" @click="setUserCustomPrice">确定</button>
                                    </div>
                                </div><!-- 信息 -->
                            </div>
                        </div><!-- 价格选择 -->

                        <div class="m-sel-gp" v-if="userFilterData">
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
                                        <!-- <li class="u-item">
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
                                        </li> -->
                                        <li class="u-item">
                                            <gk-city-select
                                                @valChangeEnd="carInCityChangeEnd"
                                                placeholder="车辆所在城市"
                                                ref="carInCity"
                                                >
                                            </gk-city-select>
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
                                            <li class="f__fl u-check-item" @click="clearFilterDataTheOne(item.key)" v-if="item">
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
                            <h3 class="u-tit f__fl">
                                <span class="tit">全部车源</span>
                                <span class="data" v-show="resultPage.totalPage>0">(共<em class="vital">{{resultPage.totalPage}}</em>条搜索结果)</span>
                            </h3>
                            <div class="m-filtrate f__fr">
                                <ul class="m-filter-lst f__clearfix" id="js__sort_list">
                                    
                                    <template v-for="(item,index) in searchDataItems.sortType">
                                        <li class="u-item" 
                                            :class="{
                                                'on':(index==0&&!userFilterData.sortType)
                                                    ||(index==0&&userFilterData.sortType=='默认排序')
                                                    ||(userFilterData.sortType&&userFilterData.sortType==item.value)
                                                }"
                                            @click.stop="sortTypeFilter($event.target,item.value,item.label)"
                                            >
                                            <a href="javascript:;" class="u-lk">{{item.label}}</a>
                                        </li>
                                    </template>

                                </ul><!-- 排序方式选择 -->
                            </div><!-- 条件过滤筛选 -->
                        </div>
                        <div class="m-con">

                            <div class="m-carlist-true" v-if="b2bCarList&&b2bCarList.length>0">
                                <b2b-car-list-box
                                    :carList="b2bCarList"
                                    :loginStatus="loginStatus"
                                    :memberData="memberData"
                                    :hasLogin= "hasLogin"
                                    :hasAuth= "hasAuth"
                                    :hasCredit= "hasCredit"
                                    >
                                </b2b-car-list-box>

                                <div class="m-page" v-show="resultPage.totalPage>0">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="resultPage.currentPage"
                                        :page-size="resultPage.pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total="resultPage.totalPage">
                                    </el-pagination>
                                </div>
                            </div><!-- 当搜索到数据时 -->
 
                            <div class="m-carlist-null"  v-if="b2bCarList&&b2bCarList.length==0">
                                <div class="m-not-srh">
                                    <div class="m-pic">
                                        <img class="u-img" :src="errorPic" />
                                    </div>
                                    <div class="m-srh-info">
                                        <div class="u-hd">
                                            <span class="txt">暂时没有</span>
                                            <span class="label" v-if="filterShowDataItems&&filterShowDataItems.length>0">
                                                <template v-for="(item,index) in filterShowDataItems">
                                                    <template>{{item.label}}</template>
                                                    <template v-if="filterShowDataItems&&index!=filterShowDataItems.length-1"><em class="symbol">/</em>
                                                    </template>
                                                </template>
                                            </span>
                                            <span class="txt">相关的结果</span>
                                        </div>
                                        <div class="u-txt">建议您：</div>
                                        <div class="u-txt">· 减少筛选条件</div>
                                        <div class="u-txt">· 检查输入是否正确</div>
                                        <div class="u-txt">· 简化输入词</div>
                                    </div>
                                </div>
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
    // 获取数据的api
    import api from 'api/getData.js'
    // 引入系统变量
    import * as SYSTEM from 'api/system.js'
    // vuex状态管理
    import { mapGetters,mapActions } from 'vuex'
    // 本地数据搜索价格
    import {searchPriceList} from "api/localJson/home.js"
    // dom操作方法
    import * as geekDom from "assets/js/dom.js"
    // 工具函数
    import {dataToJson,strToJson} from "assets/js/util.js"
    // 网站外层面包屑列表本地化资源
    import {crumbsInfo} from "api/localJson/homeCrumb.js"
    // 数据hash匹配
    import * as hashData from "api/localJson/hashData.js"
    // b2b条件过滤相关构造类
    import {filterShowData,filterDataClass,searchFilterClass} from "base/class/b2bFilter.js"
    // 用户信息的构造类
    import {memberInfo} from 'base/class/member.js'
    // 搜索车辆结果的构造类
    import {searchCarResult} from "base/class/searchResult.js"
    // 面包屑组件
    import gkBreadCrumb from "components/common/gkBreadcrumb.vue"
    // 更多车品牌组件
    import brandMoreBox from "components/filterMoreBox/brandMoreBox.vue"
    // 更多车系组件
    import seriesMoreBox from "components/filterMoreBox/seriesMoreBox.vue"
    // 城市级联选择组件
    import gkCitySelect from "components/common/gkCitySelect.vue"
    // b2b车辆信息构造类
    import {b2bCarInfo} from "base/class/carInfo.js"
    // b2b车辆信息列表盒子
    import b2bCarListBox from "components/boxLayout/b2bCarListBox.vue"
    
    // 搜索结果盒子
    import srhResultBox from "components/common/srhResultBox.vue"


    //本地的过滤筛选数据
    import * as filterData from "api/localJson/filter.js"

    //每页显示八条
    const RESULE_PAGE_SIZE = 8
    //搜索延迟
    const SEARCH_DELAY = 150
    
    export default {
        name: "buy-car-list",
        // 在当前模块注册组件
        components:{
            gkBreadCrumb,
            brandMoreBox,
            seriesMoreBox,
            b2bCarListBox,
            srhResultBox,
            gkCitySelect,
        },
        // 数据
        data() {
            return{
                
                // 是否登录
                hasLogin: "",
                // 是否认证
                hasAuth: "",
                // 是否有足额的信誉保证金
                hasCredit: "",

                // 面包屑列表信息
                crumbItems: crumbsInfo['b2bHall'],
                
                isShowSchResultBox: false,       // 是否显示查询结果列表

                // 搜索框的绑定值
                theSearchInputVal: "",
                //用户缓暂搜索值的集合，当用户清空时，也同时清空
                srhValItems : [],
                srhResultList: [],               // 搜索结果列表
                isOkSearch: true,                // 是否允许用户触发搜索
                
                // 用户信息
                memberData: null,

                errorPic: require("assets/img/error_pic2.png"),

                b2bCarList: [],                       // b2b大厅搜索结果 车辆列表
                
                dataChangeOnOff: false,               // 当真实数据拉取成功时，才让数据和本地存储通信，锁住某些操作

                curCarBrandId: '',                    // 当前选中的汽车品牌ID(线上数据庞大，不能用hashData匹配)
                curSeriesId: '',                      // 当前选中的汽车车系ID(线上数据庞大，不能用hashData匹配)

                curPriceVal: '',                      // 当前选中的价格值（这个可以直接和hashData匹配）==> 最终还是要转成 min+max
                sortTypeVal: '',                      // 当前选中的排序类型值（这个可以直接和hashData匹配）

                // 价格的最小值和最大值
                minPriceIptVal: '',
                maxPriceIptVal: '',

                //价格输入获得/失去焦点样式控制
                minPriceIptFocus: false,
                maxPriceIptFocus: false,

                allCarBrandList: [],                 // 全部的汽车品牌列表
                allsearchCarSeries: [],              // 全部的根据汽车品牌查询到的车系
                carColor: [],                        // 车体颜色
                carInCity: [],                       // 车辆所在地

                isNotBrand: true,                    //品牌不限时 不显示车系
                
                isShowMoreBrand: false,              //显示更多的品牌
                isShowMoreSeries: false,             //显示更多的车系

                
                /**
                  * @description 用以展示的用户所选条件
                  */
                filterShowDataItems: [],

                /**
                  * @description 用户选择的筛选条件
                  */
                userFilterData: {},
                
                /**
                  * @description 搜索条件集合(向后台发起数据请求是以此种数据结构)
                  */
                searchFilterList:{},
                
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
                    currentPage : 1,
                    pageSize : 8,
                    totalPage : 0
                },
                
            }

        },
        computed:{
            ...mapGetters(['getUserFilterData','getSearchFilterList','loginStatus']),
            //已选条件框控制显示隐藏
            isShowByHasFilter(){
                return geekDom.isObjHasValue(this.userFilterData);
            }
        },
        created(){
            this.dataChangeOnOff = true;
        },
        mounted() {
            
        },
        //再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

            //获取车品牌列表信息（从线上拉取）
            this._getCarBrandList();
            //获取车辆颜色列表信息（从线上拉取）
            this._getCarColor();
            if(this.dataChangeOnOff){
                //用户条件筛选数据
                this._initUserFilterData();
            }
            
            // 获取用户信息
            this.getMemberInfo();

            let me = this;
            //如果还没有开锁
            if(!this.dataChangeOnOff){
                //当真实数据拉取成功时，才让数据和本地存储通信
                this.dataChangeOnOff = true;
                setTimeout(() => {
                    this._initUserFilterData();
                },20)
            }
            
        },
        //退出的生命周期钩子
        deactivated(){
            //重新上锁
            this.dataChangeOnOff = false;
        },
        //数据侦听
        watch:{
            
            //侦听用户搜索的值，当其为空时，清空搜索结果集
            theSearchInputVal(val){
                if(val==""){
                    this.srhValItems = [];
                    this.srhResultList = [];
                }
            },

            //搜索结果列表
            srhResultList(val){
                this.isShowSchResultBox = val.length<=0 ? false : true;
            },

            // 侦听结果框显示的状态
            isShowSchResultBox(val){
                let [schResultBox,theSearchInputBox] = [
                    this.$refs.schResultBox,
                    this.$refs.theSearchInputBox
                ]
                if(val){
                    this._searchCancelBubble();
                }else{
                    //清空首页的 文档点击事件
                    document.onclick = null;
                    schResultBox.onclick = null;
                    theSearchInputBox.onclick = null;
                }
            },

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
                    
                    //没有开锁, 那就return它
                    if(!this.dataChangeOnOff) return
                    // 如果这个数组内属性都是空(假) 但是不为-1
                    if(!geekDom.isObjHasValue(curVal)) return;

                    this._getFilterShowDataItems(curVal);  //获取用以展示的用户所选条件集合(用以显示)
                    this._setSearchFilterList(curVal);   //设置真实向api请求的字段
                    
                },
                deep:true
            },

            // 登录状态改变
            loginStatus(val){
                if(val){
                    // 获取用户信息
                    this.getMemberInfo();
                }else{
                    this.memberData = null;
                }
                setTimeout(() => {
                    if(this.$router.currentRoute.path=="/b2bHall"){
                        // 重新渲染页面
                        this.carListResultRender();
                    }
                },20)
                
            },

            // 侦听路由变化
            $route (to, from) {
                if(to.path!=from.path){
                    this.$destroy();
                }
            },

        },
        // 自定义函数(方法)
        methods: {
            
            //vuex的actions
            ...mapActions(["setUserFilterData",'setSearchFilterList']),

            //通过用户输入获取对应信息
            theSearchInput(){
                if(this.theSearchInputVal=="") return;
                this.srhValItems.push(this.theSearchInputVal);

                //如果没有过延缓搜索规定的时间，那么久延迟搜索
                if(!this.isOkSearch) return;

                //获取用户最后一次输入的值
                let lastSrhVal = this.srhValItems[this.srhValItems.length-1];
                let data = {
                    "PageSize": 20,
                    "PageIndex": 1,
                    "LikeKey": lastSrhVal,
                }
                api.getB2BCarList(data).then((res) => {
                    this.srhResultList = this._normalizeSearchCarResult(res.data)
                })
                setTimeout(() => {
                    this.isOkSearch = true;
                    if(this.theSearchInputVal=="") return;
                    api.getB2BCarList(data).then((res) => {
                        this.srhResultList = this._normalizeSearchCarResult(res.data)
                    })
                },SEARCH_DELAY)
                if(this.isOkSearch) this.isOkSearch = false;

            },

            //使用b2c抽象类完成carResult
            _normalizeSearchCarResult(list){
                let carResultList = [];
                list.forEach((item) => {
                    carResultList.push(new searchCarResult(item))
                });
                return carResultList;
            },

            //处理事件冒泡
            _searchCancelBubble(){
                let me = this;
                let [schResultBox,theSearchInputBox] = [
                    this.$refs.schResultBox,
                    this.$refs.theSearchInputBox
                ]
                // 事件冒泡
                geekDom.cancelBubbleTwo(
                    schResultBox,
                    theSearchInputBox,
                    function(){
                        me.theSearchInputVal = "";
                    }
                );
            },

            // 格式化用户信息
            _normalizeMember(data) {
                return new memberInfo(data);
            },

            // 获取用户信息
            getMemberInfo(){
                if(!this.loginStatus) return;

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
             
            //初始化用户条件筛选数据
            _initUserFilterData(){
                //如果当从vuex获取的userFilterData数据是空时
                if(!this.getUserFilterData&&!geekDom.isObjHasValue(this.getUserFilterData)){
                    //因为构造类中是data.[property],所以要空对象给构造类传一个
                    let data  = {}
                    this.userFilterData = new filterDataClass(data);
                }else{
                    //用户条件筛选数据
                    if(typeof this.getUserFilterData === 'string'){   //第一次获取是obj，切换页面就变成了string，有些坑
                        this.userFilterData = new filterDataClass(strToJson(this.getUserFilterData));
                    }else{
                        this.userFilterData = new filterDataClass(this.getUserFilterData);
                    }
                }

                //如果当从vuex获取的searchFilterList数据是空时
                if(!this.getSearchFilterList&&!geekDom.isObjHasValue(this.getSearchFilterList)){
                    //因为构造类中是data.[property],所以要空对象给构造类传一个
                    let data  = {}
                    this.searchFilterList = new searchFilterClass(data);
                }else{
                    //用户条件筛选数据
                    if(typeof this.getSearchFilterList === 'string'){   //第一次获取是obj，切换页面就变成了string，有些坑
                        this.searchFilterList = new searchFilterClass(strToJson(this.getSearchFilterList));
                    }else{
                        this.searchFilterList = new searchFilterClass(this.getSearchFilterList);
                    }
                }
                
                //计算是否显示车系
                this.isNotBrand = this.userFilterData.brand?false:true;
                
                //设置分页控件的分页大小
                this.searchFilterList.PageSize = RESULE_PAGE_SIZE;
                this.searchFilterList.PageIndex = 1;

                //页面渲染
                this.renderByData(this.searchFilterList)
                
            },

            //获取车辆品牌
            _getCarBrandList(){
                api.getCarBrand().then((res) => {
                    this.allCarBrandList = res.data
                    //如果默认选中了其中一个车牌
                    if(!this.isNotBrand){
                        //那么在之后显示对应的车系数据
                        setTimeout(() => {
                            let js__brand_list = $("#js__brand_list");
                            let brand_id = js__brand_list.find(".u-item.on").attr("data-id")
                            this._getDefaultCarSeries(brand_id);
                        },20)
                    }
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

                    this.userFilterData.color = this.userFilterData.color||"";
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
                if(id==-1){
                    // 设置真实向api请求的字段 汽车车系的id
                    this.searchFilterList.CarSeriesId = -1; 
                    //操作完毕后隐藏更多车系
                    this.isShowMoreSeries = false;
                }

                // 设置展示给界面  用户所选条件集合中 汽车品牌的lable
                this.userFilterData.brand = value; 
                // 设置展示给界面  用户所选条件集合中 汽车车系的lable 为空
                this.userFilterData.series = ""; 
                // 设置真实向api请求的字段 汽车品牌的id
                this.searchFilterList.CarBrandId = id; 

            },
            
            //汽车品牌切换(更多中的操作)
            brandFilterMore(e,id,value){
                this.isNotBrand = id>-1 ? false :true; 
                // 先清除一遍外层的选中效果
                var js__brand_list = $("#js__brand_list");
                js__brand_list.find(">.u-item").removeClass("on");
                //如果不是不限的汽车品牌，那么就调用对应的接口数据
                if(id>-1){
                    this._getDefaultCarSeries(id);
                    var js__series_list = $("#js__series_list");
                    js__series_list.find(">.u-item").removeClass("on");
                    js__series_list.find(">.u-item").eq(0).addClass("on");
                }
                
                //由于id不是挂载在ul上，所以find(".u-item")  :不需要>
                var js__brand_more_list = $("#js__brand_more_list");
                js__brand_more_list.find(".u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");


                // 设置展示给界面  用户所选条件集合中 汽车品牌的lable
                this.userFilterData.brand = value; 
                // 设置展示给界面  用户所选条件集合中 汽车车系的lable 为空
                this.userFilterData.series = ""; 
                // 设置真实向api请求的字段 汽车品牌的id
                this.searchFilterList.CarBrandId = id; 


                //操作完毕后隐藏更多品牌
                this.isShowMoreBrand = false;
            },

            //车系切换
            seriesFilter(e,id,value){
                var js__series_list = $("#js__series_list");
                js__series_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");

                // 设置展示给界面  用户所选条件集合中 汽车车系的lable
                this.userFilterData.series = value; 
                // 设置真实向api请求的字段 汽车车系的id
                this.searchFilterList.CarSeriesId = id; 

            },

            //车系切换(更多中的操作)
            seriesFilterMore(e,id,value){

                // 先清除一遍外层的选中效果
                var js__series_list = $("#js__series_list");
                js__series_list.find(">.u-item").removeClass("on");
                
                //由于id不是挂载在ul上，所以find(".u-item")  :不需要>
                var js__series_more_list = $("#js__series_more_list");
                js__series_more_list.find(".u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");


                // 设置展示给界面  用户所选条件集合中 汽车车系的lable
                this.userFilterData.series = value; 
                // 设置真实向api请求的字段 汽车车系的id
                this.searchFilterList.CarSeriesId = id; 

                //操作完毕后隐藏更多车系
                this.isShowMoreSeries = false;
            },

            //价格切换
            priceFilter(e,min,max,value){
                // 清除用户自定义的价格
                [this.minPriceIptVal,this.maxPriceIptVal] = ["",""];
                
                var js__price_list = $("#js__price_list");
                js__price_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");

                // 设置展示给界面  用户所选条件集合中 价格的lable
                this.userFilterData.price = value; 
                // 设置真实向api请求的字段 价格区间
                this.searchFilterList.B2BPriceFrom = min||'';
                this.searchFilterList.B2BPriceTo = max||''; 
            },

            //用户自定义设置价格
            setUserCustomPrice(){
                let [minPrice,maxPrice] = [this.minPriceIptVal,this.maxPriceIptVal];
                //两个值都没有，退出
                if(!minPrice&&!maxPrice) return;
                if(minPrice) minPrice = parseInt(minPrice);
                if(maxPrice) maxPrice = parseInt(maxPrice);

                //两个值都有
                if(minPrice&&maxPrice&&maxPrice<minPrice){
                    maxPrice = minPrice;
                    this.maxPriceIptVal = this.minPriceIptVal;   
                }
                
                // 设置展示给界面  用户所选条件集合中 价格的lable
                if(minPrice&&!maxPrice){
                    //只有最低价
                    this.userFilterData.price = minPrice+"万以上"; 
                }else if(!minPrice&&maxPrice){
                    //只有最高价
                    this.userFilterData.price = maxPrice+"万以内";
                }else if(minPrice&&maxPrice){
                    //两个价都有
                    if(minPrice==maxPrice){
                        //两个价格一样
                        this.userFilterData.price = minPrice+"万";
                    }else{
                        //有最低价和最高价
                        this.userFilterData.price = minPrice+"-"+maxPrice+"万";
                    }
                }

                // 设置真实向api请求的字段 价格区间
                this.searchFilterList.B2BPriceFrom = minPrice||'';
                this.searchFilterList.B2BPriceTo = maxPrice||'';

            },

            //排序类型切换
            sortTypeFilter(e,value,label){
                var js__sort_list = $("#js__sort_list");
                js__sort_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
                // 设置展示给界面  用户所选条件集合中 排序类型的的lable
                this.userFilterData.sortType = label; 
                // 设置真实向api请求的字段 排序类型
                this.searchFilterList.SortType = value||'';

            },
            
            // 车辆所在城市选择
            carInCityChangeEnd(val,allName){
                console.log(allName.split("/")[1])
                let cityName = allName.split("/")[1];
                // 设置展示给界面  用户所选条件集合中 排序类型的的lable
                this.userFilterData.carInCity = cityName; 
                // 设置真实向api请求的字段 排序类型
                this.searchFilterList.CarInCity = cityName||'';
            },

            //获取用以展示的用户所选条件集合
            _getFilterShowDataItems(dataObj){
                //没有数据时加锁
                if(!this.dataChangeOnOff) return;

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
            },

            //设置真实向api请求的字段
            _setSearchFilterList(dataObj){
                //没有数据时加锁
                if(!this.dataChangeOnOff) return;
                //遍历对象
                for (let key of Object.keys(dataObj)) {
                    //如果是空值，跳出本次循环
                    if(!dataObj[key]) continue;
                    //hashData是使用，return是一个方法所以最后要加()   hashData.userFilterData[key][value]()
                    switch(key){
                        case 'age':                   // 车龄(上牌日期)
                            let _ageVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.OnLicensePlateDateFrom = _ageVal[0];
                            this.searchFilterList.OnLicensePlateDateTo = _ageVal[1];
                            break;
                        case 'dischargeStandard':     // 排放标准
                            let _dischargeStandardVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.DischargeStandard = _dischargeStandardVal;
                            break;
                        case 'mileage':               // 行驶里程
                            let _mileageVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.MileageFrom = _mileageVal[0];
                            this.searchFilterList.MileageTo = _mileageVal[1];
                            break;
                        case 'gearType':              // 手自动挡
                            let _gearTypeVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.GearType = _gearTypeVal;
                            break;
                        case 'color':                 // 颜色
                            if(dataObj[key]==-1){
                                this.searchFilterList.Color = "";
                            }else{
                                this.searchFilterList.Color = dataObj[key];
                            }
                            break;
                        case 'transferCount':         // 过户次数
                            let _transferCountVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.TransferTimesFrom = _transferCountVal[0];
                            this.searchFilterList.TransferTimesTo = _transferCountVal[1];
                            break;
                        case 'serviceType':           // 营运类型
                            let _serviceTypeVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.ServiceCharacteristics = _serviceTypeVal;
                            break;
                        case 'keyCount':              // 钥匙数
                            let _keyCountVal = hashData.userFilterData[key][dataObj[key]]();
                            this.searchFilterList.KeyCountFrom = _keyCountVal[0];
                            this.searchFilterList.KeyCountTo = _keyCountVal[1];
                            break;
                    }
                }
                // 当搜索条件发生变化时，页号变为1
                this.searchFilterList.PageIndex = 1;
                this.resultPage.currentPage = 1;
                // 重新渲染页面
                this.carListResultRender();
            },

            //根据传入的对应值，删除对应的 用户搜索记录，然后重新渲染
            clearFilterDataTheOne(key){
                // 如果只剩一个条件，那么就清空
                if(this.filterShowDataItems.length<=1){
                    this.clearFilterData();
                    return;
                }
                this.userFilterData[key] = '';
                let dataObj = this.userFilterData;
                
                //遍历对象, 删除对应属性值
                for (var newKey of Object.keys(dataObj)) {
                    switch(key){
                        case 'brand':                 // 车品牌
                            this.searchFilterList.CarBrandId = "";
                            this.userFilterData['series'] = '';
                            this.searchFilterList.CarSeriesId = "";
                            break;
                        case 'series':                // 车系
                            this.searchFilterList.CarSeriesId = "";
                            break;
                        case 'carInCity':             // 车辆所在地
                            this.searchFilterList.CarInCity = "";
                            this.$refs.carInCity.clearVal();
                            break;
                        case 'price':                 // 价格
                            this.searchFilterList.B2BPriceFrom = "";
                            this.searchFilterList.B2BPriceTo = "";
                            break;
                        case 'age':                   // 车龄(上牌日期)
                            this.searchFilterList.OnLicensePlateDateFrom = "";
                            this.searchFilterList.OnLicensePlateDateTo = "";
                            break;
                        case 'dischargeStandard':     // 排放标准
                            this.searchFilterList.DischargeStandard = "";
                            break;
                        case 'mileage':               // 行驶里程
                            this.searchFilterList.MileageFrom = "";
                            this.searchFilterList.MileageTo = "";
                            break;
                        case 'gearType':              // 手自动挡
                            this.searchFilterList.GearType = "";
                            break;
                        case 'color':                 // 颜色
                            this.searchFilterList.Color = "";
                            break;
                        case 'transferCount':         // 过户次数
                            this.searchFilterList.TransferTimesFrom = "";
                            this.searchFilterList.TransferTimesTo = "";
                            break;
                        case 'serviceType':           // 营运类型
                            this.searchFilterList.ServiceCharacteristics = "";
                            break;
                        case 'keyCount':              // 钥匙数
                            this.searchFilterList.KeyCountFrom = "";
                            this.searchFilterList.KeyCountTo = "";
                            break;
                        case 'sortType':              // 排序类型
                            this.searchFilterList.SortType = "";
                            break;
                    }
                }
                // 重新渲染页面
                this.carListResultRender();
            },

            //清空搜索记录
            clearFilterData(){
                //清空用户展示记录
                let data  = {}

                this.userFilterData = new filterDataClass(data);
                this.searchFilterList = new searchFilterClass(data);
                // 清空城市级联选择
                this.$refs.carInCity.clearVal();
                // 重新渲染页面
                this.carListResultRender();

            },

            //分页每页展示数据大小变化后出发
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            //分页页号切换触发
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                //设置分页控件中当前页好
                this.searchFilterList.PageIndex = val;
                // 重新渲染页面
                this.carListResultRender();
            },

            // 筛选结果渲染,用户执行对筛选条件的增删改查，都将触发这个方法
            carListResultRender(){
                //没有数据时加锁
                if(!this.dataChangeOnOff) return;
                this.userFilterData = geekDom.changeObjError(this.userFilterData);
                //将用户选中的数据都存在本地中
                this.setUserFilterData(this.userFilterData);
                //将用户选中的 向后台发起api请求数据 存在本地中
                this.setSearchFilterList(this.searchFilterList);

                //页面渲染
                this.renderByData(this.searchFilterList)
            },
            
            // 根据筛选数据渲染页面
            renderByData(data){
                // this.resultPage.currentPage = parseInt(data.PageIndex);
                // this.resultPage.pageSize = parseInt(RESULE_PAGE_SIZE);

                //获取数据并设置分页条数
                this._getB2bCarList(data);

            },

            //获取B2B大厅车辆列表
            _getB2bCarList(data){
                // 当用户信息存在的时候
                /*if(this.memberData){
                    data.MemberId = this.memberData.id;
                }*/
                if(data.CarBrandId==-1) data.CarBrandId = ""; 
                if(data.B2BPriceFrom==-1) {
                    data.B2BPriceFrom = ""; 
                    data.B2BPriceTo = "";  
                }
                if(data.CarSeriesId==-1) data.CarSeriesId = ""; 
                
                // if(data.PageIndex==1){
                //     data.TS = +new Date();   
                // }
                let me = this;
                api.getB2BCarList(data).then((res) => {
                    // 获取权限相关的信息
                    this.hasLogin = res.HasLogin;
                    this.hasAuth = res.HasAuth;
                    this.hasCredit = res.HasCredit;
                    this.b2bCarList = this._normalizeB2bCarInfo(res.data)
                    me.resultPage.totalPage = parseInt(res.total);
                });
            },

            //使用b2b抽象类完成carInfo
            _normalizeB2bCarInfo(list){
                let carInfo = [];
                list.forEach((item, index) => {
                    carInfo.push(new b2bCarInfo(item))
                });
                return carInfo;
            },

        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'b2bHall.styl'
</style>
