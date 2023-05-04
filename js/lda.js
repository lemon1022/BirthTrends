(function (){

    var tab_list = document.querySelector('.tab_list');
    var lis = tab_list.querySelectorAll('li');
    var items = document.querySelectorAll('.item');
// for循环绑定点击事件
    for (var i = 0; i < lis.length; i++) {
        // 开始给5个小li 设置索引号
        lis[i].setAttribute('index', i);
        lis[i].onclick = function() {
            // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式

            // 干掉所有人 其余的li清除 class 这个类
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            // 留下我自己
            this.className = 'current';
            // 2. 下面的显示内容模块
            var index = this.getAttribute('index');
            // console.log(index);
            // 干掉所有人 让其余的item 这些div 隐藏
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none';
            }
            // 留下我自己 让对应的item 显示出来
            items[index].style.display = 'block';
        }
    }
}());


/*
[(0, '0.028*"人口" + 0.014*"免费" + 0.013*"房价" + 0.011*"专家" + 0.011*"百姓" + 0.010*"教育" + 0.009*"资本" + 0.009*"农村" + 0.007*"数量" + 0.007*"费用"'), (1, '0.017*"社会" + 0.017*"养不起" + 0.012*"退休" + 0.008*"延迟" + 0.008*"教育" + 0.008*"压力" + 0.007*"家庭" + 0.007*"男女" + 0.007*"成本" + 0.006*"发展"'), (2, '0.030*"结婚" + 0.019*"教育" + 0.016*"房子" + 0.014*"压力" + 0.009*"成本" + 0.009*"工作" + 0.009*"社会" + 0.009*"经济" + 0.008*"父母" + 0.007*"丁克"'), (3, '0.012*"父母" + 0.011*"责任" + 0.011*"负责" + 0.010*"自私" + 0.010*"人生" + 0.010*"讨厌" + 0.009*"结婚" + 0.007*"对象" + 0.007*"进步" + 0.007*"母亲"'), (4, '0.013*"养活" + 0.013*"韭菜" + 0.011*"不敢" + 0.011*"增长" + 0.006*"没钱" + 0.006*"研究" + 0.005*"子宫" + 0.005*"养不起" + 0.005*"负增长" + 0.005*"辛苦"'), (5, '0.013*"国家" + 0.011*"城市" + 0.009*"发展" + 0.007*"教育" + 0.006*"负责" + 0.006*"生存" + 0.005*"任务" + 0.005*"精力" + 0.005*"抚养" + 0.005*"人生"')]
 */



(function (){

    var myChart = echarts.init(document.querySelector(".chart1"));
    // console.log(111)
    //结婚,教育,房子,压力,成本,工作,社会,经济,父母,丁克
    // [154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();


(function (){

    var myChart = echarts.init(document.querySelector(".chart2"));
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function (){

    var myChart = echarts.init(document.querySelector(".chart3"));
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function (){

    var myChart = echarts.init(document.querySelector(".chart4"));
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function (){

    var myChart = echarts.init(document.querySelector(".chart5"));
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function (){

    var myChart = echarts.init(document.querySelector(".chart6"));
    var name = ['结婚','教育','房子','压力','成本','工作','社会','经济','父母','丁克']
    var num =[154.0, 110.0, 110.0, 55.0, 45.0, 44.0, 201.0, 104.0, 81.0, 43.0]
    let data=[]
    for (var i = 1; i <= 10; i ++) {
        data.push({
            "name": name[i-1],
            "num": num[i-1]
        })
    }
    function contains(arr, dst) {
        var i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }

    var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#EB3B5A" },
            { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#FA8231" },
            { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#F7B731" },
            { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#395CFE" },
            { offset: 1, color: "#2EC7CF" }
        ])
    ];
    var attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474"
    ];
    var attaData = [];
    var attaName = [];
    var topName=[]
    data.forEach((it, index) => {
        attaData[index] = parseFloat(it.num).toFixed(0);
        //attaData[index] = parseInt(it.num);
        attaName[index] = it.name;
        topName[index] = `${it.name}`
    });
    var salvProMax = [];
    var max = attaData[0];
    for (let i = 0; i < attaData.length; i++) {
        max = max < attaData[i+1] ? attaData[i+1] : max;
    }
    for (let i = 0; i < attaData.length; i++) {
        salvProMax.push(max);               //背景按最大值
    }
    function attackSourcesDataFmt(sData) {
        var sss = [];
        sData.forEach(function(item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
            };
            sss.push({
                value: item,
                itemStyle: itemStyle
            });
        });
        return sss;
    }

    var option = {
        // backgroundColor: "#000",
        tooltip: {
            show: false,
            backgroundColor: "rgba(3,169,244, 0.5)", //背景颜色（此时为默认色）
            textStyle: {
                fontSize: 16
            }
        },
        color: ["#F7B731"],
        legend: {
            show:false,
            pageIconSize: [12, 12],
            itemWidth: 20,
            itemHeight: 10,
            textStyle: {
                //图例文字的样式
                fontSize: 12,
                color: "#fff"
            },
            selectedMode: false,
            data: [""]
        },
        grid: {
            left: "5%",
            right: "2%",
            width:"80%",
            bottom: "2%",
            top: "8%",
            containLabel: true
        },
        xAxis: {
            type: "value",

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: [
            {                                      //左侧排行数字
                type: "category",
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisPointer: {
                    label: {
                        show: true,
                        //margin: 30
                    }
                },
                pdaaing: [5, 0, 0, 0],
                postion: "right",
                data: attaName,
                axisLabel: {
                    margin: 30,
                    fontSize: 12,
                    align: "left",
                    padding: [2, 0, 0, 0],
                    color: "#000",
                    rich: {
                        nt1: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[0],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            lineHeight: "5",
                            padding: [0, 1, 2, 1]
                            // padding:[0,0,2,0],
                        },
                        nt2: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[1],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt3: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[2],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            borderRadius: 100,
                            padding: [0, 1, 2, 1]
                        },
                        nt: {
                            color: "#fff",
                            backgroundColor: attackSourcesColor1[3],
                            width: 15,
                            height: 15,
                            fontSize: 12,
                            align: "center",
                            lineHeight: 3,
                            borderRadius: 100,
                            padding: [0, 1, 2, 1],
                            lineHeight: 5
                        }
                    },
                    formatter: function(value, index) {
                        index = contains(attaName, value) + 1;
                        if (index - 1 < 3) {
                            return ["{nt" + index + "|" + index + "}"].join("\n");
                        } else {
                            return ["{nt|" + index + "}"].join("\n");
                        }
                    }
                }
            },
            {                                       //右侧名字
                type: "category",
                inverse: true,
                axisTick: "none",
                axisLine: "none",
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: "12"
                    }
                },
                //data: attackSourcesDataFmt(attaName)
                data: attackSourcesDataFmt(attaData)  //数字
            },
            {                                   //名称
                type: 'category',
                offset: -10,
                position: "left",
                axisLabel: {
                    color: `#fff`,
                    fontSize: 10
                },
                axisLine: {
                    show: false
                },
                inverse: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: ["#fff"],
                    align: "left",
                    verticalAlign: "bottom",
                    lineHeight: 32,
                    fontSize: 12
                },
                data: topName
            },
        ],
        series: [
            {                                //条形图数值
                zlevel: 1,
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: "15px",
                animationDuration: 1500,
                data: attackSourcesDataFmt(attaData),
                align: "center",
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                },
                label: {
                    show: false,
                    fontSize: 12,
                    color: "#fff",
                    textBorderWidth: 2,
                    padding: [2, 0, 0, 0]
                }
            },
            {                           //最大值背景条形图
                name: "个人所得(亿元)",
                type: "bar",
                barWidth: 15,
                barGap: "-100%",
                margin: "20",
                data: salvProMax,
                textStyle: {
                    //图例文字的样式
                    fontSize: 12,
                    color: "#fff"
                },
                itemStyle: {
                    normal: {
                        color: "#05325F",
                        //width:"100%",
                        fontSize: 12,
                        barBorderRadius: 30
                    },
                }
            }
        ]
    };


    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();