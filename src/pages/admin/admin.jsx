import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

/*后台管理路由组件*/
export default class Admin extends Component {

    render() {
        const user = memoryUtils.user
        //如果没有保存用户信息，说明没有登录，那就要跳转到登录页面
        if (!user || !user._id) {
            return <Redirect to="/login"/>
        }
        return (
            <div>
                Hello {user.username}
            </div>
        )
    }

}
