import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChartComponent} from "ng-apexcharts";
import {PublicTestService} from "../../../../core/services/company/public.test.service";

@Component({
  selector: 'app-admin-detail-test',
  templateUrl: './detail.personalite.component.html',
  styleUrls: ['./detail.personalite.component.scss'],
})
export class DetailPersonality implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  breadCrumbItems: any;
  TestDetail: any
  testType: any = 0
  name: any
  question: string
  tabdata: any
  tabdata1: any[] = []
  tabdata2: any
  total : any
  valeurAgreed : any
  valeurDisagreed:any

  constructor(private publicTestService: PublicTestService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.TestDetail = this.router.snapshot.params.id
    this.testType = this.router.snapshot.params.type
    this.name = this.router.snapshot.params.name

    this.publicTestService.detailPersonality(this.testType, this.TestDetail).subscribe((res) => {
      console.log("d",res.data)
      console.log("data",res.data[0])

     this.tabdata1 = res.data[0]
      console.log(this.tabdata1)
      for (const [key, value] of Object.entries(this.tabdata1)) {
          this.tabdata = value
      }
      console.log(this.tabdata)
      for (const [key, value] of Object.entries(this.tabdata)) {
        // @ts-ignore
        const {disagreed, agreed} = value;
        this.total = agreed + disagreed
        console.log("total",this.total)
        this.valeurAgreed = agreed/this.total
        console.log("agreed",this.valeurAgreed)
        this.valeurDisagreed = disagreed/this.total
        console.log("disagreed",this.valeurDisagreed)

      }
      console.log("tab",this.tabdata)
     /* this.tabdata.forEach(elem => {
        console.log("elem",elem)
        for (const [key, value] of Object.entries(elem)) {

          this.tabdata1.push(value)
        }
      })
*/
/*      this.tabdata1.forEach(elem => {

        this.total = elem.agreed + elem.disagreed
        console.log("total",this.total)
          this.valeurAgreed = elem.agreed/this.total
        console.log("agreed",this.valeurAgreed)
          this.valeurDisagreed = elem.disagreed/this.total
        console.log("disagreed",this.valeurDisagreed)

        this.tabdata2 = {
          chart: {
            height: 200,
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
            data: [elem.agreed,elem.disagreed]
          }],
          colors: ['#42a5f5'],
          xaxis: {
            categories: ["d'accord","pas d'accord"],
          },
          grid: {
            borderColor: '#f1f1f1'
          },
          title: {
            text: elem.question,
            floating: 0,
            offsetY: 320,
            align: "center",
            style: {
              color: "#444"
            }
          }
        };
      })*/

    })
  }


}
