import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { CompanyListComponent } from './admin/company/company-list/company-list.component';
import {CompanyProfileComponent} from "./admin/company/company-profile/company-profile.component";
import {LoginComponent} from "./admin/login/login.component";
import {ErrorComponent} from "./admin/error/error.component";
import {LogoutComponent} from "./admin/logout/logout.component";
import {
  CompanyStatisticsComponent
} from "./admin/company/company-Statistics/company.statistics.component";
import {BlogsComponent} from "./admin/blog-post/blogs.component";
import {AddBlogComponent} from "./admin/blog-post/add-blog-post/add.blog.component";
import {OneBlogComponent} from "./admin/blog-post/get-one-blog/one.blog.component";
import {UpdateOneBlogComponent} from "./admin/blog-post/update-one-blog/update.one.blog.component";
import {PublicTestComponent} from "./admin/public-test/public.test.component";
import {DetailTrimojiComponent} from "./admin/public-test/detailTrimoji/détail.trimoji.component";
import {DetailPersonality} from "./admin/public-test/detailTypePersonalite/détail.personalite.component";
import {DetailQualiteDefaut} from "./admin/public-test/detailQualiteDefaut/détail.qualite.defaut.component";

const routes: Routes = [
  { path: '', redirectTo: 'signIn' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },


  // Admin components
  { path: 'signIn', component: LoginComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'profileCompany/:id', component: CompanyProfileComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'stats', component: CompanyStatisticsComponent },
  { path: 'blog', component: BlogsComponent },
  { path: 'addBlog', component: AddBlogComponent },
  { path: 'blog/:id/:slug?', component: OneBlogComponent },
  { path: 'edit/:id', component: UpdateOneBlogComponent },
  { path: 'publicTest', component: PublicTestComponent },
  { path: 'detailTrimoji', component: DetailTrimojiComponent },
  { path: 'detailPersonality/:id/:type/:name', component: DetailPersonality },
  { path: 'detailQualiteDefaut', component: DetailQualiteDefaut },

  // Template components
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
