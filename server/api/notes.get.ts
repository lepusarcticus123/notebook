import { getDB } from "~/server/utils/db/mysql"
import { responseJson,getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    const params=await getQuery(event);
    const con = getDB()
    try {
        //获取用户所有文章
        const [rows] = await con.query('select * from `notes` limit ? offset ?',
            [Number(params.pageSize),(params.page-1)*Number(params.pageSize)]
        )
        await con.end()//释放连接
        return responseJson(0,'获取文章成功',{
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