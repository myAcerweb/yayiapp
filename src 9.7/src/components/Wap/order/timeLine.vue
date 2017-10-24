<template>
  <div class="timeline-container">
    <div class="pipe-circle">
      <span class="circle"></span>
      <span class="pipe"></span>
    </div>
    <div class="text-content">
      <p class="dec">
        <slot name="dec"></slot>
      </p>
      <p class="time">
        <slot name="time"></slot>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";

  .timeline-container {
    position: relative;
    border-bottom: 1px solid $borderColor;
    margin-left: px2vw(66);
    margin-right: px2vw(24);
    &:first-child {
      .pipe-circle {
        .circle {
          background-color: #005aab;
          z-index: 10;
          /*&:before {
            content: '';
            position: absolute;
            left: px2vw(-6);
            width: px2vw(30);
            height: px2vw(30);
            background-color: #ccdeee;
            border-radius: 50%;
            z-index: -1;
          }*/
        }
        .pipe {
          top: px2vw(0);
        }
      }
      .text-content {
        .time, .dec {
          color: #005aab;
        }
      }
    }
    &:last-child {
      .pipe-circle {
        .pipe {
          /*todo*/
        }
      }
    }
    @at-root .pipe-circle {
      position: absolute;
      left: px2vw(-28);
      top: px2vw(38);
      bottom: 0;
      .circle {
        position: absolute;
        top: 0;
        left: px2vw(-6);
        width: px2vw(16);
        height: px2vw(16);
        border-radius: 50%;
        background-color: $borderColor;
      }

      .pipe {
        position: absolute;
        top: px2vw(-42);
        bottom: 0;
        border-right: 1px solid $borderColor;
      }
    }
    @at-root .text-content {
      .time {
        padding-top: px2vw(30);
        padding-bottom: px2vw(30);
        font-size: px2vw(24);
        color: #dcdcdc;
      }

      .dec {
        padding-top: px2vw(30);
        font-size: px2vw(28);
        color: #999999;
      }

    }
  }
</style>
