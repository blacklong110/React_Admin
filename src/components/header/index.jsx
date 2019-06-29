import React, {Component} from 'react'
import {Modal} from "antd";

import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeater} from '../../api'
import './index.less'

import LinkButton from '../link-button'

/*顶部栏*/
class Header extends Component {
    state = {
        currenTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '',
        title: '',
    }

    getTitle = () => {
        //获取当前路径
        const currentPath = this.props.location.pathname
        let menuName
        memoryUtils.menuList.forEach(item => {
            if (item.key === currentPath) {
                menuName = item.name
            } else if (!item.children) {
                const cItem = item.children.find(childItem => childItem.key === currentPath)
                if (cItem) {
                    menuName = cItem.name
                }
            }
        })
        memoryUtils.menuName = menuName
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currenTime = formateDate(Date.now())
            this.setState({currenTime})
        }, 1000)
    }
    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeater('深圳')
        this.setState({dayPictureUrl, weather})
    }

    logout = () => {
        Modal.confirm({
            title: '是否需要退出?',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    /*第一次render后执行，执行一次*/
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const {currenTime, dayPictureUrl, weather} = this.state
        const username = memoryUtils.user.username
        return (
            <div className="header">
                <div className="header-top">
                    <span>用户[{username}]你好</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        TODO==>后面用redux获取标题
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

export default withRouter(Header)
