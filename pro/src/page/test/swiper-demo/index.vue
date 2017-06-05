<template>
  <div class="recommend" ref="recommend">
    <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
      <swiper :recommends="recommends">
        <div slot="imgMain" v-for="item in recommends">
          <a>
            <img class="needsclick" :src="item.picUrl">
          </a>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import Swiper from 'base/i-swiper/swiper'

  export default {
    data() {
      return {
        recommends: [],
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        this.recommends = [{
          linkUrl:"",
          title:"我是第一张图",
          picUrl:require("../../../assets/img/car-details_001.jpg"),
        },{
          linkUrl:"",
          title:"我是第二张图",
          picUrl:require("../../../assets/img/car-details_002.jpg"),
        },{
          linkUrl:"",
          title:"我是第三张图",
          picUrl:require("../../../assets/img/car-details_003.jpg"),
        },{
          linkUrl:"",
          title:"我是第四张图",
          picUrl:require("../../../assets/img/car-details_004.jpg"),
        },{
          linkUrl:"",
          title:"我是第五张图",
          picUrl:require("../../../assets/img/car-details_005.jpg"),
        },]
      },
    },
    components: {
      Swiper
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable"

  // .recommend
  //   position: fixed
  //   width: 100%
  //   top: 88px
  //   bottom: 0
  //   .recommend-content
  //     height: 100%
  //     overflow: hidden
  //     .slider-wrapper
  //       position: relative
  //       width: 100%
  //       overflow: hidden
  //     .recommend-list
  //       .list-title
  //         height: 65px
  //         line-height: 65px
  //         text-align: center
  //         font-size: $font-size-medium
  //         color: $color-theme
  //       .item
  //         display: flex
  //         box-sizing: border-box
  //         align-items: center
  //         padding: 0 20px 20px 20px
  //         .icon
  //           flex: 0 0 60px
  //           width: 60px
  //           padding-right: 20px
  //         .text
  //           display: flex
  //           flex-direction: column
  //           justify-content: center
  //           flex: 1
  //           line-height: 20px
  //           overflow: hidden
  //           font-size: $font-size-medium
  //           .name
  //             margin-bottom: 10px
  //             color: $color-text
  //           .desc
  //             color: $color-text-d
  //     .loading-container
  //       position: absolute
  //       width: 100%
  //       top: 50%
  //       transform: translateY(-50%)
</style>