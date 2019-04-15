//浏览器判断
function getBrowserInfo(){
    var ua = navigator.userAgent.toLocaleLowerCase();
    var browserType=null;
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = "IE";
        browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
        $(".module_en_name").css({
        	'font-size':'12px',
        	'margin-top':'2px',
        });
        $(".real_time_text").css({
        	'font-size':'14px',
        	'margin-top':'2px',
        });
    } else if (ua.match(/firefox/) != null) {
        browserType = "火狐";
    }else if (ua.match(/ubrowser/) != null) {
        browserType = "UC";
    }else if (ua.match(/opera/) != null) {
        browserType = "欧朋";
    } else if (ua.match(/bidubrowser/) != null) {
        browserType = "百度";
    }else if (ua.match(/metasr/) != null) {
        browserType = "搜狗";
    }else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        browserType = "QQ";
    }else if (ua.match(/maxthon/) != null) {
        browserType = "遨游";
    }else if (ua.match(/chrome/) != null) {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
        function _mime(option, value) {
            var mimeTypes = navigator.mimeTypes;
            for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        }
        if(is360){
            browserType = '360';
            $(".module_en_name").css({
            	'transform':'scale(0.7)',
            	'transform-origin': 'left center',
            });
            $(".real_time_text").css({
            	'transform':'scale(0.7)',
            });
        }else{
        	browserType = 'chrome';
            // $('html').css("zoom",".80");
            $(".module_en_name").css({
            	'transform':'scale(0.7)',
            	'transform-origin': 'left center',
            });
            $(".real_time_text").css({
            	'transform':'scale(0.7)',
            });
        }
    }else if (ua.match(/safari/) != null) {
        browserType = "Safari";
    }
    console.log(browserType);
}

getBrowserInfo();

function horizontal_bar_chart(id, data, extra){
	var barEchart = echarts.init(document.getElementById(id));

	var base_data = new Array();

	var max_base_data = Math.max.apply(null, data['series_data']);

	if(max_base_data == 0){
		max_base_data = 1;
	}

	var label_position = ['100%', '100%'];

	if(extra && extra.labelPosition){
		label_position = extra.labelPosition;
	}

	$.each(data['series_data'],function(k,v){
		base_data[k] = max_base_data;
	})

	var option = {
	    // backgroundColor: "rgba(73,91,103,0.1)",
	    title: {
	        text: data['name'],
	        show:false,
	        textStyle: {
	            color: '#fff',
	            fontSize: '22'
	        },
	        subtextStyle: {
	            color: '#90979c',
	            fontSize: '16',

	        },
	    },
	    tooltip: {
	        show: "true",
	        trigger: 'item',
	        backgroundColor: 'rgba(0,0,0,0.7)', // 背景
	        padding: [8, 10], //内边距
	        extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
	        formatter: function(params) {
	            if (params.seriesName != "") {
	                return params.name + ' ： 第 ' + params.value + ' 名';
	            }
	        },

	    },
	    grid: {
	        borderWidth: 0,
	        // width:320,
	        // height:300,
	        left:110,
	        top: 5,
	        right:30,
	        bottom: 5,
	        textStyle: {
	            color: "#fff"
	        }
	    },
	    yAxis: [{
	        type: 'category',
	        axisTick: {
	            show: false,
	        },
	        axisLine: {
	            show: false,
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#939393',
	                fontWeight: '50'
	            },
	            formatter :function(params){
		            if(params.replace(/[\u0391-\uFFE5]/g,"aa").length > 16){
		                return params.substring(0,7)+'...'
		            }else{
		                return params;
		            }   
		        },
	            width:300,
	            inside: false,
	        },
	        data: data['yAxis_data'],
	    }, {
	        type: 'category',
	        axisLine: {
	            show: false
	        },
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            show: false
	        },
	        splitArea: {
	            show: false
	        },
	        splitLine: {
	            show: false
	        },
	        data: data['yAxis_data'],
	    }],
	    xAxis: {
	        type: 'value',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	        },
	        splitLine: {
	            show: false,
	        },
	        axisLabel: {
	            show:false,
	        },
	    },
	    series: [
	        {
	            name: '',
	            type: 'bar',
	            // xAxisIndex: 1,
	            // zlevel: 1,
	            itemStyle: {
	                normal: {
	                    color: 'rgba(73,91,103,1)',
	                    borderWidth: 0,
	                    shadowBlur: {
	                        shadowColor: 'rgba(73,91,103,1)',
	                        shadowBlur: 10,
	                        shadowOffsetX: 0,
	                        shadowOffsetY: 2,
	                    },
	                }
	            },
	            barMaxWidth : 4,
	            barGap :'50%',
	            data: base_data
	        },
	        {
	            name: '',
	            type: 'bar',
	            itemStyle: {
	                normal: {
	                    show: true,
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: '#00c0e9'
	                    }, {
	                        offset: 1,
	                        color: '#26D9FF'
	                    }]),
	                    barBorderRadius: 50,
	                    borderWidth: 0,
	                },
	                emphasis: {
	                    shadowBlur: 15,
	                    shadowColor: 'rgba(105,123, 214, 0.7)'
	                }
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: label_position,
	                    textStyle: {
	                        color: "#BFC8D0"
	                    }
	                }
	            },
	            zlevel: 2,
	            barMaxWidth : 4,
	            barGap :'50%',
	            data: data['series_data'],
	        },
	        
	    ]
	}

	barEchart.setOption(option);

}


//多Y轴坐标系图表
function multy_y_series_line_chart(id, data) {
	var myChartNew = echarts.init($('#water_elec_line_chart')[0]);
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
        	show:false,
            data:data['legend'],
            textStyle:{
                color: '#fff'
            },
            top:30,
            right:'18%',
        },
        grid:{
            left: '10%',
	        right: '15%',
	        bottom: '9%',
	        top: '12%',
        },
        xAxis: [
            {
                type: 'category',
                data: data['xAxis'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLine: {
		            lineStyle: {
		                color: '#26D9FF'
		            }
		        },
                axisLabel: {
		            textStyle: {
		                fontSize: 14,
		                color:'#9199A0'
		            },
		        },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: data['yAxis_unit1'],
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
		            lineStyle: {
		                color: '#26D9FF'
		            }
		        },
		        axisLabel: {
		            margin: 20,
		            textStyle: {
		                fontSize: 14,
		                color:'#9199A0'
		            },
		        },
		        axisTick: {
		            show: false
		        },
		        splitLine: {
		        	show:false,
		            lineStyle: {
		                color: '#57617B'
		            }
		        }
            },
            {
                type: 'value',
                name: data['yAxis_unit2'],
                axisLabel: {
                    formatter: '{value}'
                },
                axisLine: {
		            lineStyle: {
		                color: '#26D9FF'
		            }
		        },
		        axisLabel: {
		            margin: 20,
		            textStyle: {
		                fontSize: 14,
		                color:'#9199A0'
		            },
		        },
		        axisTick: {
		            show: false
		        },
		        splitLine: {
		        	show:false,
		            lineStyle: {
		                color: '#57617B'
		            }
		        }
            }
        ],
        series: data['series'],
        color:['#26D9FF','#F9A555'],
    };
    myChartNew.setOption(option); 
}

function line_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	if(data['smooth']){
		var smooth = data['smooth'] == 2?false:true;
	}else{
		var smooth = true;
	}
	option = {
	    // backgroundColor: '#394056',
	    title: {
	        textStyle: {
	            fontWeight: 'normal',
	            fontSize: 16,
	            color: '#F1F1F3'
	        },
	        left: '6%'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            lineStyle: {
	                color: '#57617B'
	            }
	        }
	    },
	    legend: {
	        icon: 'rect',
	        itemWidth: 14,
	        itemHeight: 14,
	        itemGap: 13,
	        width:800,
	        data: [],
	        right: 'center',
	        textStyle: {
	            fontSize: 12,
	            color: '#F1F1F3'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '8%',
	        bottom: '4%',
	        top: '8%',
	        containLabel: true
	    },
	    // dataZoom : [{
	    //     show: true,
	    //     start: 0,
	    //     end: 50
	    // }],
	    xAxis: [{
	        type: 'category',
	        boundaryGap: false,
	        axisLine: {
	            lineStyle: {
	                color: '#26D9FF'
	            }
	        },
	        axisLabel:{
	        	margin: 20,
	            textStyle: {
	                fontSize: 14,
	                color:'#9199A0'
	            },
	        },
	        data: data['xAxis_data']
	    }],
	    yAxis: [{
	        type: 'value',
	        name: '',
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            lineStyle: {
	                color: '#26D9FF'
	            }
	        },
	        axisLabel: {
	            margin: 20,
	            textStyle: {
	                fontSize: 14,
	                color:'#9199A0'
	            },
	        },
	        splitLine: {
	        	show:false,
	            lineStyle: {
	                color: '#57617B'
	            }
	        }
	    }],
	    series: [{
	        name: '',
	        type: 'line',
	        smooth: smooth,
	        symbol: 'circle',
	        symbolSize: 10,
	        showSymbol: true,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(0, 206, 209, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(0, 206, 209, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: 'rgb(0, 206, 209)',
	                borderColor: 'rgba(0, 206, 209, 0.2)',
	                borderWidth: 12

	            }
	        },
	        data: []
	    }, {
	        name: '',
	        type: 'line',
	        smooth: smooth,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(9, 161, 193, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(9, 161, 193, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: 'rgb(9, 161, 193)',
	                borderColor: 'rgba(9, 161, 193,0.2)',
	                borderWidth: 12

	            }
	        },
	        data: []
	    }, {
	        name: '',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(21, 82, 98, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(21, 82, 98, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {

	                color: 'rgb(21, 82, 98)',
	                borderColor: 'rgba(21, 82, 98, 0.2)',
	                borderWidth: 12
	            }
	        },
	        data: []
	    }, {
	        name: '',
	        type: 'line',
	        smooth: true,
	        symbol: 'circle',
	        symbolSize: 5,
	        showSymbol: false,
	        lineStyle: {
	            normal: {
	                width: 1
	            }
	        },
	        areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(23, 61, 73, 0.3)'
	                }, {
	                    offset: 0.8,
	                    color: 'rgba(23, 61, 73, 0)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {

	                color: 'rgb(23, 61, 73)',
	                borderColor: 'rgba(23, 61, 73, 0.2)',
	                borderWidth: 12
	            }
	        },
	        data: []
	    }]
	};

	$.each(data['series_data'],function(k,v){
		option['series'][k]['name'] = v['name'];
		option['series'][k]['data'] = v['data'];
	});

	myChartNew.setOption(option);

}



function iot_line_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var option = {
		grid: {
	        left: '3%',
	        right: '6%',
	        bottom: '2%',
	        top: '8%',
	        containLabel: true
	    },
		tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            label: {
	                backgroundColor: '#6a7985'
	            }
	        }
	    },
	    xAxis: {
	    	axisLabel:{
	        	margin: 20,
	            textStyle: {
	                fontSize: 14,
	                color:'#9199A0'
	            },
	        },
	    	axisLine: {
	            lineStyle: {
	                color: '#26D9FF'
	            }
	        },
	        type: 'category',
	        data: data['xAxis_data']
	    },    
	    yAxis: {
	    	splitLine: {
	        	show:false,
	            lineStyle: {
	                color: '#57617B'
	            }
	        },
	        axisLabel: {
	            margin: 20,
	            textStyle: {
	                fontSize: 14,
	                color:'#9199A0'
	            },
	        },
	    	axisLine: {
	            lineStyle: {
	                color: '#26D9FF'
	            }
	        },
	        type: 'value'
	    },
	    series: data['series_data'],
	    color:['#26D9FF','#F9A555']
	};
	myChartNew.setOption(option);
}

/**
 * [ring_rate_chart description]
 * @param  {[type]} id   [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function ring_rate_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var box_height = parseInt($('#'+id).css('height'));
	var box_width  = parseInt($('#'+id).css('width'));
	var graphic_wh = box_height * 0.72;
	var placeHolderStyle = {
	    normal: {
	        color: 'rgba(44,59,70,1)', // 未完成的圆环的颜色
	        label: {
	            show: false
	        },
	        labelLine: {
	            show: false
	        }
	    },
	    emphasis: {
	        color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
	    }
	};
	var option = {
	    title: {
	        text: data['rate']+'%',
	        top : '50%',
	        right : '14%',
	        textStyle: {
	            fontSize: '18',
                fontWeight: 'normal',
                color: '#FFFFFF'
	        }
	    },
	    graphic: {
			elements: [{
				type: 'text',
				style: {
					text:'RATIO',
					font: '12px "SourceHanSansCN-Regular"',
					fill: '#495B67',
					width: graphic_wh,
					height: graphic_wh
				},
				color:'#C6D2DB',
				left: '20%',
				top: '30%',
			}]
		},
	    tooltip: {
	        show: false,
	    },
	    toolbox: {
	        show: false,
	    },
	    // color : ['#3dd4de','#b697cd','#a6f08f'],
	    // backgroundColor: 'rgba(0,0,0,0.8)',
	    series: [{
	        name: 'Pie1',
	        type: 'pie',
	        clockWise: false,
	        radius: ['85%', '90%'],
	        itemStyle: {
			    normal: {
			        label: {
			            show: false
			        },
			        labelLine: {
			            show: false
			        },
			        shadowBlur: 40,
			        shadowColor: 'rgba(40, 40, 40, 0.5)',
			    }
			},
	        hoverAnimation: false,
	        center: ['50%', '50%'],
	        data: [{
	            value: data['rate'],
	            label: {
	                normal: {
	                    position: 'center',
	                    show: true,
	                    textStyle: {
	                        fontSize: '20',
	                        fontWeight: 'normal',
	                        color: '#FFFFFF'
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: '#26D9FF',
	                    shadowColor: '#26D9FF',
	                    shadowBlur: 10
	                }
	            }
	        }, {
	            value: 100 - data['rate'],
	            name: 'invisible',
	            itemStyle: placeHolderStyle,
	        }]
	    }, ]
	}
	myChartNew.setOption(option);
}

function pie_double_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var box_height = parseInt($('#'+id).css('height'));
	var box_width  = parseInt($('#'+id).css('width'));
	var graphic_wh = box_height * 0.72;
	var option = {
	    title: {
	        show:false,
	    },
	    color: ['rgba(176, 212, 251, 1)'], 
	    legend: {
	        show: true,
	        itemGap: 12,
	        right:'20%',
	        top:'40%',
	        width:'5%',
	        height:'10%',
	        textStyle: {
	            fontSize: '15',
	            fontWeight: 'normal',
	            color: '#BFC8D0'
	        },
	        icon: 'circle',
	        data: data['legend_data']
	    },
	   	graphic: {
			elements: [{
				type: 'image',
				style: {
					image: '../image/smart_screen/chart_bg.png',
					width: graphic_wh,
					height: graphic_wh
				},
				left: '8%',
				top: 'center',
			}]
		},
	    series: [{
	        name: 'Line 1',
	        type: 'pie',
	        clockWise: true,
	        center: ['30%', '50%'],
	        radius: ['48%', '56%'],
	        itemStyle: {
	            normal: {
	                label: {
	                    show: false
	                },
	                labelLine: {
	                    show: false
	                }
	            }
	        },
	        hoverAnimation: false, 
	        data: [{
	            value: data['series_data'][0]['value'],
	            name: data['series_data'][0]['name'],
	            label: {
	                normal: {
	                    formatter: '{d}%',
	                    position: 'center',
	                    show: true,
	                    textStyle: {
	                        fontSize: '160%',
	                        fontWeight: 'normal',
	                        color: '#FFFFFF'
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    // color: { // 完成的圆环的颜色
	                    //     colorStops: [{
	                    //         offset: 0,
	                    //         color: '#00cefc' // 0% 处的颜色
	                    //     }, {
	                    //         offset: 1,
	                    //         color: '#367bec' // 100% 处的颜色
	                    //     }]
	                    // },
	                    color:'#26D9FF',
	                    label: {
	                        show: false
	                    },
	                    labelLine: {
	                        show: false
	                    }
	                } 
	            }
	        }, {
	            name: data['series_data'][1]['name'],
	            value: data['series_data'][1]['value'],
	            itemStyle: {
	                normal: {
	                    // color: { // 完成的圆环的颜色
	                    //     colorStops: [{
	                    //         offset: 0,
	                    //         color: '#5F6B75' // 0% 处的颜色
	                    //     }, {
	                    //         offset: 1,
	                    //         color: '#BFC8D0' // 100% 处的颜色
	                    //     }]
	                    // },
	                    color:'#5F6B75',
	                    label: {
	                        show: false
	                    },
	                    labelLine: {
	                        show: false
	                    }
	                } 
	            }
	        }]
	    }]
	}
	myChartNew.setOption(option);
}

function simply_bar_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var option = {
	    // backgroundColor: '#1A232A',
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        show:false,
	        data: data['name'],
	        align: 'right',
	        right: 10,
	        textStyle: {
	            color: "#fff"
	        },
	        itemWidth: 10,
	        itemHeight: 10,
	        itemGap: 35
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'10%',
	        containLabel: true
	    },
	    xAxis: [{
	        type: 'category',
	        data: data['xAxis_data'],
	        axisLine: {
	            show: true,
	            lineStyle: {
	                color: "#26D9FF",
	                width: 1,
	                type: "solid"
	            }
	        },
	        axisTick: {
	            show: false,
	        },
	        axisLabel: {
	            show: true,
	            textStyle: {
	                color: "#9199A0",
	            },
	            formatter :function(params){
	            	if(!params){
	            		return "-";
	            	}
		            if(params.replace(/[\u0391-\uFFE5]/g,"aa").length > 12){
		                return params.substring(0,6)+'...'
		            }else{
		                return params;
		            }   
		        },
	        },
	    }],
	    yAxis: [{
	        type: 'value',
	        axisLabel: {
	            show: true,
	            textStyle: {
	                color: "#9199A0",
	            },
	            formatter: '{value}'
	        },
	        axisTick: {
	            show: false,
	        },
	        axisLine: {
	            show: true,
	            lineStyle: {
	                color: "#26D9FF",
	                width: 1,
	                type: "solid"
	            },
	        },
	        splitLine: {
	            show:false,
	            lineStyle: {
	                color: "#9199A0",
	            }
	        }
	    }],
	    series: [{
	        name: data['name'],
	        type: 'bar',
	        data: data['series_data'],
	        barMaxWidth:30,
	        // barWidth: 20,
	        barGap: 0, //柱子之间间距
	        itemStyle: {
	            normal: {
	                color: '#09A3C3',
	                opacity: 1,
	            }
	        }
	    }]
	};
	myChartNew.setOption(option);
}


function bar_double_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var option = {
	    // backgroundColor: '#1A232A',
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        show:false,
	        data: data['legend_data'],
	        align: 'right',
	        right: 10,
	        textStyle: {
	            color: "#fff"
	        },
	        itemWidth: 10,
	        itemHeight: 10,
	        itemGap: 35
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        top:'10%',
	        containLabel: true
	    },
	    xAxis: [{
	        type: 'category',
	        data: data['xAxis_data'],
	        axisLine: {
	            show: true,
	            lineStyle: {
	                color: "#26D9FF",
	                width: 1,
	                type: "solid"
	            }
	        },
	        axisTick: {
	            show: false,
	        },
	        axisLabel: {
	            show: true,
	            textStyle: {
	                color: "#9199A0",
	            },
	            formatter :function(params){
		            if(params.replace(/[\u0391-\uFFE5]/g,"aa").length > 12){
		                return params.substring(0,6)+'...'
		            }else{
		                return params;
		            }   
		        },
	        },
	    }],
	    yAxis: [{
	        type: 'value',
	        axisLabel: {
	            show: true,
	            textStyle: {
	                color: "#9199A0",
	            },
	            formatter: '{value}'
	        },
	        axisTick: {
	            show: false,
	        },
	        axisLine: {
	            show: true,
	            lineStyle: {
	                color: "#26D9FF",
	                width: 1,
	                type: "solid"
	            },
	        },
	        splitLine: {
	            show:false,
	            lineStyle: {
	                color: "#9199A0",
	            }
	        }
	    }],
	    series: [{
	        name: data['legend_data'][0],
	        type: 'bar',
	        data: data['series_data'][0],
	        barMaxWidth:25,
	        // barWidth: 20,
	        // barGap: 1, 
	        itemStyle: {
	            normal: {
	                color: '#09A3C3',
	                opacity: 1,
	            }
	        }
	    }, {
	        name: data['legend_data'][1],
	        type: 'bar',
	        data: data['series_data'][1],
	        barMaxWidth:25,
	        // barWidth: 20,
	        // barGap: 0,
	        itemStyle: {
	            normal: {
	                color: '#A9764E',
	                opacity: 1,
	            }
	        }
	    }]
	};
	myChartNew.setOption(option);
}


function simply_pie_chart(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var box_height = parseInt($('#'+id).css('height'));
	var box_width  = parseInt($('#'+id).css('width'));
	var graphic_wh = box_height * 0.72;
	var option = option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b} : {d}% <br/> {c}"
	    },
	    graphic: {
			elements: [{
				type: 'image',
				style: {
					image: '../image/smart_screen/chart_bg2.png',
					width: graphic_wh,
					height: graphic_wh
				},
				left: 'center',
				top: 'center',
			}]
		},
	    // backgroundColor: '#1A232A',
	    series : [
	        {
	            type: 'pie',
	            radius : ['45%','55%'],
	            center: ['50%', '50%'],
	            color:['#26D9FF','#CE5147','#72C146','#F9A555','#3B60A5'],
	            data:data['series_data'],
	            labelLine:{
	                normal:{
	                    show:true,
	                    length:40,
	                    length2:50,
	                    smooth:false,
	                    lineStyle:{
	                        // color:'#4681ec',
	                        width:2
	                    }
	                }
	                 
	            },
	            
	            label: {
	            	normal: {
	            		show : true,
	            		position: 'outside',
	                    formatter: '{b}:{c}\n\n{d}%',
	                    textStyle : {
                            fontSize : '15',
                        },
	                    align:'left',
	                },
	                emphasis : {
                        show : true,
                        position : 'center',
                        formatter: '{d}%',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        },
                        align:'center',
		            },
	            }
	        }
	    ]
	};
	myChartNew.setOption(option);
}


function simply_pie_chart2(id, data){
	var myChartNew = echarts.init(document.getElementById(id));
	var box_height = parseInt($('#'+id).css('height'));
	var box_width  = parseInt($('#'+id).css('width'));
	var graphic_wh = box_height * 0.99;
	var option = option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{b} : {d}% <br/> {c}"
	    },
	    graphic: {
			elements: [{
				type: 'image',
				style: {
					image: '../image/smart_screen/chart_bg3.png',
					width: graphic_wh,
					height: graphic_wh
				},
				left: 'center',
				top: 'center',
			}]
		},
	    // backgroundColor: '#1A232A',
	    series : [
	        {
	            type: 'pie',
	            radius : ['75%','85%'],
	            center: ['50%', '50%'],
	            color:['#26D9FF','#EB9B10','#CE5147'],
	            data:data['series_data'],
	            labelLine:{
	                normal:{
	                    show:false,
	                    length:40,
	                    length2:50,
	                    smooth:false,
	                    lineStyle:{
	                        // color:'#4681ec',
	                        width:2
	                    }
	                }
	                 
	            },
	        }
	    ]
	};
	myChartNew.setOption(option);
}


function color_ring_rate_chart(id, data, color){
	var myChartNew = echarts.init(document.getElementById(id));
	if(typeof color == 'undefined'){
		var tmp_color = ['#26D9FF', '#26D9FF'];
	}else if(typeof color == 'Array'){
		var tmp_color = color;
	}else{
		var tmp_color = [color, color];
	}
	console.log(tmp_color);
	var first_value = 75 * data / 100;
	var secord_value = 100 - first_value;

	option = {
	    title: {
	        text: data+'%',
	        x: '45%',
	        y: '30%',
	        textAlign: "center",
	        textStyle: {
	            fontWeight: 'normal',
	            fontSize:20,
	            color:'#fff',
	        },
	    },
	    series: [{
	            name: ' ',
	            type: 'pie',
	            radius: ['80%', '90%'],
	            startAngle: 225,
	            color: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                offset: 0,
	                color: tmp_color[0]
	            }, {
	                offset: 1,
	                color: tmp_color[1]
	            }]), "transparent"],
	            hoverAnimation: false,
	            legendHoverLink: false,
	            itemStyle: {
	                normal: {
	                    borderColor: "transparent",
	                    borderWidth: "10"
	                },
	                emphasis: {
	                    borderColor: "transparent",
	                    borderWidth: "10"
	                }
	            },
	            z: 10,
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data: [{
	                value: first_value
	            }, {
	                value: secord_value
	            }]
	        }, {
	            name: '',
	            type: 'pie',
	            radius: ['80%', '90%'],
	            startAngle: 225,
	            color: ["rgba(73, 93, 103, 0.5)", "transparent"],
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data: [{
	                value: 75
	            }, {
	                value: 25
	            }]
	        }

	    ]
	};


	myChartNew.setOption(option);
}


function special_ring_rate_chart(id, data){
	var tmp_rate = data['rate'] / 100;

	var myChartNew = echarts.init(document.getElementById(id));
	option = {
	    // backgroundColor: "#ffffff",
	    title: {
	        text: data['name'],
	        top : '0%',
	        right : '5%',
	        textStyle: {
	            fontSize: '14',
                fontWeight: 'normal',
                color: '#939393'
	        }
	    },
	    series: [
	        {
	            name:'外层点',
	            type:'gauge',
	            center : ['50%', '200%'],    // 默认全局居中
	            radius : '350%',
	            // min:0,
	            // max:50,
	            startAngle: 115,  
	            endAngle: 65,
	            splitNumber:4,
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: [[tmp_rate,'#26D9FF' ],[1, '#7B8890']],
	                    width: 0,
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 0
	                }
	            },
	            axisLabel: {            // 坐标轴小标记
	                textStyle: {       // 属性lineStyle控制线条样式
	                    fontWeight:'bold' ,
	                    color: 'rgba(30,144,255,0)',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 0
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                length :3,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto',
	                    width:3,
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 0
	                }
	            },
	            splitLine: {           // 分隔线
	                length :0,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    width:0,
	                    color: '#fff',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 0
	                }
	            },
	            pointer: {
	                width:0,
	                shadowColor : '#26D9FF', //默认透明
	                shadowBlur: 10
	            },
	            detail : {  
	                   show : false  
	               },  
	               data:[{value: 40}]  
	        },
	        {
	            name: '二环',
	            startAngle: 115,  
	            endAngle: 65,
	            type: 'gauge',
	            detail: {
	                formatter: '{value}%'
	            },
	            splitNumber:2,
	            center : ['50%', '200%'], 
	            radius : '330%',
	            axisLine: {
	                show: true,
	                lineStyle: {
	                    width: 10,
	                    color: [
	                        [1, 'rgba(28, 54, 68, 0.8)']
	                    ],
	                    shadowBlur: 30,
						shadowColor: 'rgba(28, 54, 68, 0.8)',
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						opacity: 1
	                }
	            },
	             axisLabel: {            // 坐标轴小标记
	                textStyle: {       // 属性lineStyle控制线条样式
	                    // fontWeight:'bold' ,
	                    color: '#7B8890',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 10,
	                },
	                formatter: '{value}%'
	            },
	            axisTick: {            // 坐标轴小标记
	                length :0,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto',
	                    shadowColor : '#26D9FF', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            splitLine: {           // 分隔线
	                length :30,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    width:0,
	                    color: '#fff',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            pointer: {
	                width:0,
	                shadowColor : '#26D9FF', //默认透明
	                shadowBlur: 10
	            },
	            detail : {  
	               show : false  
	           }, 
	            data: [{value: 60,}]
	    
	        },
	        {
	            name: '内环',
	            startAngle: 114,  
	            endAngle: 66,
	            type: 'gauge',
	            detail: {
	                formatter: '{value}%'
	            },
	            splitNumber:2,
	            center : ['50%', '200%'], 
	            radius : '325%',
	            axisLine: {
	                show: true,
	                lineStyle: {
	                    width: 4,
	                    color: [
	                        [tmp_rate, '#26D9FF'],
	                    ],
	                    shadowBlur: 30,
						shadowColor: 'rgba(28, 54, 68, 0.8)',
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						opacity: 1
	                }
	            },
	            axisLabel: {            // 坐标轴小标记
	                show : false 
	            },
	            axisTick: {            // 坐标轴小标记
	               show : false 
	            },
	            splitLine: {           // 分隔线
	                show : false 
	            },
	            pointer: {
	                show : false 
	            },
	            detail : {  
	              show : false  
	          }, 
	            data: [{value: 60,}]
	    
	        },
	        {
	            name:'内层点',
	            type:'gauge',
	            center : ['50%', '200%'],    // 默认全局居中
	            radius : '300%',
	            // min:0,
	            // max:50,
	            startAngle: 115,  
	            endAngle: 65,
	            splitNumber:2,
	            axisLine: {  
	                // show:false,
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: [[1, '#7B8890']],
	                    width: 0,
	                    shadowColor : '#26D9FF', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            axisLabel: {           
	                // show:false,
	                textStyle: {       // 属性lineStyle控制线条样式
	                    fontWeight:'bold' ,
	                    color: 'rgba(30,144,255,0)',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                // show:false,
	                length :0,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto',
	                    shadowColor : '#26D9FF', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            splitLine: {           // 分隔线
	                length :3,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    width:3,
	                    color: '#7B8890',
	                    shadowColor : '#7B8890', //默认透明
	                    shadowBlur: 10
	                }
	            },
	            pointer: {
	                width:0,
	                shadowColor : '#26D9FF', //默认透明
	                shadowBlur: 10
	            },
	            detail : {  
	                   show : false  
	               },  
	               data:[{value: 40}]  
	        },
	    ]
	};
    myChartNew.setOption(option);
}

function total_map_chart(el, data){
	var myChart = echarts.init(document.getElementById(el));

    var uploadedDataURL = "/Admin/json/data-1517645039291-B1vgpymUz.json";
    // var uploadedDataURL = "http://gallerybox.echartsjs.com/asset/get/s/data-1517645039291-B1vgpymUz.json";

    $.getJSON(uploadedDataURL, function(geoJson) {
        console.log('xx');
        console.log(geoJson);
        echarts.registerMap('zhongguo', geoJson);
        myChart.hideLoading();
        
        var levelColorMap = {
	        '1': 'rgba(235, 155, 16, 1)',
	        '2': 'rgba(218, 112, 26, 1)',
	        '3': 'rgba(206, 81, 71, 1)',
	        '4': 'rgba(130, 227, 68, 1)',
    	};

        var max = 100000,
            min = 900; // todo 
        var maxSize4Pin = 100,
            minSize4Pin = 20;

        var projectData = data.project_point;

        var provinceData = data.province_project_num;

        option = {
            title: {
                show:false,
                text: '项目分布',
                x: 'center',
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (typeof(params.value) == "undefined" || isNaN(params.value)) {
                        return params.name;
                    } else {
                        return params.name + ' : ' + params.value;
                    }
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['sell_area'],
                textStyle: {
                    color: '#fff'
                },
                show:true
            },
            visualMap: {
                show: false,
                min: 0,
                max: data.max_project_num,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {
                    color: ['#1B3742', '#22ABC9'] // 蓝黑
                }
            },
            // toolbox: {
            //     show: true,
            //     orient: 'vertical',
            //     left: 'right',
            //     top: 'center',
            //     feature: {
            //             dataView: {readOnly: false},
            //             restore: {},
            //             saveAsImage: {}
            //             }
            // },
            geo: {
                show: true,
                map: 'zhongguo',
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
                        areaColor: 'rgba(27,55,66,0.9)',
                        borderColor: 'rgba(34,170,198,0.9)',
                    },
                    emphasis: {
                        areaColor: 'rgba(34,170,198,0.9)',
                    }
                }
            },
            series: [
                {
                    name: 'point',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: projectData,
                    symbolSize: 5,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                        	 formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function(params){
		                        return levelColorMap[params.value[3]];
		                    },
                        }
                    }
                },
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 0,
                    aspectScale: 1, //长宽比
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
                            borderColor: '#3B5077',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: provinceData
                },
                //tag标注
                // {
                //     name: '点',
                //     type: 'scatter',
                //     coordinateSystem: 'geo',
                //     symbol: 'pin',
                //     symbolSize: function(val) {
                //         var a = (maxSize4Pin - minSize4Pin) / (max - min);
                //         var b = minSize4Pin - a * min;
                //         b = maxSize4Pin - a * max;
                //         return a * val[2] + b;
                //     },
                //     label: {
                //         normal: {
                //             show: true,
                //             textStyle: {
                //                 color: '#000',
                //                 fontSize: 9,
                //             }
                //         }
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: 'green', //标志颜色
                //         }
                //     },
                //     zlevel: 6,
                //     data: data,
                // },
                //标注点
                {
                    name: '项目位置',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: projectData,
                    symbolSize: 5,
                    showEffectOn: 'render',
                    rippleEffect: {
                        period: 15,
		                scale: 10,
		                brushType: 'stroke'
		                // brushType: 'fill'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function(params){
		                        return levelColorMap[params.value[3]];
		                    },
                            shadowBlur: 18,
                            shadowColor: function(params){
		                        return levelColorMap[params.value[3]];
		                    },
                        }
                    },
                    zlevel: 1
                },

            ]
        };
        myChart.setOption(option);

        myChart.on('click', function (params) {
            var type = params.componentSubType;
            if(type == "effectScatter" && $('.project_layer').length == 0){
            	var url = "/Admin/SmartData/get_project_info_data";
            	var params = {
            		'project_id' : params.value[2],
            	};
            	$.post(url, params, function(ret){
            		if(ret['code'] == 0){
            			var html_text = template('project_layer_temp', ret['data']['OrgProjectInfo']);
                		$('#total_project_info .box_body').append(html_text);
            		}
            	},'json');
            }
        });

    });
}

$('.container').delegate('.project_layer .detail','click',function(){
	var project_id = $(this).attr('data-id');
	article_add('','/Admin/SmartScreen/index?access_org_id='+project_id,'90%','90%');
	// article_add('','','90%','90%');
	// $(this).remove();
});

$('.container').delegate('.project_layer .close','click',function(){
	$(this).parent('.project_layer').remove();
});

function article_add(title,url,w,h){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
	  	shadeClose: true,
		shade: 0.8,
		area: [w, h],
	});
	$('.layui-layer-content').css({
		'background-color' : 'rgba(0,0,0,0.8)',
	});

	$('.layui-layer-load').css({
		'background-color' 		: 'rgba(0,0,0,0.8)',
		'background-image' 		: 'url(/Admin/image/smart_screen/loading.gif)',
		// 'background-image' 		: 'url(/Admin/image/smart_screen/bg.png)',
		'background-repeat'		: 'no-repeat',
		'background-position'	: 'center center',
		'background-size' 		: '100% 100%',
	});

	$('.layui-layer-title').css({
		'background-color':'green',
		'border':0,
		// 'height':'0px',
	});

	$('.layui-layer-setwin .layui-layer-close2').css({
		'top' 		: '-3px',
		'right'		: '3px',
		'width' 	: '17px',
		'height' 	: '17px',
		'z-index'   : '99',
	});
	
	$('.layui-layer-ico').css({
		'background' : "url(/Admin/image/smart_screen/close.png) no-repeat",
	});
}

function article_add2(title,url,w,h){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
	  	shadeClose: true,
		shade: 0.8,
		area: [w, h],
	});
	$('.layui-layer-setwin .layui-layer-close2').css({
		'top' 		: '-20px',
		'right'		: '-20px',
		'width' 	: '17px',
		'height' 	: '17px',
		// 'z-index'   : '99',
	});

	$('.layui-layer-ico').css({
		'background' : "url(/Admin/image/smart_screen/close.png) no-repeat",
	});
}

/**
 * [scroll_new_dynamic 最新动态滚动]
 * @param  {[type]} elelment [指定元素]
 * @return {[type]}          [description]
 */
function scroll_new_dynamic(elelment,time1,time2){
	var $this = $(elelment); 
    var scrollTimer; 
    $this.hover(function() { 
        clearInterval(scrollTimer); 
    }, function() { 
        scrollTimer = setInterval(function() { 
            scrollNews($this); 
        }, time1); 
    }).trigger("mouseleave");
    function scrollNews(obj) { 
        var $self = obj.find("ul"); 
        var lineHeight = $self.find("li:first").outerHeight(); 
        $self.animate({ 
            "marginTop": -lineHeight + "px" 
        }, time2, function() { 
            $self.css({ 
                marginTop: 0 
            }).find("li:first").appendTo($self); 
        }) 
    } 
}

//视频播放
var init_video = function(id){
    try {
        var player = new EZUIPlayer(id);
        $('#'+id).data('player', 'player');
        player.on('error', function(){
            // console.log('error');
        });
        player.on('play', function(){
            // console.log('play');
        });
        player.on('pause', function(){
            // console.log('pause');
        });

        // console.log(player);
    } catch (e) {

    }
}

//视频关闭
$('body').delegate('.video-close', 'click', function(){
    var video = $(this).parent().find('video');
    var player = video.data('player');
    if(player && player.hls && player.hls.destroy){
        player.hls.destroy();
    }
    layer.closeAll();
});


//bim加载
var successCallback = function (viewMetaData) {
    // 创建WebApplication，直接显示模型或图纸
    var dom4Show = document.getElementById('bimface');
    new Glodon.Bimface.Application.WebApplicationDemo(viewMetaData, dom4Show); 
    is_load = 1;
}

var failureCallback = function (error) {
    console.log(error);
};

var getViewToken = function(bim_data){
    if($('.bf-container').length > 0){
        $('#bimface').html("");
    }
    if(bim_data['type'] == 1){ //单文件
        var data = {
            key:'kMpwcPC6TBqNbjIDJcmF0Fb1MH8XIgvE',
            secret:'8DDKR1dELu5QVvKr2JKr3TyqLz0Hflcx',
            fileId: bim_data['code'],
        } 
    }else if(bim_data['type'] == 2){ //合成模型
        var data = {
            key:'kMpwcPC6TBqNbjIDJcmF0Fb1MH8XIgvE',
            secret:'8DDKR1dELu5QVvKr2JKr3TyqLz0Hflcx',
            integrateId: bim_data['code'],
        } 
    }
   
    var url = "/Admin/Display/get_view_token";
    $.post(url, data, function(ret){
        switch(ret['code']){
            case 0:
                // 指定待显示的模型或图纸（viewToken从服务端获取）
                var viewToken = ret['data'];
                // // 初始化显示组件
                var options = new BimfaceSDKLoaderConfig();
                options.viewToken = viewToken;
                BimfaceSDKLoader.load(options, successCallback, failureCallback);
                break;
            default:
                break;
        }
    });
}

//弹层关闭
$('body').delegate('.elastic_layer .close', 'click', function(){
	$(this).parents('.elastic_layer_bg').remove();
});


//视频监控弹层

//监控类型选择hover事件
$("body").delegate("#monitor_video_elastic_layer_body .type_select", "mouseenter", function () {
        $(this).find("ul").css("display","block");
    }
);
$("body").delegate("#monitor_video_elastic_layer_body .type_select", "mouseleave", function () {
        $(this).find("ul").css("display","none");
    }
);

//监控布局类型选择hover事件
$("body").delegate("#monitor_video_elastic_layer_body .matrix_select", "mouseenter", function () {
        $(this).find("ul").css("display","block");
    }
);
$("body").delegate("#monitor_video_elastic_layer_body .matrix_select", "mouseleave", function () {
        $(this).find("ul").css("display","none");
    }
);

var FULL_SCREEN = 0;

//控制页面全屏
function fullScreen() {

  	var el = document.documentElement;

  	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

  	if(typeof rfs != "undefined" && rfs) {
    	rfs.call(el);
  	} else if(typeof window.ActiveXObject != "undefined") {
    	// for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    	var wscript = new ActiveXObject("WScript.Shell");
    	if(wscript != null) {
        	wscript.SendKeys("{F11}");
    	}
  	}
}

function exitFull() {
  	// 判断各种浏览器，找到正确的方法
  	var exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen; 
  	
  	if (exitMethod) {
    	exitMethod.call(document);
 	}
  	else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
    	var wscript = new ActiveXObject("WScript.Shell");
    	if (wscript !== null) {
      		wscript.SendKeys("{F11}");
    	}
  	}
}

$(".smart_screen_huazhu_logo").click(function(){
	if(FULL_SCREEN == 0){
		FULL_SCREEN = 1;
		fullScreen();
	}else if(FULL_SCREEN == 1){
		FULL_SCREEN = 0;
		exitFull();
	}
});





