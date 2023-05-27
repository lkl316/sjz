function islogin(){
    return localStorage.getItem("token")
}
function renderTopbar(user){
    currentusername.innerHTML = user.username
    let photo = document.querySelector("#topbar-photo")
    photo.src = user.photo
    // console.log(user)
    exit.onclick = function(){
        localStorage.removeItem("token")
        location.href = "/admin/login/login.html"
    }
}
async function load(id){
    let user = islogin()
    if (user) {
         let topbartext = await fetch("/admin/components/topbar/topbar.html").then(res => res.text())
            // console.log(res)
            document.querySelector(".topbar").innerHTML = topbartext
            renderTopbar(JSON.parse(user))
        let sildmenutext = await fetch("/admin/components/slidmenu/slidmenu.html").then(res => res.text())
            // console.log(res)
            document.querySelector(".slidmenu").innerHTML = sildmenutext
            // renderTopbar(JSON.parse(user).username)
         document.querySelector("#"+id).style.color = "#0d6efd"
         if(JSON.parse(user).role !== "超级管理员"){
            document.querySelector(".user-manger-item").remove()
         }
    } else {
        location.href = "../login/login.html"
    }
}
export {load,islogin}