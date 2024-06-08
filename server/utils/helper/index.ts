export const responseJson=(code:number,msg:string,data:any)=>{
let resp= { code: code, msg: msg, data: data }
return resp
}