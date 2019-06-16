/*能发送异步请求的函数模块*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = axios.get(url, {params: data})
        } else {
            promise = axios.post(url, data)
        }

        promise.then(resp => {
            //成功就调用resolve(value)
            resolve(resp.data)
        }).catch(err => {
            //失败就调用提示消息
            message.error("肥肠抱歉,请求出现异常啦:")
        })

    })


}