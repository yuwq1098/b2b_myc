<template lang="pug">
  #app
    img(src="./assets/logo.png")
    h1 {{msg}}
    el-button(@click.native="startHacking") Let's do it111
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
    //-路由过渡
    .G-fade-enter
        transform translate3d(100%, 0, 0)
        opacity 1
    
    .G-fade-enter-active
        transition all .4s cubic-bezier(0.27, 0.68, 0.51, 0.92)
    .G-fade-leave-active 
        transition all .4s cubic-bezier(0.27, 0.68, 0.51, 0.92)
    
    .G-fade-leave,.G-fade-enter-to,.G-fade-leave-to 
        transform translate3d(0%, 0, 0)

    .G-fade-enter-to
        opacity 1

    .G-fade-leave-to 
      opacity 0

</style>