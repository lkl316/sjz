async function renderTopbar(){
    let res = await fetch("../topbar/topbar.html").then(res => res.text())
    document.querySelector(".headpc").innerHTML = res
}
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
renderTopbar()
 async function getswiper(){
    
    let res = await fetch("http://localhost:3000/swiper").then(res => res.json())
        await renderswiper(res)
       await heihei() 
}
getswiper()
function renderswiper(list){
    let olist = list.map(item =>`
    <div class="swiper-slide"><img src="${item.photo}"/></div>
    `)
    document.querySelector(".lkl2").innerHTML = olist.join("")
}
// document.querySelector(".shenghuo").onclick = function(evt){
//     if(evt.target.className.includes("swiper-slide")){
//         console.log(evt.target.dataset.id)
//     }
// }
function heihei(){
    new Swiper ('.lkl', {
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
}





async function getswiper2(){
    
    let res = await fetch("http://localhost:3000/news?category=0").then(res => res.json())
        await renderswiper2(res)
       await heihei2() 
}
getswiper2()
function renderswiper2(list){
    let newlist = list.map(item =>`
    <div class="swiper-slide" data-id="${item.id}"><div class="card" style="width: 18rem;">
    <img src="${item.cover}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${item.title}</p>
    </div>
  </div></div>
    `)
    document.querySelector(".lance2").innerHTML = newlist.join("")
}
function heihei2(){
    new Swiper ('.lance', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }
      })
}
async function renderlist(){
 let res =await fetch("http://localhost:3000/news?category=0").then(res => res.json())
 res.reverse()
 let newres = res.slice(0,8) 
 document.querySelector("#shenghuolist").innerHTML = newres.map(item=>`
 <li data-id="${item.id}" class="heihei">${item.title}</li><hr/>
 `).join("")
}
renderlist()

document.querySelector(".shenghuo ul").onclick = function(evt){
    if(evt.target.className.includes("heihei")){
        // console.log(evt.target.dataset.id)
        location.href = `../details/details.html?id=${evt.target.dataset.id}`
    }
}
async function rendergonggao(){
    let res = await fetch("http://localhost:3000/news?category=1").then(res=>res.json())
    // console.log(res)
    res.reverse()
    let newres = res.slice(0,5) 
    document.querySelector(".tongzhi ul").innerHTML = newres.map(item =>`
    <li class="heihei" data-id="${item.id}">${item.title}</li>
    `).join("")
}
document.querySelector(".tongzhi ul").onclick = function(evt){
    if(evt.target.className.includes("heihei")){
        // console.log(evt.target.dataset.id)
        location.href = `../details/details.html?id=${evt.target.dataset.id}`
    }
}
rendergonggao()
async function renderxibu(){
    let res = await fetch("http://localhost:3000/news?category=2").then(res=>res.json())
    // console.log(res)
    res.reverse()
    let newres = res.slice(0,5) 
    document.querySelector(".xibu ul").innerHTML = newres.map(item =>`
    <li class="heihei" data-id="${item.id}">${item.title}</li>
    `).join("")
}
document.querySelector(".xibu ul").onclick = function(evt){
    if(evt.target.className.includes("heihei")){
        // console.log(evt.target.dataset.id)
        location.href = `../details/details.html?id=${evt.target.dataset.id}`
    }
}
renderxibu()
async function rendermeiti(){
    let res = await fetch("http://localhost:3000/news?category=3").then(res=>res.json())
    // console.log(res)
    res.reverse()
    let newres = res.slice(0,5) 
    document.querySelector(".meitigonggao ul").innerHTML = newres.map(item =>`
    <li class="heihei" data-id="${item.id}">${item.title}</li>
    `).join("")
}
document.querySelector(".meitigonggao ul").onclick = function(evt){
    if(evt.target.className.includes("heihei")){
        // console.log(evt.target.dataset.id)
        location.href = `../details/details.html?id=${evt.target.dataset.id}`
    }
}
rendermeiti()


async function getswiper3(){
    
    let res = await fetch("http://localhost:3000/news?category=4").then(res => res.json())
    console.log(res)
        await renderswiper3(res)
       await heihei3() 
}
getswiper3()
function renderswiper3(list){
    let newlist = list.map(item =>`
    <div class="swiper-slide heihei" data-id="${item.id}">
    <img src="${item.cover}"/>
    <div class="wenzi">${item.title}</div>
    </div>
    `)
    document.querySelector(".liukang2").innerHTML = newlist.join("")
}
function heihei3(){
    new Swiper ('.liukang', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }
      })
}
// document.querySelector(".liukang").onclick = function(evt){
//     if(evt.target.className.includes("heihei")){
//         console.log(evt.target.dataset.id)
//         // location.href = `../details/details.html?id=${evt.target.dataset.id}`
//     }
// }



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