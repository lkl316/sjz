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
async function renderfootbar(){
    let res = await fetch("../../topbar/foot.html").then(res => res.text())
    document.querySelector(".five").innerHTML = res
}
renderfootbar()


async function getswiper(){
    
    let res = await fetch("http://localhost:3000/images").then(res => res.json())
        await renderswiper(res)
       await heihei() 
}
getswiper()
function renderswiper(list){
    let olist = list.map(item =>`
    <div class="swiper-slide"><img src="${item.photo}"/></div>
    `)
    document.querySelector(".swiper-wrapper").innerHTML = olist.join("")
}
function heihei(){
    new Swiper ('.swiper', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        
        // // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      })    
}

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