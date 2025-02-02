import { Component, inject, OnInit } from '@angular/core';
import { IApiResponse, IDesignation } from '../../model/interface/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
  isLoader: boolean = true;
  service = inject(RoleService);

  ngOnInit(): void {
    this.service.getAllDesignations().subscribe(
      (res: IApiResponse) => {
        this.designationList = res.data;
        this.isLoader = false;
      },
      (error) => {
        alert('Something went wront @ api end.');
        this.isLoader = false;
      }
    );
  }
}
