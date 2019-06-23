import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import {Layout} from 'antd'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'


const {Footer, Sider, Content} = Layout;

/*后台管理路由组件*/
export default class Admin extends Component {

    render() {
        const user = memoryUtils.user
        //如果没有保存用户信息，说明没有登录，那就要跳转到登录页面
        if (!user || !user.username) {
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Hello {user.username}</Header>
                    <Content style={{margin: 20, backgroundColor: '#fff'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/user" component={User}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>

                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#cc1927'}}>脱下裤子体验更佳</Footer>
                </Layout>
            </Layout>
        )
    }

}
