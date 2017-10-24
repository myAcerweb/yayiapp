import axios from 'axios'
import router from '../router'
import {tokenMethods} from "./util"
import {Toast, Indicator} from 'mint-ui';


const HOST = 'http://47.93.48.111:6181/api'; //测试端口


// const HOST = 'http://123.56.220.72:8089/api'; //测试端口


//const HOST = 'http://47.93.48.111:8080/api';  //正式数据端口

export default function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data)
      }).catch(err => reject(err));
  });
}

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data.data);
        } else {
          if (res.data.data) resolve(res.data);
        }
      }).catch(err => reject(err));
  });
}

export function noErrorGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data);
      }).catch(err => reject(err));
  });
}

export function noErrorTokenGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = tokenMethods.getToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        resolve(res.data);
      }).catch(err => reject(err));
  });
}

export function noErrorTokenPost(url, params) {
  return new Promise((resolve, reject) => {
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['token'] = tokenMethods.getToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        resolve(res.data);
      }).catch(err => reject(err));
  });
}

export function wx_get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      }).catch(err => reject(err));
  });
}

export function noErrorPost(url, params) {
  return new Promise((resolve, reject) => {
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.post(HOST + url, formData)
      .then((res) => {
        resolve(res.data);
      }).catch(err => reject(err));
  });
}

export function postWithToken(url, params) {
  return new Promise((resolve, reject) => {
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
          // router.push({path: '/logIn'})
          // Toast({message: '登录过期，请重新登录！', duration: 3000})
          return false
        }
      }).catch(() => {
      reject('网络请求错误');
    });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    const temp = new FormData();
    Object.entries(params).forEach((item) => {
      if (item[1] != null) {
        temp.append(item[0], item[1]);
      }
    });
    axios.post(HOST + url, temp)
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res);
        } else {
          resolve(res);
        }
      }).catch(() => {
      // reject(err);
      reject('网络请求错误');
    });
  });
}

export function getWithToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['token'] = tokenMethods.getWapToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          resolve(res.data);
          return false
        }
        if (res.data.errorCode === 'RE_LOGIN') {
          // router.push({path: '/logIn'})
          // Toast({message: '登录过期，请重新登录！', duration: 3000})
          return false
        }
      }).catch(err => reject(err));
  });
}

//创客带token的get请求
export function getWithSaleToken(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers['saleToken'] = tokenMethods.getSalesToken()
    axios.get(HOST + url, {params})
      .then((res) => {
        Indicator.close()
        //鉴权判断
        if (res.data.errorCode === 'RE_LOGIN') {
          router.push({path: '/salesLogin'})
          Toast({message: '登录过期，请重新登录！', duration: 3000})
          return
        }
        resolve(res.data)
      })
      .catch(() => {
        Indicator.close()
        reject('网络请求错误')
      });
  });
}

//创客带token的post请求
export function postWithSaleToken(url, params) {
  return new Promise((resolve, reject) => {
    var formData = new FormData()
    for (let i in params) {
      if (params[i] != null) {
        formData.append(i, params[i])
      }
    }
    axios.defaults.headers['saleToken'] = tokenMethods.getSalesToken()
    axios.post(HOST + url, formData)
      .then((res) => {
        Indicator.close()
        if (res.data.errorCode === 'RE_LOGIN') {
          router.push({path: '/salesLogin'})
          Toast({message: '登录过期，请重新登录！', duration: 3000})
          return
        }
        resolve(res.data)
      })
      .catch(() => {
        Indicator.close()
        reject('网络请求错误');
      });
  });
}

