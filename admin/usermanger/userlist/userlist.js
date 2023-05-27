import { load } from "../../util/zujian.js"
load("slidmenu-username")
let myEditModal = new bootstrap.Modal(document.querySelector("#editModal"))
let mydelModal = new bootstrap.Modal(document.querySelector("#delModal"))
let list = []
let updateId = 0
let photodata = ""
async function render() {
    list = await fetch("http://localhost:3000/users").then(res => res.json())
    // console.log(list)
    listbody.innerHTML = list.map(item => `
    <tr>
        <th scope="row">${item.username}</th>
        <td>
            <img src="${item.photo}" style="width:50px"/>
        </td>
        <td>
            <button type="button" data-id='${item.id}' class="btn btn-primary btn-sm btn-edit ${item.defalut ? "disabled" : ""} ">编辑</button>
            <button type="button" class="btn btn-danger btn-sm btn-del ${item.defalut ? "disabled" : ""}" data-id='${item.id}' >删除</button>
        </td>
    </tr>
    `).join("")
}
    listbody.onclick = function(evt){
        if(evt.target.className.includes("btn-edit")){
            updateId = evt.target.dataset.id
            // console.log("btn-edit",evt.target.dataset.id,list)
            // console.log(list.filter(item => item.id == updateId)[0])
            let obj = list.filter(item => item.id == updateId)[0]
            document.querySelector("#username").value = obj.username
            document.querySelector("#password").value = obj.password
            document.querySelector("#introduction").value = obj.introduction
            // document.querySelector("#photofile").value = obj.photo
            // console.log(obj.username)
            photodata = obj.photo
            myEditModal.toggle()
        }else if(evt.target.className.includes("btn-del")){
            // console.log("btn-del",evt.target.dataset.id)
            mydelModal.toggle()
            updateId = evt.target.dataset.id
        }
}

editConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            introduction:document.querySelector("#introduction").value,
            photo:photodata
        })
    }).then(res => res.json())
    myEditModal.toggle()
    render()
}
photofile.onchange = function(evt){
    // console.log(evt.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function(e){
        // console.log(e.target.result)
        photodata = e.target.result
        // console.log(photodata)
    }
}
delConfirm.onclick = async function(){
    await fetch(`http://localhost:3000/users/${updateId}`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json"
        }
    }).then(res => res.json())
    mydelModal.toggle()
    render()
}
render()