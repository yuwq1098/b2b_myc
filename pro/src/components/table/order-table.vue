<template>
	<div id="order-table">
		<div class="m-odr-tb">
			<div class="m-tb-hd f__clearfix">
				<div class="u-tb-th tal th1">订单信息</div>
				<div class="u-tb-th tar th2">实付款</div>
				<div class="u-tb-th tac th3">交易状态</div>
				<div class="u-tb-th tar th4">交易操作</div>
			</div><!-- 表头 -->
			<div class="m-tb-bd">
				<div class="m-tb-tr">
					<div class="m-info-bar f__clearfix">
						<section class="u-info v1">
						    <span class="u-tit">订单号：</span>
						    <span class="u-txt vital">201700656430664235</span>
						</section><!-- 订单号 -->
						<section class="u-info v2">
							<span class="u-tit">成交时间：</span>
						    <span class="u-txt">2017-05-25 15:30</span>
						</section><!-- 成交时间 -->
						<section class="u-info v3">
							<span class="u-tit">卖家：</span>
							<span class="u-txt"><a href="javascript:;" class="u-lk vital">永安二手车</a></span>
							<span class="u-other">（pc端暂不支持联系卖家，请
								<a href="javascript:;" class="u-lk vital">下载木有车APP</a>进行操作）
						    </span>
						</section><!-- 卖家 -->
					</div>
					<div class="m-tr-con f__clearfix">
						<div class="m-tr-box box1">
							<div class="u-car-basic">
								<div class="u-pic">
									<img src="../../assets/img/deal_car_01.jpg" alt=""/>
								</div>
								<div class="u-info-box">
									<div class="u-tit">长城-M4 2012款 1.5L 手动豪华型</div>
									<div class="u-info">
	                                    <span class="u-txt">3.56万公里</span>
	                                    <span class="separator">|</span>
	                                    <span class="u-txt">1次</span>
	                                    <span class="separator">|</span>
	                                    <span class="u-txt">2014-01</span>
	                                    <span class="separator">|</span>
	                                    <span class="u-txt">江西南昌</span>
	                                    <span class="separator">|</span>
	                                    <span class="u-txt">非营运</span>
	                                </div><!-- 信息 -->
								</div>
							</div><!-- 车辆基本信息 -->
						</div>

						<div class="m-tr-box box2">
							
							<div class="m-price" v-show="orderType=='contract'||orderType=='success'">
								<p class="u-price">￥<em>4.00万元</em></p>
								<p class="u-tip">（购车总额）</p>
							</div><!-- 定金/待签合同 -->

							<div class="m-price" v-show="orderType=='payment'||orderType=='check'">
								<p class="u-price">￥<em>3000.00</em></p>
								<p class="u-tip">（车辆定金）</p>
							</div><!-- 定金/待支付定金 -->

						</div>

						<div class="m-tr-box box3">
							<div class="m-state" v-show="orderType=='contract'">
								<p class="u-state">待签订电子合同</p>
								<a href="javascript:;" class="u-lk">订单详情</a>
							</div><!-- 状态 -->

							<div class="m-state" v-show="orderType=='payment'">
								<p class="u-state">支付定金</p>
								<a href="javascript:;" class="u-lk">订单详情</a>
							</div><!-- 状态 -->

							<div class="m-state" v-show="orderType=='check'">
								<p class="u-state">待过户验收</p>
								<a href="javascript:;" class="u-lk">订单详情</a>
							</div><!-- 状态 -->

							<div class="m-state" v-show="orderType=='success'">
								<p class="u-state">已成功过户</p>
								<a href="javascript:;" class="u-lk">订单详情</a>
							</div><!-- 状态 -->

						</div>

						<div class="m-tr-box box4">

                            <div class="m-oper" v-show="orderType=='contract'">
							    <div class="u-line"><a href="javascript:;" class="u-btn">提醒卖家</a></div>
								<div class="u-line"><a href="javascript:;" class="u-lk">取消订单</a></div>
							</div><!-- 操作 -->

							<div class="m-oper" v-show="orderType=='payment'">
							    <div class="u-line"><a href="javascript:;" class="u-btn">立即支付</a></div>
								<div class="u-line"><a href="javascript:;" class="u-lk">取消订单</a></div>
							</div><!-- 操作 -->

							<div class="m-oper" v-show="orderType=='check'">
							    <div class="u-line"><a href="javascript:;" class="u-btn">过户完成</a></div>
								<div class="u-line"><a href="javascript:;" class="u-lk">支付尾款</a></div>
								<div class="u-line"><a href="javascript:;" class="u-lk">退款维权</a></div>
							</div><!-- 操作 -->

							<div class="m-oper" v-show="orderType=='success'">
								<div class="u-line"><a href="javascript:;" class="u-lk">退款维权</a></div>
							</div><!-- 操作 -->

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'order-table',
		data() {
            return{

            }
		},
		props:{
			orderType:{
                type: String,
                default: "all"
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './order-table.styl'
</style>