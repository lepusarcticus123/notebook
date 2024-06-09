import { getDB } from "~/server/utils/db/mysql"
import Joi from 'joi'
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
        notebookId: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(params);
    }
    catch (err) {
        return responseJson(1, '参数错误', {})
    }
    const con = getDB()
    try {
        //查询文章和文集关联表
        const [notebookRows] = await con.query(
            'select `note_id` from `notebook_notes` where `notebook_id`=?', 
            [params.notebookId])
        // console.log('notebookRows',notebookRows)
        //查询文章
        let noteIdList:any=[]
        //遍历文章ID
        notebookRows.map(v=>{
            noteIdList.push(v.note_id)
        })
        //查询文章表
        const [notesRows] = await con.query(
           'select * from `notes` where `uid`=? and id in(?)',
            [uid,noteIdList])
        //释放连接
        await con.end()//释放连接
        return responseJson(0,'获取文章成功',{
            list:notesRows
        })
    }
    catch (e) {
        //释放连接
        await con.end()
        setResponseStatus(event,500)
        return responseJson(1, '服务器错误', {})
    }
})