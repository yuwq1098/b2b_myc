<template>
	<div class="buy-car-list">
	    <div class="g-doc">
			<c-head></c-head>
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
                                    <ul class="m-lk-list f__clearfix">
                                        <li class="u-item on"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">大众</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奥迪</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">丰田</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奔驰</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">宝马</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">本田</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">别克</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">现代</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">日产</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">福特</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">雪佛兰</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">起亚</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">马自达</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">路虎</a></li>
                                    </ul>
                                </div><!-- 信息 -->
                                <div class="m-info-cld"></div><!-- 子信息 -->
                            </div>
                            <a href="javascript:;" class="u-more">
                                更多<i class="iconfont icon-arrowdown1"></i>
                            </a>
                        </div>
                        <div class="m-sel-gp">
                            <span class="m-gp-tit">车系：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info">
                                    <ul class="m-lk-list">
                                        <li class="u-item on"><a href="javascript:;" class="u-lk">不限</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">捷达</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">速腾</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">迈腾</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">宝来</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奔腾B70</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">全新奔腾B50</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奇瑞QQ3</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">五菱之光</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">马自达</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">睿翼</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奥迪A6L</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">哈弗H6</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">奔腾X80</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">一汽丰田RAV4</a></li>
                                    </ul>
                                </div><!-- 信息 -->
                            </div>
                        </div>
                        <div class="m-sel-gp">
                            <span class="m-gp-tit">价格：</span>
                            <div class="m-sel-lk-box">
                                <div class="m-info f__clearfix">
                                    <ul class="m-lk-list">
                                        <li class="u-item on"><a href="javascript:;" class="u-lk">5万以下</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">5-10万</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">10-15万</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">15-20万</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">20-30万</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">30-50万</a></li>
                                        <li class="u-item"><a href="javascript:;" class="u-lk">50万以上</a></li>
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
                                    <ul class="m-lk-list">
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="车型">
                                                <el-option
                                                  v-for="item in carColorItems"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="车龄">
                                                <el-option
                                                  v-for="item in carColorItems"
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
                                                  v-for="item in carColorItems"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="排量">
                                                <el-option
                                                  v-for="item in carColorItems"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="颜色">
                                                <el-option
                                                  v-for="item in carColorItems"
                                                  :key="item.value"
                                                  :label="item.label"
                                                  :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </li>
                                        <li class="u-item">
                                            <el-select v-model="carColor" placeholder="过户次数">
                                                <el-option
                                                  v-for="item in carColorItems"
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    <li class="m-item">
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
                                    :page-size="8"
                                    layout="prev, pager, next, jumper"
                                    :total="435">
                                </el-pagination>
                            </div>
                        </div>
                    </div><!-- 列表盒子 -->

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
			<c-foot></c-foot>
		</div>
	</div>
</template>

<script>
    import cHead from "../../components/head/header.vue"
    import cFoot from "../../components/foot/footer.vue"

	export default {
        name: "buy-car-list",
        // 数据
        data() {
            return{
                currentPage: 5,
                carColorItems: [
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
                carColor: '',
            }
        },
        // 自定义函数(方法)
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        // 在当前模块注册组件
        components:{
            cHead,
            cFoot,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './car_list.styl'
</style>
