
(function() {
    $(".monitor .tabs").on("click", "a", function() {
        $(this)
            .addClass("active")
            .siblings("a")
            .removeClass("active");

        // console.log($(this).index());
        //   选取对应索引号的content
        $(".monitor .content")
            .eq($(this).index())
            .show()
            .siblings(".content")
            .hide();
    });
    // 1. 先克隆marquee里面所有的行（row）
    $(".marquee-view .marquee").each(function() {
        // console.log($(this));
        var rows = $(this)
            .children()
            .clone();
        $(this).append(rows);
    });
})();

//中国近20年人口总数
(function() {
    // console.log(deal(70011))
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/总人口、男性人口、女性人口、城镇人口、乡村人口近50年数据.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    // console.log(dataArray)
    var datas = [];
    for (var i = 0; i < dataArray.length; i++) {
        // 将 CSV 中的每一行拆分为由逗号分隔的数组
        datas.push(dataArray[i].split(","));
    }

    // console.log(datas)q
    var tbody = document.getElementsByClassName('marquee')[0];

    for (var i = datas[0].length-30; i >= 0; i --) { // 外面的for循环管行 tr

        var div= document.createElement('div');
        div.classList.add("row");

        for (var j = 0; j <= 3; j ++) {
            var span = document.createElement('span');
            span.classList.add("col");

            span.innerHTML = deal(datas[j][i+1]);
            div.appendChild(span);
        }

        tbody.appendChild(div);
    }


})();

(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie"));
    // 2. 指定配置项和数据

    // import echarts from 'echarts'
    var charts = { // 按顺序排列从大到小
        cityList: ['广东','山东','河南','江苏','四川'],
        cityData: [12684, 10170, 9883, 8505, 8372]
    }
    var top10CityList = charts.cityList
    var top10CityData = charts.cityData
    var color = ['rgba(248,195,248', 'rgba(100,255,249', 'rgba(135,183,255', 'rgba(248,195,248', 'rgba(100,255,249']

    let lineY = []
    for (var i = 0; i < charts.cityList.length; i++) {
        var x = i
        if (x > color.length - 1) {
            x = color.length - 1
        }
        var data = {
            name: charts.cityList[i],
            color: color[x] + ')',
            value: top10CityData[i],
            itemStyle: {
                normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: color[x] + ', 0.3)'
                    }, {
                        offset: 0.8,
                        color: color[x] + ', 1)'
                    }], false),
                    barBorderRadius: 10
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }

        lineY.push(data)
    }

    option= {
        // backgroundColor:'#000',
        title: {
            show: false
        },
        tooltip: {
            trigger: 'item',
            formatter: function (a, b) {
                return a.name + ": " + deal(a.value) + "万人";
            }
        },
        grid: {
            borderWidth: '0.25rem',
            top: '3%',
            left: '0%',
            right: '2%',
            bottom: '3%'
        },
        color: color,
        yAxis: [{

            type: 'category',
            inverse: true,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {

                show: false,
                inside: false
            },
            data: top10CityList
        }, {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: top10CityData
        }],
        xAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            }
        },
        series: [{
            name: '',
            type: 'bar',
            zlevel: 2,
            barWidth: '9.5rem',
            data: lineY,
            animationDuration: 1500,
            label: {
                normal: {
                    color: '#b3ccf8',
                    show: true,
                    position: ['1.5rem', '0.5rem'],
                    textStyle: {
                        fontSize: 16
                    },
                    formatter: function (a, b) {
                        return a.name
                    }
                }
            }
        }],
        animationEasing: 'cubicOut'
    }



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
    var path = 'data/劳动力近50年数据.csv';
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
    var lab = []
    var labper = []
    for(var  i = 2; i < datas[0].length - 13; i++){
        year[i - 2] = datas[0][i]
        lab[i - 2] = datas[1][i]
        labper[i - 2] = datas[3][i]
    }
    year.reverse()
    lab.reverse()
    labper.reverse()
    // console.log(labper)


    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar"));
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
            formatter: function (params) {
                var labper = params[0].data;
                var lab = params[1].data;
                return params[0].name + "<br>" +"劳动力比例：" + labper + "%" + "<br/>劳动力总数：" + deal(lab) + "万人";
            },
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
                color: "#4c9bfd"
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
                },
            }
        ],

        series: [{
            name: '劳动力占比',
            color: '#FFFFFF',
            type: 'line',
            smooth: true,
            data: labper
        },
            {
                name: '劳动力数量',
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
                    opacity: 1,

                },
                yAxisIndex: 1,
                data: lab,
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

// 人口增长率
(function() {
    // (1)准备数据
    var path = 'data/人口出生率、死亡率、自然增长率近50年数据.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var data = [];
    for (var i = 0; i < dataArray.length; i++) {
        // 将 CSV 中的每一行拆分为由逗号分隔的数组
        data.push(dataArray[i].split(","));
    }
    // console.log(data[0])
    var year = []
    var birth = []
    var death = []
    var com =[]
    for(var  i = 1; i < data[0].length ; i++){
        year[i-1] = data[0][i]
        birth[i-1] = data[1][i]
        death[i-1] = data[2][i]
        com[i-1] = data[3][i]
    }
    year.reverse()
    birth.reverse()
    death.reverse()
    com.reverse()

    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    var option = {
        color: ["#00f2f1", "#eacf19","#ed3f35"],
        tooltip: {
            // 通过坐标轴来触发
            trigger: "axis",
            formatter: function (params) {
                var labper = params[0].data;
                var lab = params[1].data;
                return "劳动力比例：" + labper + "%" + "<br/>劳动力总数：" + lab + "万人";
            }
        },
        legend: {
            // 距离容器10%
            // top:"-3%",
            right: "10%",
            // 修饰图例文字的颜色
            textStyle: {
                color: "#4c9bfd",
                fontSize:8,
                // fontSize:"0.5rem",
                // fontSize: "0.1rem",
            }
        },
        grid: {
            top: "12%",
            left: "3%",
            right: "7%",
            bottom: "4%",
            show: true,
            borderColor: "#012f4a",
            containLabel: true
        },

        xAxis: {
            type: "category",
            boundaryGap: false,
            data: year,
            // 去除刻度
            axisTick: {
                show: false
            },
            // 修饰刻度标签的颜色
            axisLabel: {
                color: "#4c9bfd"
            },
            // 去除x坐标轴的颜色
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: "value",
            // scale:true,
            max : 30,
            min: -10,
            // 去除刻度
            axisTick: {
                show: false
            },
            // 修饰刻度标签的颜色
            axisLabel: {
                color: "#4c9bfd"
            },
            // 修改y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "#012f4a"
                }
            }
        },
        series: [
            {
                name: "自然增长率",
                type: "line",
                showSymbol: false,
                // stack: "总量",
                smooth: true,
                data: com,
                yAxisIndex: 0
            },
            {
                name: "出生率",
                type: "line",
                showSymbol: false,
                // stack: "总量",
                // 是否让线条圆滑显示
                smooth: true,
                data: birth,
                yAxisIndex: 0
            },
            {
                name: "死亡率",
                type: "line",
                showSymbol: false,
                // stack: "总量",
                smooth: true,
                data: death,
                yAxisIndex: 0
            }
        ]
    };
    // 3. 把配置和数据给实例对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();


(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".data .radar"));
    // 2.指定配置

    var angle = 0;
    var value = 65.22;
    // console.log("first" + value)
    option = {
        // backgroundColor:"#061740",
        title: {
            text: '{a|'+ value +'}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich:{
                    a: {
                        fontSize: 20,
                        color: '#29EEF3'
                    },

                    c: {
                        fontSize: 20,
                        color: '#ffffff',
                    }
                }
            }
        },
        legend: {
            'ring5':false
        },
        series: [ {

            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                        startAngle: (0+angle) * Math.PI / 180,
                        endAngle: (90+angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 3
                    },
                    silent: true
                };
            },
            data: [0]
        }, {

            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                        startAngle: (180+angle) * Math.PI / 180,
                        endAngle: (270+angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                        startAngle: (270+-angle) * Math.PI / 180,
                        endAngle: (40+-angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 3
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                        startAngle: (90+-angle) * Math.PI / 180,
                        endAngle: (220+-angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                let point = getCirlPoint(x0, y0, r, (90+-angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#0CD3DB",//粉
                        fill: "#0CD3DB"
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                let point = getCirlPoint(x0, y0, r, (270+-angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#0CD3DB",      //绿
                        fill: "#0CD3DB"
                    },
                    silent: true
                };
            },
            data: [0]
        }, {

            type: 'pie',
            radius: ['58%', '45%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    position: "center",

                }
            },
            data: [{
                value: value,
                name: "",
                itemStyle: {
                    normal: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#4FADFD' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#28E8FA' // 100% 处的颜色
                            }]
                        },
                    }
                }
            },
                {
                    value: 100-value,
                    name: "",
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#173164"
                        }
                    }
                }
            ]
        },

            {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 60,
                    lineStyle: {
                        width: 5,
                        color: "rgb(6,23,64,0.2)"
                    }
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        opacity: 0
                    }
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0,
                    name: ""
                }]
            },

        ]
    };

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
            x: x1,
            y: y1
        }
    }

    function draw(){
        value = 65.22;
        option = {
            // backgroundColor:"#061740",
            title: {
                text: '{a|'+ value +'}{c|%}',
                x: 'center',
                y: 'center',
                textStyle: {
                    rich:{
                        a: {
                            fontSize: 20,
                            color: '#29EEF3'
                        },

                        c: {
                            fontSize: 20,
                            color: '#ffffff',
                        }
                    }
                }
            },
            legend: {
                'ring5':false
            },
            series: [ {

                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                            startAngle: (0+angle) * Math.PI / 180,
                            endAngle: (90+angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 3
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {

                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                            startAngle: (180+angle) * Math.PI / 180,
                            endAngle: (270+angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                            startAngle: (270+-angle) * Math.PI / 180,
                            endAngle: (40+-angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 3
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                            startAngle: (90+-angle) * Math.PI / 180,
                            endAngle: (220+-angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                    let point = getCirlPoint(x0, y0, r, (90+-angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#0CD3DB",//粉
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                    let point = getCirlPoint(x0, y0, r, (270+-angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#0CD3DB",      //绿
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {

                type: 'pie',
                radius: ['58%', '45%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        position: "center",

                    }
                },
                data: [{
                    value: value,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#4FADFD' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#28E8FA' // 100% 处的颜色
                                }]
                            },
                        }
                    }
                },
                    {
                        value: 100-value,
                        name: "",
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#173164"
                            }
                        }
                    }
                ]
            },

                {
                    name: "",
                    type: "gauge",
                    radius: "58%",
                    center: ['50%', '50%'],
                    startAngle: 0,
                    endAngle: 359.9,
                    splitNumber: 8,
                    hoverAnimation: true,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 60,
                        lineStyle: {
                            width: 5,
                            color: "rgb(6,23,64,0.2)"
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    detail: {
                        show: false
                    },
                    data: [{
                        value: 0,
                        name: ""
                    }]
                },

            ]
        };
        angle = angle+3
        myChart.setOption(option, true)
        //window.requestAnimationFrame(draw);
    }

    setInterval(function() {
        //用setInterval做动画感觉有问题
        draw()
    }, 100);


    // 3.把配置和数据给对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();


(function() {
    // 1. 实例化对象
    myChart = echarts.init(document.querySelector(".chart .radar2"));
    // 2.指定配置
    var angle = 0;

    var value = 53.11;

    option = {
        // backgroundColor:"#061740",
        title: {
            text: '{a|'+ value +'}{c|%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich:{
                    a: {
                        fontSize: 20,
                        color: '#29EEF3'
                    },

                    c: {
                        fontSize: 20,
                        color: '#ffffff',
                    }
                }
            }
        },
        legend: {
            'ring5':false
        },
        series: [ {

            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                        startAngle: (0+angle) * Math.PI / 180,
                        endAngle: (90+angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 3
                    },
                    silent: true
                };
            },
            data: [0]
        }, {

            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                        startAngle: (180+angle) * Math.PI / 180,
                        endAngle: (270+angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                        startAngle: (270+-angle) * Math.PI / 180,
                        endAngle: (40+-angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 3
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                return {
                    type: 'arc',
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                        startAngle: (90+-angle) * Math.PI / 180,
                        endAngle: (220+-angle) * Math.PI / 180
                    },
                    style: {
                        stroke: "#0CD3DB",
                        fill: "transparent",
                        lineWidth: 1.5
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                let point = getCirlPoint(x0, y0, r, (90+-angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#0CD3DB",//粉
                        fill: "#0CD3DB"
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'custom',
            coordinateSystem: "none",
            renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                let point = getCirlPoint(x0, y0, r, (270+-angle))
                return {
                    type: 'circle',
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 4
                    },
                    style: {
                        stroke: "#0CD3DB",      //绿
                        fill: "#0CD3DB"
                    },
                    silent: true
                };
            },
            data: [0]
        }, {

            type: 'pie',
            radius: ['58%', '45%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    position: "center",

                }
            },
            data: [{
                value: value,
                name: "",
                itemStyle: {
                    normal: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#4FADFD' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#28E8FA' // 100% 处的颜色
                            }]
                        },
                    }
                }
            },
                {
                    value: 100-value,
                    name: "",
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#173164"
                        }
                    }
                }
            ]
        },

            {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                    show: false
                },
                splitLine: {
                    length: 60,
                    lineStyle: {
                        width: 5,
                        color: "rgb(6,23,64,0.2)"
                    }
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        opacity: 0
                    }
                },
                detail: {
                    show: false
                },
                data: [{
                    value: 0,
                    name: ""
                }]
            },

        ]
    };

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
            x: x1,
            y: y1
        }
    }

    function draw(){
        value = 53.11;
        option = {
            // backgroundColor:"#061740",
            title: {
                text: '{a|'+ value +'}{c|%}',
                x: 'center',
                y: 'center',
                textStyle: {
                    rich:{
                        a: {
                            fontSize: 20,
                            color: '#29EEF3'
                        },

                        c: {
                            fontSize: 20,
                            color: '#ffffff',
                        }
                    }
                }
            },
            legend: {
                'ring5':false
            },
            series: [ {

                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                            startAngle: (0+angle) * Math.PI / 180,
                            endAngle: (90+angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 3
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {

                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                            startAngle: (180+angle) * Math.PI / 180,
                            endAngle: (270+angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                            startAngle: (270+-angle) * Math.PI / 180,
                            endAngle: (40+-angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 3
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    return {
                        type: 'arc',
                        shape: {
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                            startAngle: (90+-angle) * Math.PI / 180,
                            endAngle: (220+-angle) * Math.PI / 180
                        },
                        style: {
                            stroke: "#0CD3DB",
                            fill: "transparent",
                            lineWidth: 1.5
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                    let point = getCirlPoint(x0, y0, r, (90+-angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#0CD3DB",//粉
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {
                type: 'custom',
                coordinateSystem: "none",
                renderItem: function(params, api) {
                    let x0 = api.getWidth() / 2;
                    let y0 = api.getHeight() / 2;
                    let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                    let point = getCirlPoint(x0, y0, r, (270+-angle))
                    return {
                        type: 'circle',
                        shape: {
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            stroke: "#0CD3DB",      //绿
                            fill: "#0CD3DB"
                        },
                        silent: true
                    };
                },
                data: [0]
            }, {

                type: 'pie',
                radius: ['58%', '45%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                    normal: {
                        position: "center",

                    }
                },
                data: [{
                    value: value,
                    name: "",
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#4FADFD' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#28E8FA' // 100% 处的颜色
                                }]
                            },
                        }
                    }
                },
                    {
                        value: 100-value,
                        name: "",
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#173164"
                            }
                        }
                    }
                ]
            },

                {
                    name: "",
                    type: "gauge",
                    radius: "58%",
                    center: ['50%', '50%'],
                    startAngle: 0,
                    endAngle: 359.9,
                    splitNumber: 8,
                    hoverAnimation: true,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        length: 60,
                        lineStyle: {
                            width: 5,
                            color: "rgb(6,23,64,0.2)"
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            opacity: 0
                        }
                    },
                    detail: {
                        show: false
                    },
                    data: [{
                        value: 0,
                        name: ""
                    }]
                },

            ]
        };
        angle = angle+3
        myChart.setOption(option, true)
        //window.requestAnimationFrame(draw);
    }

    setInterval(function() {
        //用setInterval做动画感觉有问题
        draw()
    }, 100);


    // 3.把配置和数据给对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

function deal(x) {
    if (x >= 10000) {
        var x1 = Math.floor(x / 10000);
        var x2 = x % 10000;
        var y2 = "";
        for (var i = 1; i <= 4 - x2.toString().length; i ++) y2 += '0';
        return x1.toString() + "," + y2 + x2.toString();
    }
    return x;

};


/*



 */

// 预期寿命
(function() {

    // 1. 实例化对象
    // var myChart = echarts.init(document.querySelector(".bar"));
    var myChart = echarts.init(document.querySelector(".averLife"));

    // 统计百分比
    var expL = []
    var expg = []
    var expb = []
    var year = []

    // (1)准备数据
    var path = 'data/平均寿命数据.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();
    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var data = [];
    for (var i = 0; i < dataArray.length; i++) {
        // 将 CSV 中的每一行拆分为由逗号分隔的数组
        data.push(dataArray[i].split(","));
    }
    for(var  i = 1; i < data[0].length ; i++){
        year[i-1] = data[0][i]
        expL[i-1] = data[1][i]
        expb[i-1] = data[2][i]
        expg[i-1] = data[3][i]
    }
    year.reverse()
    expL.reverse()
    expg.reverse()
    expb.reverse()
    var json = {
        chart0: {
            xcategory: year,
            low: expL,
            lowLine: [],
        }
    };
    var json2 = {
        chart0: {
            xcategory: year,
            low: expg,
            lowLine: [],
        }
    };
    var json3 = {
        chart0: {
            xcategory: year,
            low: expb,
            lowLine: [],
        }
    };
    var zrUtil = echarts.util;
    zrUtil.each(json.chart0.xcategory, function(item, index) {
        json.chart0.lowLine.push([{
            coord: [index, json.chart0.low[index]]
        }, {
            coord: [index + 1, json.chart0.low[index + 1]]
        }]);
    });
    zrUtil.each(json.chart0.xcategory, function(item, index) {
        json2.chart0.lowLine.push([{
            coord: [index, json2.chart0.low[index]]
        }, {
            coord: [index + 1, json2.chart0.low[index + 1]]
        }]);
    });
    zrUtil.each(json.chart0.xcategory, function(item, index) {
        json3.chart0.lowLine.push([{
            coord: [index, json3.chart0.low[index]]
        }, {
            coord: [index + 1, json3.chart0.low[index + 1]]
        }]);
    });

    var option = {
        backgroundColor: 'rgba(0,0,0,.2)',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#15ecf4'
                }
            },
            backgroundColor: 'rgba(0,0,0,.8)',
            extraCssText: 'box-shadow: 2px 1px 1px rgba(21, 250, 255,.2);',
            formatter: function(params) {
                var result = params[0].name + '<br>';
                params.forEach(function(item) {
                    result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
                    // 判断设置增长还是降低
                    if (parseFloat(item.data) >= 73) {
                        result += item.seriesName + ": " + '<span class="growth">' + item.data + "</span><br>"
                    } else if (parseFloat(item.data) < 73) {
                        result += item.seriesName + ": " + '<span class="reduce">' + item.data + "</span><br>"
                    }
                });
                return result;
            }
        },
        legend: {
            //当图例过长或过多时会显示不全
            selected: {
                '男': true, // 在图例中显示图例1
                '女': true, // 在图例中显示图例2
                '总': true // 在图例中显示图例3
            },
            data: ['总', '男','女'],
            textStyle: {
                fontSize: 12,
                color: 'rgb(0,253,255,0.6)'
            },
            top: '5%',
            right: '20%'
        },
        grid: {
            bottom: 24  ,
            left: 32,
            right: 20,
        },
        xAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#15faff',
                },

            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true
            },
            data: year,
        },
        yAxis: {
            max: 81,
            min : 65,
            splitNumber: 4,
            interval: 4,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#4b4d64'
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#ffffff'
                }
            },
        },

        series: [



            {
                name: '总',
                type: 'line',
                symbol: 'circle',
                symbolSize: 6,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 204,1, .9)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(6, 8, 41,.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 6
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ffcb00'
                    }
                },
                data: expL
            },
            {
                name: '总',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                zlevel: 1,
                smooth: true,
                symbol: 'circle',
                effect: {
                    show: true,
                    // smooth: true,
                    period: 2,
                    symbolSize: 8
                },
                lineStyle: {
                    normal: {
                        color: '#ffcb00',
                        width: 0,
                        opacity: 0,
                        curveness: 0,
                    }
                },
                data: json.chart0.lowLine
            },





            {
                name: '男',
                type: 'line',
                // smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(21, 250, 255,.9)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(6, 8, 41,.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        // color: '#7B0CFFE6',
                        color: '#15faff'
                    }
                },
                data: expb
            },
            {
                name: '男',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                zlevel: 1,
                smooth: true,
                symbol: 'circle',
                effect: {
                    show: true,
                    smooth: true,
                    period: 2,
                    symbolSize: 8
                },
                lineStyle: {
                    normal: {
                        color: '#15faff',
                        // color: '#7B0CFFE6',
                        width: 0,
                        opacity: 0,
                        curveness: 0,
                    }
                },
                data: json3.chart0.lowLine
            },



            {
                name: '女',
                type: 'line',
                symbol: 'circle',
                symbolSize: 10,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(123, 12, 255,.9)'
                            // color: 'rgba(21, 250, 255,.9)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(6, 8, 41,.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7B0CFFE6'
                        // color: '#15faff',
                    }
                },
                data: expg
            },
            {
                name: '女',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                zlevel: 1,
                smooth: true,
                symbol: 'circle',
                effect: {
                    show: true,
                    smooth: true,
                    period: 2,
                    symbolSize: 8
                },
                lineStyle: {
                    normal: {
                        // color: '#15faff',
                        color: '#7B0CFFE6',
                        width: 0,
                        opacity: 0,
                        curveness: 0,
                    }
                },
                data: json2.chart0.lowLine
            },
        ]
    };
    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });


})();
