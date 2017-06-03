<template>
	<div class="sellCar">
	    <div class="g-doc">
			<c-head></c-head>
            <div class="g-bd">
                <section class="f__w1200">
                    <div class="m-crm">
                        <span>当前位置：</span>
                        <el-breadcrumb separator=">">
                            <el-breadcrumb-item :to="{ path: '/' }">北京二手车</el-breadcrumb-item>
                            <el-breadcrumb-item>大众朗逸2011款1.6L手动品悠版</el-breadcrumb-item>
                            <el-breadcrumb-item>创建订单</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div><!-- 面包屑 -->

                    <div class="m-sell-mn">
                        <div class="m-sell-hd">
                            <h4 class="m-tit">请您认真填写车辆基本信息，信息越完善成交率越高哦！</h4>
                        </div><!-- 头部 -->
                        <div class="m-sell-tb">
                            <div class="m-tb-wrap">
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">选择品牌车型</span>
                                    <section class="u-gp-con">
                                        <el-cascader
                                            expand-trigger="hover"
                                            :options="options"
                                            v-model="selectedOptions"
                                            placeholder="品牌/车系/车型"
                                            @change="handleChange">
                                        </el-cascader>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">车辆所在地</span>
                                    <section class="u-gp-con">
                                        <el-cascader
                                            expand-trigger="hover"
                                            :options="cityMaps"
                                            v-model="selectedOptions1"
                                            placeholder="省份/城市/地区"
                                            @change="handleChange">
                                        </el-cascader>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">车辆归属地</span>
                                    <section class="u-gp-con">
                                        <el-cascader
                                            expand-trigger="hover"
                                            :options="cityMaps"
                                            v-model="selectedOptions2"
                                            placeholder="省份/城市/地区"
                                            @change="handleChange">
                                        </el-cascader>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">车辆颜色</span>
                                    <section class="u-gp-con">
                                        <el-select v-model="carColor" placeholder="请选择">
                                            <el-option
                                              v-for="item in carColorItems"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">使用性质</span>
                                    <section class="u-gp-con">
                                        <el-select v-model="carColor" placeholder="请选择">
                                            <el-option
                                              v-for="item in carColorItems"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">表显里程</span>
                                    <section class="u-gp-con">
                                        <input type="text" class="u-ipt-text" placeholder="请填写表显里程" /><span class="u-unit">万公里</span>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">排放标准</span>
                                    <section class="u-gp-con">
                                        <el-select v-model="carColor" placeholder="请选择">
                                            <el-option
                                              v-for="item in carColorItems"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">过户次数</span>
                                    <section class="u-gp-con">
                                        <el-select v-model="carColor" placeholder="请选择">
                                            <el-option
                                              v-for="item in carColorItems"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">初次上牌</span>
                                    <section class="u-gp-con">
                                        <el-date-picker
                                            v-model="firstDate"
                                            type="date"
                                            placeholder="请选择初次上牌的日期"
                                            :picker-options="pickerOptions" class="u-ipt-date">
                                        </el-date-picker>
                                        <span class="u-connect">-</span>
                                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="firstTime" class="u-ipt-time"></el-time-picker>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr vital">批发价</span>
                                    <section class="u-gp-con">
                                        <input type="text" class="u-ipt-text" placeholder="请填写你能接受的车辆价格" /><span class="u-unit">万元</span>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix v2">
                                    <span class="u-gp-attr vital">车辆照片</span>
                                    <section class="u-gp-con">
                                        <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :file-list="fileList2"
                                            list-type="picture" multiple>
                                            <el-button size="small" type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </section>
                                </div>

                                <div class="m-line-gp f__clearfix v3">
                                    <span class="u-gp-attr">车辆描述</span>
                                    <section class="u-gp-con">
                                        <el-input type="textarea" v-model="carDesc"  placeholder="请描述一下您的车辆"></el-input>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr">车辆配置</span>
                                    <section class="u-gp-con">
                                        <el-select v-model="carColor" placeholder="请选择">
                                            <el-option
                                              v-for="item in carColorItems"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr">年检到期</span>
                                    <section class="u-gp-con">
                                        <el-date-picker
                                            v-model="firstDate"
                                            type="date"
                                            placeholder="请选择年检到期的日期"
                                            :picker-options="pickerOptions" class="u-ipt-date">
                                        </el-date-picker>
                                    </section>
                                </div>
                                <div class="m-line-gp f__clearfix">
                                    <span class="u-gp-attr">强险到期</span>
                                    <section class="u-gp-con">
                                        <el-date-picker
                                            v-model="firstDate"
                                            type="date"
                                            placeholder="请选择强险到期的日期"
                                            :picker-options="pickerOptions" class="u-ipt-date">
                                        </el-date-picker>
                                    </section>
                                </div>
                            </div>
                        </div><!-- 出售车辆信息表 -->
                    </div><!-- 售车内容主体 -->

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
        name: "sellCar",
        // 数据
        data() {
            return{
                fileList2: [{
                    name: 'food.jpeg', 
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                          value: 'yizhi',
                          label: '一致'
                        }, {
                          value: 'fankui',
                          label: '反馈'
                        }, {
                          value: 'kekong',
                          label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        }, {
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                cityMaps: [{
                    value: 'jiangxi',
                    label: '江西',
                    children: [{
                        value: 'nanchang',
                        label: '南昌',
                        children: [{
                          value: 'wanda',
                          label: '万达中心'
                        }, {
                          value: 'gaoxin',
                          label: '高新开发区'
                        }, {
                          value: 'jiulonghu',
                          label: '九龙湖'
                        }]
                    }, {
                        value: 'jingdezhen',
                        label: '景德镇',
                        children: [{
                          value: 'diquyi',
                          label: '地区一'
                        }, {
                          value: 'diquer',
                          label: '地区二'
                        }]
                    }]
                }, {
                    value: 'ningbo',
                    label: '宁波',
                    children: [{
                        value: 'jiangbei',
                        label: '江北'
                    }, {
                        value: 'xiangshanqu',
                        label: '象山区'
                    }]
                }],
                selectedOptions: [],
                selectedOptions1: [],
                selectedOptions2: [],
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
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 3600 * 1000 * 24 * 365 * 20;
                    }
                },
                firstTime: '',
                firstDate: '',
                carDesc: '',
            }
        },
        // 自定义函数(方法)
        methods: {
            handleChange(value) {
                console.log(value);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
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
    @import './sellCar.styl'
</style>
