import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';

const routes: Routes = [
  { path: 'alunos-form', component: AlunosFormComponent },
  { path: 'alunos-form/:id', component: AlunosFormComponent },
  { path: 'alunos-lista', component: AlunosListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
