<template>
  <div class="ProductHeader">
    <div class="product_header">
      <div @click="back">
        <img  class="pImg1" src="../../../images/ProductList/back.png" alt="">
      </div>
      <span class="header_text">打磨抛光</span>
      <img @click="productSearch" class="pImg2" src="../../../images/ProductList/Psearch.png" alt="">
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      methods:{
        productSearch(){
          this.$router.push({ path: '/searchWord', query: { data: 'focus' }})
        },
        back: function() {
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .product_header{
    width: 100%;
    height:px2vw(88);
    background: #3676b6;
    color: #fff;
    font-size: 4.2222267vw;
    /*padding-top: px2vw(60);*/
    position: fixed;
    top:0;
    left: 0;
    z-index: 100;
  }
  .product_header>div:nth-child(1){
    position: absolute;
    top:px2vw(22);
    left: px2vw(20);
    width: px2vw(50);
  }
  .header_text{
    display: block;
    width: 100%;
    height:100%;
    text-align: center;
    line-height: px2vw(88);
  }
  .pImg1{

    /*width: 4.2vw;*/
    height: 4.2vw;
    /*position: absolute;*/
    /*top:px2vw(14);*/
    /*left: px2vw(20);*/
  }
  .pImg2{
    position: absolute;
    top:px2vw(24);
    right: px2vw(20);
    width: 4.2vw;

  }

</style>
