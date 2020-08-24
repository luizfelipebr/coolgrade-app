import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../alunos-form/Student';
import { AlunosService } from '../../alunos.service';

@Component({
  selector: 'app-alunos-lista',
  templateUrl: './alunos-lista.component.html',
  styleUrls: ['./alunos-lista.component.css'],
})
export class AlunosListaComponent implements OnInit {
  alunos: Student[] = [];
  selectedAluno: Student;
  successMessage: string;
  errorMessage: string;

  constructor(private service: AlunosService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAlunos().subscribe((response) => (this.alunos = response));
  }

  newAluno() {
    this.router.navigate(['/alunos-form']);
  }

  deleteAluno() {
    this.service.deleteAluno(this.selectedAluno).subscribe(
      (response) => {
        this.successMessage = 'Aluno(a) excluído(a) com sucesso!';
        this.ngOnInit();
      },
      (error) =>
        (this.errorMessage = 'Ocorreu um erro ao excluir o(a) aluno(a).')
    );
  }

  prepareToDelete(aluno: Student) {
    this.selectedAluno = aluno;
  }
}
