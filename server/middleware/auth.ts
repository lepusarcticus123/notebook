import jwt from 'jsonwebtoken'; 
export default defineEventHandler(event=>{
    //获取token
    let token=getHeader(event,"Authorization")
    if(token){
        //处理token
        token=token.replace("Bearer ","")
        let secret='wlyskzxfnr'//之前的密钥
        try{
            //验证token
            var decoded=jwt.verify(token,secret);
            //传递给上下文
            event.context.auth={uid:decoded.data.data.uid}
        }catch(err){
            console.log(err)
        }
    }
})