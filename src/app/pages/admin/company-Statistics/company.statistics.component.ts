import {Component, OnInit, ViewChild} from '@angular/core';
import {StatService} from "../../../core/services/company/stat.service";
import {Router} from "@angular/router";
import {ChartType} from "../../chart/apex/apex.model";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke, ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin-company-stats',
  templateUrl: './company.statistics.component.html',
  styleUrls: ['./company.statistics.component.scss'],
})
export class CompanyStatisticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chart1") chart1: ChartComponent;
  @ViewChild("chart2") chart2: ChartComponent;
  @ViewChild("chart3") chart3: ChartComponent;
  @ViewChild("chart4") chart4: ChartComponent;
  @ViewChild("chart5") chart5: ChartComponent;
  @ViewChild("chart6") chart6: ChartComponent;
  @ViewChild("chart7") chart7: ChartComponent;
  breadCrumbItems: any;
  public lineChartCompany: ChartOptions
  public lineChartUser: ChartOptions
  public lineChartClub: ChartOptions
  public lineChartPost: ChartOptions
  public lineChartPoll: ChartOptions
  public lineChartInterview: ChartOptions
  public lineChartMessages: ChartOptions
  public lineChartPersonalityTest: ChartOptions
  companyNumber: any
  userNumber: any
  clubNumber: any
  postNumber: any
  pollNumber: any
  interviewNumber: any
  messageNumber: any
  personalityTestNumber: any


  constructor(private statService: StatService, private router: Router) {
  }

  ngOnInit() {


    this.breadCrumbItems = [{label: 'Contacts'}, {label: 'Profile', active: true}];
    this.statService.stats().subscribe((res) => {
      if (res.success) {
        this.companyNumber = res.data.companySeries.length;
        this.postNumber = res.data.postSerie.length

        this.lineChartPost = {
          series: [{
            name: 'postSerie',
            data: res.data.postSerie
          }],
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {borderColor: "#e7e7e7",
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.1
            },
          },
          xaxis: {
            categories: res.data.postLabel,
            title: {
              text: "Week"
            }
          },

        };

        this.lineChartCompany = {
          series: [{
            name: 'companySeries',
            data: res.data.companySeries
          }],
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: res.data.companyLabel,
            title: {
              text: "Week"
            }
          },

        };

        this.userNumber = res.data.userSeries.length;

        this.lineChartUser = {
          series: [{
            name: 'userSeries',
            data: res.data.userSeries
          }],
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            },
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: res.data.userLabel,
            title: {
              text: "Week"
            }
          },

        };
        this.clubNumber = res.data.userSeries.length;

        this.lineChartClub = {
          series: [{
            name: 'clubSeries',
            data: res.data.clubSeries
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: res.data.clubLabel,
            title: {
              text: "Week"
            }
          },

        };

        this.pollNumber = res.data.pollSeries.length

        this.lineChartPoll = {
          series: [{
            name: 'pollSeries',
            data: res.data.pollSeries
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2
            },
          },
          xaxis: {
            categories: res.data.pollLabel,
            title: {
              text: "Week"
            }
          },

        };
        this.interviewNumber = res.data.interviewSerie.length

        this.lineChartInterview = {
          series: [{
            name: 'interviewSerie',
            data: res.data.interviewSerie
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2
            },
          },
          xaxis: {
            categories: res.data.interviewLabel,
            title: {
              text: "Week"
            }
          },

        };

        this.messageNumber = res.data.messagesSeries.length
        this.lineChartMessages = {
          series: [{
            name: 'messagesSeries',
            data: res.data.messagesSeries
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2
            },
          },
          xaxis: {
            categories: res.data.messagesLabel,
            title: {
              text: "Week"
            }
          },

        };

        this.personalityTestNumber = res.data.totalTestPersonalitySerie.length
        this.lineChartPersonalityTest = {
          series: [{
            name: 'personalityTest',
            data: res.data.totalTestPersonalitySerie
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'straight'
          },

          title: {
            text: 'Evolution par Semaine',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.2
            },
          },
          xaxis: {
            categories: res.data.totalTestPersonalityLabel,
            title: {
              text: "Week"
            }
          },

        };
      }
    },(err)=>{
      if(err.status == 401){
        this.router.navigate(['error'])
      }
  })
}}
