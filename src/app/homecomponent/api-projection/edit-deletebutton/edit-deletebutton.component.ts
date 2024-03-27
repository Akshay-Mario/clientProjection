import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IapiColDef } from 'src/app/models/apiprojeciton.model';

@Component({
  selector: 'app-edit-deletebutton',
  templateUrl: './edit-deletebutton.component.html',
  styleUrls: ['./edit-deletebutton.component.css']
})
export class EditDeletebuttonComponent implements ICellRendererAngularComp {
 
  private modalService = inject(NgbModal);
  closeResult = '';

  rowData:any;
  agInit(params: IapiColDef): void {
    this.rowData = params.data;
  }
  refresh(params: IapiColDef) {
    return true;
  }
  public editIcon= faEdit;
  public deleteicon = faTrashCan;
  public apiEditProjectionForm: FormGroup;
  public isEditFormSubmitted: boolean = false;
  public isformSubmitSucess: boolean = false;

  constructor(private formgroup: FormBuilder) {
    this.apiEditProjectionForm = {} as FormGroup;
  }

  ngOnInit() {
    this.initializeForm();
  }

  public initializeForm() {
    this.apiEditProjectionForm = this.formgroup.group({
      id: [],
      apiName: ['', Validators.required],
      apiYear: ['', Validators.required],
      apiPeakHour: ['', Validators.required],
      apiPeakDay: ['', Validators.required],
    },
    )
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

  editButton(editModal: any) {
    this.openEditModal(editModal);
    console.warn("hellp",this.rowData);
    this.apiEditProjectionForm.patchValue(this.rowData); 
  }

  deleteButton() {
    console.warn(this.rowData)
  }

  onSubmit() {

  }

  confirmDelete() {

  }
}
