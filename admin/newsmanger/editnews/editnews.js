import {load,islogin} from "../../util/zujian.js"
load("slidmenu-newslists")
let updateId = new URL(location.href).searchParams.get("id")
let categorylist = ["校园新闻","公告通知","系部动态","媒体报道","精彩世界"]
// console.log(updateId)
const { createEditor, createToolbar } = window.wangEditor
let content = ""
let cover = ""
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
      const html = editor.getHtml()
    //   console.log('editor content', html)
      // 也可以同步到 <textarea>
      content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
coverfile.onchange = function(evt){
    // console.log(evt.target.files[0])
    let reader = new FileReader()
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function(e){
        // console.log(e.target.result)
        cover = e.target.result
    }
}
editNewsform.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch(`http://localhost:3000/news/${updateId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover
        })
    }).then(res => res.json())
    location.href = "../newslist/newslist.html"
}
async function render(){
    let obj = await fetch(`http://localhost:3000/news/${updateId}`).then(res => res.json())
    // console.log(obj)
    document.querySelector("#title").value = obj.title
    document.querySelector("#category").value = obj.category
    editor.setHtml(obj.content)
    content = obj.content   //没改的话content不为空
    cover = obj.cover
}
render()