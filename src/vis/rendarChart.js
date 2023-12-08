export class RendarChart{
    constructor(){
        this.chartDom = document.querySelector(".rendarChart");
        this.mChart = echarts.init(this.chartDom);
    }

    setOption(){
        this.option = {
            legend: {
              data: ['积极', '非积极']
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: '江苏', max: 73},
                { name: '安徽', max: 200},
                { name: '湖北', max: 300 },
                { name: '陕西', max: 141 },
                { name: '山东', max: 180},
                { name: '江西', max: 40}
              ]
            },
            
            tooltip:{},
            
            series: [
              {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                  {
                    value: [65,180,260,85,153,36],
                    name: '积极'
                  },
                  {
                    value: [8,20,40,56,28,6],
                    name: '非积极'
                  }
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