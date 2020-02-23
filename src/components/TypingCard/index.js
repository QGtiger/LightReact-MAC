import React from 'react';
import Typing from '../../utils/typing';
import { Card } from 'antd';

export default class TypingCard extends React.Component{
    static defaultProps = {
        title: 'Typing Card',
        source: '暂无内容',
        height: 136,
        delay: 300,
    }

    componentDidMount() {
        const typing = new Typing({
            source: this.source,
            output: this.output,
            delay: this.props.delay
        })
        typing.start();
    }

    render() {
        return (
            <Card hoverable bordered={false} title={this.props.title} style={{minHeight: this.props.height}} id={this.props.id}>
                <div style={{display: 'none'}} ref={ref=>this.source=ref}>
                    { this.props.children ? this.props.children : this.props.source }
                </div>
                {/* <div style={{display: 'none'}} ref={ref=>this.source=ref} dangerouslySetInnerHTML={{__html: this.props.source}}></div> */}
                <div ref={ref=>this.output=ref}></div>
            </Card>
        )
    }
}
