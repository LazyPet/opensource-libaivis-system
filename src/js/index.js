import { BaiduMapChart } from "../vis/baiduMapChart.js";
import { RoseChart } from "../vis/roseChart.js";
import { PieChart } from "../vis/pieChart.js";
import { BarChart } from "../vis/barChart.js";
import { LineChart } from "../vis/lineChart.js";
import { RendarChart } from "../vis/rendarChart.js";



const getBDMapTravel = async()=>{return await $.get('data/baiduMapData/travel.json');}
const getBDMapLive = async()=>{return await $.get('data/baiduMapData/live.json');}
const BDDTravel = await getBDMapTravel();
const BDDLive = await getBDMapLive();

const getLineChartData = async()=>{return await $.get('data/lineChartData.json');}
const lineChartData = await getLineChartData();

const roseChartData = [[23,43,122],[3,4,11],[10,18,45],[10,21,66]];

export class App{

    constructor() {
        this.roseChart = new RoseChart(roseChartData[0]);
        this.pieChart = new PieChart();
        this.barChart = new BarChart();
        this.rendarChart = new RendarChart();
        this.lineChart = new LineChart(lineChartData);
        this.baiduMapChart = new BaiduMapChart(BDDTravel,BDDLive);

        this.selected = false;
    }
    

    run(){
        this.roseChart.run();
        this.pieChart.run();
        this.barChart.run();
        this.rendarChart.run();
        this.lineChart.run();
        this.baiduMapChart.run();
    }


    setInteract(){
        // 多图联动
        this.barChart.mChart.on('click',(params)=>{
            switch (params.name){
                case '湖北':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[114.34844 , 30.55160]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                };
                case '江苏':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[118.80242 , 32.06465]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                };
                case '陕西':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[108.96039 , 34.27581]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                };
                case '山东':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[117.02744 , 36.67486]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                };
                case '安徽':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[117.33054 , 31.73429]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                }
                case '江西':{
                    if (this.selected == true) {
                        this.baiduMapChart.initBaiduMap();
                        this.selected = false;
                    }
                    else{
                        this.baiduMapChart.setBmapCity('8',[115.91542 , 28.68169]);
                        this.baiduMapChart.run();
                        this.selected = true;
                    }
                    break;
                }
                default: break;
            }
            
        })

        // roseChartSelect
        const roseSelectDom = document.querySelector(".selectPeriod")
        roseSelectDom.addEventListener('change',()=>{
            const period = roseSelectDom.value;
            switch (period){
                case 'allyear':{
                    this.roseChart.setData(roseChartData[0]);
                    this.roseChart.run();
                    break;
                }
                case 'youngage':{
                    this.roseChart.setData(roseChartData[1]);
                    this.roseChart.run();
                    break;
                }
                case 'middleage':{
                    this.roseChart.setData(roseChartData[2]);
                    this.roseChart.run();
                    break;
                }
                case  'olderage':{
                    this.roseChart.setData(roseChartData[3]);
                    this.roseChart.run();
                    break;
                }
                default:break;
            }
        })

        // bmapChartSelect
        const bmapSelectDom = document.querySelector(".selectTimeout")
        bmapSelectDom.addEventListener('change',()=>{
            const timeout = bmapSelectDom.value;
            switch (timeout){
                case 'slow':{
                    this.baiduMapChart.setAnimationTime(4000);
                    this.baiduMapChart.mChart.clear();
                    this.baiduMapChart.run();
                    break;
                }
                case 'middle':{
                    this.baiduMapChart.setAnimationTime(2000);
                    this.baiduMapChart.mChart.clear();
                    this.baiduMapChart.run();
                    break;
                }
                case 'fast':{
                    this.baiduMapChart.setAnimationTime(500);
                    this.baiduMapChart.mChart.clear();
                    this.baiduMapChart.run();
                }
                default:  break;
            }
        })

        // bmapButton restart
        const bmapRestartButton = document.querySelector('.bmapButton')
        bmapRestartButton.addEventListener('click',()=>{
            this.baiduMapChart.mChart.clear();
            this.baiduMapChart.setAnimationTime(1000);
            this.baiduMapChart.setBmapCity('6',[108.852500,34.322700]);
            this.baiduMapChart.run();
        })
    }
}

let app = new App();
app.run();
app.setInteract();


