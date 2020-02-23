import Mock from 'mockjs';

Mock.mock('http://account/login','post',(req)=>{
    let data = JSON.parse(req.body);
    if(data.username === 'admin' && data.password === 'admin'){
        return {
            success: true,
            tips: 'hello'
        }
    }else{
        return {
            success: false
        }
    }
    
})