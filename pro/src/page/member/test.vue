<template>
  <ul id="demo">
    <p>测试</p>
    <item
      class="item"
      :model="treeData">
    </item>
  </ul>
</template>

<script>

import item from "./item.vue"
// demo data
const data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
};

// boot up the demo
export default {
  data () {
    return {
      treeData: data,
    }
  },
  // ×¢²á×é¼þ
  components: {
      item,
  },
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