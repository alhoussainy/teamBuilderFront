import {Component, Input, OnInit} from '@angular/core';

import { ChartType } from './chartjs.model';

import { lineAreaChart, lineBarChart, pieChart, donutChart, radarChart, polarChart } from './data';
import {CompanyService} from "../../../core/services/company/company.service";

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})

/**
 * chartjs-chart component
 */
export class ChartjsComponent implements OnInit {

/*  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Line Chart
  lineAreaChart: ChartType;
  // Bar Chart
  lineBarChart: ChartType;
  // Pie Chart
  pieChart: ChartType;
  // Donut Chart
  donutChart: ChartType;
  // Polar area Chart
  ScatterChart: ChartType;
  // Radar Chart
  radarChart: ChartType;
  // polarChart
  polarChart: ChartType;*/


  lineBarChart: any;
  breadCrumbItems: Array<{}>


  @Input() datasets: any;
  @Input() labels: any
  constructor(private service : CompanyService ) { }






  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Chartjs chart', active: true }];

   /**
    * Fetches the data
    */
    this._fetchData();
  }

  /**
   * Fetch chart's data
   */
  private _fetchData() {
    // Line Chart data


    this.lineBarChart = {
      datasets: [
        {
          label: 'Sales Analytics',
          backgroundColor: 'rgba(52, 195, 143, 0.8)',
          borderColor: 'rgba(52, 195, 143, 0.8)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
          hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
          data: this.datasets,
          barPercentage: 0.4

        },
      ],
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)'
              },
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(166, 176, 207, 0.1)'
              }
            }
          ]
        }
      }
    };
  }

}
