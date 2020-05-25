import './form.less';
import React from 'react'
import TypingCard from '../../../components/TypingCard';
import { Form, Input, Button, Checkbox } from 'antd';

class FormView extends React.Component{
    constructor(){
        super(...arguments);
        this.state = {
          username: '123'
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.props.form.getFieldValue('username'))
      this.props.form.validateFields((err, value)=>{
        if(!err){
          console.log('success', value)
        }else{
          console.warn('warning', value)
        }
      })
      
    }

    handleValidator = (rule, val, callback, name) => {
      let checkValue = val.replace(/(^\s*)|(\s*$)/g, '')
      if(checkValue.length === 0){
        callback(`${name} 不能为空`)
      }
      callback();
    }

    render() {
        const layout = {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 20,
          },
        };
        const tailLayout = {
          wrapperCol: {
            offset: 4,
            span: 20,
          },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{paddingLeft: '40px'}}>
                <div className="content-header">
                    <TypingCard delay={150} title="Form 组件">
                        <div>本篇文章简单的展示了 <a href="https://ant.design/components/form-cn/#components-form-demo-layout" target="_blank" style={{color: '#bf0000'}}>antd UI框架</a> 中的 <span style={{color: '#0066cc'}}>Form</span> 组件</div>
                    </TypingCard>
                </div>
                <div className="content__main">
                    <div className="basic__form_cont">
                      <Form
                        {...layout}
                        name="basic"
                        onSubmit={this.handleSubmit}
                      >
                        <Form.Item
                          label="UserName:"
                          name="username"
                          
                        >
                          {
                            getFieldDecorator('username',{
                              rules: [
                                {validator: (rule, val, callback) => this.handleValidator(rule, val, callback, '用户名')}
                              ],
                              validateTrigger: 'onBlur',
                              initialValue: this.state.username
                            })(
                              <Input placeholder="请输入用户名"/>
                            )
                          }
                        </Form.Item>

                        <Form.Item
                          label="PassWord:"
                          name="password"
                          rules={[
                            {required: true, message: '密码不能为空'}
                          ]}
                        >
                          {
                            getFieldDecorator('password', {
                              rules: [
                                {validator: (rule, val, callback) => this.handleValidator(rule, val, callback, '用户名')}
                              ],
                              validateTrigger: 'onBlur'
                            })(
                              <Input.Password placeholder="请输入密码"/>
                            )
                          }
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                      </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(FormView);