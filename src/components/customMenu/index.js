import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class CustomMenu extends React.Component{
    constructor(){
        super(...arguments);

        this.state = {
            openKeys: [],
            selectKeys: []
        }
    }

    componentDidMount() {
        this.onChangeSubMenu(this.props.location.pathname);
        this.props.history.listen((path) => {
            this.onChangeSubMenu(path.pathname)
        })
    }

    componentWillReceiveProps(nextProps){
        //当点击面包屑导航时，侧边栏要同步响应
        const pathname = nextProps.location.pathname;
        // console.log(pathname)
        if (this.props.location.pathname !== pathname) {
            this.setState({
                selectedKeys: [pathname],
            })
        }
    }

    convert(dom, arr) {
        //将dom节点的子节点转换成数组，
        let children = Array.from(dom.childNodes)
        for (let i = 0; i < children.length; i++) {
            let node = children[i]
            if (node.nodeType === 3) {
                arr = arr.concat(node.nodeValue.split(''))   //将字符串转换成字符串数组，后面打印时才会一个一个的打印
            } else if (node.nodeType === 1) {
                let val = []
                val = this.convert(node, val)
                arr.push({
                    'dom': node,
                    'val': val
                })
            }
        }
        console.log(arr)
        return arr
    }

    onChangeSubMenu = (pathname) => {
        const rank = pathname.split('/')
        switch (rank.length) {
            case 2 :  //一级目录
                this.setState({
                    selectKeys: [pathname]
                })
                break;
            case 5 : //三级目录，要展开两个subMenu
                this.setState({
                    selectKeys: [pathname],
                    openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
                })
                break;
            default :
                this.setState({
                    selectKeys: [pathname],
                    openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
                })
        }
    }

    onOpenChange = (openKeys) => {
        //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({
                openKeys
            })
            return
        }

        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
        //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
        //只适用于3级菜单
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({
                openKeys
            })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
    }

    renderMenuItem = ({key, icon, title}) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {icon && <Icon type={icon}/>}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    renderSubMenu = ({key, icon, title, subs}) => {
        return (
            <SubMenu key={key} title={
            <span>{icon && <Icon type={icon}/>} <span>{title}</span></span>
            }>
                { subs && subs.map(item => {
                    return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                }) }
            </SubMenu>
        )
    }

    onSelectKeys = (selectKeys) => {
        this.setState({
            selectKeys: [selectKeys]
        })
    }

    render() {
        return (
            <Menu
                openKeys={this.state.openKeys}
                selectedKeys={this.state.selectKeys}
                mode="inline"
                onOpenChange={this.onOpenChange}
                theme={this.props.theme ? this.props.theme : 'dark'}
                onClick={({key})=>this.onSelectKeys(key)}
            >
                {
                    this.props.menus && this.props.menus.map(item=>{
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>
        )
    }
}

export default withRouter(CustomMenu);