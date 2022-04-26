import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { PublicTestService } from "../../../core/services/company/public.test.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ChartComponent
} from "ng-apexcharts";
import * as XLSX from 'xlsx';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  labels: ApexDataLabels;
  legend: any;
  colors: any;
  responsive: any;
};

@Component({
  selector: 'app-admin-public-test',
  templateUrl: './public.test.component.html',
  styleUrls: ['./public.test.component.scss'],
})
export class PublicTestComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  breadCrumbItems: any;
  public barChartTrimojiGlobal: any
  public barChartTrimojiTestCourt: any
  public barChartTrimojiTestLong: any
  public barChartTestLong: any
  public barChartTestGlobal: any
  public barChartTestCourt: any
  public simplePieChart: ChartOptions

  totalTest: any
  messageNumber: any
  personalityTestNumber: any
  nbtrimojis: any
  nbperso: any
  perTrimojis: any
  perPerso: any
  exportExcel: any
  exportEmail:any
  exportGlobalFeedbackTestCourt:any

  constructor(private publicTestService: PublicTestService,
    private router: Router, private elementref: ElementRef) {
  }
  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.publicTestService.PublicTest().subscribe((res) => {
      if (res.success) {
        console.log(res.data)
        this.exportEmail = res.data.emails
        this.exportGlobalFeedbackTestCourt = res.data.GlobalvaluesFeedBackTestCourt
        this.exportExcel = res.data
        this.totalTest = res.data.TestPublic[0] + res.data.TestPublic[1];
        this.nbperso = res.data.nbpersoTestGlobal
        this.nbtrimojis = res.data.nbTrimojisGlobale
        this.perTrimojis = (this.nbtrimojis / this.totalTest * 100).toFixed(2)
        this.perPerso = (this.nbperso / this.totalTest * 100).toFixed(2)

        this.simplePieChart = {
          chart: {
            height: 320,
            type: 'pie',
          },
          series: res.data.TestPublic,
          labels: res.data.labels,
          colors: ['#008000', '#FFA500'],
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10
          },
          responsive: [{
            breakpoint: 600,
            options: {
              chart: {
                height: 240
              },
              legend: {
                show: true
              },
            }
          }]
        };

        this.barChartTrimojiTestLong = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.GlobalvaluesTrimojiTestLong
          }],
          colors: ['#FF4560'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };


        this.barChartTrimojiTestCourt = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.GlobalvaluesTrimojiTestCourt
          }],
          colors: ['#FF4560'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };

        this.barChartTrimojiGlobal = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.GlobalvaluesTrimoji
          }],
          colors: ['#00E396'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };

        this.barChartTestGlobal = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.valuesFeedBackTestGlobal
          }],
          colors: ['#008FFB'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };

        this.barChartTestCourt = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.GlobalvaluesFeedBackTestCourt
          }],
          colors: ['#FFA500'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };

        this.barChartTestLong = {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          series: [{
            data: res.data.GlobalvaluesFeedBackTestLong
          }],
          colors: ['#FFA500'],
          xaxis: {
            categories: res.data.labelsFeedback,
          },
          grid: {
            borderColor: '#f1f1f1'
          },
        };

      }


    }, (err) => {
      if (err.status == 401) {
        this.router.navigate(['error'])
      }
    })
  }
  export() {
    const ele = this.elementref.nativeElement.querySelector('.excel');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportEmail);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }

}
