import {Component,  OnInit} from '@angular/core';
import {CompanyService} from '../../../core/services/company/company.service';

import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-admin-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;



   barChart: any = {
     color: ['#50a5f1'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: null,
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        },
        axisLine: {
          show: false
        },
      },
    ],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    }],
    series: [{
      name: 'Counters',
      type: 'bar',
      barWidth: '60%',
      data: null
    }]
  };
  statDataEmployee = {
    icon: 'bx bx-check-circle',
    title: "nombre d'employé(s)",
    value: 0
  };

  statDataPoll = {
    icon: 'bx bx-check-circle',
    title: "nombre de sondage(s)",
    value: 0
  }

  societe = {
    name: null,
    city: null,
    address: null
  };

  listemployee: any[] = [];
  listClubs: any[]=[]
  polls: any[] = [];
  id: string;

   chartInstance: any;
   dataLoaded: boolean = false;

  constructor(private companyService: CompanyService, private router: ActivatedRoute , private  route: Router) {

  }

  ngOnInit() {
    this.breadCrumbItems = [{label: 'Contacts'}, {label: 'Profile', active: true}];
    // fetches the data
    this._fetchData();
  }

  /**
   * Fetches the data
   */
  private _fetchData() {

    const id = this.router.snapshot.params.id
    this.companyService.details(id).subscribe(
      res => {
        if (res.success) {
          this.societe.name = res.data.company.name
          this.societe.city = res.data.company.city
          this.societe.address = res.data.company.address
          this.listemployee = res.data.users
          this.statDataEmployee.value = res.data.users.length;
          this.statDataPoll.value = res.data.poll.length
          this.polls = res.data.poll
          this.listClubs = res.data.club



          this.barChart.xAxis[0].data = res.data.label;
          this.barChart.series[0].data = res.data.dataset;
          this.dataLoaded = true;

        }
      },(err)=>{
        if(err.status == 401){
          this.route.navigate(['error'])
        }
      }
    );
  }


  chartInit(ec) {
     this.chartInstance = ec;
     this.chartInstance.setOption(this.barChart , true);
  }
}
