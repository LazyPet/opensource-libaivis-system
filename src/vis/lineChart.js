export class LineChart{
    // This is line chart
    constructor(chartData){
        this.chartDom = document.querySelector(".lineChart");
        this.mChart = echarts.init(this.chartDom);
        this.mChartData = chartData;

        this.convertTimeAndPoemData();
        this.convertPositiveAndNegativeData();
    }


    convertTimeAndPoemData(){
        let timeData=[];
        let poemData = [];
        this.mChartData.forEach(elem => {
            timeData.push(elem[0]);
            poemData.push(elem[1]);
        });
        this.timeData = timeData;
        this.poemData = poemData;
    }


    convertPositiveAndNegativeData(){
        let postiveData = [];
        let negativeData = [];
        this.mChartData.forEach(elem => {
            let posCount = 0;
            let negaCount= 0;
            elem[3].forEach(subElem=>{
                if(subElem=="0"){
                    negaCount++;
                }
                else if(subElem=="2"){
                    posCount++;
                }
            });
            postiveData.push(posCount);
            negativeData.push(negaCount);
        });
        this.postiveData = postiveData;
        this.negativeData = negativeData;
    }

    setOption(){
        this.option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                },
            },
            axisPointer: {
                link: {xAxisIndex: 'all'}
            },
            legend:{

            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    top: '93%',
                    xAxisIndex: [0],
                   
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 30,
                    end: 70,
                    top:'93%',
                    xAxisIndex: [0],
                   
                }
            ],
            grid: [
                {left: '2%',bottom: '8%', width: '98%', height: '95%',containLabel:false},
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    // axisLine: {onZero: true},
                    axisTick: {
                        show: true
                    },
                    axisLine:{
                        show:true
                    },
                    axisLabel:{
                        show:true
                    },
                    data: this.timeData
                    
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    // max: 40,
                    axisTick: {
                        show: true
                    },
                    axisLine:{
                        show: true
                    },
                    splitLine:{
                        show:true
                    },
                    axisLabel:{
                        show:true
                    },
                    nameTextStyle:{
                        color:'#f7b5ad',
                        fontWeight:600
                    },
                    scale:true,
                    nameLocation:'middle'
                },
                
            ],
            series: [
                {
                    name: '总诗数',
                    type: 'line',
                    symbolSize: 1,
                    hoverAnimation: false,
                    data: this.poemData,
                    
                    color:'#f7b5ad'
                },
                {
                    name: '积极诗',
                    type:'line',
                    data: this.postiveData
                },
                {
                    name: '消极诗',
                    type:'line',
                    data: this.negativeData
                }
            ]
        };
    }

    run(){
        this.setOption();
        this.option && this.mChart.setOption(this.option);
    }

}