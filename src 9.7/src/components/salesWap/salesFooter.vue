<template>
  <div class="salesFooter">
    <mu-paper class="big_box">
      <mu-bottom-nav :value="bottomVal" @change="handleChange">
        <mu-bottom-nav-item value="achievement" title="业绩" icon="sort"/>
        <mu-bottom-nav-item value="range" title="排行榜" icon="sort"/>
        <mu-bottom-nav-item value="customer" title="客户" icon="shopping_cart"/>
        <mu-bottom-nav-item value="personal" title="个人中心" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data(){
        return{
          bottomVal:''
        }
      },
      props:['bottomNav'],
      created(){
        this.bottomVal=this.bottomNav;
      },
      methods:{
        handleChange(val){
          console.log(val);
          this.bottomVal=val;
          if(val==='achievement'){
            this.$router.push({path: '/salesIndex'});
          }else if(val==='range'){
            this.$router.push({path: '/salesRange'});
          }else if(val==='customer'){
            this.$router.push({path: '/salesCustomer'});
          }else if(val==='personal'){
            this.$router.push({path: '/salePersonal'});
          }

        }
      }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../../common/sass/factory";
  .salesFooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
