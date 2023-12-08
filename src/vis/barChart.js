export class BarChart{
    
    constructor(){
        this.chartDom = document.querySelector(".barChart");
        this.mChart = echarts.init(this.chartDom);
        
    }

    setOption(){
        this.option = {
          xAxis: {
            type: 'category',
            data: ['江苏', '安徽', '湖北','陕西', '山东', '江西']
          },
          yAxis: {
            type: 'value'
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {
                animation: false
            },
            formatter:function (params){
                return `${params.name}: ${params.value}首`
            }
          },
          toolbox:{
            show:true,
            feature: {
              magicType: {
                  type: ['line', 'bar', 'stack']
              }
            }
          },
          series: [
            {
              data: [73,200,300,141,180,40],
              type: 'bar',
              itemStyle: {
                borderRadius: 15,
                borderColor: '#fff',
                borderWidth: 2
              },
            }
          ]
        };
    }
    

    run(){
        this.setOption();
        this.option && this.mChart.setOption(this.option);
    }
}
