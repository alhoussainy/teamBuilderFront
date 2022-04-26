import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Router } from "@angular/router";
import {
  ChartComponent
} from "ng-apexcharts";
import { PublicTestService } from "../../../../core/services/company/public.test.service";

import * as XLSX from 'xlsx';

export type ChartOptions1 = {
  id: any;
  name: any;
  percentPop: any;
  percentGlobalFeedback: any;
  percentManagement: any;
  percentMotivation: any;
  percentEnvironment: any;
};

export interface SortEvent1 {
  column: SortColumn;
  direction: SortDirection;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export type SortColumn = keyof ChartOptions1 | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class Sortabledetail1 {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<any>();
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-admin-detail-test',
  templateUrl: './detail.trimoji.component.html',
  styleUrls: ['./detail.trimoji.component.scss'],
})
export class DetailTrimojiComponent implements OnInit {


  @ViewChildren(Sortabledetail1) headers1: QueryList<Sortabledetail1>
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild('TABLE') table: ElementRef;
  breadCrumbItems: any;
  TestDetail: any
  testType: any = 0
  toogle: boolean = false
  trimoji: any
  data: any

  excelExport: any
  constructor(private publicTestService: PublicTestService, private router: Router, private elementref: ElementRef) { }
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.loadData(0)
  }



  onSort({ column, direction }: SortEvent1) {

    // resetting other headers
    this.headers1.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // sorting countries
    if (direction === '' || column === '') {
      return this.TestDetail;
    } else {
      this.TestDetail.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getTrimojiFromPersonality(personality) {
    const emoji = {
      fusee: "🚀",
      joker: "🃏",
      main: "🤝",
      train: "🚅",
      ambulance: "🚒",
      horloge: "⏰",
      medaille: "🥇"
    }
    switch (personality) {
      case 'ESTJ':
        return `${emoji.fusee} ${emoji.joker} ${emoji.joker}`
        break;
      case 'ENFJ':
        return `${emoji.joker} ${emoji.joker} ${emoji.horloge} `
        break;
      case 'ENFP':
        return `${emoji.fusee} ${emoji.medaille} ${emoji.joker}`
        break;
      case 'ENTJ':
        return `${emoji.train} ${emoji.joker} ${emoji.joker}`
        break;
      case 'ENTP':
        return `${emoji.joker} ${emoji.joker} ${emoji.ambulance}`
        break;
      case 'ESFJ':
        return `${emoji.train} ${emoji.medaille} ${emoji.joker}`
        break;
      case 'ESFP':
        return `${emoji.fusee} ${emoji.main} ${emoji.joker}`
        break;
      case 'INTJ':
        return `${emoji.joker} ${emoji.main} ${emoji.horloge}`
        break;
      case 'ESTP':
        return `${emoji.joker} ${emoji.joker} ${emoji.ambulance}`
        break;
      case 'INFJ':
        return `${emoji.fusee} ${emoji.main} ${emoji.ambulance}`
        break;
      case 'INFP':
        return `${emoji.fusee} ${emoji.main} ${emoji.ambulance}`
        break;
      case 'INTP':
        return `${emoji.fusee} ${emoji.joker} ${emoji.ambulance}`
        break;
      case 'ISFJ':
        return `${emoji.train} ${emoji.medaille} ${emoji.joker}`
        break;
      case 'ISFP':
        return `${emoji.fusee} ${emoji.joker} ${emoji.joker}`
        break;
      case 'ISTJ':
        return `${emoji.train} ${emoji.medaille} ${emoji.horloge}`
        break;
      case 'ISTP':
        return `${emoji.fusee} ${emoji.joker} ${emoji.ambulance}`
        break;
      default:
        break;
    }
  }


  loadData(type) {
    this.publicTestService.testDetail(type).subscribe((res) => {
      if (res.success) {
        this.TestDetail = res.data.output;
        console.log("detail", this.TestDetail)
        this.data = res.data.data
      }
    }, (err) => {
      if (err.status == 401) {
        this.router.navigate(['error'])
      }
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

  export() {
    const ele = this.elementref.nativeElement.querySelector('.excel');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.TestDetail);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
}
