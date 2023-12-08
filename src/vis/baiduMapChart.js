import { BaiduMapAssets } from "../assets/baiduMapAssets.js";

export class BaiduMapChart{
    constructor(travelData, liveData){
        this.chartDom = document.querySelector(".baiduMapChart");
        this.mChart = echarts.init(this.chartDom);
        this.mTravelData = travelData;
        this.mLiveData = liveData;
        this.mAssets = new BaiduMapAssets();

        this.zoom = 6;
        this.center = [108.852500,34.322700];
        this.time = 1000;
    }

    setAnimationTime(time){
        this.time = time;
    }

    initBaiduMap(){
        this.setAnimationTime(0);
        this.setBmapCity('6',[108.852500,34.322700]);
        this.mChart.clear();
        this.run();
    }

    convertDataToScatter(){
        let liveData = [];
        this.mLiveData.forEach(elem=>{
            let temp = {};
            temp.name = elem[0];

            temp.value = [];
            let coord = [];
            coord = this.mAssets.geoCoordMap[elem[0]];
            coord.push(elem[1]);
            temp.value = coord;
           
            liveData.push(temp);
        })
        return liveData;
    }


    convertDataToAllPath(){
        let allTravelPath = [];
        this.mTravelData.forEach(elem => {
            let temp = {};
            temp.year = elem[0],
            temp.fromName = elem[1] // from city
            temp.toName = elem[2]; // to city
            temp.coords = [];
            temp.coords.push(this.mAssets.geoCoordMap[elem[1]]);  // from city coord
            temp.coords.push(this.mAssets.geoCoordMap[elem[2]]);  // to city coord

            allTravelPath.push(temp);

        }); 
        return allTravelPath;
    }

    setOption(optionTime){
        this.option ={
            bmap:{
                center: this.center,
            zoom: this.zoom,
            roam: true,
            },

            tooltip: {
                trigger: 'item',
                axisPointer: {
                    animation: false
                },
                formatter:function (params){
                    console.log("params", params);
                    if(params.componentSubType=='lines'){
                        return `公元${params.data.year}年: 从${params.data.fromName}到${params.data.toName}`;
                    }
                    else{
                        return `${params.data.name},: ${params.data.value[2]}年`
                    }
                    
                }
              },

            series:[
                {
                    name: "轨迹",
                    type: 'lines',
                    zlevel: 1,
                    symbol: ['none', 'arrow'],
                    coordinateSystem: 'bmap',
                    symbolSize: 10, 
                    effect: {
                        show:false,
                    },
                    lineStyle: {
                        normal: {
                            color: "#faca5e",
                            width: 1,
                            opacity: 1,
                            curveness: 0.4
                        }
                    },
                    animationDelay: (idx)=>{
                        return idx * optionTime;
                    },

                    // animation: false,
                    data: this.convertDataToAllPath()
                },
                {
                    name: '城市',
                    type: 'effectScatter', //效果分散
                    coordinateSystem: 'bmap', //该系列使用的坐标系
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke' //波纹的绘制方式  
                    },
                    //标签
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function(val) { //这里的value是我们绑定的数据
                        if(val[2]>10){
                            return 20+(val[2]-10);
                        }
                        else return val[2]*3+3;
                    },
                    itemStyle: {
                        normal: {
                            color: '#d35400'
                        }
                    },
                    data: this.convertDataToScatter()
                },
            ]
        }
    }


    setBmapCity(zoom,center){
        this.zoom = zoom;
        this.center = center;
    }

    run(){
        this.setOption(this.time);
        this.option && this.mChart.setOption(this.option);
    }
}