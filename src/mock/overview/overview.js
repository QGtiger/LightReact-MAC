import Mock from 'mockjs'
import { Random } from 'mockjs'

let BasicUrl = 'http://lightreact.com'

let imgList = [
  'http://qnpic.top/yoona1.jpg',
  'http://qnpic.top/yoona2.jpg',
  'http://qnpic.top/yoona3.jpg',
  'http://qnpic.top/yoona4.jpg',
  'http://qnpic.top/yoona5.jpg',
  'http://qnpic.top/Yoona6.jpg',
  'http://qnpic.top/Yoona8.jpg',
  'http://qnpic.top/Yoona9.jpg',
  'http://qnpic.top/Yoona10.jpg',
  'http://qnpic.top/Yoona11.jpg',
]

let choosedList = []
function getNoRepeatImg() {
  let maxTimes = 9
  do {
    let num = Math.floor(Math.random() * 10)
    if (choosedList.indexOf(num) === -1) {
      choosedList.push(num)
      return imgList[num]
    }
    maxTimes--
  } while (maxTimes)
}

Mock.mock(BasicUrl + '/overview/index', 'get', () => {
  var response = {
    success: true,
    data: Random.image('300x200', '#0066ff', '#FFFFFF', 'png'),
    retObj: {
      string: Random.cparagraph(2, 5),
      name: Random.name(),
      list: [],
    },
  }
  for (let i = 0; i < 3; i++) {
    let obj = new Object()
    obj.title = Random.name()
    obj.desc = obj.title + Random.paragraph(1, 3)
    obj.sdkList = new Array()
    for (let i = 0; i < 3; i++) {
      let sdk = new Object()
      sdk.title = Random.name()
      sdk.desc = Random.cparagraph(1, 3)
      sdk.img = getNoRepeatImg()
      obj.sdkList.push(sdk)
    }
    response.retObj.list.push(obj)
  }
  console.log(response)
  choosedList.splice(0)
  return response
})
