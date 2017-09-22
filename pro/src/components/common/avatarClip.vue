<!--  
 **  @description vue头像剪裁组件
 --> 

 <template>
    <div class="avatarClip" ref="avatarClip">
        <div class="mask-layer"></div><!-- 遮罩层 -->
        <div class="m-avatar-clip">
        	<div class="dialog-box">
        		<header class="dialog-hd"
        		    >选择剪裁区域</header>
        		<div class="dialog-con">

        			<div class="clip-container">
        			    <div class="clip-mark"
        			        ></div><!-- 遮罩蒙层，用以触发事件 -->
        			    <div class="imgcutter-self">
        			        <img :src="avatarPhoto"
        			            :width="selfImgStyle.w"
        			            ondragstart="return false"
        			            :height="selfImgStyle.h"/>
        			    </div><!-- 本身的图片 -->
        			    <div class="imgcutter-output">
        					<div class="imgcutter-photo">
        						<img :src="avatarPhoto"
	        			            :width="selfImgStyle.w"
	        			            :height="selfImgStyle.h"
	        			            ondragstart="return false"
	        			            :style="{
	        			            	'left':outputImgStyle.left+'px',
	        			                'top':outputImgStyle.left+'px'
	        			                }"/>
        					</div>
        				</div><!-- 输出 -->
        			</div><!-- 剪裁容器 -->

        			<div class="slider-control">
        				<div class="reduce"></div><!-- 缩小 -->
        				<div class="slider-wrap">
        					<span class="handler-block"></span><!-- 手 -->
        				</div><!-- 滑块条 -->
        				<div class="enlarge"></div><!-- 放大 -->
        			</div><!-- 滑块控制 -->

        			<div class="btn-wrap f__clearfix">
        				<button class="u-btn ok"
        				    @click="cutterOk">确认</button>
        				<button class="u-btn cancel"
        				    @click="cutterCancel">取消</button>
        			</div><!-- 按钮区域 -->
        		</div>
        	</div>
        </div><!-- 头像裁切容器 -->
    </div>
</template>

<script type="text/javascript">

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    export default {
    	name: "avatarClip",
    	// 数据
    	data(){
    		return{
    			// 图片
                avatarPhoto: require("assets/img/merchant-details_bg.jpg"),
                // 自身图片的样式
                selfImgStyle:{
                	w: 480,
                	h: 300,
                },
                // 输出图片的样式
                outputImgStyle:{
                	left: -25,
                	top: -25,
                }
    		}
    	},
    	props: {

    	},
    	computed: {

    	},
    	created(){
            setTimeout(()=>{
                // 禁止鼠标滚轮事件
                geekDom.preventScroll(this.$refs.avatarClip);
            })
    	},
    	methods: {
            // 确认
            cutterOk(){
                console.log("信息确认");
            },
            // 取消
            cutterCancel(){
                console.log("信息取消");
            },
    	},
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .avatarClip
    	width 100%
    	height 100%
    	_completeCenter(0,auto,0,auto,fixed)
    	z-index 999
    	_unUserSelect()
    	.mask-layer
    		width 100%
    		height 100%
    		background rgba(0,0,0,.6)
    		_completeCenter()
    	.m-avatar-clip
    		width 376px - 24px
    		height 524px - 24px
    		background rgba(0,0,0,.3)
    		padding 12px
    		_completeCenter()
    		.dialog-box
    			width @width
    			height @height
    			background #fff
    			.dialog-hd
    				height 46px
    				line-height @height
    				background $c_blue
    				padding 0 15px
    				font-size 20px
    				_spacingPlus()
    				color #fff
    			.dialog-con
    				width @width - 32px
    				height @height - 46px - 42px
    				margin 21px 16px
    				position relative
    				.clip-container
    					width 280px
    					height @width
    					background #ddd
    					margin 0 auto
    					position relative
    					cursor move
    					*
    						cursor move
    					.imgcutter-self
    						width @width
    						height @width
    						_completeCenter(0,auto,0,auto)
    						_opacity(.25)
    						z-index 1
    						_overflow()
    						img
    							position absolute
    					.clip-mark
    						width @width - 50px
    						height @width
    						_completeCenter()
    						z-index 3
    						_boxShadow(25px,rgba(0,0,0,.45),,,true)
    					.imgcutter-output
    						width @width - 50px
    						height @width
    						_overflow()
    						_completeCenter()
    						z-index 2
    						.imgcutter-photo
    							width @width
    							height @width
    							_display()
    							img
    							    position absolute
    				.slider-control
    					width @width
    					height 30px
    					line-height 30px
    					margin-top 25px
    					position relative
    					.reduce,.enlarge
    						width 30px
    						height @width
    						background #ddd
    						cursor pointer
    					.reduce
    						_completeCenter(10px,auto,0,auto)
    						background url('../../assets/img/u-clip-reduce.png') center center no-repeat
    						background-size 23px
    					.enlarge
    						_completeCenter(auto,10px,0,auto)
    						background url('../../assets/img/u-clip-enlarge.png') center center no-repeat
    						background-size 23px
    					.slider-wrap
    						height 6px
    						width 216px
    						background #eee
    						_completeCenter()
    						_borderRadius(3px)
    						cursor pointer
    						.handler-block
    							_display()
    							width 16px
    							height @width
    							_borderRadius()
    							background $c_blue
    							_completeCenter(0,auto)
    							cursor pointer
    				// 按钮区域
    				.btn-wrap
    					width @width
    					height 38px
    					_completeCenter(0,auto,auto,0)
    					.u-btn
    						float right
    						border none
    						padding 0 16px
    						font-size 18px
    						_spacingPlus(2px)
    						color #fff
    						height @height
    						line-height @height
    						margin-left 4px
    						&.ok
    							background $c_blue
    							color #fff
    							&:hover
    								background @background - 12%
    							&:active
    								background @background + 2%
    						&.cancel
    							background transparent
    							color #222
</style>