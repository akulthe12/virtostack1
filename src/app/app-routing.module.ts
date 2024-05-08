import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  { path: '', component:HeaderComponent },
  { path: 'person', component: PersonComponent },
  { path: 'person-list', component: PersonListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
