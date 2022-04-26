import { Component, Directive, ElementRef, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CompanyService } from '../../../../core/services/company/company.service';
import { CompanyListSortTableComponent } from "./company-list-sort-table.component";
import { EventEmitter } from '@angular/core'
import { Router } from "@angular/router";
import * as XLSX from 'xlsx';
interface Companies {
  companyId: string;
  name: string;
  userAmount: number;
  SocialMediaActivity: number;
  monthlyMRR: number;
  createdSince: number;
  active: any;
  nbPolls: number;
  pollAnswersRate: number;
}

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export type SortColumn = keyof Companies | '';
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
export class SortableHeader {

  sortable: string;
   direction: SortDirection = '';
  @Output() sort = new EventEmitter<any>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-admin-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>
  companies: any;
  globals = { activity: 10, Jours: 30 }
  statDataEmployee = {
    icon: 'bx bx-check-circle',
    title: "Total Utilisateurs Enregistrés",
    value: 0
  };
  statDataCA: any = {
    icon: 'bx bx-check-circle',
    title: "Total Chiffre d'affaires par mois ",
    value: 0
  }
  statDataCAM: any = {
    icon: 'bx bx-check-circle',
    title: "Moyenne du Chiffre d'affaires mensuel ",
    value: 0
  }
  loaded: boolean = false;
  @ViewChild('TABLE') table: ElementRef;
  exported: boolean = false

  constructor(private companyService: CompanyService,
              private router: Router,
              private elementref: ElementRef) { }

  ngOnInit() {
    this.loadCompanies();
  }

  export() {
    this.exported = true
    const ele = this.elementref.nativeElement.querySelector('.excel');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(ele);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
  }
  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      return this.companies;
    } else {
      this.companies.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  loadCompanies() {
    this.companyService.listCompanies().subscribe((res) => {
      if (res.success) {

        this.companies = res.data.companyList;

        const tab = [];
        this.companies.forEach(elem => {
          tab.push(elem.monthlyMRR)
        })
        this.statDataEmployee.value = res.data.globalStats.totalUsers;
        this.statDataCA.value = res.data.globalStats.totalMRR;
        this.statDataCAM.value = this.statDataCA.value / tab.length;
        this.loaded = true;

      }
    }, (err) => {
      if (err.status == 401) {
        this.router.navigate(['error'])
      }

    });
  }


  onUpdate(companyId: string, active: any) {
    this.companyService.update(companyId, active).subscribe(
      (data) => {
        this.loadCompanies();
      }, (err) => {
      }
    )
  }
}
