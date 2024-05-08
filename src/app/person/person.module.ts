import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Person {
id:number;
name : string;
email : string | number;
dob : number;
avatar?:string;
country : string;
}
type AvatarType =  string;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PersonModule { 
   
    id: number = 0;
    name: string = '';
    email: string = '';
    dob: number = 0;
    avatar?: AvatarType;   
    country: string = '';
}
