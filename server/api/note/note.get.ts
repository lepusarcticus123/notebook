import Joi from 'joi'
import { getDB } from "~/server/utils/db/mysql"
import { responseJson,getLoginUid } from '~/server/utils/helper';
export default defineEventHandler(async (event) => {
    //判断用户是否登录
    let uid=getLoginUid(event)
    if(uid===0){
        setResponseStatus(event,401)
        return responseJson(1, '请先登录', {})
    }
    //获取数据
    const params=await getQuery(event)
    //数据校验
    const schema = Joi.object({
        noteId: Joi.number().required()
    });
    try {
        const value = await schema.validateAsync(params);
    }
    catch (err) {
        console.log('err',err)
        return responseJson(1, '参数错误', {})
    }
    const con = getDB()
    try {
        //获取用户文章
        const [rows]:any = await con.query(
            'select * from `notes` where `uid`=? and `id`=? ', 
            [uid,params.noteId])
        await con.end()//释放连接
        return responseJson(0,'获取文章成功',{
            list:{
                id:rows[0].id,
                title:rows[0].title,
                content_md:rows[0].content_md,
                state:rows[0].state
            }
        })
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})
    }
})