<template>
    <div class="m-focus-pic" id="carousel">
        <div class="m-sld-wrap" ref="ban">
            <div class="m-sld">
                <div class="prev1" id="prev1"></div>
		        <div class="next1" id="next1"></div>
                <ul class="m-sld-lst">
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_001.jpg" alt="轮播图一" />
                    </li>
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_002.jpg" alt="轮播图二" />
                    </li>
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_003.jpg" alt="轮播图三" />
                    </li>
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_004.jpg" alt="轮播图四" />
                    </li>
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_005.jpg" alt="轮播图五" />
                    </li>
                    <li slot="sld-item" class="u-sld-item">
                        <img src="../../assets/img/car-details_006.jpg" alt="轮播图六" />
                    </li>
                </ul>
            </div><!-- 主轮播 -->
            <div class="m-info-bar">
                <p class="u-info">卖家：威力服务汽车行</p>
                <section class="u-pages">
                    <i class="i-img-thumb"></i><!-- 缩略图小icon -->
                    <span class="u-page">1/9</span>
                </section>
            </div>
        </div><!-- 主轮播容器 -->

        <div class="m-sld-cd-wrap"  ref="thumbs">
            <a href="javascript:;" class="u-prev-cd-btn"></a>
            <div class="m-sld-cd">
                <ul class="m-sld-cd-lst">
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_001.jpg" alt="轮播图一" />
                    </li>
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_002.jpg" alt="轮播图二" />
                    </li>
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_003.jpg" alt="轮播图三" />
                    </li>
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_004.jpg" alt="轮播图四" />
                    </li>
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_005.jpg" alt="轮播图五" />
                    </li>
                    <li slot="sld-cd-item" class="u-sld-cd-item">
                        <img src="../../assets/img/car-details_006.jpg" alt="轮播图六" />
                    </li>
                </ul>
            </div><!-- 小轮播（焦点） -->
            <a href="javascript:;" class="u-prev-cd-btn"></a>
        </div><!-- 次轮播容器 -->
    </div><!-- 轮播控件 -->
</template>


<script type="text/javascript">    
    import $ from 'jquery'
	export default {
		// 数据
		data() {
			return{
              
			}
		},
		props: {
            
		},
		mounted(){
			let ban = this.$refs.ban;
			console.log(ban)
            console.log($("#carousel").height())
		},
		methods:{
            
		}

	}
</script>

<!-- 限定作用域 -->
<style lang="stylus" rel="stylesheet/stylus" scope>
	@import './focusThumb.styl'
</style>