import { load, islogin } from "../../util/zujian.js"
load("slidmenu-newslists")
let list = []
let upId = 0
let myPreviewModal = new bootstrap.Modal(document.querySelector("#previewModal"))
let mydelModal = new bootstrap.Modal(document.querySelector("#delModal"))
let category = ["校园新闻","公告通知","系部动态","媒体报道","精彩世界","教授名家","最美教师","获奖教师","师德标兵","预决算公开","职业教育质量青年报","职业教育活动周","校园文创作品展","表单下载"]
async function render() {
    list = await fetch(`http://localhost:3000/news?author=${JSON.parse(islogin()).username}`).then(res => res.json())
    // console.log(list)
    listbody.innerHTML = list.map(item => `
    <tr>
    <th scope="row">${item.title}</th>
    <td>
        ${category[item.category]}
    </td>
    <td>
        <button type="button" data-id='${item.id}' class="btn btn-success btn-sm btn-preview ">预览</button>
        <button type="button" data-id='${item.id}' class="btn btn-primary btn-sm btn-edit ">编辑</button>
        <button type="button" class="btn btn-danger btn-sm btn-del " data-id='${item.id}' >删除</button>
    </td>
    </tr>
    `).join("")
}
listbody.onclick = function(evt){
    if(evt.target.className.includes("btn-preview")){
        // console.log("btn-preview")
        myPreviewModal.toggle()
        let obj = list.filter(item => item.id == evt.target.dataset.id)[0]
        // console.log(obj)
        renderPreviewModal(obj)
    }else if(evt.target.className.includes("btn-edit")){
        console.log("btn-edit")
        location.href = "../editnews/editnews.html?id=" + evt.target.dataset.id
    }else if(evt.target.className.includes("btn-del")){
        upId = evt.target.dataset.id
        // console.log("btn-del",upId)
        mydelModal.toggle()
    }
}
function renderPreviewModal(obj){
    previewModalTitle.innerHTML = obj.title
    previewModalContent.innerHTML = obj.content
}
delConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/news/${upId}`,{
        method:"DELETE"
    })
    mydelModal.toggle()
    render()
}
render()