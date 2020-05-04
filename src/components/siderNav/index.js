import React from 'react'
import CustomMenu from '../customMenu'

const menus = [
  {
    title: '首页',
    icon: 'profile',
    key: '/overview',
  },
  {
    title: '通用',
    icon: 'profile',
    key: '/ui',
    subs: [
      {
        title: 'button 按钮',
        key: '/ui/button',
        icon: 'pic-center',
      },
      {
        title: 'Icon 图标',
        key: '/ui/icon',
        icon: 'smile',
      },
      {
        title: 'Typography 排版',
        key: '/ui/typography',
        icon: 'unordered-list',
      },
    ],
  },
  {
    title: '布局',
    icon: 'ordered-list',
    key: '/layout',
    subs: [
      {
        title: 'Grid 栅栏',
        key: '/layout/grid',
        icon: 'align-center',
      },
      {
        title: 'Layout 布局',
        key: '/layout/layout',
        icon: 'align-right',
      },
    ],
  },
  {
    title: '关于',
    icon: 'message',
    key: '/login',
  },
]

class SideNav extends React.Component {
  render() {
    return (
      <div className="" style={{ height: '100vh', paddingTop: '50px' }}>
        <CustomMenu menus={menus}></CustomMenu>
      </div>
    )
  }
}

export default SideNav
