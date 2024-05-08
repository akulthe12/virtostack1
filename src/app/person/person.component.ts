import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonModule } from './person.module';
import { ApiService } from '../services/api.service';
import { PersonDataServiceService } from '../services/person-data-service.service';

@Component({
  selector: 'app-patient',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: any;
  showAdd!:boolean;
  selectedFileName: string = '';
  name:any;
  dob:any;
  showForm: boolean = false;
  country:any;
  email:any;
  patientForm!:FormGroup;
  personData:any[]=[];
  persons: any[] = [];
  showUpdate!:boolean;
  editedPerson: any;
  componentModelObj:PersonModule=new PersonModule();
  constructor(private fb:FormBuilder,private api:ApiService,private persondataservice:PersonDataServiceService,private router: Router){}
  ngOnInit():void{
    this.patientForm=this.fb.group({
  
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      dob: ['', Validators.required],
      avatar: [''],
      country: ['']
    

    })
    
    // this.getAllDetails();
  }
 
  clickAddDetails()
  {
    this.patientForm.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }


postDataDetails() {
  this.componentModelObj.name = this.patientForm.value.name;
  this.componentModelObj.email = this.patientForm.value.email;
  this.componentModelObj.dob = this.patientForm.value.dob;
  this.componentModelObj.avatar = this.patientForm.value.avatar;

  this.componentModelObj.country = this.patientForm.value.country;

  let patientDataArray = JSON.parse(localStorage.getItem('patientDataArray') || '[]');
  patientDataArray.push(this.componentModelObj);
  localStorage.setItem('patientDataArray', JSON.stringify(patientDataArray));
  this.api.postData(this.componentModelObj).subscribe((res: any) => {
    alert("data added successfully");
    this.patientForm.reset();
    this.router.navigate(['/person-list']);
  });
}

openForm(person: any) {
  this.showForm = true;
  this.editedPerson = person;
}

}
