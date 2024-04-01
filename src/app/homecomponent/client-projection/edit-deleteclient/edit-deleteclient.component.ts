import { Component, inject } from '@angular/core';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IapiColDef } from 'src/app/models/apiprojeciton.model';

@Component({
  selector: 'app-edit-deleteclient',
  templateUrl: './edit-deleteclient.component.html',
  styleUrls: ['./edit-deleteclient.component.css']
})
export class EditDeleteclientComponent {


  private modalService = inject(NgbModal);
  public componentParent: any;
  closeResult = '';
  public editIcon = faEdit;
  public deleteicon = faTrashCan;

  rowData: any;
  agInit(params: IapiColDef): void {
    this.rowData = params.data;
    this.componentParent = params.context.componentParent;
    //console.log("clientedit",this.rowData);
  }
  refresh(params: IapiColDef) {
    return true;
  }

  public editButton(modal: any) {
    console.log("editbutton");
  }

  public deleteButton(modal: any) {
    console.log("deleteButton");
  }

}
