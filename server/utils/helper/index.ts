export const responseJson = (code: number, msg: string, data: any) => {
    let resp = { code: code, msg: msg, data: data }
    return resp
}
export const getLoginUid = (event:any) => {
    //判断上下文是否存在授权
    return event.context.auth ? event.context.auth.uid : 0
}
//获取当前时间
export const genTitle=()=>{
    let currentDate=new Date()
    let year=currentDate.getFullYear()
    let month=("0"+(currentDate.getMonth()+1)).slice(-2)
    let day=("0"+currentDate.getDay()).slice(-2)
    return year+"-"+month+"-"+day
}