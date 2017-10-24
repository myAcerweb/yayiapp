<template>
  <div class="ckeckedDate">
    <mu-dropDown-menu :value="value" @change="handleChange">
      <mu-menu-item value="2017_08" title="2017年8月"/>
      <mu-menu-item value="2017_07" title="2017年7月"/>
      <mu-menu-item value="2017_06" title="2017年6月"/>
      <mu-menu-item value="2017_05" title="2017年5月"/>
      <mu-menu-item value="2017_04" title="2017年4月"/>
      <mu-menu-item value="2017_03" title="2017年3月"/>
      <mu-menu-item value="2017_02" title="2017年2月"/>
      <mu-menu-item value="2017_01" title="2017年1月"/>
    </mu-dropDown-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {SAVE_CK_CHECKED_DATE} from '@vuex/types'
  export default {
    data() {
      return {
        value: '2017_08'

      }
    },
    methods: {
      handleChange(value) {
        this.value = value;
        console.log(value);
        var temp={
          year:value.split('_')[0],
          month:value.split('_')[1]
        };
        this.$store.commit(SAVE_CK_CHECKED_DATE,temp);


      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .ckeckedDate {
    .mu-dropDown-menu {
      font-size: px2vw(26);
      font-weight: bold;
    }
    .mu-dropDown-menu-icon {
      /*width: px2vw(24);*/
      /*height: px2vw(24);*/
      right: 26px;
    }
    .mu-dropDown-menu-text {
      padding-left: px2vw(5);
    }
    .mu-dropDown-menu-line {
      display: none;
    }
    .mu-menu-destop .mu-menu-item {

    }
    .mu-menu-destop .mu-menu-item-wrapper {
      font-size: px2vw(16);
    }
  }

  .mu-popover .mu-menu-destop .mu-menu-item {
    padding: 0;
  }

  .mu-popover .mu-menu-item-title {
    width: 100%;
    text-align: center;
  }
</style>
