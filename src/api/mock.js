import Mock from 'mockjs'
const Random = Mock.Random; 

let successData = { code: 200, msg: '请求成功', data: [] }

Mock.mock('/list.json', ops =>{
  //拦截到的请求
  console.log('拦截到了')
  return successData
})
