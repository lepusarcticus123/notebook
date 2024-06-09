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
    const body = await readBody(event);
    //校验数据
    const schema = Joi.object({
        noteId:Joi.number().required(),
    });
    const con = getDB()
    try {
        //删除文章
        const [rows] = await con.execute(
            'delete  from `notes` where `uid`=? and `id`=?', 
            [uid,body.noteId])
        await con.end()//释放连接
        if(rows.affectedRows===0){
            return responseJson(1, '文章', {})
        }
        return responseJson(0,'删除成功',{})
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})
    }
})