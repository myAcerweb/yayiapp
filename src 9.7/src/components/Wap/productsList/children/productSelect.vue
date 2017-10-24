<template>
  <div class="product-select-container">
    <ul class="product-select-box">
      <li class="product-select-item" @click="clickProductItem(1)">{{ pClassifyTitle || classifyTitle }}
        <i class="iconfont" :class="selectStatus === '商品分类' ? 'icon-icon-top':'icon-down'"></i>
      </li>
      <li class="product-select-item" @click="clickProductItem(2)">{{ pBrandTitle || brandTitle}}
        <i class="iconfont" :class="selectStatus === '全部品牌' ? 'icon-icon-top':'icon-down'"></i>
      </li>
      <li class="product-select-item" @click="clickProductItem(3)">{{lastTitle}}
        <i class="iconfont" :class="selectStatus === '最新商品' ? 'icon-icon-top':'icon-down'"></i>
      </li>
      <li class="product-select-item" @click="clickProductItem(4)">{{recommendTitle}}</li>
    </ul>
    <transition name="fade">
      <div class="select-mask" v-show="selectStatus" @click="toggleMask">
        <div class="classify-container" v-if="classifyData.length" v-show="selectStatus === '商品分类'">
          <div class="list1">
            <p v-for="(item,index) in classifyData" :key="index" :class="{current:index===list1index}" class="item"
               @click="list1Click(index)">
              {{item.oneClassify}}
            </p>
          </div>
          <div class="list2" v-if="classifyData[list1index]">
            <p class="item" :class="{current:'all'===list2index}" @click="list2Click()">全部</p>
            <p v-for="(item,index) in classifyData[list1index].classifyTwoList"
               :key="index"
               :class="{current:index===list2index}" class="item"
               @click="list2Click(index)">
              {{item.classifyTwoName}} <i class="iconfont" :class="{'icon-combinedshapefuben':index===list2index}"></i>
            </p>
          </div>
          <div class="list3" v-if="classifyData[list1index].classifyTwoList[list2index]">
            <p class="item" :class="{current:'all'===list3index}" @click="list3Click()">全部</p>
            <p v-for="(item,index) in classifyData[list1index].classifyTwoList[list2index].classifyThreeList"
               :class="{current:index===list3index}" class="item"
               :key="index"
               @click="list3Click(index)">
              {{item.classifyThreeName}}
            </p>
          </div>
        </div>
        <div class="brand-container" v-show="selectStatus === '全部品牌'">
          <ul class="brand-list">
            <li class="brand-item" @click="brandClick()" :class="{current:'all'===brandIndex}">
              全部
              <i class="iconfont" :class="{'icon-duihao':'all'===brandIndex}"></i>
            </li>
            <li class="brand-item" :key="index" @click="brandClick(index)" v-for="(item,index) in brandData"
                :class="{current:index===brandIndex}">
              {{item.itemBrandName}}
              <i class="iconfont" :class="{'icon-duihao':index===brandIndex}"></i>
            </li>
          </ul>
        </div>
        <div class="last-container" v-show="selectStatus === '最新商品'">
          <ul class="last-list">
            <li class="last-item" @click="lastClick(1)" :class="{current: '最新商品'===lastTitle}">最新商品
              <i class="iconfont" :class="{'icon-duihao':'最新商品'===lastTitle}"></i>
            </li>
            <li class="last-item" @click="lastClick(2)" :class="{current: '销量降序'===lastTitle}">销量降序
              <i class="iconfont" :class="{'icon-duihao':'销量降序'===lastTitle}"></i>
            </li>
            <li class="last-item" @click="lastClick(3)" :class="{current: '价格降序'===lastTitle}">价格降序
              <i class="iconfont" :class="{'icon-duihao':'价格降序'===lastTitle}"></i>
            </li>
            <li class="last-item" @click="lastClick(4)" :class="{current: '价格升序'===lastTitle}">价格升序
              <i class="iconfont" :class="{'icon-duihao':'价格升序'===lastTitle}"></i>
            </li>
          </ul>
        </div>
        <div class="recommend-container" v-show="selectStatus === '推荐商品'"></div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {GET_ALL_CLASSIFY_AND_BRAND, QUERY_ITEM_SEARCH} from '../../../../vuex/types'

  export default {
    data() {
      return {
        classifyData: [],
        brandData: [],
        classifyTitle: '商品分类',
        brandTitle: '全部品牌',
        lastTitle: '最新商品',
        recommendTitle: '推荐商品',
        selectStatus: '',
        list1index: 0,
        list2index: '',
        list3index: '',
        list2Group: [],
        list3Group: [],
        brandIndex: 'all'
      }
    },
    props: ['pClassifyTitle', 'pBrandTitle'],
    created() {
      this._init()
    },
    watch: {
      classifyTitle(val, oldVal) {
        if (val === oldVal) return
        //临时参数列表
        let tempParams = {currentPage: 1}
        switch (true) {
          //点击二级全部按钮则搜索为一级分类
          case this.list2index === 'all' :
            tempParams.oneClassify = val
            tempParams.twoClassify = ''
            tempParams.threeClassify = ''
            break
          //点击三级全部按钮触发
          case this.list3index === 'all' :
            tempParams.twoClassify = val
            tempParams.oneClassify = ''
            tempParams.threeClassify = ''
            break
          case typeof this.list3index === 'number':
            tempParams.threeClassify = val
            tempParams.oneClassify = ''
            tempParams.twoClassify = ''
            break
          default:
            break
        }
        this.$store.dispatch(QUERY_ITEM_SEARCH, tempParams)
      },
      brandTitle(val, oldVal) {
        if (val === oldVal) return
        //临时参数列表
        let tempParams = {currentPage: 1}
        if (val === '全部品牌') val = ''
        tempParams.itemBrandName = val
        this.$store.dispatch(QUERY_ITEM_SEARCH, tempParams)
      },
      lastTitle(val, oldVal) {
        if (val === oldVal) return
        //临时参数列表
        let tempParams = {currentPage: 1}
        switch (true) {
          case val === '时间降序' || val === '最新商品':
            tempParams.rule = 1
            break
          case val === '销量降序' :
            tempParams.rule = 2
            break
          case val === '价格降序':
            tempParams.rule = 3
            break
          case val === '价格升序':
            tempParams.rule = 4
            break
          default:
            break
        }
        this.$store.dispatch(QUERY_ITEM_SEARCH, tempParams)
      },
      recommendTitle() {
        //todo 处理推荐列表接口
      }
    },
    methods: {
      _init() {
        this.getClassifyAndBrand()
      },
      getClassifyAndBrand() {
        this.$store.dispatch(GET_ALL_CLASSIFY_AND_BRAND)
          .then(res => {
            this.classifyData = res.classifyList
            this.brandData = res.itemBrandList
          })
      },
      clickProductItem(type) {
        switch (type) {
          case 1: {
            this.selectStatus = '商品分类'
            break
          }
          case 2: {
            this.selectStatus = '全部品牌'
            break
          }
          case 3: {
            this.selectStatus = '最新商品'
            break
          }
          case 4: {
            this.selectStatus = ''
            break
          }
          default: {
            this.selectStatus = ''
            break
          }
        }
      },
      list1Click(index) {
        this.list1index = index
        this.list2index = ''
        this.list3index = '0'
      },
      list2Click(index) {
        if (index === undefined) {
          this.list2index = 'all'
          this.selectStatus = ''
          this.classifyTitle = this.classifyData[this.list1index].oneClassify
        } else {
          this.list2index = index
        }
        this.list3index = ''
      },
      list3Click(index) {
        if (index === undefined) {
          this.list3index = 'all'
          this.selectStatus = ''
          this.classifyTitle = this.classifyData[this.list1index].classifyTwoList[this.list2index].classifyTwoName
        } else {
          this.list3index = index
          this.selectStatus = ''
          this.classifyTitle = this.classifyData[this.list1index].classifyTwoList[this.list2index].classifyThreeList[index].classifyThreeName
        }
      },
      toggleMask(e) {
        if (e.target.className === 'select-mask') this.selectStatus = ''
      },
      //品牌点击
      brandClick(index) {
        if (index === undefined) {
          this.brandIndex = 'all'
          this.brandTitle = '全部品牌'
        } else {
          this.brandIndex = index
          this.brandTitle = this.brandData[this.brandIndex].itemBrandName
        }
        this.selectStatus = ''
      },
      lastClick(type) {
        switch (type) {
          case 1:
            this.lastTitle = '最新商品'
            break
          case 2:
            this.lastTitle = '销量降序'
            break
          case 3:
            this.lastTitle = '价格降序'
            break
          case 4:
            this.lastTitle = '价格升序'
            break
          default:
            this.lastTitle = '最新商品'
            break
        }
        this.selectStatus = ''
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../common/sass/factory";

  .product-select-container {
    position: fixed;
    z-index: 99;
    left: 0;
    top: px2vw(100);
    width: 100%;
    background-color: #fff;
    .product-select-box {
      display: flex;
      box-sizing: border-box;
      height: px2vw(70);
      padding: px2vw(16) 0;
      font-size: px2vw(28);
      .product-select-item {
        position: relative;
        flex: 1;
        padding: 0 px2vw(24);
        text-align: center;
        height: 100%;
        border-right: 1px solid $borderColor;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .iconfont {
          position: absolute;
          right: px2vw(6);
          top: px2vw(11);
          font-size: px2vw(16);
          color: #999;
          &.icon-down {
            top: px2vw(8);
          }
        }
      }
    }

    .select-mask {
      position: fixed;
      top: px2vw(170);
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .1);
    }
    .classify-container {
      background-color: #fff;
      display: flex;
      border-bottom: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      .list1 {
        flex: none;
        width: px2vw(173);
        border-right: 1px solid $borderColor;
        .item {
          height: px2vw(85);
          text-align: center;
          line-height: px2vw(85);
          border-bottom: 1px solid $borderColor;
          &.current {
            background-color: #f6f6f6;
          }
        }
      }
      .list2 {
        flex: none;
        width: px2vw(287);
        text-align: center;
        border-right: 1px solid $borderColor;
        .item {
          position: relative;
          height: px2vw(100);
          text-align: center;
          line-height: px2vw(100);
          &.current {
            color: $themeColor;
          }
          .iconfont {
            position: absolute;
            top: px2vw(2);
            right: px2vw(20);
            font-size: px2vw(24);
          }
        }
      }
      .list3 {
        flex: none;
        width: px2vw(287);
        text-align: center;
        .item {
          height: px2vw(100);
          text-align: center;
          line-height: px2vw(100);
          &.current {
            color: $themeColor;
          }
        }
      }
    }

    .brand-container {
      background-color: #fff;
      border-bottom: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      .brand-list {
        overflow: hidden;
        .brand-item {
          position: relative;
          float: left;
          box-sizing: border-box;
          width: 33.33%;
          height: px2vw(90);
          line-height: px2vw(90);
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0 px2vw(44);
          border-bottom: 1px solid $borderColor;
          &.current {
            color: $themeColor;
          }
          .iconfont {
            position: absolute;
            top: px2vw(2);
            right: px2vw(26);
            font-size: px2vw(18);
          }
        }
      }
    }

    .last-container {
      background-color: #fff;
      border-bottom: 1px solid $borderColor;
      border-top: 1px solid $borderColor;
      .last-list {
        .last-item {
          position: relative;
          width: 100%;
          height: px2vw(90);
          line-height: px2vw(90);
          padding-left: px2vw(30);
          border-bottom: 1px solid $borderColor;
          &.current {
            color: $themeColor;
          }
          .iconfont {
            position: absolute;
            top: px2vw(2);
            right: px2vw(46);
            font-size: px2vw(18);
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-in
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

</style>
