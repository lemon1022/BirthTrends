(function() {
  // console.log(echarts.getMap(mapName).geoJson.features)
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


  var path = 'data/分省常住人口.csv';
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
  var name = []
  var value = []
  for(var  i = 1; i < 32; i++){
    year[i - 1] = datas[i][2]
    name[i - 1] = datas[i][0]
    value[i - 1] = datas[i][2]
  }
  var data = [];

  for (var i = 0; i < name.length; i++) {
    data.push({name: name[i], value: value[i]});
  }


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
        color: '#fff',
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
                toolTiphtml += data[i].name + ': ' + deal(data[i].value) + "万人<br>"
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
      min: 0,
      max: 11000,
      left: 'left',
      top: 'bottom',
      textStyle: {
        color: '#fff' // 高低字体颜色
      },
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#fff','#3B5077','#142957', '#031525'] // 蓝黑
        // color:['#113054','#3b67d1','#3b67d1','#7b54f7','#960bf0']
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

      }
    },
    geo: {
      show: true,
      map: mapName,
      label: {
        color: '#fff',
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
        color: '#fff',
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
})();
