import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

/*
export function reqLogin(username, password) {
    return ajax('/login', {username, password}, 'POST')
}*/


//export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
export const reqLogin = (user) => ajax('/login', user, 'POST')

export const getMenuList = (user) => ajax('/menu', user, 'GET')

/*查询百度天气api*/
export const reqWeater = (city) => {
    return new Promise((resolve, reject) => {
        let apikey
        ajax('/apikey', {}, 'GET').then(
            resp => {
                apikey = resp.obj
                //console.log('apikey==>', apikey)
                const url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + city + '&output=json&ak=' + apikey
                //console.log('url==>', url)
                jsonp(url, {}, (err, data) => {
                    if (!err && data.status === 'success') {
                        const {dayPictureUrl, nightPictureUrl, weather, date, wind, temperature} = data.results[0].weather_data[0]
                        //console.log("jsonp===>", data.results[0].weather_data[0])
                        resolve({dayPictureUrl, nightPictureUrl, weather, date, wind, temperature})
                        //console.log(dayPictureUrl, nightPictureUrl, weather, date, wind, temperature)
                    } else {
                        //失败
                        message.error('获取天气信息失败')
                    }
                })
            }
        ).catch(
            //message.error('获取apikey失败')
        )
    })


}

//reqWeater('深圳')

export const reqCategorys=(catid)=>ajax('/category/list', {catid})

