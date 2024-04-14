import axios from 'axios';
import QS from 'qs';
import { useRouter, useRoute } from 'vue-router'
import router from '../router/index'

// 修改这个地方作为api的baseURL
// axios.defaults.baseURL = 'http://10.162.80.58:8082/'
axios.defaults.baseURL = 'http://localhost:5000/'
// axios.defaults.baseURL = 'http://192.168.1.7:3000'



axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.interceptors.response.use(
//   (response) => {   
//     // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
//     // 否则的话抛出错误
//     if (response.status === 200) {
//       return Promise.resolve(response.data);        
//     } else {
//       return Promise.reject(response);        
//     }    
//   }
// )
export function get(url, params){
  // console.log({params:params})  
  return new Promise((resolve, reject) =>{   
    axios.get(url,{params:params}).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)        
  })   
});}
export function post(url, params) {    
  return new Promise((resolve, reject) => {         
    axios.post(url, QS.stringify(params))        
    .then(res => {            
      resolve(res.data);        
    })        
    .catch(err => {            
      reject(err.data)        
    })    
  });
}
