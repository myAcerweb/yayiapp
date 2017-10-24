/**
 * Created by frisco.
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'

function padding(s, len) {
  let l = len - (s + '').length
  for (var i = 0; i < l; i++) {
    s = '0' + s
  }
  return s
};

export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) {
      context = r[2]
    }
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break
            case 'M':
              _date.setMonth(_int - 1);
              break
            case 'd':
              _date.setDate(_int);
              break
            case 'h':
              _date.setHours(_int);
              break
            case 'm':
              _date.setMinutes(_int);
              break
            case 's':
              _date.setSeconds(_int);
              break
          }
        }
        return _date
      }
      return null
    },
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
}

export const tokenMethods = {
  // 移动端登陆token
  setWapToken(token) {
    localStorage.setItem('wapToken', token)
  },
  getWapToken() {
    return localStorage.getItem('wapToken')
  },
  setWapUser(data) {
    localStorage.setItem('wapUser', JSON.stringify(data))
  },
  getWapUser() {
    return JSON.parse(localStorage.getItem('wapUser'))
  },
  removeMsg() {
    localStorage.removeItem('wapToken')
    localStorage.removeItem('wapUser')
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
  setToken(token) {
    sessionStorage.setItem('adverToken', token)
  },
  setSalesToken(token) {
    localStorage.setItem('salesToken', token)
  },
  getSalesToken() {
    return localStorage.getItem('salesToken')
  },
  removeSalesToken() {
    return localStorage.removeItem('salesToken')
  },
  getToken() {
    return sessionStorage.getItem('adverToken')
  },
}
