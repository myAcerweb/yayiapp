<template>
  <div class="salesHeader">
    <span>
      {{headerText}}
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['headerText']
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/factory";

  .salesHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: px2vw(88);
    line-height: px2vw(88);
    background: #3676b6;
  }

  .salesHeader > span {
    display: block;
    width: 100%;
    height: 100%;
    color: white;
    font-size: px2vw(32);
    text-align: center;
  }
</style>
