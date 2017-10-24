<template>
  <div class="exchangeDeatail">
    <div class="detail_list" v-for="item in getData" :key="item.userId" v-if="item.qbRget">
        <div>
          <h3>收入</h3>
          <span class="color1">{{item.qbTime}}</span>
        </div>
        <div>
          <h3 class="detail_list_alert">+{{item.qbRget}}</h3>
          <span class="color1">{{item.remark}}</span>
        </div>
    </div>
    <div class="detail_list" v-else>
      <div>
        <h3>支出</h3>
        <span class="color2">{{item.qbTime}}</span>
      </div>
      <div>
        <h3 class="color3">-{{item.qbRout}}</h3>
        <span class="color2">{{item.remark}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Util from '../../../vuex/util'
  import {tokenMethods} from '../../../vuex/util'
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return {
        getData: [],
        totalCount: '',
      }
    },
    created: function() {
      var that = this
      that.getMoneyList()
    },
    watch: {
    },
    methods: {
      // 优惠码兑换乾币
      getMoneyList:function(){
        var that = this
        var obj = {
          token: tokenMethods.getWapToken()
        }
        that.$store.dispatch('QB_DETAIL', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if(res.data.data.length > 0) {
              // console.log(res.data.data)
              // // that.currentMoney = res.data.data[0].user.qbBalance;
              // for(let i in res.data.data) {
              //   res.data.data[i].qbTime = Util.formatDate.format(new Date(res.data.data[i].qbTime),'yyyy-MM-dd hh:mm:ss' )
              // }
            }
            that.getData = res.data.data
            that.totalCount=res.data.totalNumber
            // this.childConfig.pageNum = parseInt(this.getData.length/this.everyPageShowNum)+1;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .detail_list {
    width: px2vw(712);
    height: px2vw(130);
    margin: px2vw(30) auto 0;
    border: px2vw(1) solid #dcdcdc;
    padding: px2vw(20) 0;
  }

  .detail_list > div:nth-child(1) {
    width: px2vw(210);
    height: px2vw(90);
    border-right: px2vw(1) solid #dcdcdc;
    float: left;
  }

  .detail_list > div:nth-child(1) > h3, .detail_list > div:nth-child(2) > h3 {
    text-align: center;
    font-size: px2vw(30);
    line-height: px2vw(50);
  }

  .detail_list > div:nth-child(2) > .detail_list_alert {
    color: red;
  }

  .detail_list > div:nth-child(1) > span, .detail_list > div:nth-child(2) > span {
    text-align: center;
    display: block;
    width: 100%;
    font-size: px2vw(24);
    line-height: px2vw(25);
  }

  .detail_list > div:nth-child(2) {
    float: right;
    width: px2vw(490);
    height: px2vw(90);
  }

  .color1 {
    color: #999999;
  }

  .color2 {
    color: #999999;
  }

  .color3 {
    color: $themeColor;
  }
</style>
