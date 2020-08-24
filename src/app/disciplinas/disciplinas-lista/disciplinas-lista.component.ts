import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Student } from '../../alunos/alunos-form/Student';
import { AlunosService } from '../../alunos.service';
import { DisciplinasService } from 'src/app/disciplinas.service';
import { Discipline } from '../Discipline';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-disciplinas-lista',
  templateUrl: './disciplinas-lista.component.html',
  styleUrls: ['./disciplinas-lista.component.css'],
})
export class DisciplinasListaComponent implements OnInit {
  aluno: Student;
  selectedDisciplina: Discipline;
  successMessage: string;
  errorMessage: string;
  alunoId: number;

  constructor(
    private alunosService: AlunosService,
    private service: DisciplinasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.aluno = new Student();
  }

  ngOnInit(): void {
    this.alunosService
      .getAlunoById(this.aluno.id)
      .subscribe((response) => (this.aluno = response));

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.alunoId = urlParams['student_id'];
      if (this.alunoId) {
        this.loadAluno();
      }
    });
  }

  loadAluno() {
    this.alunosService.getAlunoById(this.alunoId).subscribe(
      (response) => (this.aluno = response),
      (errorResponse) => (this.aluno = new Student())
    );
  }

  newDisciplina() {
    this.router.navigate([`/disciplinas-form/${this.aluno.id}`]);
  }

  deleteDisciplina() {
    this.service.delete(this.selectedDisciplina).subscribe(
      (response) => {
        this.successMessage = 'Disciplina excluída com sucesso!';
        this.ngOnInit();
      },
      (error) =>
        (this.errorMessage = 'Ocorreu um erro ao excluir a disciplina.')
    );
  }

  prepareToDelete(disciplina: Discipline) {
    this.selectedDisciplina = disciplina;
  }
}
