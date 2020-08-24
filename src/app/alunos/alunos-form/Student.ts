import { Discipline } from 'src/app/disciplinas/Discipline';

export class Student {
  id: number;
  name: string;
  email: string;
  disciplines: [Discipline];
}
