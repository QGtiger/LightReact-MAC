import './overview.less'
import React from 'react'
import Axios from '../../utils/axios'
import { CSSTransition } from 'react-transition-group'

export default class OverView extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      img: '',
      sdkList: [],
      sdk0Index: 0,
      sdk1Index: 0,
      sdk2Index: 0,
    }
  }
  componentDidMount() {
    this.handleGetOverviewIndex()
    console.log(123)
  }

  componentDidUpdate() {
    let MainShowImgWidth = this.sdkMainCont.offsetWidth
    let MainShowImgHeight = (MainShowImgWidth * 2) / 3
    let currSdkImg = document.getElementsByClassName('curr__sdk_img')
    for (let dom of currSdkImg) {
      dom.style.height = MainShowImgHeight + 'px'
    }
  }

  handleGetOverviewIndex = () => {
    let _this = this
    Axios.ajax({
      url: '/overview/index',
      type: 'get',
      success: function (res) {
        _this.setState({
          img: res.data.data,
          str: res.data.retObj.string,
          sdkList: res.data.retObj.list,
        })
      },
    })
  }

  handleChangeCompressionImg = (key, index) => {
    this.setState({
      [key]: index,
    })
  }
  render() {
    return (
      <div className="overview__page_cont">
        <div className="overview__header_cont">
          {this.state.sdkList.length > 0 &&
            this.state.sdkList.map((item, i) => (
              <div className="sdk__main_cont" key={item.title}>
                <div className="sdk__title_cont">
                  <p className="title_text">{item.title}</p>
                </div>
                <div
                  className="curr__sdk_img"
                  ref={(ref) => (this.sdkMainCont = ref)}
                >
                  {item.sdkList.length > 0 &&
                    item.sdkList.map((x, y) => (
                      <CSSTransition
                        in={this.state['sdk' + i + 'Index'] === y}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                        onEntered={(el) => {
                          console.log(el)
                        }}
                        appear={true}
                        key={'csstransition' + y}
                      >
                        <div>
                          <img src={x.img} alt="" />
                          <div className="curr__sdk_desc">
                            <div className="desc_title">
                              <p className="title_text">{x.title}</p>
                            </div>
                            <div className="desc_cont">
                              <p>{x.desc}</p>
                            </div>
                          </div>
                        </div>
                      </CSSTransition>
                    ))}
                </div>
                <div className="sdk__compression_cont">
                  {item.sdkList.length > 0 &&
                    item.sdkList.map((sdk, index) => (
                      <div
                        className={
                          this.state['sdk' + i + 'Index'] === index
                            ? 'compression_cont curr__compression_cont'
                            : 'compression_cont'
                        }
                        onClick={() =>
                          this.handleChangeCompressionImg(
                            'sdk' + i + 'Index',
                            index
                          )
                        }
                        key={'sdk1' + index}
                      >
                        <div className="compression_img">
                          <img src={sdk.img} alt="" />
                        </div>
                        <div className="compression_text">
                          <p>{sdk.title}</p>
                        </div>
                        <div className="compress__bottom_bar"></div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}
