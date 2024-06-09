import { getDB } from "~/server/utils/db/mysql"
import { responseJson,getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    const con = getDB()
    try {
        //获取用户文集
        const [rows] = await con.execute('select * from `notebooks`')
        await con.end()//释放连接
        return responseJson(0,'获取文集成功',{
            list:rows
        })
    }
    catch (e) {
        console.log('err',e)
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})
    }
})