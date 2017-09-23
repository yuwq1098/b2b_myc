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

        			<div class="clip-container"
        			    @mousedown="clipImgDrag(true,$event)"
        			    @mouseup="clipImgDrag(false)"
        			    >
        			    <div class="clip-mark" ref="clipMark"></div><!-- 遮罩蒙层，用以触发事件 -->
        			    <div class="imgcutter-self" ref="imgSelfBox">
        			        <img ondragstart="return false"
        			            :src="avatarPhoto"
        			            :width="selfImgStyle.w"
        			            :height="selfImgStyle.h"/>
        			    </div><!-- 本身的图片 -->
        			    <div class="imgcutter-output" ref="imgOutputBox">
    						<img :src="avatarPhoto"
        			            :width="selfImgStyle.w"
        			            :height="selfImgStyle.h"
        			            ondragstart="return false"
        			            :style="{
        			            	'left':outputImgStyle.left+'px',
        			                'top':outputImgStyle.top+'px'
        			                }"/>
        				</div><!-- 输出 -->
        			</div><!-- 剪裁容器 -->

        			<div class="slider-control">
        				<div class="reduce" @click="triggerReduce"></div><!-- 缩小 -->
        				<div class="slider-wrap" ref="handlerWrap"
        				    @mousedown="handlerPress($event)">
        					<span class="handler-block" ref="handlerBlock"
        					    @mousedown="isDrag(true,$event)"
        					    @mouseup="isDrag(false)"></span><!-- 手 -->
        				</div><!-- 滑块条 -->
        				<div class="enlarge" @click="triggerEnlarge"></div><!-- 放大 -->
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
                avatarPhoto: "",
                // 实时变化后自身图片的样式
                selfImgStyle:{
                	w: 0,
                	h: 0,
                },
                // 原图片尺寸
                originalImgStyle:{
                    w: 0,
                    h: 0,
                },
                // 输出图片的样式
                outputImgStyle:{
                	left: 0,
                	top: 0,
                },
                // 缩放限制范围
                zoomScaleRange:{
                    min: 1,
                    max: 2,
                },
                // 高宽比  高/宽>=1 高大于等于宽
	            depthWidth_ration: 0,
	            // 缩放条触手是否在拖拽中
	            isDragDrop: false,
	            // 滑块按下时鼠标的初始位置
                startLeft: 0,
                // 图片裁剪对象是否在拖拽中
                isDragToClip: false,
                // 图片裁剪对象开始拖拽时鼠标按下的位置
                clipEvPositionObj: true,
    		}
    	},
    	props: {
            clipImage: [String,File],
    	},
    	computed: {

    	},
    	created(){
    		// 初始化
            this.init();
            this.avatarPhoto = this.clipImage;

            setTimeout(()=>{
                // 禁止鼠标滚轮事件
                geekDom.preventScroll(this.$refs.avatarClip);
            })
    	},
    	methods: {
    		// 初始化
    		init(){
    			this.$nextTick(()=>{
                    this.clipMarkDom = this.$refs.clipMark;
                    this.imgSelfDom = this.$refs.imgSelfBox;
                    this.imgOutputDom = this.$refs.imgOutputBox;
                    this.selfImage = this.imgSelfDom.querySelectorAll("img")[0];
                    this.outputImage = this.imgOutputDom.querySelectorAll("img")[0];
                    this.handlerWrap = this.$refs.handlerWrap;
                    // 滑动条所在位置
                    this.handlerBlock = this.$refs.handlerBlock;
                    this.boxMinSize = {
	                	w: this.imgOutputDom.offsetWidth,
	                	h: this.imgOutputDom.offsetHeight
	                }
	                this.parentBoxSize = {
	                	w: this.imgSelfDom.offsetWidth,
	                	h: this.imgSelfDom.offsetHeight
	                }
                    nextFn();
                });

                var that = this;
                function nextFn(){
	                var img = new Image();
	                // 图片onload
					img.onload = function(){
					    if ( typeof img.naturalWidth != 'undefined') {
					        that.originalImgStyle.w = img.naturalWidth;
					        that.originalImgStyle.h = img.naturalHeight;
					    } else {
					    	// 兼容ie无缓存时图片宽高无值的BUG
					        var imgFix = new Image();
					        imgFix.src = that.avatarPhoto;
					        that.originalImgStyle.w = imgFix.width;
					        that.originalImgStyle.h = imgFix.height;
					    }
					    that.depthWidth_ration = that.originalImgStyle.h/that.originalImgStyle.w;
					    console.log(that.depthWidth_ration)
					    that.initClipImageStyle()
					}
					img.src = that.avatarPhoto;
                }

    		},
    		// 初始化剪裁图片的初始数据
    		initClipImageStyle(){
                var ratio = 0;

                if(this.depthWidth_ration<=1){
                    ratio = this.boxMinSize.h/this.originalImgStyle.h;
                    this.selfImgStyle.h = this.boxMinSize.h;
                    this.selfImgStyle.w = this.originalImgStyle.w * ratio;
                }else{
                    ratio = this.boxMinSize.w/this.originalImgStyle.w;
                    this.selfImgStyle.w = this.boxMinSize.w;
                    this.selfImgStyle.h = this.originalImgStyle.h * ratio;
                }
                this.doubleImageCenter();
    		},
    		// 两个图片都绝对居中
    	    doubleImageCenter(){
                // 实时变化后自身图片的位置
                let selfOffsetObj = {
                    left: Math.floor((this.parentBoxSize.w-this.selfImgStyle.w)/2),
                    top: Math.floor((this.parentBoxSize.h-this.selfImgStyle.h)/2),
                }
                this.selfImage.style.left = selfOffsetObj.left + "px"
                this.selfImage.style.top = selfOffsetObj.top + "px"

                // 输出图片的位置
                let outputOffsetObj = {
                    left: Math.floor((this.boxMinSize.w-this.selfImgStyle.w)/2),
                    top: Math.floor((this.boxMinSize.h-this.selfImgStyle.h)/2),
                }
                this.outputImage.style.left = outputOffsetObj.left + "px"
                this.outputImage.style.top = outputOffsetObj.top + "px"
    	    },

            // 缩放后位置重新渲染
    	    scalePostionRender(){
                
    	    },

    	    // 缩小
    	    triggerReduce(){
                if((this.selfImgStyle.h / this.boxMinSize.h <= this.zoomScaleRange.min
                	    &&this.depthWidth_ration<=1) ||
                	(this.selfImgStyle.w / this.boxMinSize.w <= this.zoomScaleRange.min
    	    		    &&this.depthWidth_ration>1))
                {
            	    return;
            	}
            	let _scaleRatio = 0;
                if(this.depthWidth_ration<=1){
                    let decrement = Math.ceil((this.zoomScaleRange.max - 1) * this.boxMinSize.h) / 10;
                    // 缩放比例
                    _scaleRatio = (this.selfImgStyle.h - decrement)/this.selfImgStyle.h;
                    // 如果到了临界值，则对其作出相应约束
                    if(this.selfImgStyle.h - decrement<=this.boxMinSize.h){
                        this.selfImgStyle.h = this.boxMinSize.h;
                    }else{
                        this.selfImgStyle.h = this.selfImgStyle.h - decrement;
                    }
                    this.selfImgStyle.w = this.selfImgStyle.h / this.depthWidth_ration;
                }else{
                	let decrement = Math.ceil((this.zoomScaleRange.max - 1) * this.boxMinSize.w) / 10;
                	// 缩放比例
                    _scaleRatio = (this.selfImgStyle.w - decrement)/this.selfImgStyle.w;
                    // 如果到了临界值，则对其作出相应约束
                    if(this.selfImgStyle.w - decrement<=this.boxMinSize.w){
                        this.selfImgStyle.w = this.boxMinSize.w;
                    }else{
                        this.selfImgStyle.w = this.selfImgStyle.w - decrement;
                    }
                    this.selfImgStyle.h = this.selfImgStyle.w * this.depthWidth_ration;
                }
                // 设置滑块left值位置
                this.setHandlerOffsetLeft();
                this.doubleImageCenter(_scaleRatio);
    	    },

    	    // 放大
    	    triggerEnlarge(){
                if((this.selfImgStyle.h / this.boxMinSize.h >= this.zoomScaleRange.max
                	    &&this.depthWidth_ration<=1) ||
                	(this.selfImgStyle.w / this.boxMinSize.w >= this.zoomScaleRange.max
    	    		    &&this.depthWidth_ration>1))
                {
            	    return;
            	}
            	let _scaleRatio = 0;
                if(this.depthWidth_ration<=1){
                    let increment = Math.ceil((this.zoomScaleRange.max - 1) * this.boxMinSize.h) / 10;
                    // 缩放比例
                    _scaleRatio = (this.selfImgStyle.h + decrement)/this.selfImgStyle.h;
                    // 如果到了临界值，则对其作出相应约束
                    if(this.selfImgStyle.h + increment>=(this.boxMinSize.h * this.zoomScaleRange.max)){
                        this.selfImgStyle.h = this.boxMinSize.h * this.zoomScaleRange.max;
                    }else{
                        this.selfImgStyle.h = this.selfImgStyle.h + increment;
                    }
                    this.selfImgStyle.w = this.selfImgStyle.h / this.depthWidth_ration;
                }else{
                	let increment = Math.ceil((this.zoomScaleRange.max - 1) * this.boxMinSize.w) / 10;
                	// 缩放比例
                    _scaleRatio = (this.selfImgStyle.w + increment)/this.selfImgStyle.w;
                    // 如果到了临界值，则对其作出相应约束
                    if(this.selfImgStyle.w + increment>=(this.boxMinSize.w * this.zoomScaleRange.max)){
                        this.selfImgStyle.w = this.boxMinSize.w * this.zoomScaleRange.max;
                    }else{
                        this.selfImgStyle.w = this.selfImgStyle.w + increment;
                    }
                    this.selfImgStyle.h = this.selfImgStyle.w * this.depthWidth_ration;
                }
                // 设置滑块left值位置
                this.setHandlerOffsetLeft();
                this.doubleImageCenter(_scaleRatio);
    	    },

    	    // 设置滑块left值位置
    	    setHandlerOffsetLeft(){
                let schedule = 0,theLeft = "";
                if(this.depthWidth_ration<=1){
                	schedule = +(((this.selfImgStyle.h - this.boxMinSize.h) / this.boxMinSize.h).toFixed(2));
                }else{
                    schedule = +(((this.selfImgStyle.w - this.boxMinSize.w) / this.boxMinSize.w).toFixed(2));
                }
                theLeft = schedule * (this.handlerWrap.offsetWidth - this.handlerBlock.offsetWidth);
                this.handlerBlock.style.left = theLeft + "px";
    	    },

            // 缩放控制条点击触发事件
    	    handlerPress(ev){
                var _event = ev || window.event;  //兼容多个浏览器的event参数模式
                // 滑块应该在的位置
                var left = _event.clientX - geekDom.getPosition(this.handlerWrap).left - this.handlerBlock.offsetWidth / 2;
                // 允许的最大宽度
                var maxAllowWidth = this.handlerWrap.offsetWidth-this.handlerBlock.offsetWidth;
                // 如果到了临界值，则对其作出相应约束
                if(left<0){
                    left = 0;
                }else if(left>maxAllowWidth){
                	left = maxAllowWidth;
                }
                // 设置滑块位置
                this.handlerBlock.style.left = left + "px";

                // 重新计算变化后的图片样式并渲染
                this.renderSelfImgStyle(left);
    	    },

            // 裁剪图片拖拽事件
    	    dragClipEvent(ev){
                var _event = ev || window.event;  //兼容多个浏览器的event参数模式
                // 鼠标移动的距离
                var floatingMoveObj = {
                	x: _event.clientX - this.clipEvPositionObj.x,
                	y: _event.clientY - this.clipEvPositionObj.y,
                }

                // 设置作为操作源的图片位置
                var selfPosition = {
                	left: this.selfStartPst.left + floatingMoveObj.x,
                	top: this.selfStartPst.top + floatingMoveObj.y,
                }
                // 边界值判断 => 操作源图
                if(selfPosition.left>25){
                    selfPosition.left = 25;
                }else if(selfPosition.left<this.imgOutputDom.offsetWidth - this.selfImage.offsetWidth + 25){
                	selfPosition.left = this.imgOutputDom.offsetWidth - this.selfImage.offsetWidth + 25
                }
                if(selfPosition.top>25){
                    selfPosition.top = 25;
                }else if(selfPosition.top<this.imgOutputDom.offsetHeight - this.selfImage.offsetHeight + 25){
                	selfPosition.top = this.imgOutputDom.offsetHeight - this.selfImage.offsetHeight + 25
                }

                // 设置作为操作源的图片位置
                this.selfImage.style.left = selfPosition.left + "px";
                this.selfImage.style.top = selfPosition.top + "px";

                // 设置输出的图片位置
                this.outputImgStyle.left = selfPosition.left -25;
                this.outputImgStyle.top = selfPosition.top -25;
    	    },

            // 裁切对象图片的拖拽事件
    	    clipImgDrag(params,ev){
                let that = this;
                this.isDragToClip = params;
                if(this.isDragToClip){
                	// 如果传入了事件对象
	                if(ev){
	                	let _event = ev || window.event;  //兼容多个浏览器的event参数模式

		            	// 滑块按下时鼠标的初始位置
                        this.clipEvPositionObj = {
                        	x: _event.clientX,
                        	y: _event.clientY,
                        };
                        // 滑块按下时操作源图的初始位置
                        this.selfStartPst = {
                        	left: this.selfImage.offsetLeft,
                        	top: this.selfImage.offsetTop,
                        };
                        // 滑块按下时输出图的初始位置
                        this.outputStartPst = {
                        	left: this.outputImage.offsetLeft,
                        	top: this.outputImage.offsetTop,
                        };

                        // 绑定鼠标移动事件
                        document.onmousemove = this.dragClipEvent;
                        document.onmouseup = function(){
                        	that.isDragToClip = false;
                        	document.onmousemove = null;
                        }
	                }
                }else{
                	that.isDragToClip = false;
                	document.onmousemove = null;
                }
    	    },

    	    // 缩放控制条内触手拖拽事件
            handlerDrag(ev){
            	var _event = ev || window.event;  //兼容多个浏览器的event参数模式
            	// 滑块移动的距离
                var floatingLeft = _event.clientX - this.startLeft;
                // 鼠标按下时记录的相对位置left
                var relativePst = this.startLeft - geekDom.getPosition(this.handlerWrap).left;
                // 设置滑块的位置
                var blockLeft = floatingLeft + relativePst;
                // 允许的最大宽度
                var maxAllowWidth = this.handlerWrap.offsetWidth-this.handlerBlock.offsetWidth;
                // 如果到了临界值，则对其作出相应约束
                if(blockLeft<0){
                    blockLeft = 0;
                }else if(blockLeft>maxAllowWidth){
                	blockLeft = maxAllowWidth;
                }
                // 设置滑块位置
                this.handlerBlock.style.left = blockLeft + "px";

                // 重新计算变化后的图片样式并渲染
                this.renderSelfImgStyle(blockLeft);
            },

            // 重新计算变化后的图片样式并渲染
            renderSelfImgStyle(offsetLeft){

                /**
                 * 不能直接 this.handlerBlock.offsetLeft来获取左值，会被transtition所影响
                 */

            	// 允许的最大宽度
                var maxAllowWidth = this.handlerWrap.offsetWidth - this.handlerBlock.offsetWidth;
                // 计算比例
                var handlerRatio = offsetLeft/maxAllowWidth;

                // 设置图片大小
                if(this.depthWidth_ration<=1){
                    this.selfImgStyle.h = this.boxMinSize.h * (handlerRatio + 1);
                    this.selfImgStyle.w = this.selfImgStyle.h / this.depthWidth_ration;
                }else{
                    this.selfImgStyle.w = this.boxMinSize.w * (handlerRatio + 1);
                    this.selfImgStyle.h = this.selfImgStyle.w * this.depthWidth_ration;
                }
                this.doubleImageCenter();

            },

            isDrag(params,ev){
            	let that = this;
                this.isDragDrop = params;
                if(this.isDragDrop){
                	this.handlerBlock.style.WebkitTransitionDuration = ".1s";
                	this.handlerBlock.style.transitionDuration = ".1s";
                	this.handlerBlock.style.WebkitTransitionTimingFunction = "cubic-bezier(0.14, 0.46, 0.46, 1.02)";
                	this.handlerBlock.style.transitionTimingFunction = "cubic-bezier(0.14, 0.46, 0.46, 1.02)";

                	// 如果传入了事件对象
	                if(ev){
	                	let _event = ev || window.event;  //兼容多个浏览器的event参数模式
		            	// 滑块按下时鼠标的初始位置
                        this.startLeft = _event.clientX;
                        // 绑定鼠标移动事件
                        document.onmousemove = this.handlerDrag;
                        document.onmouseup = function(){
                        	that.isDragDrop = false;
                        	document.onmousemove = null;
                        }
	                }
                }else{
                	that.isDragDrop = false;
                	document.onmousemove = null;
                	this.handlerBlock.style.WebkitTransitionDuration = ".15s";
                	this.handlerBlock.style.transitionDuration = ".15s";
                	this.handlerBlock.style.WebkitTransitionTimingFunction = "cubic-bezier(0.14, 0.46, 0.46, 1.02)";
                	this.handlerBlock.style.transitionTimingFunction = "cubic-bezier(0.14, 0.46, 0.46, 1.02)";
                }
            },

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
                                _transitionAll(.15s cubic-bezier(0.14, 0.46, 0.46, 1.02))
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
                            img
                                position absolute
                                _transitionAll(.15s cubic-bezier(0.14, 0.46, 0.46, 1.02))
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
                                _transformStyle()
                                _translate3d()
                                _rotateCustom(rotateX(-8deg) rotateY(-8deg))
                                _boxShadow(3px,rgba(0,0,0,.3),1px,1px)
                                _transitionCustom(left .15s cubic-bezier(0.14, 0.46, 0.46, 1.02))
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

