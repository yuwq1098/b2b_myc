<template>
	<div class="collect-home">
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

                    <div class="m-mn-hd f__clearfix">
                        <!-- <c-focus class="f__fl">
                            
                        </c-focus> --><!-- 轮播控件 -->

                        <div class="m-mn-info f__fr">
                            <div class="m-tit">大众-朗逸 2011款 1.6L 手动品悠版</div>
                            <div class="m-pic f__clearfix">
                                <span class="u-price">批发价<em class="vital">4.50万</em></span>
                                <span class="u-del">零售价：5.60万</span>
                                <a href="javascript:;" class="u-lk">
                                    <i class="iconfont"></i>查询维修保养记录
                                </a>
                            </div><!-- 价格 -->
                            <div class="m-des">
                                <ul class="m-des-lst f__clearfix">
                                    <li class="u-item">
                                        <p class="u-tit">3.92万公里</p>
                                        <p class="u-des">表显里程</p>
                                    </li>
                                    <li class="u-item">
                                        <p class="u-tit">1次</p>
                                        <p class="u-des">过户次数</p>
                                    </li>
                                    <li class="u-item">
                                        <p class="u-tit">欧3</p>
                                        <p class="u-des">排放标准</p>
                                    </li>
                                    <li class="u-item">
                                        <p class="u-tit">2014年01月</p>
                                        <p class="u-des">上牌时间</p>
                                    </li>
                                    <li class="u-item">
                                        <p class="u-tit">江西南昌</p>
                                        <p class="u-des">牌照归属</p>
                                    </li>
                                    <li class="u-item">
                                        <p class="u-tit">非营运</p>
                                        <p class="u-des">使用性质</p>
                                    </li>
                                </ul>
                            </div><!-- 产品描述 -->
                            <div class="m-intro"></div><!-- 说明 -->
                            <div class="m-opra f__clearfix">
                                <a href="javascript:;" class="u-btn-a v1">
                                    <i class="i"></i>电话咨询
                                </a> 
                                <a href="javascript:;" class="u-btn v2">关注车辆</a>
                                <router-link :to="{path : '/payment'}" class="u-btn v3">立即秒杀</router-link>
                            </div><!-- 操作 -->
                            <div class="m-collect">
                                <a href="javascript:;" class="u-lk">
                                    <i class="iconfont"></i>收藏
                                </a>
                                <a href="javascript:;" class="u-lk">
                                    <i class="iconfont"></i>分享给好友
                                </a>
                            </div><!-- 收藏 -->
                        </div><!-- 主要信息 -->
                    </div><!-- 主要的头部信息 -->

                    <div class="m-car-info">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">车辆信息</h3>
                        </div>
                        <div class="m-mn f__clearfix">
                            <div class="m-basic f__fl">
                                <div class="u-tit">车辆基本信息</div>
                                <div class="u-con f__clearfix">
                                    <ul class="u-list f__fl">
                                        <li class="u-item">
                                            <span class="u-attr">表显里程</span><!-- 属性 -->
                                            <span class="u-val">3.92万公里</span><!-- 值 -->
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">过户次数</span><!-- 属性 -->
                                            <span class="u-val">1次</span><!-- 值 -->
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">排放标准</span><!-- 属性 -->
                                            <span class="u-val">欧3</span><!-- 值 -->
                                        </li>
                                    </ul>
                                    <ul class="u-list f__fl">
                                        <li class="u-item">
                                            <span class="u-attr">上牌时间</span><!-- 属性 -->
                                            <span class="u-val">2014-01</span><!-- 值 -->
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">牌照归属</span><!-- 属性 -->
                                            <span class="u-val">江西南昌</span><!-- 值 -->
                                        </li>
                                        <li class="u-item">
                                            <span class="u-attr">使用性质</span><!-- 属性 -->
                                            <span class="u-val">非营运</span><!-- 值 -->
                                        </li>
                                    </ul>
                                </div>
                            </div><!-- 基本信息 -->
                            <div class="u-line-y"></div><!-- 垂直分割线 -->
                            <div class="m-merchant f__fr">
                                <div class="m-mct-box">
                                    <div class="m-mct-hd">
                                        <div class="u-icon">
                                            <img src="../../assets/img/businesses-face.png" alt="头像" />
                                        </div><!-- 服务商头像 -->
                                        <div class="u-tit">威力汽车服务
                                           <div class="u-prove">车商认证</div><!-- 认证标识 -->
                                        </div><!-- 服务商名字 -->
                                        <div class="u-tel">
                                            <span class="name">王先生</span>
                                            <span class="tel">13065656525</span>
                                        </div><!-- 电话 -->
                                        <div class="u-adss">地址：顺义汽车美食城</div><!-- 地址 -->
                                        
                                    </div><!-- 头部 -->
                                    <div class="u-mct-txt">这辆车我没用几个月，整个车都很新，跟新车没什么区别。车子基本没怎么开，公里数还不到四万公里。一直都是城市道路行驶，自家用车，正常使用，车况很好</div><!-- 文本介绍 -->   
                                </div>
                                
                            </div><!-- 车商认证信息 -->
                        </div>

                    </div><!-- 车辆信息 -->

                    <div class="m-process">
                        <div class="m-box-hd-c">
                            <h3 class="u-tit">购车流程</h3>
                        </div>
                        <div class="u-pic">
                            <img src="../../assets/img/img-flow.png" alt="购车流程图" />
                        </div>
                    </div><!-- 购车流程 -->

                    <div class="m-his-trade">
                        <div class="m-box-hd">
                            <div class="u-adorn"></div><!-- 装饰物 -->
                            <h3 class="u-tit">历史交易</h3>
                        </div>

                        <div class="m-lst-gp-a">
                            <ul class="m-lst">
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                                <li class="m-item">
                                    <div class="m-item-box f__clearfix">
                                        <div class="u-pic">
                                            <img src="../../assets/img/deal_car_01.jpg" alt="成交车辆" />
                                            <p class="u-state">已下架</p>
                                        </div>
                                        <div class="m-info">
                                            <span class="u-vital">[1天前成交]</span>
                                            <span class="u-mode">长城-M4 2012款 1.5L 手动豪华型</span>
                                            <span class="u-separator">|</span>
                                            <span class="u-time">2014年-01</span><!-- 时间 -->
                                            <span class="u-mileage">4.8万公里</span><!-- 里程 -->
                                        </div><!-- 信息 -->
                                        <div class="u-price">
                                            成交价：<em class="price">**万</em>
                                        </div><!-- 价格 -->
                                        <div class="u-code" id="js_ewm_code">
                                            <a href="javascript:;" class="u-lk">
                                                <i class="iconfont"></i>
                                            </a>
                                            <div class="u-con">
                                                <p class="u-tit v1">扫码下载APP</p>
                                                <p class="u-tit">查看成交价</p>   
                                            </div>
                                            <div class="m-hvr-box">
                                                <img src="../../assets/img/wechat-ewm.jpg" alt="二维码"/>
                                            </div><!-- 悬浮显示的二维码框 -->
                                        </div><!-- 扫码下载APP -->
                                    </div>
                                </li>
                            </ul>

                        </div><!-- 列表组a -->
                        
                    </div><!-- 历史交易 -->

                    <div class="m-remd">
                        <div class="m-box-hd">
                            <div class="u-adorn"></div><!-- 装饰物 -->
                            <h3 class="u-tit">相似推荐</h3>
                        </div>
                        <div class="m-lst-gp-b">
                            <ul class="m-lst f__clearfix">
                                <li class="m-item">
                                    <a href="javascript:;" class="u-box">
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
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;" class="u-box">
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
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;" class="u-box">
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
                                    </a>
                                </li>
                                <li class="m-item">
                                    <a href="javascript:;" class="u-box">
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
                                    </a>
                                </li>
                            </ul>
                        </div><!-- 列表组b -->
                    </div><!-- 相似推荐 -->
                    

                </section><!-- 1200px布局 -->
            </div><!-- 网页主体 -->
		</div>
	</div>
</template>

<script>
    import cHead from "../../components/head/header.vue"

	export default {
        name: "collect-home",
        // 数据
        data() {
            return{
                
            }
        },
        // 在当前模块注册组件
        components:{
            
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './car-details.styl'
</style>
