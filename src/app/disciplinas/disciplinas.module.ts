import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DisciplinasRoutingModule } from './disciplinas-routing.module';
import { DisciplinasFormComponent } from './disciplinas-form/disciplinas-form.component';
import { DisciplinasListaComponent } from './disciplinas-lista/disciplinas-lista.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DisciplinasFormComponent, DisciplinasListaComponent],
  imports: [CommonModule, FormsModule, RouterModule, DisciplinasRoutingModule],
  exports: [DisciplinasFormComponent, DisciplinasListaComponent],
})
export class DisciplinasModule {}
