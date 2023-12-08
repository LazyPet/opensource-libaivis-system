export class PieChart{
    // This Chart is Pie Chart
    constructor(){
        this.chartDom = document.querySelector(".pieChart");
        this.mChart = echarts.init(this.chartDom);
        // 设置
        
        }

        setOption(){
          this.option = {
            tooltip: {
              trigger: 'item',
              axisPointer: {
                  animation: false
              },
              formatter:function (params){
                  return `居住时间: ${params.value}年`
              }
            },
            legend: {
                top: '5%',
                left: 'center',
                show:true
            },
            series: [
                {
                  name: '停留时间',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 40,
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data:[
                     {name:"兖州", value:20},
                     {name:"孝感", value:4}, 
                     {name:"绵阳", value:16}, 
                     {name:"长安", value:2},
                     {name:"扬州", value:1},
                     {name:"南京", value:2}
                    ]
                }
            ]
        }
    }

    run(){
      this.setOption();
        this.option && this.mChart.setOption(this.option);
    }
    
}