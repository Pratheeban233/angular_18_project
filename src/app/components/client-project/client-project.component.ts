import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../model/interface/role';
import { ClientService } from '../../services/client.service';
import { Employee } from '../../model/interface/employee';
import { Client } from '../../model/class/client';
import { DatePipe } from '@angular/common';
import { IClientProject } from '../../model/interface/clientproject';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  // Reactive form
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    startDate: new FormControl(new Date()),
    expectedEndDate: new FormControl(new Date()),
    leadByEmpId: new FormControl(0),
    completedDate: new FormControl(new Date()),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(0),
    projectCost: new FormControl(0),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(0),
  });

  clientService = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];

  clientProjectList = signal<IClientProject[]>([]); //using signal

  ngOnInit(): void {
    this.getAllClient();
    this.getAllEmployees();
    this.getAllProjects();
  }

  getAllEmployees() {
    this.clientService.getAllEmployees().subscribe((res: IApiResponse) => {
      this.employeeList = res.data;
    });
  }

  getAllClient() {
    this.clientService.getAllClients().subscribe((res: IApiResponse) => {
      this.clientList = res.data;
    });
  }

  getAllProjects() {
    this.clientService.getAllClientProjects().subscribe((res: IApiResponse) => {
      this.clientProjectList.set(res.data);
    });
  }

  onSaveProject() {
    const projectObj = this.projectForm.value;
    debugger;
    this.clientService
      .addUpdateClientProject(projectObj)
      .subscribe((res: IApiResponse) => {
        res.result ? alert('Project saved successfully') : alert(res.message);
      });
    this.getAllProjects();
    this.onReset();
  }

  onReset() {
    this.projectForm.reset();
  }

  onEditProject(project: IClientProject) {
    this.projectForm.patchValue(project);    
  }

  
}
