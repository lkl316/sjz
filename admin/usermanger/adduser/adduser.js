import {load} from "../../util/zujian.js"
load("slidmenu-adduser")
let photo = ""
adduserform.onsubmit = async function(evt){
    evt.preventDefault()
    // console.log(username.value)
    // console.log(password.value)
    // console.log(introduction.value)
    // console.log(photo)
    await fetch("http://localhost:3000/users",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,
            introduction:introduction.value,
            photo:photo
        })
    }).then(res => res.json())
    location.href = "../userlist/userlist.html"
}
photofile.onchange = function(evt){
    // console.log(evt.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function(e){
        // console.log(e.target.result)
        photo = e.target.result
    }
}