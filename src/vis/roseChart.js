export class RoseChart{
    //This chart is map chart    
    constructor(data){
        this.chartDom = document.querySelector(".roseChart");
        this.mChart = echarts.init(this.chartDom);
        this.mColor = ['#5470C6','#FAC858','#EE6666'];

        this.mData = data;
    }

    setData(data){
      this.mData = data;
    }

    setOption(mColor){
      this.option = {
        tooltip: {
          trigger: 'item',
          axisPointer: {
              animation: false
          },
          formatter:function (params){
              return `${params.name}诗歌: ${params.value}首`
          }
        },
        legend: {
          top:'5%',
          color: function(params){
            return mColor[params.dataIndex];
          }
        },
        angleAxis: {
          show:false,
          min:0,
          max:300
        },
        radiusAxis: {
          type: 'category',
          data: ['消极','普通', '积极'],
          z: 10,
          axisLine:{
            show:false
          },
          splitLine:{
            show:false
          },
          show:false,
        },
        polar: {
          tooltip:{
            axisPointer:{
              crossStyle:{
                opacity:0
              }
            }
          },
          
        },
        series: [
          {
            type: 'bar',
            roundCap: true,
            data: this.mData,
            coordinateSystem: 'polar',
            stack: 'a',
            barWidth:40,
            itemStyle:{
              borderColor: '#fff',
              borderWidth: 2,
              color:function(params){
                return mColor[params.dataIndex];
              },
              barBorderRadius:50
            }
          },
          {
            name:"积极",
            type: 'bar',
            data: [0,0,0],
            coordinateSystem: 'polar',
            itemStyle:{
              show:false
            },
            color:'#EE6666'
          },
          {
            name:"消极",
            type: 'bar',

            data: [0,0,0],
            coordinateSystem: 'polar',
            itemStyle:{
              show:false
            },
            color:'#5470C6'
          },
          {
            name:"普通",
            type: 'bar',
            data: [0,0,0],
            coordinateSystem: 'polar',
            itemStyle:{
              show:false
            },
            color:'#FAC858'
          },
          
         
          
        ],
      };


    }

    run(){
        this.setOption(this.mColor);
        this.option && this.mChart.setOption(this.option);
    }
}