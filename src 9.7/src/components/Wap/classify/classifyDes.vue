<template>
  <div class="classifyDes">
    <div class="cargo">
      <div class="classfyDetail" v-if="classifyList.length>0">
        <div class="classfyDetail_left">
          <mu-raised-button :label="one.oneClassify" class="classfyDetail_left_li" :class="{oneHover:index1==defaultOne}" v-for="(one,index1) in classifyList" v-on:click="getTwo(index1,one)" :key="one.oneClassify"/>
          <!--<li :class="{oneHover:index1==defaultOne}" v-for="(one,index1) in classifyList" v-on:click="getTwo(index1,one)">{{one.oneClassify}}</li>-->
        </div>
        <div class="classfyDetail_right">
          <div class="classBackground">
            <div class="surgery_box">
              <span></span>
              <span>口腔外科</span>
              <span></span>
            </div>
            <img src="../../../images/index/classBackground.png" alt="">
          </div>
          <div class="details">
            <!--<div class="title" v-on:click="goToClassfy1()">-->
              <!--全部-->
            <!--</div>-->
            <mu-raised-button label="全部" class="title" v-on:click="goToClassfy1()"/>
          </div>
          <div class="details" v-for="(two,index2) in classifyList[defaultOne].classifyTwoList">
            <mu-raised-button :label="two.classifyTwoName" class="title" v-on:click="goToClassfy2(index2,two)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="background_gray"></div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  export default {
    name: 'classifyDes',
    data () {
      return {
        defaultOne: 0,
        goOne: null,
        goTow: null,
        goThree: null,
        classifyList: [],
      }
    },
    created: function() {
      var that = this
      Indicator.open()
      that.$store.dispatch('GET_CLASSIFY').then((res) => {
        // console.log(res,'pp')
        Indicator.close()
        that.classifyList = res
      })
    },
    methods: {
      getTwo: function(index1,one) {
        var that = this
        that.defaultOne = index1
        //console.log(that.classifyList[that.defaultOne].oneClassify,'000')
      },
      // 分类跳转列表
      goToClassfy1: function() {
        var that = this
        that.$router.push({ name: 'productList', params: { oneClassify: that.classifyList[that.defaultOne].oneClassify, twoClassify: '', threeClassify: ''}})
      },
      goToClassfy2:function(index,two){
        var that = this;
        that.$router.push({ name: 'productList', params: { oneClassify: that.classifyList[that.defaultOne].oneClassify, twoClassify: two.classifyTwoName, threeClassify: ''}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .cargo {
    width: 100vw;
  }
  .classfyDetail {
    width: 100%;

/*    box-shadow: 0 0 5px #e1e1e1;*/
  }
  .classfyDetail_left {
    margin-top: 1.4vw;
    width: 26.66vw;
    text-align: center;
    background: white;
    float: left;
    font-size: 3.5vw;
    min-height: px2vw(1150);
  }
  .classfyDetail_left_li {
    height: px2vw(96);
    width: 26.66vw;
    min-width: inherit;
    line-height:normal;
    cursor: pointer;
    box-shadow:  none;
    border-radius: 0;
    border-bottom: 1px solid $borderColor;
    display: block;
  }
  .classfyDetail_right {
    width: 73.34vw;
    font-size: 3.5vw;
    float: right;
    padding-left: 0.2vw;
  }
  .classfyDetail .oneHover {
    background: #f4f4f4;
    border-bottom: 1px solid $themeColor !important;
  }
  .classfyDetail .twoHover {
    color: #5db8e8;
  }
  .classfyDetail .threeHover {
    color: #90cbee;
  }
  .allOneClassify {
    float: left;
    width: 14vw;
    text-align: center;
    font-weight: bold;
    margin-top: 3.7vw;
    font-size: 3.5vw;
  }

  .classBackground img{
    width: 74vw;
    height: 26.8vw;
  }
  .classBackground{
    margin-left: px2vw(7);
    position: relative;
    margin-top: 1.4vw;
  }

  .background_gray {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#f4f4f4;
    z-index: -1;
  }
  .surgery_box {
    color: $themeColor;
    width: 37.5vw;
    padding: 6.2666667vw 3vw;
    background: rgba(255,255,255,0.4);
    position: absolute;
    left: 18.8vw;
    top:4.933333vw;
    font-size: 4.8vw;
  }
  .surgery_box span:nth-child(1),.surgery_box span:nth-child(3){
    display: inline-block;
    width: 3.7vw;
    border-bottom: 0.46667vw solid  $themeColor;
    vertical-align: middle;
  }
  .surgery_box span:nth-child(2){
    margin-left: 1vw;
    margin-right: 1vw;
  }
  .details{
    float: left;
  }
  .title{
    line-height: normal;
    width: 23vw;
    height: px2vw(80);
    text-align: center;
    font-size: 3.2vw;
    background-color: white;
    margin-bottom: px2vw(7);
    margin-left: px2vw(7);
    min-width: inherit;
    box-shadow:  none;
  }

</style>
