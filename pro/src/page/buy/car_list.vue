<template>
	<div class="buy-car-list">
	    <div class="g-doc">
            <div class="g-bd">
                <section class="f__w1200">
                    <div class="m-crm">
                        <span>当前位置：</span>
                        <el-breadcrumb separator=">">
                            <el-breadcrumb-item :to="{ path: '/' }">北京二手车</el-breadcrumb-item>
                            <el-breadcrumb-item>大众朗逸2011款1.6L手动品悠版</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div><!-- 面包屑 -->
                    
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
                                        <li class="u-item" :class="{'on':!currentBrand}" @click.stop="brandFilter(-1,$event.target)"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item" v-for="(item,index) in allCarBrandList" v-if="index<13" @click.stop="brandFilter(item.brand_id,$event.target)">
                                            <a href="javascript:;"  class="u-lk">{{item.brand_name}}</a>
                                        </li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld"></div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more" v-if="allCarBrandList.length>=13">
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div>
                        <div class="m-sel-gp f__clearfix" v-show="!isNotBrand">
                            <span class="m-gp-tit">车系：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list f__clearfix" id="js__series_list">
                                        <li class="u-item" :class="{'on':!currentSeries}"  @click.stop="seriesFilter(-1,$event.target)"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item" v-for="(item,index) in allsearchCarSeries" v-if="index<10" @click.stop="seriesFilter(item.brand_id,$event.target)"><a href="javascript:;" class="u-lk">{{item.series_name}}</a></li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld"></div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more" v-if="allsearchCarSeries.length>=12">
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div>
                        <div class="m-sel-gp">
                            <span class="m-gp-tit">价格：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info f__clearfix" ref="priceFilter">
                                    <ul class="m-lk-list">
                                        <li class="u-item" v-for="(item,index) in searchPriceList" :min="item.min" :max="item.max" :class="{'on':index==0}">
                                            <a href="javascript:;" class="u-lk">{{item.title}}</a>
                                        </li>
                                    </ul>
                                    <div class="m-other-price f__clearfix">
                                        <div class="m-price"><input name="min-price" class="u-price-ipt" type="text" maxlength="8" />万</div>
                                        <span class="u-connect">-</span>
                                        <div class="m-price"><input name="max-price" class="u-price-ipt" type="text" maxlength="8" />万</div>
                                        <button class="u-btn">确定</button>
                                    </div>
                                </div><!-- 信息 -->
                            </div>
                        </div>
                        <div class="m-sel-gp">
                            <span class="m-gp-tit">其他：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list no-overflow">
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="车型">
                                                <el-option
                                                  v-for="item in carModel"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="车龄">
                                                <el-option
                                                  v-for="item in carAge"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="排放标准">
                                                <el-option
                                                  v-for="item in carColorItems"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="里程">
                                                <el-option
                                                  v-for="item in mileage"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="排量">
                                                <el-option
                                                  v-for="item in displacement"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="颜色">
                                                <el-option
                                                  v-for="item in carColor"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="过户次数">
                                                <el-option
                                                  v-for="item in changeNum"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                    </ul>
                                </div><!-- 信息 -->
                            </div>
                        </div>
                    </div><!-- 选择过滤条件 -->
                    
                    <div class="m-b2b-svr">
                        <div></div>
                    </div><!-- b2b服务专享 -->

                    <div class="m-lst-gp-sel">
                        <div class="m-hd f__clearfix">
                            <h3 class="u-tit f__fl">全部车源</h3>
                            <div class="m-filtrate f__fr">
                                <ul class="m-filter-lst f__clearfix">
                                    <li class="u-item on">
                                        <a href="javascript:;" class="u-lk">默认排序</a>
                                    </li>
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk">车龄最短</a>
                                    </li>
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk">最新发布</a>
                                    </li>
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk">价格最低</a>
                                    </li>
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk">价格最高</a>
                                    </li>
                                    <li class="u-item">
                                        <a href="javascript:;" class="u-lk">里程最少</a>
                                    </li>
                                </ul>
                            </div><!-- 条件过滤沙宣 -->
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
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="prev, pager, next"
                                    :total="totalPage">
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
    // 本地数据
    import {searchPriceList} from "api/localJson/home.js"
    import {changeNum,carAge,carModel,mileage,displacement} from "api/localJson/filter.js"
    
	export default {
        name: "buy-car-list",
        // 数据
        data() {
            return{

                currentBrand: '',  //当前选中的汽车品牌
                currentSeries: '',  //当前选中的汽车车系
                allCarBrandList: [],    //全部的汽车品牌列表
                allsearchCarSeries: [],    //全部的根据汽车品牌查询到的车系
                
                isNotBrand: true,   //品牌不限时不显示车系

                searchPriceList: searchPriceList,    //本地数据中的价格查询字典列表

                currentPage: 5,         //查询结果的当前页
                pageSize : 8,           //每页所含的数据数量
                totalPage: 400,         //总数据条数
                carColorItems: [        //汽车颜色选择列表
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }
                ],
                //过户次数
                changeNum: changeNum,
                //车龄
                carAge: carAge,
                carModel: carModel,
                carColor: [],
                mileage: mileage,
                displacement: displacement,
            }

        },
        computed:{
            
        },
        created(){

        },
        mounted() {
            
        },
        activated(){
            this._getCarBrandList();
            this._getCarColor();
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
                        obj.value = value.ColorCode;
                        obj.label = value.ColorName;
                        carColor.push(obj)
                    });
                    this.carColor = carColor;
                })   
            },

            //汽车品牌切换
            brandFilter(id,e){
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
            },
            //车系切换
            seriesFilter(id,e){
                var js__series_list = $("#js__series_list");
                js__series_list.find(">.u-item").removeClass("on");
                $(e).parent(".u-item").addClass("on");
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
        // 在当前模块注册组件
        components:{
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './car_list.styl'
</style>
