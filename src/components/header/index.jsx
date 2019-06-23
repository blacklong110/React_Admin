import React, {Component} from 'react';

import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeater} from '../../api'
import './index.less'

/*顶部栏*/
export default class Header extends Component {
    state = {
        currenTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
    }
    getTime = () => {
        setInterval(() => {
            const currenTime = formateDate(Date.now())
            this.setState({currenTime})
        }, 1000)
    }
    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeater('深圳')
        this.setState({dayPictureUrl, weather})
    }

    /*第一次render后执行，执行一次*/
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    render() {
        const {currenTime, dayPictureUrl, weather} = this.state
        const username = memoryUtils.user.username
        return (
            <div className="header">
                <div className="header-top">
                    <span>用户[{username}]你好</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{currenTime}</span>
                        <img src={dayPictureUrl} alt="dayPictureUrl"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }

}
