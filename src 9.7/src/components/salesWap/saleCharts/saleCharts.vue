<template>
	<div class="saleCharts">
		<div class="logIn_header clearfix">
      <span class="logWithCode">销售排行榜</span>
    </div>
		<div class="banner">
			<img :src="ranking_img" alt="销售排行榜">
		</div>
		<div class="charts_info">
			<div class="charts_title clearfix">
				<div class="date_select fl">
					<span v-text="sale_date" @click="openPicker('picker')"></span>
				</div>
				<div class="sale_cor fr">
					<span>创客收益标准?</span>
				</div>
			</div>
			<div class="rank_info">
				<div>
					<span>共{{sale_total_num}}名销售员，</span>
					<i>您当前排名：第{{ranking_info.rowNum}}名</i>
				</div>
				<ul class="rank_data clearfix">
					<li class="border_split">
						<div class="rank_val">{{ranking_info.bindUserNum}}</div>
						<div>客户数(人)</div>
					</li>
					<li>
						<div class="rank_val">{{ranking_info.orderCount}}</div>
						<div>订单数(单)</div>
					</li>
					<li class="border_split">
						<div class="rank_val">{{ranking_info.saleMoney}}</div>
						<div>实际销售额(元)</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="sale_table">
			<div class="table_wrap">
				<div class="table_title">
					<h4>{{year}}年{{month}}月销售排行榜</h4>
					<span class="chart_s" v-show="!btn_show" @click="tabChartHandler">图表</span>
					<span class="table_s" v-show="btn_show" @click="tabTableHandler">表格</span>
				</div>
				<table v-show="!btn_show">
					<tr class="th">
						<td>排名</td>
						<td>销售员</td>
						<td>客户数</td>
						<td>订单数</td>
						<td>实际销售额</td>
					</tr>
					<tr v-if="!tableData.length">
						<td colspan="5">暂无数据</td>
					</tr>
					<tr v-else v-for="(item, index) in tableData">
						<td>{{item.rowNum}}</td>
						<td>{{phoneFormate(item.phone)}}</td>
						<td>{{item.bindUserNum}}</td>
						<td>{{item.orderCount}}</td>
						<td>{{item.saleMoney}}</td>
					</tr>
				</table>
				<div class="chart_wrap" v-show="btn_show && tableData.length">
					<div id="saleChart" :style="{width: '300px', height: '200px', margin: 'auto', top: '-20px'}">
					</div>
					<span class="text_info">实际销售额(元)</span>
				</div>
			</div>
		</div>
		<salesFooter bottomNav="achievement"></salesFooter>
		<mt-datetime-picker
		  v-model="pickerValue"
		  ref="picker"
		  type="date"
		  :startDate="new Date(new Date().getFullYear(), 1, 1)"
      :endDate="new Date(new Date().getFullYear()+10, 1, 1)"
		  year-format="{value} 年"
		  month-format="{value} 月"
		  @confirm="handleConfirm">
		</mt-datetime-picker>
	</div>
</template>

<script>
  import salesFooter from '../salesFooter.vue'
  import { DatetimePicker } from 'mint-ui';
  import { tokenMethods } from '../../../vuex/util'
  import { SALE_CHARTS_BANNER, SALE_RANKING_DATA, SALE_RANKING_LIST} from '@vuex/types'
  let echarts = require('../../../../node_modules/echarts/lib/echarts')
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
	export default{
		data(){
			return {
				ranking_img: '',
				pickerValue: '',
				sale_date: '',
				btn_show: false,
				tableData: [],
				sale_total_num: 0,
				ranking_info: {
					rowNum: 1,
					orderCount: 0,
					bindUserNum: 0,
					saleMoney: 0
				},
				year: '',
				month: '',
				ranking_arr: [],
				data_arr: [],
				color_arr: [],
				dialogVisibleInit: false
			}
		},
		watch: {
			tableData: function(){
				this.drawBar()
			}
		},
		created(){
			this.sale_date = new Date().getFullYear() + '-' + this.fillZero(new Date().getMonth() + 1)
			this.year = this.sale_date.split('-')[0]
			this.month = this.sale_date.split('-')[1]
			this.queryBanner()
			this.init()
		},
		components: {
			salesFooter
		},
		methods: {
			handleConfirm(val){
				this.sale_date = new Date(val).getFullYear() + '-' + this.fillZero(new Date(val).getMonth() + 1)
				this.year = this.sale_date.split('-')[0]
			  this.month = this.sale_date.split('-')[1]
				this.init()
			},
			openPicker() {
        this.$refs.picker.open()
      },
			//手机号中间四位替换为****
			phoneFormate(str){
				return str.substr(0,3) + '****' + str.substr(7)
			},
			//查询排行榜文字数据
			init(){
				var that = this
				var params = {
					beYearMonth: this.sale_date,
					saleToken: tokenMethods.getSalesToken()
				}
				this.$store.dispatch('sale/' + SALE_RANKING_DATA, params).then(res => {
					this.sale_total_num = res.num
					this.ranking_info = res.data || {}
					if(res.msg && res.msg.indexOf("未上榜") !== -1 || res.msg && res.msg === "无该月排行榜数据"){
						this.ranking_info.rowNum = 0
						this.ranking_info = {
							rowNum: 0,
							orderCount: 0,
							bindUserNum: 0,
							saleMoney: 0
						}
					}
					this.queryHandler()
				})
			},
			//查询排行榜table数据
			queryHandler(){
				var that = this
				var params = {
					beYearMonth: this.sale_date
				}
				this.ranking_arr = []
				this.data_arr = []
				this.color_arr = []
				this.$store.dispatch('sale/' + SALE_RANKING_LIST, params).then(res => {
					this.tableData = res.data

          //当前销售员的排行颜色为红色
          if(res.data !== null){
          	for(var i=0;i<res.data.length;i++){
          		this.ranking_arr.push(res.data[i].rowNum)
          		this.data_arr.push(res.data[i].saleMoney)
          		this.color_arr.push('#005aab')
          	}

	          //少于20个数据全部补0
	          if(this.ranking_arr.length < 20){
	          	var zeroArr = [];
	          	var zeroRank = [];
	          	var colorArr = [];
	          	var len = this.ranking_arr.length;
	          	for(var j=len+1;j<21;j++){
	          		zeroArr.push(0)
	          		zeroRank.push(j)
	          		colorArr.push('#005aab')
	          	}
	          	this.ranking_arr = this.ranking_arr.concat(zeroRank)
	          	this.data_arr = this.data_arr.concat(zeroArr)
	          	this.color_arr = this.color_arr.concat(colorArr)
	          }

	          this.color_arr.unshift('#ff0000')
	          //存在排名的情况下并且在20名之类
	          if(this.ranking_info.rowNum && this.ranking_info.rowNum<21){
	          	this.color_arr.splice(this.ranking_info.rowNum, 1, '#ff0000')
	          }

	          this.color_arr = this.color_arr.reverse()
          	//追加一个自己红色排第一个
          	this.ranking_arr.unshift('我('+this.ranking_info.rowNum+')')
          	this.data_arr.unshift(this.ranking_info.saleMoney)
          	this.ranking_arr = this.ranking_arr.reverse()
          	this.data_arr = this.data_arr.reverse()

          }else{
          	if(res.msg && res.msg.indexOf("未上榜") !== -1){
          		this.ranking_info.rowNum = 0
          	}else if(res.msg && res.msg === "无该月排行榜数据"){
          		this.tableData = []
          	}
          }
	      })
			},
			//月份补0
			fillZero(n){
				return n<10 ? '0'+ n: n
			},
			//查询banner
			queryBanner(){
				this.$store.dispatch('sale/' + SALE_CHARTS_BANNER, {}).then((res) => {
					this.ranking_img = res && res[res.length-1].advUrl
				})
			},
			drawBar(){
				var that = this;
	      document.getElementById('saleChart').style.height = '460px'
	      // 基于准备好的dom，初始化echarts实例
	      var myChart = echarts.getInstanceByDom(document.getElementById('saleChart'));
	      if (myChart === undefined) {
	      	myChart = echarts.init(document.getElementById('saleChart'));
	      }
	      myChart.clear();
	      myChart.setOption({
	      	tooltip: {
	      		trigger: 'axis',
	      		show: false,
	      		axisPointer: {
	      			type: 'shadow'
	      		}
	      	},
	      	legend: {
	      		data: [this.year+'年']
	      	},
	      	grid: {
	      		left: '1%',
	      		right: '10%',
	      		bottom: '3%',
	      		containLabel: true
	      	},
	      	xAxis: {
	      		type: 'value',
	      		minInterval: 6000,
	      		splitLine:{show: false},
	      		boundaryGap: [0, 0.01]
	      	},
	      	yAxis: {
	      		name: '排名',
	      		type: 'category',
	      		data: this.ranking_arr
	      	},
	      	series: [
	      	{
	      		name: this.year+'年',
	      		type: 'bar',
	      		itemStyle: {
	      			normal: {
	      				color(params) {
	      					var colorList = that.color_arr;
	      					return colorList[params.dataIndex]
	      				},
	      				label: {
	      					show: true,
	      					position: 'right',
	      					formatter: '{c}',
	      					textStyle: {
	      						color: '#000'
	      					}
	      				}
	      			}
	      		},
	      		barWidth: 6,
	      		barGap: '1%',
	      		data: this.data_arr
	      	}]
	      });
			},
			tabChartHandler(){
		  	this.btn_show = true
		  	this.init()
		  },
		  tabTableHandler(){
		  	this.btn_show = false
		  }
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../common/sass/factory";
	.chart_wrap{
		position: relative;
		.text_info{
			position: absolute;
			right: px2vw(40);
			bottom: px2vw(26);
			font-size: px2vw(22);
		}
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
    .header_back {
      width: px2vw(18);
      height: px2vw(29);
      margin-left: 2vw;
      margin-top: 3vw;
      float: left;
    }
    .logWithCode {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: px2vw(200);
      height: px2vw(88);
      line-height: px2vw(88);
      display: inline-block;
      text-align: center;
      font-size: px2vw(36);
      color: #fff;
    }
  }
	.saleCharts{
		img{
			width: 100%;
			height: px2vw(297);
			border-bottom: px2vw(13) solid #e5e5e5;
		}
		.charts_title{
			height: px2vw(75);
			line-height: px2vw(75);
			border-bottom: 1px solid #f4f4f4;
		}
		.charts_info{
			height: px2vw(275);
			margin: px2vw(10) px2vw(20);
			border: 1px solid #f4f4f4;
			padding: 0 px2vw(8);
		}
		.sale_cor{
			color: $themeColor;
		}
		.date_select{
			margin-top: px2vw(14);
			width: px2vw(182);
			padding-left: px2vw(10);
			height: px2vw(46);
			line-height: px2vw(46);
			border-radius: 6px;
			background: url(../../../images/saleman/sale_date.png) 84% center no-repeat, #f4f4f4;
			background-size: px2vw(27);
		}
		.rank_info{
			span{
				font-size: px2vw(24);
			}
			i{
				font-size: px2vw(30);
				font-style: normal;
				color: #ab0000;
			}
		}
		.rank_data{
			width: px2vw(653);
			margin: px2vw(20) auto;
			.rank_val{
				color: $themeColor;
				margin-top: px2vw(8);
				margin-bottom: px2vw(10);
			}
		}
		.rank_data li{
			width: px2vw(217);
			height: px2vw(110);
			float: left;
			text-align: center;
		}
		.border_split{
			border-left: px2vw(2) solid $themeColor;
			border-right: px2vw(2) solid $themeColor;
		}
		.sale_table{
			border-top: px2vw(13) solid #e5e5e5;
			.table_wrap{
				margin: px2vw(10) px2vw(20) px2vw(120) 0;
				border: 1px solid #666;
				padding: 0 px2vw(8);
				border-radius: 6px;
				.table_title{
					position: relative;
					h4{
						height: px2vw(55);
						line-height: px2vw(55);
						text-align: center;
						font-size: px2vw(30);
					}
					span{
						width: px2vw(76);
						height: px2vw(40);
						line-height: px2vw(40);
						text-align: right;
						display: inline-block;
						font-size: px2vw(22);
						position: absolute;
						right: px2vw(8);
						top: 50%;
						transform: translate(0, -50%);
					}
					.chart_s{
						background: url(../../../images/saleman/chart.png) left center no-repeat;
						background-size: px2vw(28);
					}
					.table_s{
						background: url(../../../images/saleman/table.png) left center no-repeat;
						background-size: px2vw(28);
					}
				}

				table{
					width: 100%;
					text-align: center;
					border-collapse:collapse;
					.th{
						background: $themeColor;
						color: #fff;
						border: none;
					}
					td{
						border: none;
					}
					tr{
						height: px2vw(50);
						line-height: px2vw(50);
						border-bottom: 1px solid #dfdfdf;
					}
				}
			}
		}
	}
</style>
