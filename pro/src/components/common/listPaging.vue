<!--
 **  @description 列表分页器
 -->

<template>
    <div class="listPaging">
        <div class="m-pagination">
            <ul class="m-page-lst f__clearfix">
                <li v-if="currentPageNo>2" >
                    <a class="u-btn home"
                        @click="goToHome()"
                        >首页
                    </a>
                </li>
                <li v-if="currentPageNo>1" >
                    <a class="u-btn prev"
                        @click="goToPrev()"
                        >上一页
                    </a>
                </li>

                <li class="pageno-wrapper" ref="pageno-wrapper">
                    <a class="u-pageno"
                        v-if="currentPageNo - 3>0"
                        @click="goToPageNo(currentPageNo - 3)"
                        >{{currentPageNo - 3}}</a>
                    <a class="u-pageno"
                        @click="goToPageNo(currentPageNo - 2)"
                        v-if="currentPageNo - 2>0">{{currentPageNo - 2}}</a>
                    <a class="u-pageno"
                        @click="goToPageNo(currentPageNo - 1)"
                        v-if="currentPageNo - 1>0">{{currentPageNo - 1}}</a>
                    <a class="u-pageno active">{{currentPageNo}}</a>
                    <a class="u-pageno"
                        @click="goToPageNo(currentPageNo + 1)"
                        v-if="currentPageNo + 1< pageTotal"
                        >{{currentPageNo + 1}}</a>
                    <a class="u-pageno"
                        @click="goToPageNo(currentPageNo + 2)"
                        v-if="currentPageNo + 2< pageTotal"
                        >{{currentPageNo + 2}}</a>
                    <a class="u-pageno"
                        @click="goToPageNo(currentPageNo + 3)"
                        v-if="currentPageNo + 3< pageTotal"
                        >{{currentPageNo + 3}}</a>
                    <div class="highlight">
                        <section class="real-block"
                            :style="{width:highlightWidth+'px',left:highlightLeft+'px'}"
                            ></section>
                    </div><!-- 高亮 -->
                </li>

                <li v-if="pageTotal - currentPageNo>1">
                    <a class="u-btn next"
                        @click="goToNext()"
                        >下一页</a>
                </li>
                <li v-if="pageTotal - currentPageNo>2">
                    <a class="u-btn end"
                        @click="goToEnd()"
                        >尾页</a>
                </li>

            </ul>
        </div><!-- 分页器 -->
    </div>
</template>

<script>

    // dom操作类
    import * as geekDom from 'assets/js/dom.js'

    export default {
        name: "listPaging",
        // 数据
        data() {
            return{
                currentPageNo: 0,
                // 高亮条的样式
                highlightLeft: 0,
                highlightWidth: 0,
                createPageNoList: [],
                // 分页号容器
                pageNoWrapper: {},
            }
        },
        props:{
            // 结果总条数
            total: {
                type: [Number,String],
                default: 0,
            },
            // 当前页
            currPageNo:{
                type: [Number,String],
                default: 1,
            },
            // 每页展示的数量
            pageSize:{
                type: [Number,String],
                default: 8,
            },
        },
        // 计算
        computed:{
            // 总页数
            pageTotal(){
                return Math.ceil(this.total/this.pageSize);
            }
        },
        // 数据侦听
        watch:{
            // 当前页号
            currentPageNo(val,oldVal){
                if(val!=oldVal){
                    this.$nextTick(()=>{
                        this.pageNoChange();
                    })
                }
            }
        },
        // 创建vue实例时
        created(){
            // 分页初始化
            this.init();
        },
        // 再次进入生命周期钩子(因为keep-alive的原因,created和mounted在页面切换过程中都是无效的)
        activated(){

        },
        // 自定义函数(方法)
        methods: {
            // 初始化
            init(){
                this.currentPageNo = this.currPageNo
            },
            // 前往首页
            goToHome(){
                this.currentPageNo = 1;
            },
            // 前往上一页
            goToPrev(){
                // 如果已经是第一条，那么就跳出
                if(this.currentPageNo==1) return;
                this.currentPageNo = this.currentPageNo - 1;
            },
            // 前往下一页
            goToNext(){
                // 如果已经是最后一条，那么就跳出
                if(this.currentPageNo==this.pageTotal) return;
                this.currentPageNo = this.currentPageNo + 1;
            },
            // 前往尾页
            goToEnd(){
                this.currentPageNo = this.pageTotal;
            },
            // 前往指定页
            goToPageNo(pageno){
                this.currentPageNo = pageno;
            },
            // pagenoTap(ev){
            //     console.dir(ev.target)
            // },
            // 分页变化
            pageNoChange(){
                this.pageNoWrapper = this.$refs["pageno-wrapper"];
                let pagenoChildrens = this.pageNoWrapper.children;
                let domIndex = 0;
                let [i,len] = [0,pagenoChildrens.length];
                for(;i<len;i++){
                    if(pagenoChildrens[i].innerText == this.currentPageNo){
                        domIndex = i
                    }
                }
                var currDom = pagenoChildrens[domIndex];
                this.highlightLeft = currDom.offsetLeft + 7;
                this.highlightWidth = currDom.offsetWidth - 14;
                // 触发选择页变化
                this.currentPageChange();
            },

            // 当前页变化触发事件
            currentPageChange(){
                this.$emit("currentPageChange",this.currentPageNo)
            }
        },
    }
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    $theHeight = 34px
    .m-pagination
        height $theHeight
        _unUserSelect()
        .m-page-lst
            text-align center
            height @height
            li
                _display(inline-block)
                a
                    height $theHeight
                    line-height @height
                    _display()
                a.u-btn
                    height @height - 2px
                    line-height @height
                    background #fff
                    _borderRadius(17px)
                    _borderAll(#ddd)
                    color #999
                    padding 0 15px
                    margin 0 4px
                    font-size 13px
                    _spacingPlus(2px)
                    &:hover
                        background #eee
                        color #27333C
                    &.prev
                        margin 0 7px 0 3px
                    &.next
                        margin 0 3px 0 7px
                &.pageno-wrapper
                    color #eee
                    _verticalTextAlign()
                    _translate3d(0,-2px)
                    position relative
                    .highlight
                        _display()
                        height 2px
                        _completeCenter(,,auto,-1px)
                        .real-block
                            width 20px
                            height @height
                            position absolute
                            left 0
                            bottom 0
                            background #27333C
                            _transitionAll(.25s,ease-in-out)
                    a.u-pageno
                        min-width 16px
                        padding 0 9px
                        font-size 16px
                        color #999
                        position relative
                        margin 0 3px
                        float left
                        _borderRadius(17px)
                        &.active
                            color #27333C
</style>
