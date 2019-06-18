import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Menu, Icon, Button} from 'antd';

import './index.less'
import logo from '../../assets/images/up.gif'
import {getMenuList} from '../../api/index'

const {SubMenu} = Menu;

/*导航栏*/
export default class Index extends Component {


    //默认初始空数组跟加载状态未完成
    state = {
        error: null,
        menuList: [],
        isLoaded: false
    }

    componentDidMount() {
        getMenuList({username: 'admin'}).then(
            resp => this.setState(
                {
                    menuList: resp.obj,
                    isLoaded: true
                })
        ).catch(
            error => this.setState(
                {
                    isLoaded: true,
                    error //此写法等同于error:error
                }
            )
        )
    }

    renderMenu = (data) => {
        let menus;
        menus = <Menu mode="inline" theme="dark">
            {data.map(item => {
                if (null == item.children) {
                    return <Menu.Item key={item.key}>
                        <Link to={item.url}>
                            <Icon type={item.icon}/>
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                } else {
                    return < SubMenu key={item.key} title={
                        <span><Icon type={item.icon}/><span>{item.name}</span></span>}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                }
            })}
        </Menu>
        return menus
    }

    render() {
        const {menuList, isLoaded, error} = this.state
        let m_list;
        if (error) {
            m_list = <Menu mode="inline" theme="dark">
                <Menu.Item key="error">
                    <Link to="/#">
                        <Icon type="pie-chart"/>
                        <span>{error.message}</span>
                    </Link>
                </Menu.Item>
            </Menu>
        } else if (!isLoaded) {
            m_list = <Menu mode="inline" theme="dark">
                <Menu.Item key="loading">
                    <Link to="/#">
                        <Icon type="pie-chart"/>
                        <span>拼命加载中</span>
                    </Link>
                </Menu.Item>
            </Menu>
        } else {
            m_list = this.renderMenu(menuList)
        }

        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>玩个锤子</h1>
                </Link>
                {m_list}
            </div>
        )
    }

}
