<template>
	<li>
	    <div
	      :class="{bold: isFolder}"
	      @click="toggle"
	      @dblclick="changeType">
	      {{model.name}}
	      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
	    </div>
	    <ul v-show="open" v-if="isFolder">
	      <li
	        class="item"
	        v-for="model in model.children"
	        :model="model">
	      </li>
	      <li class="add" @click="addChild">+</li>
	    </ul>
	  </li>
</template>

<script>
// boot up the demo
export default {
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  mounted(){
      console.log(this.model)
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scope>

body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}

</style>