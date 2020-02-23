import React from 'react';
import './login.less';
import axios from 'axios';
import { authenticateSuccess } from '../../utils/account';

export default class LoginView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginLoading: false,
            username: null,
            password: null,
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    isOnFocus = (type)=>{
        let value = this.refs[type].value.replace(/(^\s*)|(\s*$)/g, "");
        if(value.length !== 0){
            this.setState({
                [type+'Focus']: true
            })
        }
    }

    inputOnFocus = (type)=>{
        
        this.setState({
            [type+'Focus']: true
        })
    }

    inputOnBlur = (type)=>{
        let value = this.refs[type].value.replace(/(^\s*)|(\s*$)/g, "");
        if(value.length === 0){
            this.setState({
                [type+'Focus']: false
            })
        }
    }

    login = ()=>{
        this.setState({
            loginLoading: true
        })
        let {username, password} = this.state;
        axios.post('http://account/login', {
            username,
            password
        }).then(res=>{
            if(res.data.success){
                console.log('登陆成功');
                authenticateSuccess(username, 1)
                const {pathname} = this.props.location.state || {pathname: '/'};
                this.props.history.push(pathname)
            }else{
                console.log('登录失败')
                this.setState({
                    loginLoading: false
                })
            }
        })
    }

    render(){
        return (
            <div>
                <div className="login-form">
                    <div className="login-title">
                        <p>欢迎来到 LightBlog ...</p>
                    </div>
                    <div className="login-cont">
                        <div className="title">
                            <h3>LightBlog</h3>
                        </div>
                        
                        <div className="input-group">
                            <div className="input-icon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-caishen"></use>
                                </svg>
                            </div>
                            <div className={this.state.editUserFocus ? 'input-main is-focus' : 'input-main'} onClick={()=>{this.refs.editUser.focus()}}>
                                <label className="label-text">User Name</label>
                                <input ref="editUser" onChange={e=>{
                                    this.setState({
                                        username: e.target.value.replace(/(^\s*)|(\s*$)/g, '')
                                    })
                                }} className="edit-input" onBlur={()=>this.inputOnBlur('editUser')} onFocus={()=>this.inputOnFocus('editUser')} type="text"/>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-icon">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-denglong"></use>
                                </svg>
                            </div>
                            <div className={this.state.editPWFocus ? 'input-main is-focus' : 'input-main'} onClick={()=>{this.refs.editPW.focus()}}>
                                <label className="label-text">PassWord</label>
                                <input ref="editPW" onChange={e=>{
                                    this.setState({
                                        password: e.target.value
                                    })
                                }} className="edit-input" onBlur={()=>this.inputOnBlur('editPW')} onFocus={()=>this.inputOnFocus('editPW')} type="password"/>
                            </div>
                        </div>

                        <div className="form-submit">
                            <div className="login-btn btn" onClick={()=>this.login()}>
                                {
                                    this.state.loginLoading ? 
                                    (
                                        <i className="icon-cont">
                                            <svg className="icon icon-loading" aria-hidden="true">
                                                <use xlinkHref="#icon-loading"></use>
                                            </svg>
                                        </i>
                                    ) : ''
                                }
                                <span>登 陆</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
