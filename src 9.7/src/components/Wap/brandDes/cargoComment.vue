<template>
  <div class="cargoComment">
    <div class="commentList" v-if="hasComment">
      <div v-for="comment in commentList" :key="comment.commentId">
        <div class="firstLine">
          <p class="commentUser">{{comment.userPhone}}</p>
          <el-rate class="commentRate" v-model="comment.commentGrade" disabled text-color="#ff9900" text-template="{value}"></el-rate>
          <p class="commentDate" >{{comment.created}}</p>
        </div>
        <div class="clearfix"></div>
        <p class="commentDes">{{comment.commentContent}}</p>
        <p class="commentReply" v-if="comment.replyContent">
          <span class="replyWord">商家回复：</span>
          {{comment.replyContent}}
        </p>
      </div>
    </div>
    <!--无数据显示图片-->
    <div v-else class="comment_pic">
      <img src="../../../images/mine/comment_pic.png" alt="">
    </div>
    <div class="clearfix" style="width: 100%; height: 10vw;"></div>
  </div>
</template>

<script>
export default {
  name: 'cargoComment',
  data () {
    return {
      commentStar: 5,
      commentList: [],
      hasComment: true,
    }
  },
  components: {
  },
  created: function() {
    var that = this;
    that.getNowGoodDetail();
  },
  methods: {
    // 获取商品详情
    getNowGoodDetail: function() {
      var that = this;
      var userToken = that.global.getToken();
      if(!userToken){
        userToken = "111";
      }
      var obj = {
        itemId:that.$route.params.goodId,
        token: userToken
      };
      that.$store.dispatch('GET_ITEM_DETAIL', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          that.commentList = res.data.data.commentList;
          if (that.commentList.length == 0) {
            that.hasComment = false
          }
        }
      })
    },
  }
}
</script>
<style>
.el-rate__icon {
  font-size: 2.93vw;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
.firstLine {
  margin-top: 4vw;
}
.commentList {
  width: 100vw;
}
.commentUser {
  float: left;
  font-size: 2.93vw;
  color: #999;
  margin-left: 5vw;
  margin-right: 3vw;
}
.commentRate {
  float: left;
  color: #999;
}
.commentDate {
  float: right;
  font-size: 2.93vw;
  color: #999;
  margin-right: 5vw;
}
.commentDes {
  margin-left: 5vw;
  margin-top: 4vw;
  margin-bottom: 4.5vw;
  font-size: 3.73vw;
  color: #333;
}
.commentReply {
  width: 90vw;
  padding: 3vw;
  background-color: #F3F3F3;
  margin: 0 auto;
  font-size: 3.73vw;
  color: #999;
}
.replyWord {
  color: #333;
}
  .comment_pic{
    width: px2vw(140);
    position: fixed;
    top:px2vw(512);
    left: px2vw(305);
  }
  .comment_pic>img{
    width: 100%;
  }
</style>

