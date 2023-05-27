async function renderTopbar(){
    let res = await fetch("../../topbar/topbar.html").then(res => res.text())
    document.querySelector(".headpc").innerHTML = res
}
renderTopbar()
window.onscroll = function(){
    if(document.documentElement.scrollTop>150){
        let onav = document.querySelector("nav")
        onav.style.position = "fixed"
        onav.style.top = "0"
    }
    if(document.documentElement.scrollTop<150){
        let onav = document.querySelector("nav")
        onav.style.position = "relative"
    }
}
async function renderList(){
    let res = await fetch(`http://localhost:3000/news?category=11`).then(res=>res.json())
    console.log(res)
    document.querySelector("section #list").innerHTML = res.map(item=>`
    <li class="heihei" data-id="${item.id}">${item.title}</li>
    `).join("")
}
document.querySelector("#list").onclick = function(evt){
    if(evt.target.className.includes("heihei")){
        location.href = `/web/details/details.html?id=${evt.target.dataset.id}`
    }
}
renderList()
async function renderfootbar(){
    let res = await fetch("../../topbar/foot.html").then(res => res.text())
    document.querySelector(".five").innerHTML = res
}
renderfootbar()