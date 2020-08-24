import { Component, OnInit } from '@angular/core';
import { Discipline } from '../Discipline';
import { DisciplinasService } from 'src/app/disciplinas.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-disciplinas-form',
  templateUrl: './disciplinas-form.component.html',
  styleUrls: ['./disciplinas-form.component.css'],
})
export class DisciplinasFormComponent implements OnInit {
  disciplina: Discipline;
  disciplinaId: number;
  success: boolean = false;
  errorType: string;
  auxErrors: [any];
  errors: string[];

  constructor(
    private service: DisciplinasService,
    private router: Router,
    private activatedRout: ActivatedRoute
  ) {
    this.disciplina = new Discipline();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRout.params;
    params.subscribe((urlParams) => {
      this.disciplinaId = urlParams['id'];
      this.disciplina.student_id = urlParams['student_id'];
      if (this.disciplinaId) {
        this.loadDisciplina();
      }
    });
  }

  loadDisciplina() {
    this.service.getById(this.disciplinaId).subscribe(
      (response) => (this.disciplina = response),
      (errorResponse) => (this.disciplina = new Discipline())
    );
  }

  onSubmit(): void {
    this.saveDiscipline();
  }

  saveDiscipline() {
    this.service.save(this.disciplina).subscribe(
      (response) => {
        this.errors = [];
        this.success = true;
        this.disciplina = response.body;
      },
      (errorResponse) => {
        this.success = false;
        this.auxErrors = errorResponse.error.errors;

        this.errors = this.auxErrors.map(function (auxErrors) {
          return auxErrors['fieldName'] + ': ' + auxErrors['message'];
        });
      }
    );
  }

  backToList() {
    this.router.navigate([`/disciplinas-lista/${this.disciplina.student_id}`]);
  }
}
