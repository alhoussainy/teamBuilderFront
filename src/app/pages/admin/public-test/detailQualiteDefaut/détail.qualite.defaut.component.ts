import { KeyValue } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent
} from "ng-apexcharts";
import { PublicTestService } from "../../../../core/services/company/public.test.service";
import { detailPersoSortTableComponent } from "./detail.personalite.sorttable.component";



@Component({
  selector: 'app-admin-quality-default',
  templateUrl: './detail.qualite.defaut.component.html',
  styleUrls: ['./detail.qualite.defaut.component.scss'],
})
export class DetailQualiteDefaut implements OnInit {
  @ViewChildren(detailPersoSortTableComponent) headers: QueryList<detailPersoSortTableComponent>
  @ViewChild("chart") chart: ChartComponent;

  breadCrumbItems: any;
  Detail: any
  toogle: boolean
  reverseKeyOrder = (a: KeyValue<number, any>, b: KeyValue<number, any>): number => {
    return a.value.isquality > b.value.isquality ? -1 : (b.value.isquality > a.value.isquality ? 1 : 0);
  }


  constructor(private publicTestService: PublicTestService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.loadData(0)
  }

  loadData(type: number) {

    this.publicTestService.detailQualiteDefaut(type).subscribe((res) => {
      console.log(res.data)
      this.Detail = res.data
      console.log(this.Detail);

    })
  }


  detail(e) {
    const event = e.target.checked;
    this.toogle = !this.toogle
    if (event) {
      this.loadData(1)
    } else {
      this.loadData(0)
    }
  }

}
