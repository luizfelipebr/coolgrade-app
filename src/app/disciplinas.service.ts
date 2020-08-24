import { Injectable } from '@angular/core';
import { Discipline } from './disciplinas/Discipline';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const url: string = environment.apiUrl + '/disciplines';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class DisciplinasService {
  constructor(private http: HttpClient) {}

  save(disciplina: Discipline): Observable<any> {
    if (disciplina.id) {
      return this.update(disciplina);
    } else {
      return this.create(disciplina);
    }
  }

  private create(disciplina: Discipline): Observable<any> {
    return this.http.post<Discipline>(url, disciplina, httpOptions);
  }

  private update(disciplina: Discipline): Observable<any> {
    return this.http.put<Discipline>(
      `${url}/${disciplina.id}`,
      disciplina,
      httpOptions
    );
  }

  getById(id: number): Observable<Discipline> {
    return this.http.get<Discipline>(`${url}/${id}`);
  }

  delete(disciplina: Discipline): Observable<any> {
    return this.http.delete<any>(`${url}/${disciplina.id}`);
  }
}
