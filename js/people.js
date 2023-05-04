// 男女比例

(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".gen_ratio"));


    var path = 'data/按年龄分性别比例.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    for (var i = 0; i < dataArray.length ; i++) {
        datas.push(dataArray[i].split(","));
    }
    var year = []
    var boy = []
    var girl = []
    var boy1 = []
    var boy2 = []
    var boy3 = []
    var rowdata1 = []
    for(var  i = 1; i < datas[0].length - 8; i++){
        year[i - 1] = datas[0][i]
        boy[i - 1] = datas[2][i]
        girl[i - 1] = datas[3][i]
        boy1[i - 1] = datas[4][i]
        boy2[i - 1] = datas[5][i]
        boy3[i - 1] = datas[6][i]
        rowdata1[i - 1] = boy[i - 1] - girl[i - 1]
    }
    /*43.47 	42.25 	42.50 	42.95 	43.26 	42.92 	43.10 	42.85 	42.33 	42.20 	42.96 	42.86 	42.40 	42.29 	41.36 	41.75 	42.25
    */
    // console.log(boy3)
    year.reverse()
    boy.reverse()
    boy1.reverse()
    boy2.reverse()
    boy3.reverse()
    girl.reverse()
    rowdata1.reverse()
    option = {

        toolbox: {
            show: true,
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}%<br/>{a2}:  {c2}%<br/>'
        },
        legend: {
            textStyle: {
                fontSize:12,
                color: '#fff'
            },
            pageNavigator: {
                show: true,
                orient: 'vertical',
                width: 20,
                height: 10,
                top: 'center',
                right: 5,
                textStyle: {
                    color: '#fff',
                    // fontSize:6
                }
            },

            color:'#fff',
            left: 'center',
            top: '10',
            selected: {
                '青年': true, // 在图例中显示图例1
                '中年': true, // 在图例中显示图例2
                '老年': true, // 在图例中显示图例3
                '男性比例':true,
                '女性比例':true
            },
            data: ['青年', '中年', '老年', '男性比例','女性比例'],

        },
        xAxis: {
            axisLabel: {
                textStyle: {
                    color: '#87CEFA'  // 设置x轴标签字体颜色为深灰色
                }
            },
            type: 'category',
            splitLine: {
                show: false
            },
            data: year
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '20%',
            bottom: '10%',
            containLabel: true
        },
        yAxis: [
            {
            type: 'value',
            scale: true,
            max: 51.5,
            min: 48.5,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}%',
                textStyle: {
                    color: '#87CEFA'  // 设置x轴标签字体颜色为深灰色
                }
            },
        },
            {
                type: 'value',
                scale: true,
                max: 60,
                min: 41,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#87CEFA'  // 设置x轴标签字体颜色为深灰色
                    }
                },

            }
        ],
        series: [{
            name: '女性比例',
            itemStyle: {
                normal: {
                    color: '#E51400', // 柱状条的颜色
                    borderWidth: 1 // 柱状条边框的宽度
                }
            },
            showSymbol: false,
            type: 'line',
            stack: '总量',
            smooth: true,
            data: girl

        },
            {
                name: '男性比例',
                type: 'line',
                showSymbol: false,
                markArea: {
                    zlevel: 3,
                    data: [
                        [{
                            xAxis: 2000,
                        }, {
                            xAxis: 2016,
                        }]
                    ]
                },
                smooth: true,
                stack: '总量',
                areaStyle: {
                    normal: {
                        color: '#A6A6A6',
                        opacity: 0.5
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                data: rowdata1
            },

            {
                name: '男性比例',
                type: 'line',
                showSymbol: false,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#FFFFFF', // 柱状条的颜色
                        borderWidth: 1 // 柱状条边框的宽度
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                data: boy,
            },

            {
                name: '青年',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#9FD39C' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#007B43' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#9FD39C' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#007B43' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderWidth: 1,// 柱状条边框的宽度
                    }
                }
                ,
                yAxisIndex: 1,
                data: boy1,
            },
            {
                name: '中年',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#F6D365' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#E8872E' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderColor: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: '#F6D365' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#E8872E' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderWidth: 1 // 柱状条边框的宽度
                    }
                }
                ,
                yAxisIndex: 1,
                data: boy2,
            },
            {
                name: '老年',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#8a2be2' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#ff69b4' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        borderColor: '#6084ba', // 柱状条边框的颜色
                        borderWidth: 1 // 柱状条边框的宽度
                    }
                },
                yAxisIndex: 1,
                data: boy3,
            },
        ]
    };
    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });

})();
// // 点位分布统计模块
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie"));
    // 2. 指定配置项和数据

    var names= ['青年', '中年', '老年'];
    var values1 = [16, 75, 9];
    var values2 = [18, 68, 14];
    var colorList = ['#fce348',  '#03acd1', '#fc2d8a'];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < names.length; i++) {
        data1.push({
            name: names[i],
            value: values1[i]
        })
    }
    for (var i = 0; i < names.length; i++) {
        data2.push({
            name: names[i],
            value: values2[i]
        })
    }
    data1.reverse();
    data2.reverse()
// 公用调整
    var itemStyle = {
        normal: {
            // borderColor: '#0A1934',
            borderWidth: 0.8,
            color: function(params) {
                return colorList[params.dataIndex]
            }
        }
    }
    var leftCenter = ['25%', '50%'],
        rightCenter = ['75%', '50%'],
        radius1 = ['50%', '60%'], // 饼图
        radius3 = ['70%', '72%'], // 线圈

        option = {
            // backgroundColor: '#0A1934',
            tooltip: {
                formatter: function (a) {
                    return a.name + ":  " + a.value + "%";
                },
                trigger: 'item',
            },
            title: [{
                text: '2011年',
                x: '18%',
                y: '46%',
                textStyle: {
                    color: '#559dbd',
                    fontSize: 14
                }
            },
                {
                    text: '2021年',
                    x: '67%',
                    y: '46%',
                    textStyle: {
                        color: '#559dbd',
                        fontSize: 14
                    }
                }
            ],
            series: [
                // 左饼图
                {
                    // 饼图圈
                    type: 'pie',
                    zlevel: 3,
                    radius: radius1,
                    center: leftCenter,
                    itemStyle: itemStyle,
                    labelLine: {
                        show: false,
                        normal: {
                            length: 5,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                return "●";
                            }
                        }
                    },
                    data: data1,
                },
                {
                    // 最外圆圈
                    type: 'pie',
                    zlevel: 1,
                    silent: true, //取消高亮
                    radius: radius3,
                    center: leftCenter,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        normal: {
                            length: 10,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        show: true
                    },
                    data: data1,
                },

                // 右饼图
                {
                    // 饼图圈
                    type: 'pie',
                    zlevel: 3,
                    radius: radius1,
                    center: rightCenter,
                    itemStyle: itemStyle,
                    labelLine: {
                        show: false,
                        normal: {
                            length: 5,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                return "●";
                            }
                        }
                    },
                    data: data2,
                },
                {
                    // 线圆圈
                    type: 'pie',
                    zlevel: 1,
                    silent: true, //取消高亮
                    radius: radius3,
                    center: rightCenter,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        normal: {
                            length: 10,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        show: true
                    },
                    data: data2,
                },
            ]
        };


    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();


(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".radar"));
    // 2. 指定配置项和数据

    var names= ['未受教育', '小学', '初中','高中','大专及以上'];
    var values2 = [51186, 365918, 487144,233626,264467];
    var values1 = [58732, 294232, 441905,165049,107348];
    var sum = 0;
    for (var i = 0; i < 5; i ++) {
        sum += values2[i];
    }
    for (var i = 0; i < 5; i ++) {
        values2[i] = (values2[i] / sum * 100) . toFixed(2);
    }
    sum = 0
    for (var i = 0; i < 5; i ++) {
        sum += values1[i];
    }
    for (var i = 0; i < 5; i ++) {
        values1[i] = (values1[i] / sum * 100) . toFixed(2);
    }
    var colorList = ['#03acd1', '#8B00FF', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < names.length; i++) {
        data1.push({
            name: names[i],
            value: values1[i]
        })
    }
    for (var i = 0; i < names.length; i++) {
        data2.push({
            name: names[i],
            value: values2[i]
        })
    }
    data1.reverse();
    data2.reverse()
// 公用调整
    var itemStyle = {
        normal: {
            // borderColor: '#0A1934',
            borderWidth: 0.8,
            color: function(params) {
                return colorList[params.dataIndex]
            }
        }
    }
    var leftCenter = ['25%', '50%'],
        rightCenter = ['75%', '50%'],
        radius1 = ['50%', '60%'], // 饼图
        radius3 = ['70%', '72%'], // 线圈
        // 公用调整-end

        option = {
            // backgroundColor: '#0A1934',
            tooltip: {
                trigger: 'item',
                formatter: function (a) {
                    return a.name + ":  " + a.value + "%";
                }
            },
            title: [{
                text: '2011年',
                x: '17%',
                y: '46%',
                textStyle: {
                    color: '#559dbd',
                    fontSize: 14
                }
            },
                {
                    text: '2021年',
                    x: '68%',
                    y: '46%',
                    textStyle: {
                        color: '#559dbd',
                        fontSize: 14
                    }
                }
            ],
            series: [
                // 左饼图
                {
                    // 饼图圈
                    type: 'pie',
                    zlevel: 3,
                    radius: radius1,
                    center: leftCenter,
                    itemStyle: itemStyle,
                    labelLine: {
                        show: false,
                        normal: {
                            length: 5,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        fontSize: "0.5rem", // 设置文字大小
                        normal: {
                            formatter: function (params) {
                                return "●";
                            }
                        }
                    },
                    data: data1,
                },
                {
                    // 最外圆圈
                    type: 'pie',
                    zlevel: 1,
                    silent: true, //取消高亮
                    radius: radius3,
                    center: leftCenter,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        normal: {
                            length: 10,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        // fontSize: "0.01rem",
                        show: true
                    },
                    data: data1,
                },

                // 右饼图
                {
                    // 饼图圈
                    type: 'pie',
                    zlevel: 3,
                    radius: radius1,
                    center: rightCenter,
                    itemStyle: itemStyle,
                    labelLine: {
                        show: false,
                        normal: {
                            length: 5,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: function (params) {
                                return "●";
                            }
                        }
                    },
                    data: data2,
                },
                {
                    // 线圆圈
                    type: 'pie',
                    zlevel: 1,
                    silent: true, //取消高亮
                    radius: radius3,
                    center: rightCenter,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                        normal: {
                            length: 10,
                            length2: 0,
                            lineStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    label: {
                        show: true
                    },
                    data: data2,
                },
            ]
        };


    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".averLife"));


    var path = 'data/受教育程度.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    var year = []
    for (var i = 0; i < dataArray.length ; i++) {
        datas.push(dataArray[i].split(","));
    }
    var boy = []
    var girl = []
    var rowdata1 = []
    for(var  i = 1; i < datas[0].length; i++){
        year[i-1] = datas[0][i]
        boy[i - 1] = datas[19][i]
        girl[i - 1] = datas[20][i]
        rowdata1[i - 1] =  girl[i - 1] - boy[i - 1]
    }
    rowdata1.reverse()
    year.reverse()
    boy.reverse()
    girl.reverse()

    option = {

        toolbox: {
            show: true,
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}%<br/>{a2}:  {c2}%<br/>'
        },

        legend: {
            textStyle: {
                color: '#fff'
            },
            pageNavigator: {
                show: true,
                orient: 'vertical',
                width: 40,
                height: 20,
                top: 'center',
                right: 10,
                textStyle: {
                    color: '#fff'
                }
            },

            color:'#fff',
            left: 'center',
            top: '28',
            selected: {
                '男性比例':true,
                '女性比例':true
            },
            data: ['男性','女性'],

        },
        xAxis: {
            axisLabel: {
                textStyle: {
                    color: '#87CEFA'  // 设置x轴标签字体颜色为深灰色
                }
            },
            type: 'category',
            splitLine: {
                show: false
            },
            data: year
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '20%',
            bottom: '10%',
            containLabel: true
        },
        yAxis: [
            {
                type: 'value',
                scale: true,
                max: 10,
                min: 0,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#87CEFA'  // 设置x轴标签字体颜色为深灰色
                    }
                },

            },
        ],
        series: [{
            name: '男性',
            itemStyle: {
                normal: {
                    color: '#FFFFFF', // 柱状条的颜色
                    borderWidth: 1 ,// 柱状条边框的宽度

                }
            },
            lineStyle: {
                normal: {
                    type: 'dashed'
                }
            },
            showSymbol: false,
            type: 'line',
            stack: '总量',
            smooth: true,
            data: boy

        },
            {
                name: '女性',
                type: 'line',
                showSymbol: false,
                markArea: {
                    zlevel: 3,
                    data: [
                        [{
                            xAxis: 2000,
                        }, {
                            xAxis: 2016,
                        }]
                    ]
                },
                smooth: true,
                stack: '总量',
                areaStyle: {
                    normal: {
                        color: '#A6A6A6',
                        opacity: 0.5
                    }
                },
                lineStyle: {
                    normal: {
                        // type: 'dashed'
                    }
                },
                data: rowdata1
            },

            {
                name: '女性',
                type: 'line',
                showSymbol: false,
                smooth: true,
                itemStyle: {
                    normal: {
                        color: '#E51400', // 柱状条的颜色
                        borderWidth: 1 // 柱状条边框的宽度
                    }
                },

                lineStyle: {
                    normal: {
                        // type: 'dashed'
                    }
                },
                data: girl,
            },
        ]
    };
    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });

})();

// 全国劳动力数量统计
(function() {
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/就业人数.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    for (var i = 0; i < dataArray.length ; i++) {
        datas.push(dataArray[i].split(","));
    }
    var year = []
    var num = []
    for(var  i = 1; i < datas[2].length - 17; i++){
        year[i-1] = datas[0][i]
        num[i-1] = datas[2][i]

    }
    year.reverse()
    num.reverse()

    // console.log(year)


    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar"));
    // 2. 指定配置和数据


    var option = {
        backgroundColor: 'RGB(0, 0, 0, 0.3)',

        legend: {
            orient:'vertical',
            right:'1%',
            data: ['就业人数'],
            textStyle: {
                color: 'rgb(174,237,255)'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        textStyle: {
            color: '#32cbd7',
            fontSize: '10px'
        },
        grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        calculable: true,
        xAxis: [{
            name: '年份',
            show: true,
            type: 'category',
            boundaryGap: false,
            data: year,
            axisLine: {
                show: true,
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 10],
                lineStyle: {
                    color: 'rgb(20,203,215,0.2)'
                }
            },
            //刻度线是否显示
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 4,
                show: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    // 使用深浅的间隔色
                    color: 'rgb(20,203,215,0.2)'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            name: '人数/万人',
            axisLine: {
                show: true,
                symbol: ['none', 'arrow'],
                symbolSize: [10, 10],
                symbolOffset: [0, 10],
                lineStyle: {
                    color: 'rgb(20,203,215,0.2)'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgb(20,203,215,0.2)'
                }
            }
        }],
        series: [{
            name: '就业人数',
            type: 'line',
            symbol: 'none',
            itemStyle: {
                normal: {
                    color: 'rgb(174,237,255)',
                    lineStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [{
                                offset: 0,
                                color: 'rgb(174,237,255)'
                            },
                                {
                                    offset: 0.5,
                                    color: 'rgb(174,237,255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(148,135,255)'
                                }
                            ]
                        )
                    }
                }
            },
            data: num,
        }, ]
    };


    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function() {
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/失业率.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    for (var i = 0; i < dataArray.length ; i++) {
        datas.push(dataArray[i].split(","));
    }
    var year = []
    var rate = []
    var num = []
    for(var  i = 2; i < datas[0].length - 5; i++){
        year[i - 2] = datas[0][i]
        num[i - 2] = datas[1][i]
        rate[i - 2] = datas[2][i]
    }
    year.reverse()
    rate.reverse()
    num.reverse()
    // console.log(rate)


    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".lossbar"));
    // 2. 指定配置和数据
    option = {
        color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0,
            0,
            0,
            1,
            [
                { offset: 0, color: "#00fffb" }, // 0 起始颜色
                { offset: 1, color: "#0061ce" } // 1 结束颜色
            ]
        ),
        toolbox: {
            show: true,

            // feature: {
            //     saveAsImage: {
            //         pixelRatio: 5
            //     }
            // }
        },
        tooltip: {
            // formatter: '{b}<br/>{a0}: {c0}%',
            trigger: 'axis',
            axisPointer: {
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: "0%",
            right: "3%",
            bottom: "3%",
            top: "3%",
            show:true,
            containLabel: true,
            borderColor: "rgba(0, 240, 255, 0.3)"
        },
        legend: {
            left: 'center',
            top: '50',
            data: ['劳动力比例', '劳动力总数'],
            textStyle: {
                color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
        },
        xAxis: {

            axisTick: {
                alignWithLabel: false,
                // 把x轴的刻度隐藏起来
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(0, 240, 255, 0.3)"
                    // width: 3
                }
            },

            axisLabel: {
                rotate: 0,
                color: '#4c9bfd',
                fontFamily: 'Microsoft YaHei'
            },
            type: 'category',
            splitLine: {
                show: false
            },
            data: year
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '15%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: [{
            axisTick: {
                alignWithLabel: false,
                // 把y轴的刻度隐藏起来
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(0, 240, 255, 0.3)"
                    // width: 3
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(0, 240, 255, 0.3)"
                }
            },
            type: 'value',
            scale: true,

            // splitLine: {
            //     show: false
            // },
            axisLabel: {
                formatter: '{value}%',
                color: '#4c9bfd',

            },
        },
            {
                type: 'value',
                name: '万人',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd',
                }
            }
        ],

        series: [{
            name: '失业率',
            color: '#FFFFFF',
            type: 'line',
            smooth: true,
            data: rate
        },
            {
                name: '失业人数',
                type: 'bar',
                barWidth: "52%",
                barBorderRadius: 55,
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#956FD4'},
                                {offset: 1, color: '#3EACE5'}
                            ]
                        )
                    }
                },
                itemStyle: {
                    opacity: 1
                },
                yAxisIndex: 1,
                data: num,
            },
        ]
    };
    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

//就业结构

(function() {
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/行业.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    for (var i = 0; i < dataArray.length ; i++) {
        datas.push(dataArray[i].split(","));
    }

    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    var data_year_rang=[]
    var data_dd = []
    // console.log(datas[0].length)
    for (var i = 1; i < datas[0].length-1; i ++) {
        var trade_range = []
        for (var j = 2;  j <= 9; j  ++) {
            trade_range.push(datas[j][i]);
        }
        data_year_rang.push(datas[0][i]);
        item = {
            'dim_year': datas[0][i],
            'radar_indicator': [{
                name: '制造业',
                max: datas[2][20]
            }, {
                name: '建筑业',
                max: datas[3][20]
            }, {
                name: '信息技术',
                max: datas[4][20]
            }, {
                name: '金融业',
                max: datas[5][20]
            }, {
                name: '房地产业',
                max: datas[6][20]
            }, {
                name: '教育业',
                max: datas[7][20]
            }, {
                name: '卫生和社会工作',
                max: datas[8][20]
            },
            {
                name: '公共管理',
                max: datas[9][20]
            }],
            'trade_range': trade_range
        };
        data_dd.push(item)
    }

    data_dd.reverse()
    data_year_rang.reverse()
    // console.log(data_dd)
    // console.log(data_year_rang)

    var options = []
    for (var i = 0; i < datas[0].length-2; i ++) {
        var options_item = {}
        var text_item = {}
        text_item.text = data_dd[i].dim_year

        // 设置字体样式
        text_item.textStyle = {
            color: '#fff', // 字体颜色
            fontSize: 18, // 字体大小
            fontWeight: 'bold' // 字体粗细
        }
        options_item.title = text_item
        text_item = {}
        text_item.indicator = data_dd[i].radar_indicator
        options_item.radar = text_item
        text_item = {}
        var series_list = []
        var series_dict = {}
        var value_dict = {}
        var data_list = []
        value_dict.value = data_dd[i].trade_range
        data_list.push(value_dict)
        series_dict.data = data_list
        series_list.push(series_dict)
        options_item.series = series_list
        options.push(options_item)
    }
    // console.log([options])
    option = {

        baseOption: {

            title: {
                top: 'center',
                left: 'center',
            },
            radar: {
                radius: '80%',  // 控制雷达图大小
                center: ['50%', '50%'],  // 雷达图位置
            },
            timeline: {
                show: false, //是否显示
                left: 10,
                top: 10,
                right: 6,
                autoPlay: true, //自动播放
                playInterval: 1000, //播放间隔
                axisType: 'category',
                inverse: false, //是否反向放置 timeline，反向则首位颠倒过来。
                symbol: 'circle',
                symbolSize: 0,
                itemStyle: { //轴的图形样式
                    normal: {
                        color: '#04a5f1'
                    },
                    emphasis: {
                        color: '#04a5f1'
                    }
                },
                label: { //轴的文本标签样式
                    normal: {
                        show: true,
                        color: '#04a5f1'
                    },
                    emphasis: {
                        color: '#04a5f1'
                    }

                },
                lineStyle: { //轴线控制
                    show: false,
                    color: '#ddd'
                },
                checkpointStyle: { //当前选择项的样式
                    symbolSize: 0,
                    color: '#04a5f1',
                    borderColor: 'rgba(4, 165, 261, .5)'
                },
                controlStyle: { //控制按钮样式
                    // show: false,
                },
                data: data_year_rang,

            },
            tooltip: {
                formatter: function (params) {
                    // '制造业','建筑业','信息技术','金融业','房地产业','教育业', '卫生和社会工作','公共管理',
                    return "制造业:  " + params.value[0] + "万人" + "<br>" +
                        "建筑业:  " + params.value[1] + "万人" + "<br>" +
                        "信息技术:  " + params.value[2] + "万人" + "<br>" +
                        "金融业:  " + params.value[3] + "万人" + "<br>" +
                        "房地产业:  " + params.value[4] + "万人" + "<br>" +
                        "教育业:  " + params.value[5] + "万人" + "<br>" +
                        "卫生和社会工作:  " + params.value[6] + "万人" + "<br>" +
                        "公共管理:  " + params.value[7] + "万人" + "<br>"
                }
            },
            legend: {
                //data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            },

            series: [{
                name: '',
                type: 'radar',
                areaStyle: {
                    normal: {
                        color: '#3399FF'

                    }
                },
                itemStyle: {
                    color: '#59abe1',
                    borderColor: '#59abe1'
                },

            }]
        },

        options: options
    };
    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

