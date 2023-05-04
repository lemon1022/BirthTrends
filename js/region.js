var people_65 = []
var people_sample = []
var people_num = []
var people_country = []
var birth_rate = []
var live_old = []
var people_crowd = []
var death_rate = []
var people_town = []
var fy_rate = []
var natural_rate = []
var ys = {
    "people_65": people_65,
    "people_sample": people_sample,
    "people_num": people_num,
    "people_country": people_country,
    "birth_rate": birth_rate,
    "live_old": live_old,
    "people_crowd": people_crowd,
    "death_rate": death_rate,
    "people_town": people_town,
    "fy_rate": fy_rate,
    "natural_rate": natural_rate,
}
var ysdw = {
    "people_65": "%",
    "people_sample": "人",
    "people_num": "万人",
    "people_country": "万人",
    "birth_rate": "‰",
    "live_old": "岁",
    "people_crowd": "人/平方千米",
    "death_rate": "‰",
    "people_town": "万人",
    "fy_rate": "%",
    "natural_rate": "‰",
}
var people_65_year = []
var people_sample_year = []
var people_num_year = []
var people_country_year = []
var birth_rate_year = []
var live_old_year = []
var people_crowd_year = []
var death_rate_year = []
var people_town_year = []
var fy_rate_year = []
var natural_rate_year = []


function setData(path, V) {
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send();
    var dataArray = request.responseText.split(/\r?\n/);

    for (var i = 0; i < dataArray.length ; i++) {
        V.push(dataArray[i].split(","));
    }
};

function setYear(V, V_year) {
    for (var i = 1; i < V[0].length; i ++) {
        if (V[2][i] !== '' || V[1][i] !== '') {
            V_year.push(V[0][i]);
        }
    }
    V_year.reverse()
};

(function () {
    setData("data/分省65及以上人口.csv", people_65);
    setData("data/分省总人口抽样.csv", people_sample);
    setData("data/分省常住人口.csv", people_num);
    setData("data/分省城镇人口.csv", people_country);
    setData("data/分省出生率.csv", birth_rate);
    setData("data/分省平均寿命.csv", live_old);
    setData("data/分省人口密度.csv", people_crowd);
    setData("data/分省死亡率.csv", death_rate);
    setData("data/分省乡村人口.csv", people_town);
    setData("data/分省总抚养比.csv", fy_rate);
    setData("data/分省自然增长率.csv", natural_rate);

    setYear(people_65, people_65_year);setYear(people_crowd, people_crowd_year);
    setYear(people_sample, people_sample_year);setYear(death_rate, death_rate_year);
    setYear(people_num, people_num_year);setYear(people_town, people_town_year);
    setYear(people_country, people_country_year);setYear(fy_rate, fy_rate_year);
    setYear(birth_rate, birth_rate_year);setYear(natural_rate, natural_rate_year);
    setYear(live_old, live_old_year);

    updateSelect2();

    showMap("people_65", "2002年");
})();

function updateSelect2() {

    var options = [
        people_65_year,
        people_num_year,
        people_country_year,
        birth_rate_year,
        live_old_year,
        people_crowd_year,
        death_rate_year,
        people_town_year,
        fy_rate_year,
        natural_rate_year,
    ];


    var select1 = document.getElementById("select1");
    var select2 = document.getElementById("select2");


    //获取选中值的索引
    var index = select1.selectedIndex;
    // console.log(index)
    var optionsArray = options[index];

    //更新第二个下拉框的值
    select2.innerHTML = ""
    for(var i = 0; i <optionsArray.length; i++){
        var option = document.createElement("option")
        option.text = optionsArray[i]
        select2.add(option)
    }
}

function showOptions() {
    // 获取第一个下拉框选中的值
    var select1 = document.getElementById("select1");
    var value1 = select1.options[select1.selectedIndex].value;

    // 获取第二个下拉框选中的值
    var select2 = document.getElementById("select2");
    var value2 = select2.options[select2.selectedIndex].value;

    // // 在控制台输出两个下拉框选中的值
    // console.log("第一个下拉框选中的值：" + value1);
    // console.log("第二个下拉框选中的值：" + value2);

    showMap(value1, value2);
}


(function() {

})();

function showMap(value1, value2) {
    // 1. 实例化对象

    var myChart = echarts.init(document.querySelector(".geo"));
    // 2. 指定配置和数据
    var name_title = ""
    var subname = ''
    var nameColor = " rgb(55, 75, 113)"
    var name_fontFamily = '等线'
    var subname_fontSize = 20
    var name_fontSize = 30
    var mapName = 'china'

    var datas = ys[value1];
    var name = []
    var value = []
    var maxn;
    var minn;
    // console.log(datas)
    if (value1 === "people_65") {
        for (var i = 0; i < datas[0].length; i ++) {
            if (datas[0][i] === value2) {
                maxn = -1e9;
                minn = 1e9;
                for(var  j = 1; j < 32; j ++){

                    name[j - 1] = datas[j][0];
                    value[j - 1] = parseFloat(datas[j][i]) / parseFloat(people_sample[j][i]) * 100;
                    value[j - 1] = parseFloat(value[j - 1].toFixed(2))
                    if (value[j - 1] > maxn)
                        {maxn = value[j - 1];}
                    if (value[j - 1] < minn)
                        {minn = value[j - 1];}
                }
            }
        }
    } else {
        for (var i = 0; i < datas[0].length; i ++) {
            if (datas[0][i] === value2) {
                maxn = -1e9;
                minn = 1e9;
                for(var  j = 1; j < 32; j ++){
                    name[j - 1] = datas[j][0]
                    value[j - 1] = parseFloat(datas[j][i]);
                    if (value[j - 1] > maxn) maxn = value[j - 1];
                    if (value[j - 1] < minn) minn = value[j - 1];
                }
            }
        }
    }



    var data = [];

    for (var i = 0; i < name.length; i++) {
        if (isNaN(value[i])) {
            data.push({name: name[i], value: minn-1});
        } else
            data.push({name: name[i], value: value[i]});
    }
    // console.log(data)

    var geoCoordMap = {};
    var toolTipData = [
        {name:"北京",value:[{name:"女性",value:2991262},{name:"男性",value:3051912}]},
    ];

    myChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChart.hideLoading();
    mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });

    var max = 480,
        min = 9; // todo
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];

            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option = {
        title: {
            text: name_title,
            subtext: subname,
            x: 'center',
            textStyle: {
                color: nameColor,
                fontFamily: name_fontFamily,
                fontSize: name_fontSize
            },
            subtextStyle: {
                fontSize: subname_fontSize,
                fontFamily: name_fontFamily
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (typeof(params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < data.length; i++) {
                        if (params.name == data[i].name) {
                            if (data[i].value === minn-1) toolTiphtml += data[i].name + ' :' + "NaN" + "<br>"
                            else toolTiphtml += data[i].name + ' :' + deal(data[i].value) + ysdw[value1] + "<br>"
                        }
                    }
                    // console.log(toolTiphtml)
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < data.length; i++) {
                        if (params.name == data[i].name) {
                            toolTiphtml += data[i].name + ':<br>'
                            for (var j = 0; j < data[i].length; j++) {
                                toolTiphtml += data[i].name + ':' + deal(data[i].value) + "<br>"
                            }
                        }
                    }
                    // console.log(toolTiphtml)
                    return toolTiphtml;
                }
            }
        },
        visualMap: {
            show: true,
            min: parseFloat(minn),
            max: parseFloat(maxn),
            left: 'left',
            top: 'bottom',
            textStyle: {
                color: "#fff",
            },
            color:'red',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            // inRange: {
            color : ['#031525','#142957','#3B5077', '#fff'],
                // color: ['#fff','#3B5077','#142957', '#031525'] // 蓝黑
            //     color:['#113054','#3b67d1','#3b67d1','#7b54f7','#960bf0']
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1E90FF', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            //
            // }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [
            {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    return val[1] / 3;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9'
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {

                        show: true
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
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function(val) {
                    var a = 1;
                    var b = 1;
                    b = 1;
                    return a * val[1] + b;
                },


            },
        ]
    };
    myChart.setOption(option);

    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
};

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