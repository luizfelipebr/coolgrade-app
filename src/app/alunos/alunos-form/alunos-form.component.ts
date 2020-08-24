import { Component, OnInit } from '@angular/core';
import { Student } from '../alunos-form/Student';
import { AlunosService } from 'src/app/alunos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.css'],
})
export class AlunosFormComponent implements OnInit {
  aluno: Student;
  success: boolean = false;
  errorType: string;
  auxErrors: [any];
  errors: string[];
  id: number;

  constructor(
    private service: AlunosService,
    private router: Router,
    private activatedRout: ActivatedRoute
  ) {
    this.aluno = new Student();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRout.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.loadAluno();
      }
    });
  }

  loadAluno() {
    this.service.getAlunoById(this.id).subscribe(
      (response) => (this.aluno = response),
      (errorResponse) => (this.aluno = new Student())
    );
  }

  saveAluno() {
    this.service.saveAluno(this.aluno).subscribe(
      (response) => {
        this.errors = [];
        this.success = true;
        this.aluno = response.body;
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
    this.router.navigate(['/alunos-lista']);
  }

  onSubmit(): void {
    this.saveAluno();
  }
}
