<template>
    <!-- select选择框 -->
    <div class="gkSelect">
    	<div class="m-select">
    	    <ul class="u-select-lst" :class="{'isOverflow':selectList.length>10}">
                <li class="u-item" v-for="item in selectList">
                    <router-link :to="{path:'/carDetails',query: { CarId: item.id }}" tag="div">{{item.name}}</router-link>
                    }
                </li>
    	    </ul>
    	</div>
    </div>
</template>

<script>
	export default {
        name: "gkSelect",
        data(){
            return{

            }
        },
        // 数据
        props:{
            selectList: Array,
        },
	}
</script>

<!-- 限定作用域"scoped" 不要误写成scope -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~assets/css/mixin.styl'
    .m-select
        width 100%
        .u-select-lst
            &.isOverflow
	            max-height 400px
	            overflow-y scroll
            .u-item
                line-height 40px
                height 40px
                padding 0 20px !important
                cursor pointer
                color #545454
                &:hover
                    background #f0f0f0
                    color $c_blue

</style>