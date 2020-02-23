import React from 'react';
import { Layout } from 'antd';
import SiderNav from '../../components/siderNav';
import HeaderBar from '../../components/headBar';
import ContentMain from '../../components/contentMain';

const { Sider, Header, Content, Footer } = Layout;

class BackStageLayout extends React.Component{
    state = {
        collapsed: false
    }

    onToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <Layout>
                    <Sider
                        collapsible
                        trigger={null}
                        collapsed={this.state.collapsed}
                    >
                        <SiderNav></SiderNav>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: '0 16px'}}>
                            <HeaderBar collapsed={this.state.collapsed} triggle={this.onToggle}></HeaderBar>
                        </Header>
                        <Content>
                            <ContentMain></ContentMain>
                        </Content>
                        <Footer></Footer>
                    </Layout>
                </Layout>
        )
    }
}

export default BackStageLayout;