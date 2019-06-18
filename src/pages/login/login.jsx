import React, {Component} from 'react'
import {Form, Icon, Input, Button, message} from 'antd';
import './login.less'
import logo from './images/logo.jpg'
import tp from './images/tp.gif'
import tz from './images/tz.gif'
import {reqLogin} from '../../api/index'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import {Redirect} from 'react-router-dom'

/*登录路由组件*/
class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //const {username, password} = values

                const resp = await reqLogin(values)
                if (resp.rtn === 0) {


                    const user = resp.obj
                    memoryUtils.user = user
                    storageUtils.saveUser(user)
                    message.success("登录成功")
                    //跳转页面
                    this.props.history.replace("/")
                } else {
                    message.error("登录失败" + resp.msg)
                }
                // try {
                //     const resp=await reqLogin(values)
                //     console.log("成功了", resp)
                // }catch (err) {
                //     console.log("请求异常了", err)
                // }

                // .then(resp => {
                //     console.log("成功了", resp.data)
                // }).catch(err => {
                //     console.log("失败", err)
                // })
            }
        });

        // const form = this.props.form
        // const values = form.getFieldsValue()
        //console.log(values)
    }

    validatorPWD = (rule, value, callback) => {
        if (!value) {
            callback("密码不能为空")
        } else if (value.length <= 4) {
            callback("密码长度不能小于4")
        } else if (value.length > 12) {
            callback("密码长度不能大于12")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文数字下划线组合")
        } else {
            callback()
        }
    }

    render() {
        const user = memoryUtils.user
        if (user && user.username) {
            return <Redirect to="/"/>
        }

        const form = this.props.form
        const {getFieldDecorator} = form

        return (
            <div className='login'>
                <header className='login-header'>
                    <img className='logo' src={logo} alt="logo"/>
                    <img src={tp} alt="tp"/>
                    <img src={tz} alt="tz"/>
                    <h1>李大霄暴击俱乐部</h1>
                </header>
                <section className='login-content'>
                    <h2>中出？？！！</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, whiteSpace: true, message: '用户名为必填项！'},
                                    {min: 4, message: '不能小于4个字符'},
                                    {max: 12, message: '不能超过12个字符！'},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文数字下划线'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validatorPWD},
                                ]
                            })(<Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="密码"
                            />)}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                射射你
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

}

const WrapLogin = Form.create()(Login)
export default WrapLogin
