<template>
  <div class="classifyIndex">
    <Search></Search>
    <classifyDes></classifyDes>
  </div>
</template>

<script>
import Search from './search'
import classifyDes from './classifyDes'
export default {
  name: 'classifyIndex',
  data () {
    return {
    }
  },
  components: {
    Search,
    classifyDes,
  },
  created: function() {
    var that = this
    that.$emit('listenToChildEvent','classify')
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

