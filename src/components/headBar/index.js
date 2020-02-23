import React from 'react';
import { Icon } from 'antd';

export default class HeaderBar extends React.Component{
    state = {

    }

    triggle = () => {
        this.props.triggle();
    }

    render() {
        const { avator } = this.state;
        const { collapsed, location } = this.props;
        return (
            <div id="headerbar">
                <Icon type={ collapsed ? 'menu-unfold' : 'menu-fold'}
                    className="trigger"
                    onClick={this.triggle}
                />
            </div>
        )
    }
}