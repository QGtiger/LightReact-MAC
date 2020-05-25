import React from 'react'
import LoadableComponent from '../../components/LoadableComponent'
import PrivateRoute from '../../components/privateRoute'
import { Switch, Redirect, withRouter } from 'react-router-dom'

const ButtonView = LoadableComponent(() =>
  import('../../views/backView/buttonView')
)
const IconView = LoadableComponent(() =>
  import('../../views/backView/IconView')
)
const OverView = LoadableComponent(() =>
  import('../../views/overview/overview')
)
const FormView = LoadableComponent(()=>
  import('../../views/backView/formView/form')
)
const EchartsView = LoadableComponent(()=>
  import('../../views/backView/echartsView')
)

class contentMain extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div>
        <Switch>
          <PrivateRoute
            exact
            path="/overview"
            component={OverView}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/ui/button"
            component={ButtonView}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/ui/icon"
            component={IconView}
          ></PrivateRoute>
          <PrivateRoute exact path="/form" component={FormView}></PrivateRoute>
          <PrivateRoute exact path="/ui/echarts" component={EchartsView}></PrivateRoute>
          <Redirect exact from="/" to="ui/button"></Redirect>
        </Switch>
      </div>
    )
  }
}

export default withRouter(contentMain)
