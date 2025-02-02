import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { IApiResponse, IRole } from '../../model/interface/role';

@Component({
  selector: 'app-roles',
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  rolesList: IRole[] = [];
  isLoader: boolean = true;
  roleService = inject(RoleService);

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(
      (res: IApiResponse) => {
        this.rolesList = res.data;
        this.isLoader = false;
      },
      (error) => {
        alert('Something went wront @ api end.');
        this.isLoader = false;
      }
    );
  }
}
