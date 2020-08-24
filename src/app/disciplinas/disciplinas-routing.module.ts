import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinasFormComponent } from './disciplinas-form/disciplinas-form.component';
import { DisciplinasListaComponent } from './disciplinas-lista/disciplinas-lista.component';
const routes: Routes = [
  {
    path: 'disciplinas-form/:student_id/:id',
    component: DisciplinasFormComponent,
  },
  {
    path: 'disciplinas-form/:student_id',
    component: DisciplinasFormComponent,
  },
  {
    path: 'disciplinas-lista/:student_id',
    component: DisciplinasListaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisciplinasRoutingModule {}
