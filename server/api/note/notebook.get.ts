import { getDB } from "~/server/utils/db/mysql"
import { responseJson,getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    //判断用户是否登录
    let uid=getLoginUid(event)
    if(uid===0){
        setResponseStatus(event,401)
        return responseJson(1, '请先登录', {})
    }
    const con = getDB()
    try {
        //获取用户文集
        const [rows] = await con.execute('select * from `notebooks` where `uid`=?', [uid])
        await con.end()//释放连接
        return responseJson(0,'获取文集成功',{})
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})
    }
})