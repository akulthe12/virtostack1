import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonModule } from '../person/person.module';
import { PersonDataServiceService } from '../services/person-data-service.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  personData: any[] = [];
  showAdd: boolean = false;
  showEdit: boolean = true;
  showUpdate: boolean = false;
  patientForm: FormGroup;
  searchTerm: string = '';

  componentModelObj: PersonModule = new PersonModule();
  constructor(private api: ApiService, private patientdataservice: PersonDataServiceService, private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      avatar: [''],
      country: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getAllDetails();
    const editedData = localStorage.getItem('editedData');
    if (editedData) {
      this.patientForm.patchValue(JSON.parse(editedData));
      localStorage.removeItem('editedData');
    }

  }

  getAllDetails() {
    this.api.getData().subscribe((res) => {
      this.personData = res;
    });
  }
  a: any;

  editData(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.patientForm.patchValue({
      id: row.id,
      name: row.name,
      email: row.email,
      dob: row.dob,
      avatar: row.avatar,
      country: row.country,

    });

    this.a = row;
  }




  onUpdate() {
    this.componentModelObj.name = this.patientForm.value.name;
    this.componentModelObj.email = this.patientForm.value.email;
    this.componentModelObj.dob = this.patientForm.value.dob;
    this.componentModelObj.avatar = this.patientForm.value.avatar;
    this.componentModelObj.country = this.patientForm.value.country;
    this.componentModelObj.id = this.a.id;
    localStorage.setItem('editedData', JSON.stringify(this.componentModelObj));

    this.api.updateData(this.componentModelObj, this.componentModelObj.id)
      .subscribe(res => {
        alert("updated successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.patientForm.reset();
        this.getAllDetails();

      })
  }

  deleteData(row: any) {
    if (confirm("Are you sure to delete?")) {
      this.api.deleteData(row.id).subscribe(res => {
        this.getAllDetails();
        alert("Deleted successfully");
      });
    }
  }

}