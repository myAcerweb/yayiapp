<template>
  <div class="ProductLeft">

    <ul class="main_ul" v-for="(item,index) in leftDate">
      <li @click="downFade(item.oneClassify)">
        <span>{{item.oneClassify}}</span>
        <img :class="{'active_img':item.oneClassify === idx}" src="../../../images/ProductList/Plist.png" alt="">
      </li>
      <li :class="['hidden_li',{'active_li':item.oneClassify ===idx}]">
        <ul class="next_ul">
          <li :class="{active_next_li:idx == item.oneClassify && idx_next == '' }" @click="addColor(item.oneClassify,'')">全部</li>
          <li v-for="(detail,indexNext) in item.classifyTwoList" @click="addColor(item.oneClassify,detail.classifyTwoName)"
              :class="{active_next_li:detail.classifyTwoName === idx_next}">
            {{detail.classifyTwoName}}
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {SAVE_BRAND_AND_CLASSIFY} from '@vuex/types'

  import {SHOW_CLASSIFY} from '../../../vuex/types'

  export default {
    data() {
      return {
        //一级目录选中的数组中的位置
        idx: null,
        //二级目录选中的数组中的位置
        idx_next: -1,
        leftDate: [],
      }
    },
    created() {
      console.log('left',this.$route.params);
      var classifName=this.$route.params;
      this.idx = classifName.oneClassify;
      this.idx_next = classifName.twoClassify;
      this.$store.dispatch(SHOW_CLASSIFY, {})
        .then(res => {
          this.leftDate = res;
        })
        .catch(err => {
          console.log(err);
        })
    },
    methods: {
      //设置分类数据
      setClassify(){
        let temp = {
          oneClassify: this.idx,
          classifyTwoName: this.idx_next == '' ? null:this.idx_next
        }
        console.log(temp)
        this.$store.commit(SAVE_BRAND_AND_CLASSIFY, temp)
      },
      //点击一级目录
      downFade(index) {
        if (this.idx === index) {
          this.idx = null;
        } else {
          this.idx = index;
        }
        this.idx_next = '';
        this.setClassify();
      },
      //点击二级目录
      addColor(index, indexNext) {
        this.idx_next = indexNext;
        this.setClassify();
      }

    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .ProductLeft {
    min-height: px2vw(920);
  }

  .main_ul {
    width: 100%;
    /*min-height: px2vw(920);*/
    background: #f4f4f4;
  }

  .main_ul > li {
    width: px2vw(176);
    height: px2vw(100);
    font-size: px2vw(26);
    position: relative;
    text-align: center;
    padding-top: px2vw(30);
    /*margin-bottom: px2vw(2);*/
    background: white;
    border-bottom: px2vw(2) solid #f4f4f4;
  }

  .main_ul > li > img {
    transition: all 1s;
    transform: rotate(180deg);
    position: absolute;
    right: px2vw(8);
    top: px2vw(48);
    width: px2vw(14);
  }

  .main_ul > li > span {
    /*position: absolute;*/
    /*top: px2vw(30);*/
    /*left: px2vw(15);*/
    color: #333;
    font-size: px2vw(28);
  }

  .main_ul > li > .active_img {
    transition: all 1s;
    transform: rotate(360deg);
  }

  .main_ul .hidden_li {
    height: 0;
    overflow: hidden;
    opacity: 0;
    margin: 0;
    padding: 0;
  }

  .main_ul .active_li {
    transition: all 1s;
    height: auto;
    opacity: 1;

  }

  .next_ul {
    width: 100%;
    padding: px2vw(8) 0;
    border-bottom: px2vw(1) solid #f4f4f4;
  }

  .next_ul li {
    width: px2vw(150);
    margin: 1.86vw auto;
    height: px2vw(60);
    line-height: px2vw(60);
    font-size: px2vw(28);
    color: #999;

    overflow:hidden;text-overflow:ellipsis; -o-text-overflow:ellipsis;white-space:nowrap;
  }

  .next_ul .active_next_li {
    border-radius: px2vw(30);
    background: #3676b6;
    color: #fefefe;
  }
</style>
