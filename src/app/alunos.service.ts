import { Injectable } from '@angular/core';
import { Student } from './alunos/alunos-form/Student';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const url: string = environment.apiUrl + '/students';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  constructor(private http: HttpClient) {}

  saveAluno(aluno: Student): Observable<any> {
    if (aluno.id) {
      return this.update(aluno);
    } else {
      return this.create(aluno);
    }
  }

  private create(aluno: Student): Observable<any> {
    return this.http.post<Student>(url, aluno, httpOptions);
  }

  private update(aluno: Student): Observable<any> {
    return this.http.put<Student>(`${url}/${aluno.id}`, aluno, httpOptions);
  }

  getAlunos(): Observable<Student[]> {
    return this.http.get<Student[]>(url);
  }

  getAlunoById(id: number): Observable<Student> {
    return this.http.get<Student>(`${url}/${id}`);
  }

  deleteAluno(aluno: Student): Observable<any> {
    return this.http.delete<any>(`${url}/${aluno.id}`);
  }
}
