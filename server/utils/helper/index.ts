export const responseJson = (code: number, msg: string, data: any) => {
    let resp = { code: code, msg: msg, data: data }
    return resp
}
export const getLoginUid = (event:any) => {
    return event.context.auth ? event.context.auth : 0
}