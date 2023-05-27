import { load } from "../../util/zujian.js"
load("collegeManger")
let photo = ""
swiperform.onsubmit = async function (evt) {
    evt.preventDefault()
    // console.log(username.value)
    // console.log(password.value)
    // console.log(introduction.value)
    // console.log(photo)
    await fetch("http://localhost:3000/images", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            photo: photo
        })
    }).then(res => res.json())
    render()
}
photofile.onchange = function (evt) {
    // console.log(evt.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        // console.log(e.target.result)
        photo = e.target.result
    }
}
async function render() {
    let res = await fetch(" http://localhost:3000/images").then(res => res.json())
    document.querySelector(".swiperBox").innerHTML = await res.map(item => `
        <li><img src="${item.photo}"/></li>
        <button type="button" class="btn btn-danger" id="swiperDelete" data-myid="${item.id}">Danger</button>
    `).join("")
}
render()
document.querySelector(".swiperBox").onclick = async function (evt) {
    if (evt.target.className.includes("btn-danger")) {
        // console.log(evt.target.dataset.myid)
        await fetch(`http://localhost:3000/images/${evt.target.dataset.myid}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
    }
    render()
}