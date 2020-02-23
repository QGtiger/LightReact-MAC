import React from 'react';
import TypingCard from '../../../components/TypingCard'

export default class IconView extends React.Component{
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <div className="content-header">
                    <TypingCard delay={150} title="Icon 组件">
                        <div>本篇文章简单的展示了 <a href="https://ant.design/components/button-cn/" target="_blank" style={{color: '#bf0000'}}>antd UI框架</a> 中的 <span style={{color: '#0066cc'}}>Icon</span> 组件</div>
                    </TypingCard>
                </div>
            </div>
        )
    }
}