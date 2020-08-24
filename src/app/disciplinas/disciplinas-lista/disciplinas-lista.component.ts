import { Component, OnInit } from '@angular/core';
import { Discipline } from '../Discipline';
import { DisciplinasService } from 'src/app/disciplinas.service';
import { AlunosService } from 'src/app/alunos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from 'src/app/alunos/alunos-form/Student';

@Component({
  selector: 'app-disciplinas-lista',
  templateUrl: './disciplinas-lista.component.html',
  styleUrls: ['./disciplinas-lista.component.css'],
})
export class DisciplinasListaComponent implements OnInit {
  disciplina: Discipline;
  aluno: Student;
  aluno_id: number;

  constructor(
    private service: DisciplinasService,
    private alunosService: AlunosService,
    private router: Router,
    private activatedRout: ActivatedRoute
  ) {
    this.disciplina = new Discipline();
    this.aluno = new Student();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRout.params;
    params.subscribe((urlParams) => {
      this.aluno_id = urlParams['id'];
      if (this.aluno_id) {
        this.loadAluno();
      }
    });
  }

  loadAluno() {
    this.alunosService.getAlunoById(this.aluno_id).subscribe(
      (response) => (this.aluno = response),
      (errorResponse) => (this.aluno = new Student())
    );
  }
}
