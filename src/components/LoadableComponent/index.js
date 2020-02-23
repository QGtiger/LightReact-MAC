import React from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class Loading extends React.Component{
    componentDidMount() {
        NProgress.start();
    }

    componentWillUnmount() {
        NProgress.done();
    }

    render() {
        return (
            <div/>
        )
    }
}

const LoadableComponent = (component) => {
    return Loadable({
        loader: component,
        loading: ()=><Loading/>
    })
}

export default LoadableComponent;