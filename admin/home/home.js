import { load, islogin } from "../util/zujian.js"
load("slidmenu-home")
let user = JSON.parse(islogin())
// console.log(user)
document.querySelector(".userprofile").innerHTML = `
<img src="${user.photo}"/style="width:100px"/>
<div>
<div>${user.username}</div>
<div>个人介绍：<pre>${user.introduction || "这个人很懒，没有留下任何痕迹"}</pre></div>
</div>
`
let categoryList = ["校园新闻","公告通知","系部动态","媒体报道","精彩世界","教授名家","最美教师","获奖教师","师德标兵","预决算公开","职业教育质量青年报","职业教育活动周","校园文创作品展","表单下载"]

async function analyist() {
    let res = await fetch(`http://localhost:3000/news?author=${user.username}`).then(res => res.json())
    // console.log(res)
    // console.log(_.groupBy(res,item=>item.category))
    let obj = _.groupBy(res,item=>item.category)
    let arr = []
    for(let i in obj){
        arr.push({
            name:categoryList[i],
            value:obj[i].length
        })
    }
    renderEcharts(arr)
}
function renderEcharts(data){
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '当前用户发布的新闻',
            subtext: '不同类别占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '类别',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
analyist()