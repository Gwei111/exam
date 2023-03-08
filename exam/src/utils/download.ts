// 下载学生模板
const downLoad=(url:string)=>{
    let a=document.createElement('a')
    a.href=url
    a.style.display='none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
// 文件流下载
const downLoadBlob=(file:any,name:string)=>{
    let blob=new Blob([file],{type:'application/vnd.ms-excel'})
    let url=URL.createObjectURL(blob)
    let a=document.createElement('a')
    a.style.display='none'
    a.setAttribute('download',name)
    a.href=url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
export{
    downLoad,
    downLoadBlob
}