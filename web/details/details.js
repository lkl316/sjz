


async function renderTopbar(){
    let res = await fetch("../topbar/topbar.html").then(res => res.text())
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



async function render(){
    let id = new URL(location.href).searchParams.get("id")
    // console.log(id)
    let res = await fetch(`http://localhost:3000/news?id=${id}`).then(res=>res.json())
    console.log(res[0])
    document.querySelector("#title").innerHTML = res[0].title
    document.querySelector(".newsContent").innerHTML = res[0].content
    document.querySelector(".author").innerHTML = res[0].author
}
render()



async function renderfootbar(){
    let res = await fetch("../topbar/foot.html").then(res => res.text())
    document.querySelector(".five").innerHTML = res
}
renderfootbar()

setTimeout(function(){
    search.oninput = async function(){
        // console.log(search.value)
        if(!search.value){
            document.querySelector(".list-group").style.display = "none"
            return
        }
        document.querySelector(".list-group").style.display = "block"
        let res = await fetch("http://localhost:3000/news?title_like="+search.value).then(res=>res.json())
        // console.log(res)
        document.querySelector(".list-group").innerHTML = res.map(item=>`
        <li class="list-group-item"><a href="/web/details/details.html?id=${item.id}">${item.title}</a></li>
        `).join("")
    }
    search.onblur = function(){
        setTimeout(() => {
            document.querySelector(".list-group").style.display = "none"
        }, 300);
    }
},2000)