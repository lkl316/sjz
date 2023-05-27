import {load,islogin} from "../../util/zujian.js"
load("slidmenu-addnews")
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
addNewsform.onsubmit = async function(evt){
    evt.preventDefault()
    await fetch("http://localhost:3000/news",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:title.value,
            content,
            category:category.value,
            cover,
            author:JSON.parse(islogin()).username
        })
    }).then(res => res.json())
    location.href = "../newslist/newslist.html"
}