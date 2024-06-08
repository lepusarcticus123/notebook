import jwt from 'jsonwebtoken'; 

export default defineEventHandler(event=>{
    //获取token
    let token=getHeader(event,"Authorization")
    if(token){
        //处理token
        token=token.replace("Bearer ","")
        let secret='wlyskzxfnr'
        try{
            //验证token
            var decoded=jwt.verify(token,secret);
            console.log('211',decoded.data)
            //传递给上下文
            event.context.auth={uid:decoded.data.uid}
        }catch(err){
            console.log('212',err)
        }
    }
})