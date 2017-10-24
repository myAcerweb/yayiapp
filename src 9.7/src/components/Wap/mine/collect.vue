<template>
  <div>
    <div class="max_warp"></div>
    <div class="logIn_header">
      <div class="header_box" @click="back">
        <img class="header_back" @click="back" src="../../../images/logIn/back.png" alt="img">
      </div>
      <span class="logWithCode">我的收藏</span>
    </div>
    <!--收藏列表开始-->
    <div>
      <div class="collect" v-for="(item,index) in collectData">
        <mt-cell-swipe
          :right="[
    {
      content: '取消收藏',
      style: { background: '#3676B5',  padding: '0.8vw', color: '#fff', fontSize: '3.733333vw', lineHeight:'800%'},
        handler: () => deleteHandler(item, index)
    }
  ]">
        <!--左边图片-->
        <div class="collect_img">
          <img :src="item.item_pica" alt="" @click="goProductDetail(item)">
        </div>
        <!--右边收藏商品信息-->
        <div class="collect_right">
          <p class="goods_color">{{item.item_name}}</p>
          <p class="money">{{item.item_price}} ¥</p>
        </div>
      </mt-cell-swipe>
      </div>
    </div>
    <!--收藏列表结束-->

    <!--无数据显示图片-->
    <div v-show="collectData ==0" class="collect_pic">
      <img  src="../../../images/mine/collect_pic.png" alt="">
    </div>

    <!--末尾-->
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { CellSwipe } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import { tokenMethods } from '../../../vuex/util'
  export default {
    name:'collect',
    data () {
      return {
        collectData:'',
        startX: 0,       //触摸位置
        moveX: 0,       //滑动时的位置
        disX: 0,       //移动距离
      }
    },
    created: function () {
      this.inits();
    },
    methods:{
      deleteHandler(item, index) {
        var that = this;

        MessageBox.confirm('确定取消收藏么?').then(action => {
          var obj = {
            itemId: item.itemId,
            token: tokenMethods.getWapToken()
          };
          that.$store.dispatch('CANCEL_CARGO', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              Toast('取消收藏成功!')
              that.collectData.splice(index,1);
              // that.getGwcList()
            }
          })
        }).catch(err => {
        })
      },
      back(){
        this.$router.go(-1)
      },
      inits:function () {
        var obj = {
          phone: tokenMethods.getWapUser().phone,
          token: tokenMethods.getWapToken()
        }
        //获取收藏商品的信息
        this.$store.dispatch('GET_GOODS_COLLECT', obj).then((res) => {
          console.log(res);
          this.collectData = res.data;
        })
      },
      // 跳转详情
      goProductDetail(item) {
        console.log(item,'wew')
        this.$router.push({path: '/details/' + item.itemId, query: {name: item.item_name, itemId: item.itemId}})
        window.scroll(0, 0)
      },
    }
  }



</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .mint-msgbox-confirm{
    color: $themeColor !important;
  }


</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  @import "../../../../node_modules/mint-ui/src/style/var.css";

  .max_warp {
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f4f4f4;
    z-index: -1;
  }
  .logIn_header {
    width: 100vw;
    height: px2vw(88);
    line-height: px2vw(88);
    position: relative;
    padding-bottom: 10vw;
    border-bottom:  px2vw(1) solid $borderColor;
    text-align: center;
    background-color: $themeColor;
  }
  .header_box {
    width: px2vw(70);
    height: px2vw(73);
    float: left;
  }
  .header_back {
    width: px2vw(18);
    height: px2vw(29);
    margin-left: 2vw;
    margin-top: 4vw;
    float: left;
  }
  .logWithCode {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80vw;
    height: px2vw(88);
    line-height: px2vw(88);
    display: inline-block;
    text-align: center;
    font-size: px2vw(32);
    color: #fff;
  }
  .collect {
    display: flex;
    border-bottom: px2vw(20) solid #f4f4f4;
  }
  .collect_img {
    padding: px2vw(20) 0 px2vw(20) 0;
    width: px2vw(240);
    height: px2vw(240);
  }
  .collect_img img{
    width: 100%;
    height: 100%;
  }
  .header_top {
    background-color: $themeColor;
    height: px2vw(88);
    border-bottom: px2vw(1) solid $borderColor;
  }
  .header_img_box{
    width: px2vw(100);
    height: px2vw(72);
    position: absolute;
    left: px2vw(20);
    line-height:px2vw(76) ;
  }
  .collect_right {
    padding: px2vw(20) 0 px2vw(20) 0;
    position: relative;
    margin-left:px2vw(20) ;
    width: px2vw(470);
    height: px2vw(219);
  }
  .goods_color{
    margin-top: px2vw(20);
    font-size: 3.7333333vw;
  }
  .money{
    position: absolute;
    bottom: px2vw(20);
    left: 0;
    font-size: 3.7333333vw;
    color: #d81e06;
  }
  .bulue {
    margin-top: px2vw(30);
    font-size: 3.2vw;
    color: #b6b6b6;
  }
  .collect_pic{
    width: px2vw(224);
    /*height: px2vw(137);*/
    position: fixed;
    top:px2vw(512);
    left: px2vw(306);
  }
  .collect_pic>img{
    width: 100%;
  }
</style>

