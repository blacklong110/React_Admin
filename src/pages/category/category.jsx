import React, {Component} from 'react';
import {Card, Table, Button, Icon, message} from "antd";
import LinkButton from "../../components/link-button";
import {reqCategorys} from '../../api'

export default class Category extends Component {


    state = {
        categorys: [],
        loading: false,
    }

    //初始化表头
    initColumns = () => {
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                width: 200,
                render: (category) => (
                    <span>
                        <LinkButton>删除</LinkButton>
                        <LinkButton>编辑</LinkButton>
                        {/*这里的onclick是用来向事件的回调函数传递参数用的*/}
                        <LinkButton onClick={() => this.showSubCategory(category)}>查看</LinkButton>
                    </span>
                )
            },
        ];
    }

    showSubCategory = (category) => {
        this.setState({}, () => {
            //setState不能立即获得最新的状态，setState是异步更新的
            //如果要最新状态，那就再callback里面获取
            //callback是在状态更新且render之后，才去执行
        })
    }

    //异步请求分类数据
    getCategorys = async () => {
        this.setState({loading: true})
        const result = await reqCategorys("0")
        let categorys = result.obj
        if (result.rtn === 0) {
            let loading = false
            this.setState({categorys, loading})
        } else {
            message.error("获取数据失败" + result.msg)
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const {categorys, loading} = this.state
        const title = "gay"
        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={categorys}
                    columns={this.columns}
                    bordered rowKey='key'
                    pagination={{}}
                    loading={loading}
                />;
            </Card>
        )
    }

}
