import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {
    NgbNavModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbTooltipModule,
    NgbAlertModule, NgbProgressbarModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';

import { CryptoModule } from './crypto/crypto.module';
import { EmailModule } from './email/email.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { UtilityModule } from './utility/utility.module';
import { UiModule } from './ui/ui.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MapsModule } from './maps/maps.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import {LoaderService} from '../core/services/loader.service';
import {LoaderInterceptorService} from '../core/services/interceptors/loader-interceptor.service';


// Admin components
import {CompanyListComponent, SortableHeader} from './admin/company/company-list/company-list.component';
import {CompanyProfileComponent} from "./admin/company/company-profile/company-profile.component";
import {NgxEchartsModule} from "ngx-echarts";
import {LoginComponent} from "./admin/login/login.component";
import {ErrorComponent} from "./admin/error/error.component";
import {LogoutComponent} from "./admin/logout/logout.component";
import {
  CompanyListSortTableComponent,
} from "./admin/company/company-list/company-list-sort-table.component";


import {CompanyStatisticsComponent} from "./admin/company/company-Statistics/company.statistics.component";
import {BlogsComponent} from "./admin/blog-post/blogs.component";
import {AddBlogComponent} from "./admin/blog-post/add-blog-post/add.blog.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {OneBlogComponent} from "./admin/blog-post/get-one-blog/one.blog.component";
import {UpdateOneBlogComponent} from "./admin/blog-post/update-one-blog/update.one.blog.component";
import {PublicTestComponent} from "./admin/public-test/public.test.component";
import {DetailTrimojiComponent, Sortabledetail1,} from "./admin/public-test/detailTrimoji/détail.trimoji.component";
import {detailSortTableComponent} from "./admin/public-test/detailTrimoji/detail-trimoji-sort-table.component";
import {DetailPersonality} from "./admin/public-test/detailTypePersonalite/détail.personalite.component";
import {DetailQualiteDefaut} from "./admin/public-test/detailQualiteDefaut/détail.qualite.defaut.component";
import {detailPersoSortTableComponent} from "./admin/public-test/detailQualiteDefaut/detail.personalite.sorttable.component";






const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [CalendarComponent, ChatComponent, CompanyListComponent ,
    CompanyProfileComponent, LoginComponent,ErrorComponent,LogoutComponent,Sortabledetail1,
    CompanyListSortTableComponent,UpdateOneBlogComponent,SortableHeader,DetailQualiteDefaut,
    CompanyStatisticsComponent,BlogsComponent,AddBlogComponent,DetailPersonality,detailPersoSortTableComponent,
    OneBlogComponent,PublicTestComponent,DetailTrimojiComponent,detailSortTableComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgbModalModule,
        PagesRoutingModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        DashboardsModule,
        CryptoModule,
        EcommerceModule,
        EmailModule,
        InvoicesModule,
        HttpClientModule,
        ProjectsModule,
        UIModule,
        TasksModule,
        ContactsModule,
        UtilityModule,
        UiModule,
        FormModule,
        TablesModule,
        IconsModule,
        ChartModule,
        WidgetModule,
        MapsModule,
        FullCalendarModule,
        NgbNavModule,
        NgbTooltipModule,
        PerfectScrollbarModule,
        NgxEchartsModule,
        NgbAlertModule,
        CKEditorModule,
        NgbProgressbarModule
    ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LoaderService,
 /*   { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }*/
  ]
})
export class PagesModule { }
