import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { PersonModule } from '../person/person.module';
@Injectable({
  providedIn: 'root'
})
export class PersonDataServiceService {
  private personData = new BehaviorSubject<PersonModule[]>([]);
  currentPersonData = this.personData.asObservable();

  constructor(private http:HttpClient) { }
  changePersonData(data: PersonModule[]) {
    this.personData.next(data);
  }
  setPersonData(data: any) {
    this.personData = data;
  }

  getPersonData() {
    return this.personData;
  }
}
