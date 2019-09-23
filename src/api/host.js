import React,{Component} from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true
const host = 'http://120.79.185.173:8080/agriculture/'
import cookie from 'js-cookie'
import {COOKIE_KEY} from "@/base/constants";

// const getNewList=()=>{
//   return axios.get(host+"selfJson/news.json")
//     .then( (response)=> response.data.data)
//     .catch(function (error) {
// //       console.log(error);
// //     })
// }

const getBatchesGenerated=()=>{
  var useId= cookie.get(COOKIE_KEY.USER_ID);
  return axios.get(host+"portal/processRecord/getBatchesGenerated.do?userId=3")
    .then((res)=>res)
    .catch(function (error) {
      console.log(error);
    })
}

const traceGenerate=(params)=>{
  return axios.post(host+"portal/processRecord/traceGenerate.do",params)
    .then((res)=>res)
    .catch(function (error) {
      console.log(error);
    })

}

const getRecordsUngenratedByBatch=(params)=>{
  return axios.post(host+"portal/processRecord/getRecordsUngenratedByBatch.do",params)
    .then((res)=>res)
    .catch(function (error) {
      console.log(error);
    })

}

export {getBatchesGenerated ,traceGenerate ,getRecordsUngenratedByBatch};
