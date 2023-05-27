const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function(evt){
    loginWarning.style.display = "none"
    evt.preventDefault()
    let res = await fetch(`http://localhost:3000/users?username=${username.value}&password=${password.value}`).then(res=>res.json())
    // console.log(res)
    if(res.length>0){
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"******"
        }))
        location.href = "../home/home.html"
    }else{
        loginWarning.style.display = "block"
        username.value = ""
        password.value = ""
    }
}

