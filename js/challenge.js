
/*
分省出生率
 */

(function () {

    var path = 'data/分省出生率.csv';
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
    var dlist = []
    for(var  i = 1; i < data[0].length ; i++){
        year.push(data[0][i])
        var dd = {};
        for (var j = 1; j <= 31; j ++) {
            dd[data[j][0]] = data[j][i];
        }
        dlist.push(dd);
    }
    dlist.reverse()
    year.reverse()
    // console.log(year)
    var myChart = echarts.init(document.querySelector(".geo1"));
    // console.log(1111)

    var uploadedDataURL = "data.json";
    var geoCoordMap = {
        // '台湾': [121.5135, 25.0308],
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413],
        "陕西": [109.1162, 34.2004],
        "甘肃": [103.5901, 36.3043],
        "宁夏": [106.3586, 38.1775],
        "青海": [101.4038, 36.8207],
        "新疆": [87.9236, 43.5883],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891],
    };


    var colors = [
        ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3","#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A","#04B9FF", "#5DBD32", ],
        ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA","#9D96F5", "#8378EA", "#8378EA"],
        ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42","#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
    ];
    var colorIndex = 0;
    $(function () {
        var mapData = [];

        /*柱子Y名称*/
        var categoryData = [];
        var barData = [];
        for (var j = 0; j < year.length; j ++)  mapData.push([]);
        for (var key in geoCoordMap) {
            for (var j = 0; j < year.length; j ++) {
                mapData[j].push({
                    "year": year[j],
                    "name": key,
                    "value": dlist[j][key],
                })
            }
        }

        // console.log(mapData)

        for (var i = 0; i < mapData.length; i++) {
            mapData[i].sort(function sortNumber(a, b) {
                return a.value - b.value
            });
            barData.push([]);
            categoryData.push([]);
            for (var j = 0; j < mapData[i].length; j++) {
                barData[i].push(mapData[i][j].value);
                categoryData[i].push(mapData[i][j].name);
            }
        }

        $.getJSON(uploadedDataURL, function (geoJson) {

            echarts.registerMap('china', geoJson);
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            optionXyMap01 = {
                timeline: {
                    data: year,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 3000,
                    left: '10%',
                    right: '10%',
                    bottom: '3%',
                    width: '80%',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ddd'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },

                },
                baseOption: {
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    grid: {
                        right: '2%',
                        top: '15%',
                        bottom: '13%',
                        width: '16%'
                    },
                    tooltip: {
                        trigger: 'axis', // hover触发器
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            shadowStyle: {
                                color: 'rgba(150,150,150,0.1)' //hover颜色
                            }
                        }
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        roam: true,
                        zoom: 1,
                        center: [113.83531246, 34.0267395887],
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        }
                    },
                },
                options: []

            };

            for (var n = 0; n < year.length; n++) {
                optionXyMap01.options.push({
                    tooltip: {
                        formatter: function (params) {
                            return params[0].name + ":  " + params[0].value + "‰";
                        }
                    },
                    // backgroundColor: '#013954',
                    title:
                        [{

                        },
                            {
                                id: 'statistic',
                                text: year[n] + "数据统计情况",
                                left: '75%',
                                top: '3%',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14
                                }
                            }
                        ],
                    xAxis: {

                        type: 'value',
                        scale: true,
                        position: 'top',
                        min: 0,
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: 1,
                            textStyle: {
                                color: '#aaa'
                            }
                        },
                    },
                    yAxis: {

                        type: 'category',
                        //  name: 'TOP 20',
                        nameGap: 20,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {

                                color: '#ddd'
                            }
                        },
                        data: categoryData[n]
                    },

                    series: [
                        //地图
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#FFFFFF',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: mapData
                        },
                        //地图中闪烁的点
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(mapData[n].sort(function(a, b) {
                                return b.value - a.value;
                            }).slice(0, 40)),
                            symbolSize: function(val) {
                                return val[2] /500;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colors[colorIndex][n],
                                    shadowBlur: 10,
                                    shadowColor: colors[colorIndex][n]
                                }
                            },
                            zlevel: 1
                        },
                        //柱状图
                        {
                            zlevel: 1.5,
                            type: 'bar',
                            symbol: 'none',

                            itemStyle: {
                                normal: {
                                    color: colors[colorIndex][n]
                                }
                            },
                            data: barData[n]
                        }
                    ]
                })
            }
            myChart.setOption(optionXyMap01);

        });
    });
})();



/*
抚养比
 */

(function() {

    // 1. 实例化对象
    // var myChart = echarts.init(document.querySelector(".bar"));
    var myChart = echarts.init(document.querySelector(".bar"));


    // (1)准备数据
    var path = 'data/年龄段人数近50年数据.csv';
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

    var tol = []
    var old = []
    var young = []
    var year = []
    for(var  i = 1; i < data[0].length - 21 ; i++){
        year[i-1] = data[0][i]
        tol[i-1] = data[5][i]
        young[i-1] = data[6][i]
        old[i-1] = data[7][i]
    }
    year.reverse()
    tol.reverse()
    young.reverse()
    old.reverse()

    var json = {
        chart0: {
            xcategory: year,
            low: tol,
            lowLine: [],
        }
    };
    var json2 = {
        chart0: {
            xcategory: year,
            low: young,
            lowLine: [],
        }
    };
    var json3 = {
        chart0: {
            xcategory: year,
            low: old,
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
                '总': true, // 在图例中显示图例1
                '少儿': true, // 在图例中显示图例2
                '老年': true // 在图例中显示图例3
            },
            data: ['总', '少儿','老年'],
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
            max: 56,
            min : 8,
            splitNumber: 4,
            interval: 8,
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
                formatter: '{value}%',
                textStyle: {
                    // backgroundColor:'#000',
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
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 6
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ffcb00'
                    }
                },
                data: tol
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
                name: '少儿',
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
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        // color: '#7B0CFFE6',
                        color: '#15faff'
                    }
                },
                data: young
            },
            {
                name: '少儿',
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
                data: json2.chart0.lowLine
            },



            {
                name: '老年',
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
                            color: 'rgba(6, 8, 41,.5)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#7B0CFFE6'
                        // color: '#15faff',
                    }
                },
                data: old
            },
            {
                name: '老年',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                zlevel: 1,
                smooth: true,
                symbol: 'circle',
                effect: {
                    show: true,
                    smooth: true,
                    period: 4,
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
                data: json3.chart0.lowLine
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


/*
词云图
 */

(function() {

    // 1. 实例化对象
    // var myChart = echarts.init(document.querySelector(".bar"));
    var myChart = echarts.init(document.querySelector(".cloud"));


    // (1)准备数据
    var path = 'data/word.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();
    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    var datas = [];
    for (var i = 0; i < dataArray.length; i++) {
        // 将 CSV 中的每一行拆分为由逗号分隔的数组
        datas.push(dataArray[i].split(","));
    }

    var name = []
    var value = []
    for(var  i = 0; i < datas.length ; i++){
        name.push(datas[i][0])
        value.push(datas[i][2])
    }
    var data = []
    for (var i = 0; i < name.length; i ++) {
        var temp = {}
        temp["name"] = name[i];
        temp["value"] = value[i];
        data.push(temp)
    }

    option = {
        tooltip: {
            show: true,
            position: 'top',
            textStyle: {
                fontSize: 30
            }
        },
        series: [{
            type: "wordCloud",
            // 网格大小，各项之间间距
            gridSize: 10,
            // 形状 circle 圆，cardioid  心， diamond 菱形，
            // triangle-forward 、triangle 三角，star五角星
            shape: 'circle',
            // 字体大小范围
            sizeRange: [14, 50],
            // 文字旋转角度范围
            rotationRange: [0, 90],
            // 旋转步值
            rotationStep: 90,
            // 自定义图形
            // maskImage: "",
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            // 画布宽
            width: '90%',
            // 画布高
            height: '85%',
            // 是否渲染超出画布的文字
            drawOutOfBound: false,
            textStyle: {
                fontFamily: '微软雅黑',
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 250),
                        Math.round(Math.random() * 250),
                        Math.round(Math.random() * 250)
                    ].join(',') + ')';
                },
                emphasis:{
                    shadowBlur: 10,
                    shadowColor: '#2ac'
                }
            },

            data: data
        }]
    };
    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });


})();

/*
孕育年龄占比（饼图）
 */

(function() {

    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie1"));


    var data = [
        {
            name: '小于20岁',
            value: 5
        },{
            name: '20-29岁',
            value: 76
        },{
            name: '30-34岁',
            value: 12
        }, {
            name: '35-39岁',
            value: 4
        },{
            name: '大于40岁',
            value: 3
        },
        ]

    var titleArr= [], seriesArr=[];
    colors=[['#389af4', '#dfeaff'],['#ff8c37', '#ffdcc3'],['#ffc257', '#ffedcc'], ['#fd6f97', '#fed4e0'],['#a181fc', '#e3d9fe']]
    data.forEach(function(item, index){
        titleArr.push(
            {
                text:item.name,
                left: index * 20 + 9 +'%',
                top: '78%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '16',
                    color: colors[index][0],
                    textAlign: 'center',
                },
            }
        );
        seriesArr.push(
            {
                name: item.name,
                type: 'pie',
                clockWise: false,
                radius: [40, 50],
                itemStyle:  {
                    normal: {
                        color: colors[index][0],
                        shadowColor: colors[index][0],
                        shadowBlur: 0,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                    }
                },
                hoverAnimation: false,
                center: [index * 20 + 10 +'%', '40%'],
                data: [{
                    value: item.value,
                    label: {
                        normal: {
                            formatter: function(params){
                                return params.value+'%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: colors[index][0]
                            }
                        }
                    },
                }, {
                    value: 100-item.value,
                    name: 'invisible',
                    itemStyle: {
                        normal: {
                            color: colors[index][1]
                        },
                        emphasis: {
                            color: colors[index][1]
                        }
                    }
                }]
            }
        )
    });


    option = {
        // backgroundColor: "#fff",
        title:titleArr,
        series: seriesArr
    },
    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });


})();


/*
分年龄段生育率
 */

(function() {

    // 1. 实例化对象
    // var myChart = echarts.init(document.querySelector(".bar"));
    var myChart = echarts.init(document.querySelector(".pie"));

    // console.log(111)
    // (1)准备数据
    var path = 'data/按年龄分生育率.csv';
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
    var year = []
    var d1 = []
    var d2 = []
    var d3 = []
    var d4 = []
    var d5 = []
    var d6 = []

    // console.log(data)

    // console.log(1111)
    for(var  i = 1; i < data[0].length; i++){
        year[i-1] = data[0][i]
        d1[i-1] = data[2][i]
        d2[i-1] = data[8][i]
        d3[i-1] = data[14][i]
        d4[i-1] = data[20][i]
        d5[i-1] = data[26][i]
        d6[i-1] = parseFloat(data[32][i])  + parseFloat(data[38][i])
    }
    // console.log(d6)
    year.reverse()
    d1.reverse()
    d2.reverse()
    d3.reverse()
    d4.reverse()
    d5.reverse()
    d6.reverse()
    // console.log(d6)
    var fontColor = '#30eee9';
    option ={
        title:{
            top:'5%',
            left:'center',
            textStyle:{
                color:'#FFF',
                align:'center',
            }
        },
        // backgroundColor:'#11183c',
        grid: {
            left: '1%',
            right: '1%',
            top:'20%',
            bottom: '1%',
            containLabel: true
        },
        tooltip : {
            show: true,
            trigger: 'item'
        },
        legend: {
            show:true,
            x:'center',
            top:'1%',
            y:'35',
            icon: 'stack',
            itemWidth:10,
            itemHeight:10,
            textStyle:{
                color:'#1bb4f6'
            },
            data:['14-19','20-24','25-29','30-34','35-39','>=40']
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLabel:{
                    color: fontColor
                },
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#397cbc'
                    }
                },
                axisTick:{
                    show:false,
                },
                splitLine:{
                    show:false,
                    lineStyle:{
                        color:'#195384'
                    }
                },
                data : year
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '占比',
                min:0,
                max:130,
                axisLabel : {
                    formatter: '{value} ‰',
                    textStyle:{
                        color:'#186afe'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#186afe'
                    }
                },
                axisTick:{
                    show:false,
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#11366e'
                    }
                }
            }
        ],
        series : [
            {
                name:'14-19',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color:'#FFFFFF',
                        lineStyle: {
                            color: "#FFFFFF",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,146,246,0.9)'
                            }]),
                        }
                    }
                },
                markPoint:{
                    itemStyle:{
                        normal:{
                            color:'red'
                        }
                    }
                },
                data:d1
            },
            {
                name:'20-24',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,

                itemStyle: {
                    normal: {
                        color:'#00d4c7',
                        lineStyle: {
                            color: "#00d4c7",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,212,199,0.9)'
                            }]),
                        }
                    }
                },
                data:d2
            },
            {
                name:'25-29',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#aecb56',
                        lineStyle: {
                            color: "#aecb56",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(114,144,89,0.9)'
                            }]),
                        }
                    }
                },
                data:d3
            },
            {
                name:'30-34',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#3A44FB',
                        lineStyle: {
                            color: "#3A44FB",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,46,101,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,166,246,0.9)'
                            }]),
                        }
                    }
                },
                data:d4
            },
            {
                name:'35-39',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#6FE81A',
                        lineStyle: {
                            color: "#6FE81A",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,212,199,0.9)'
                            }]),
                        }
                    }
                },
                data:d5
            },
            {
                name:'>=40',
                type:'line',
                // stack: '总量',
                symbol:'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: '#FF0000',
                        lineStyle: {
                            color: "#FF0000",
                            width:1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,212,199,0.9)'
                            }]),
                        }
                    }
                },
                data:d6
            }
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

/*
结婚登记人数+离婚率
 */
(function() {
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/离婚率.csv';
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
    var marry = []
    var rate = []
    for(var  i = 1; i < datas[0].length; i++){
        year[i - 1] = datas[0][i]
        marry[i - 1] = datas[1][i]
        rate[i - 1] = datas[7][i]
    }
    year.reverse()
    marry.reverse()
    rate.reverse()
    // console.log(labper)


    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".content2"));
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
            trigger: 'axis',
            axisPointer: {
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                return  params[0].name + "<br>" +
                        "离婚率:  " + params[0].value + "‰" + "<br>" +
                        "结婚登记对数:  " + params[1].value + "万对";
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
                formatter: '{value}‰',
                color: '#4c9bfd',

            },
        },
            {
                type: 'value',
                name: '万对',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#4c9bfd',
                }
            }
        ],

        series: [{
            name: '离婚率',
            color: '#FFFFFF',
            type: 'line',
            smooth: true,
            data: rate
        },
            {
                name: '结婚登记',
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
                data: marry,
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

/*
解决措施
 */


(function() {
    // 使用 XMLHttpRequest 对象读取 CSV 文件
    // var path = encodeURIComponent('data/总人口相关数据utf8.csv');
    var path = 'data/solve.csv';
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();

    var datas = []
    // 将 CSV 数据转换为二维数组
    var dataArray = request.responseText.split(/\r?\n/);
    // console.log(dataArray)
    for (var i = 0; i < dataArray.length; i++) {
        // 将 CSV 中的每一行拆分为由逗号分隔的数组
        datas.push(dataArray[i].split(","));
    }

    // console.log(datas)

    var tbody = document.getElementsByClassName('suggestion_ul')[0];

    for (var i = 0; i < datas.length; i ++) { // 外面的for循环管行 tr

        var li = document.createElement('li');
        // div.classList.add("row");
        li.innerHTML = datas[i];
        tbody.appendChild(li);
    }

})();