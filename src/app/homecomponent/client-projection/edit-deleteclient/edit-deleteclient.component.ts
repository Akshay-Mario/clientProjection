import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IapiColDef } from 'src/app/models/apiprojeciton.model';
import { ApiProjectionService } from 'src/app/services/api-projection.service';
import { ClientProjectionService } from 'src/app/services/client-projection.service';

@Component({
  selector: 'app-edit-deleteclient',
  templateUrl: './edit-deleteclient.component.html',
  styleUrls: ['./edit-deleteclient.component.css']
})
export class EditDeleteclientComponent {


  private modalService = inject(NgbModal);
  public componentParent: any;
  closeResult = '';
  rowData: any;
  public editIcon = faEdit;
  public deleteicon = faTrashCan;
  public clientEditProjectionForm: FormGroup;
  public isEditFormSubmitted: boolean = false;
  public isformSubmitSucess: boolean = false;
  public apiProjectionData: any = [];

  constructor(private formgroup: FormBuilder, 
    private apiProjectionService: ApiProjectionService,
    private clientProjectionService: ClientProjectionService) {
    this.clientEditProjectionForm = {} as FormGroup;

  }
  agInit(params: IapiColDef): void {
    this.rowData = params.data;
    this.componentParent = params.context.componentParent;
    //console.log("clientedit",this.rowData);
  }
  refresh(params: IapiColDef) {
    return true;
  }

  ngOnInit() {
    this.initializeForm();
    this.getApiProjectionData();
    console.log("hellow")
  }


  public initializeForm() {
    this.clientEditProjectionForm = this.formgroup.group({
      id: [''],
      clientName: ['', Validators.required],
      year: ['', Validators.required],
      apiID: ['', Validators.required],
      hourly: [0],
      daily: [0]
    },
    )
  }

  public getApiProjectionData(): void {
    this.apiProjectionService.getApiProjeciton().subscribe((result) => {
      this.apiProjectionData = result;
    });
  }

  public openEditModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'exampleModalCenterTitle', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }


  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


  public editButton(modal: any) {
    console.log("editbutton");
    this.openEditModal(modal);
    this.clientEditProjectionForm.patchValue(this.rowData);

  }

  public deleteButton(modal: any) {
    console.log("deleteButton");
    this.openEditModal(modal);

  }

  onSubmit() {
    console.log("hello")
  }

  logAPIInformation(api: any, id: any) {
    console.log('Index:', 'API:', api, id);
  }

}
