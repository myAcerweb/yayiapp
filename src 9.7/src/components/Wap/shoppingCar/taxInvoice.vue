<template>
    <div class="warp">
      <div class="detail">
        <span class="detail_content">发票内容</span>
        <span class="detail_detail">发票明细</span>
      </div>
      <div class="unit_name_box">
        <span class="unit_name">单位名称</span>
        <input v-model="companyName" class="unit_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name unit_name_names">纳税人识别号</span>
        <input v-model="taxpayerNum" class="unit_input unit_input_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name">注册地址</span>
        <input v-model="registeredAddress" class="unit_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name">注册电话</span>
        <input v-model="registeredPhone" class="unit_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name">开户银行</span>
        <input v-model="opneBank" class="unit_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name">银行账号</span>
        <input v-model="bankNumber" class="unit_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name unit_name2">收票人姓名</span>
        <input v-model="stickNanme" class="unit_input unit_input2" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name unit_name_names">收票人手机号</span>
        <input v-model="stickPhone" class="unit_input unit_input_input" type="text">
      </div>
      <div class="unit_name_box">
        <span class="unit_name unit_name2">收票人地址</span>
        <input v-model="stickaddress" class="unit_input unit_input2" type="text">
      </div>
      <div class="button_box">
        <mu-raised-button @click="saveInvoice" label="保存" class="save_button"/>
        <mu-raised-button label="不开发票" class="no_save" @click="no_saves" />
      </div>
      <!--末尾-->
    </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    data(){
      return{
        invoiceHand : 1,
        invoiceStyle : 2,
        InvoiceState : 1, //增值税 需要重置为空
        companyName : '',
        taxpayerNum : '',
        registeredAddress : '',
        registeredPhone : '',
        opneBank : '',
        bankNumber : '',
        stickNanme : '',
        stickPhone : '',
        stickaddress : ''
      }
    },
    methods:{
      no_saves(){
        let obj = {
          value : 4
        };
        this.$store.dispatch('COMPANY_INVOICE' , obj);
        this.$router.push({path:'/suborder'})
      },
      //保存增值税发票信息
      saveInvoice(){
        let obj = {
          invoiceHand : this.invoiceHand,
          invoiceStyle : this.invoiceStyle,
          InvoiceState : this.InvoiceState, //增值税
          companyName : this.companyName,
          taxpayerNum : this.taxpayerNum,
          registeredAddress : this.registeredAddress,
          registeredPhone : this.registeredPhone,
          opneBank : this.opneBank,
          bankNumber : this.bankNumber,
          stickNanme : this.stickNanme,
          stickPhone : this.stickPhone,
          stickaddress : this.stickaddress,
          value : 3  //判断是哪类发票 1为普通公司发票 2为普通个人发票 3为增值税票
        };
        for(let item in obj)
        {
          if(this.hasSpace(obj[item]))
          {
            Toast({message: '发票信息不能为空', duration: 3000})
            return;
          }
        }
        obj['InvoiceState'] = '';
        this.$store.dispatch('COMPANY_INVOICE' , obj);
        Toast({message: '保存发票信息成功', duration: 3000})
        this.toSuborder();
      },
      //判断有无空格 以及空字符串
      hasSpace(obj){
        if ( obj == "" ){
          return true;
        }
        let regu = "^[ ]+$";
        let re = new RegExp(regu);
        return re.test(obj);
      },
      toSuborder(){
        this.$router.push({path:'/suborder'})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../common/sass/factory";
  .warp {
    padding-top: px2vw(43);
  }
  .detail {
    font-size: px2vw(28);
  }

  .detail_detail{
    margin-left:px2vw(48);
  }
  .detail_content {
    margin-left:px2vw(40);
  }

  .unit_name_box {
    font-size: px2vw(28);
    padding-top: px2vw(41);
  }

  .unit_name {
    margin-left: px2vw(40);
  }
  .unit_input {
    margin-left: px2vw(50);
    font-size: px2vw(28);
    border: 1px solid $borderColor;
    outline: none;
    width: px2vw(500);
    height: px2vw(90);
    padding-left: px2vw(20);
  }
  .unit_input_input.unit_input{
    margin-left: px2vw(15);
  }
  .unit_name.unit_name_names{
    margin-left: px2vw(19);
  }
  .unit_name2.unit_name{
    margin-left: px2vw(30);
  }
  .unit_input2.unit_input{
    margin-left: px2vw(32);
  }
  .button_box{
    margin-top: px2vw(100);
    margin-bottom: px2vw(30);
  }
  .save_button{
    min-width: 0;
    width: px2vw(250);
    height: px2vw(88);
    margin-left: px2vw(104);
    background-color: $themeColor;
    color: white;
    font-size: px2vw(28);
  }
  .no_save{
    min-width: 0;
    width: px2vw(250);
    font-size: px2vw(28);
    height: px2vw(88);
    margin-left: px2vw(48);
    background-color: #e5e5e5;
  }
</style>

