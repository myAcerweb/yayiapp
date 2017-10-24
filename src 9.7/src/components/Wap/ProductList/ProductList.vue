<template>
  <div class="ProductList">
    <!--<ProductHeader></ProductHeader>-->
    <div class="product_header">
      <div @click="back">
        <img  class="pImg1" src="../../../images/ProductList/back.png" alt="">
      </div>
      <span class="header_text">{{header_text}}</span>
      <img @click="productSearch" class="pImg2" src="../../../images/ProductList/Psearch.png" alt="">
    </div>

    <div class="product_left">
      <ProductLeft></ProductLeft>
    </div>
    <div class="product_contain">
      <ProductContent></ProductContent>
    </div>
    <!--<ProductModule></ProductModule>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import ProductHeader from './ProductHeader'
  import ProductLeft from './ProductLeft'
  import ProductContent from './ProductContent'
  import ProductModule from './ProductModule'

    export default {
      data(){
        return{
          chuanClassif:'',
          header_text:''
        }
      },
      computed: {
        brandAndClassify() {
          return this.$store.state.index.brandAndClassify
        }
      },
      watch:{
        brandAndClassify(){
          this.header_text=this.brandAndClassify.oneClassify
        }
      },
      methods:{
        productSearch(){
          this.$router.push({ path: '/searchWord', query: { data: 'focus' }})
        },
        back: function() {
          this.$router.go(-1)
        },
      },
      components:{
        ProductHeader,
        ProductLeft,
        ProductContent,
        ProductModule
      },
      created(){
        this.header_text=this.$route.params.oneClassify;
        this.chuanClassif=this.$route.params;
//        console.log('productList值',this.$route.params);


      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .ProductList{
    overflow: hidden;

    /*position: relative;*/
  }

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




  .product_left{
    float: left;
    /*min-height: px2vw(920);*/
    position: fixed;
    top: px2vw(88);
    left: 0;
    background: #f4f4f4;
    min-height: px2vw(1334);
    width: px2vw(180);
  }
  .product_contain{
    float: right;
    min-height: px2vw(200);
    width: px2vw(568);
    position: absolute;
    top:px2vw(88);
    right: 0;
  }
</style>
