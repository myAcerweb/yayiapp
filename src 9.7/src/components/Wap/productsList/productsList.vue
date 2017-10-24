<template>
  <div class="productsList-container">
    <div class="topBar">搜索框&导航栏</div>
    <product-select :pBrandTitle="brandTitle" :pClassifyTitle="classifyTitle"></product-select>
    <product-content></product-content>
  </div>
</template>

<script>
  import productContent from './children/productContent.vue'
  import productSelect from './children/productSelect.vue'
  import {QUERY_ITEM_SEARCH} from '../../../vuex/types'

  export default {
    data() {
      return {
        classifyTitle: '',
        brandTitle: ''
      }
    },
    components: {
      productContent,
      productSelect
    },
    created() {
      let params = Object.assign({currentPage: 1}, this.$route.params)
      this.$store.dispatch(QUERY_ITEM_SEARCH, params)
      this.classifyTitle = params.threeClassify || params.twoClassify || params.oneClassify
      this.brandTitle = params.itemBrandName
      console.log(this.classifyTitle, this.brandTitle)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .productsList-container {
    color: rgb(51, 51, 51);
    .topBar {
      position: fixed;
      z-index: 99;
      top: 0;
      left: 0;
      width: 100%;
      height: px2vw(100);
      background-color: $themeColor;
      text-align: center;
    }
  }
</style>
