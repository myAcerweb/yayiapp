import axios from 'axios'

export default {
  baseUrl: 'http://47.93.48.111:6181/api',
  // baseUrl: 'http://192.168.1.103:8081/api',
  qiNiuUrl: 'http://upload-z2.qiniu.com/',
  qiniuShUrl: 'http://orl5769dk.bkt.clouddn.com/',
  success(obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        if (url) {
          obj.$router.push(url)
        }
      }
    })
  },
  error(obj, msg, url) {
    obj.$message({
      message: msg,
      duration: '1000',
      type: 'error',
      onClose: function () {
        if (url) {
          obj.$router.push(url)
        }
      }
    })
  },
  extendCopy(p) {
    var c = {};
    for (var i in p) {
      c[i] = p[i];
    }
    return c;
  },
  copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      res.push(arr[i])
    }
    return res
  },
  postHttpData(data) {
    var formData = new FormData()
    for (let i in data) {
      if (data[i] != null) {
        formData.append(i, data[i])
      }
    }
    return formData
  },
  getHttpData(data) {
    var formData = ''
    for (let i in data) {
      if (data[i] != null) {
        formData = formData + '&' + i + '=' + data[i]
      }
    }
    return formData
  },
  setToken(token) {
    sessionStorage.setItem('adverToken', token)
  },
  setSalesToken(token) {
    sessionStorage.setItem('salesToken', token)
  },
  // yayiAbcToken
  removeMsg() {
    sessionStorage.removeItem('adverToken')
    sessionStorage.removeItem('adverUser')
  },
  getToken() {
    return sessionStorage.getItem('adverToken')
  },
  setUser(data) {
    sessionStorage.setItem('adverUser', JSON.stringify(data))
  },
  getUser() {
    return JSON.parse(sessionStorage.getItem('adverUser'))
  },
  // 创客系统token
  getSalesToken() {
    return sessionStorage.getItem('salesToken')
  },
  removeSalesMsg() {
    sessionStorage.removeItem('salesToken')
    sessionStorage.removeItem('salesUser')
  },
  setSalesUser(data) {
    sessionStorage.setItem('salesUser', JSON.stringify(data))
  },
  getSalesUser() {
    return JSON.parse(sessionStorage.getItem('salesUser'))
  },
  // 历史记录存储
  getHistory() {
    return localStorage.getItem('userHistory')
  },
  setHistory(data) {
    localStorage.setItem('userHistory', JSON.stringify(data))
  },
  removeHistory() {
    localStorage.removeItem('userHistory')
  },
  axiosPostReq(url, data) {
    var myurl = window.location.href;
    axios.defaults.headers['token'] = this.getToken()
    return axios.post(this.baseUrl + url, this.postHttpData(data))
  },
  axiosGetReq(url, getParamsObj) {
    var myurl = window.location.href;
    axios.defaults.headers['token'] = this.getToken()
    return axios.get(this.baseUrl + url, {params: getParamsObj})
  },
  axiosGetQiNiuReq(url, getParamsObj) {

    return axios.get(this.qiniuShUrl + url, {params: getParamsObj})
  },
  getQiNiuToken() {
    return this.axiosGetQiNiuReq('qiniu/getQiNiuToken')
  },
  // 随机生成UUID
  uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  },
  //买商品给钱币规则
  // 道邦
  // 该商品购买金额<300,赠送钱币数量=档次购买金额*3%
  // 300<=该商品购买金额<600,赠送钱币数量=档次购买金额*5%
  // 600<=该商品购买金额<1200,赠送钱币数量=档次购买金额*8%
  // 1200<=该商品购买金额<2500,赠送钱币数量=档次购买金额*12%
  // 该商品购买金额>=2500,赠送钱币数量=档次购买金额*15%
  // 其他品牌
  // 耗材类
  // 该商品购买金额<500,赠送钱币数量=档次购买金额*3%
  // 500<=该商品购买金额<1000,赠送钱币数量=档次购买金额*5%
  // 1000<=该商品购买金额<3000,赠送钱币数量=档次购买金额*8%
  // 该商品购买金额>=3000,赠送钱币数量=档次购买金额*12%
  // 工具设备类
  // 该商品1件，赠送钱币数量=档次购买金额*5%
  // 该商品>=2件，赠送钱币数量=档次购买金额*10%
  goodToMoney: function (goodList) {
    var daoBangArr = [], haoCaiArr = [], gongJuSheBeiArr = [];
    var daoBangMoney = 0, haoCaiMoney = 0, gongJuSheBeiMoney = 0;
    var daoBangRata, haoCaiRata, gongJuSheBeiRata;
    var daoBangMoneyToMoney = 0, haoCaiMoneyToMoney = 0, gongJuSheBeiMoneyToMoney = 0;
    for (let i in goodList) {
      if (goodList[i].goodBrandName == "上海道邦") {
        daoBangArr.push(goodList[i]);
      } else if (goodList[i].goodSort == "耗材类") {
        haoCaiArr.push(goodList[i]);
      } else if (goodList[i].goodSort == "工具设备类") {
        gongJuSheBeiArr.push(goodList[i]);
      }
    }

    // 道邦
    for (let a in daoBangArr) {
      daoBangMoney += daoBangArr[a].price * 100 * daoBangArr[a].num / 100
    }
    if (daoBangMoney < 300) {
      daoBangRata = 3;
    } else if (300 <= daoBangMoney && daoBangMoney < 600) {
      daoBangRata = 5;
    } else if (600 <= daoBangMoney && daoBangMoney < 1200) {
      daoBangRata = 8;
    } else if (1200 <= daoBangMoney && daoBangMoney < 2500) {
      daoBangRata = 12;
    } else if (2500 <= daoBangMoney) {
      daoBangRata = 15;
    } else {
      daoBangRata = 0;
    }
    daoBangMoneyToMoney = daoBangMoney * daoBangRata / 100;
    // console.log(daoBangMoneyToMoney,daoBangMoney,daoBangRata,"111111")

    // 耗材
    for (let b in haoCaiArr) {
      haoCaiMoney += haoCaiArr[b].price * 100 * haoCaiArr[b].num / 100
    }
    if (haoCaiMoney < 500) {
      haoCaiRata = 3;
    } else if (500 <= haoCaiMoney && haoCaiMoney < 1000) {
      haoCaiRata = 5;
    } else if (1000 <= haoCaiMoney && haoCaiMoney < 3000) {
      haoCaiRata = 8;
    } else if (3000 <= haoCaiMoney) {
      haoCaiRata = 12;
    } else {
      haoCaiRata = 0;
    }
    haoCaiMoneyToMoney = haoCaiMoney * haoCaiRata / 100;
    // console.log(haoCaiMoneyToMoney,haoCaiMoney,haoCaiRata,"22222222222222")


    var gongJuSheBeiAllNum = 0;
    for (let c in gongJuSheBeiArr) {
      gongJuSheBeiMoney += gongJuSheBeiArr[c].price * 100 * gongJuSheBeiArr[c].num / 100;
      gongJuSheBeiAllNum += gongJuSheBeiArr[c].num;
    }
    if (gongJuSheBeiAllNum == 1) {
      gongJuSheBeiRata = 5;
    } else if (gongJuSheBeiAllNum >= 2) {
      gongJuSheBeiRata = 10;
    } else {
      gongJuSheBeiRata = 0;
    }
    gongJuSheBeiMoneyToMoney = gongJuSheBeiMoney * gongJuSheBeiRata / 100;
    // console.log(gongJuSheBeiMoneyToMoney,gongJuSheBeiMoney,gongJuSheBeiRata,"333")
    var finalyMoney = 0;
    finalyMoney = gongJuSheBeiMoneyToMoney + haoCaiMoneyToMoney + daoBangMoneyToMoney;
    console.log(finalyMoney, "finalyMoney");
    return Math.round(finalyMoney);
  },
  // RMB兑换钱币规则
  moneyToMoney: function (money) {
    // money--需要兑换的人民币数量
    // 钱币兑换比率
    // (1) 1000元<=单次购买金额<2000元，兑换钱币数量=当次实际兑换金额*110%；
    // (2) 2000元<=单次购买金额<5000元，兑换钱币数量=当次实际兑换金额*115%；
    // (3) 5000元<=单次购买金额<10000元，兑换钱币数量=当次实际兑换金额*120%；
    // (4) 单次购买金额>10000元，兑换钱币数量=当次实际兑换金额*125%；
    if (money) {
      var finalyMoney;
      var rate;
      if (money < 1000) {
        rate = 100;
      } else if (1000 <= money && money < 2000) {
        rate = 110;
      } else if (2000 <= money && money < 5000) {
        rate = 115;
      } else if (5000 <= money && money < 10000) {
        rate = 120;
      } else if (10000 <= money) {
        rate = 125;
      }
      finalyMoney = money * rate / 100;
      return Math.round(finalyMoney);
    }
  },
}
