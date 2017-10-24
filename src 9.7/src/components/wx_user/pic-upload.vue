<template>
  <div class="pic-upload-container">
    <span class="title" :class="{'must':isMust}">{{title}}</span>
    <el-upload
      class="pic-upload needclick"
      :action="qiNiuConfig.url"
      :show-file-list="false"
      :on-success="successUpload"
      :before-upload="beforePicUpload"
      :data="qiNiuToken"
      accept="image/*">
      <img v-if="imageUrl || picResources" :src="imageUrl || picResources" class="pic">
      <i class="el-icon-plus" v-else></i>
    </el-upload>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        imageUrl: '',
        qiNiuConfig: {
          url: 'http://upload-z2.qiniu.com/',
          ShUrl: 'http://orl5769dk.bkt.clouddn.com/'
        }
      }
    },
    props: ['title', 'isMust', 'picResources'],
    methods: {
      successUpload(res, file) {
        this.imageUrl = this.qiNiuConfig.ShUrl + file.response.key
        this.$emit('picupload', this.imageUrl)
      },
      beforePicUpload(file) {
      }
    },
    computed: {
      //获取上传token
      qiNiuToken() {
        return this.$store.state.index.qiNiuToken
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/factory";

  .pic-upload-container {
    font-size: px2vw(26);
    height: px2vw(180);
    display: flex;
    align-items: center;
    .title {
      position: relative;
      width: px2vw(300);
      flex: none;
      text-indent: px2vw(16);
    }
    .pic-upload {
      margin-left: px2vw(80);
      .pic, .el-icon-plus{
          width: px2vw(140);
          height: px2vw(140);
          line-height: px2vw(140);
        }
        .el-icon-plus{
          font-size: px2vw(60);
          color: #8c939d;
          border: 1px dashed #d9d9d9;
          text-align: center;
      }
    }
    .upload-info {
      color: #26a2ff;
      margin-left: px2vw(22);
    }
    .must {
      position: relative;
      z-index: 1993;
      &:after {
        content: '*';
        position: absolute;
        color: red;
        top: px2vw(-8);
        left: px2vw(-15);
        font-weight: 600;
      }
    }
  }
</style>
