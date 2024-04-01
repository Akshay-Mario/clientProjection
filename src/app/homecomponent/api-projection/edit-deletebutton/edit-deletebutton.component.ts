import { Component, EventEmitter, inject, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IapiColDef } from 'src/app/models/apiprojeciton.model';
import { ApiProjectionService } from 'src/app/services/api-projection.service';

@Component({
  selector: 'app-edit-deletebutton',
  templateUrl: './edit-deletebutton.component.html',
  styleUrls: ['./edit-deletebutton.component.css']
})
export class EditDeletebuttonComponent implements ICellRendererAngularComp {

  private modalService = inject(NgbModal);
  public componentParent: any;
  closeResult = '';

  rowData: any;
  agInit(params: IapiColDef): void {
    this.rowData = params.data;
    this.componentParent = params.context.componentParent;
  }
  refresh(params: IapiColDef) {
    return true;
  }
  public editIcon = faEdit;
  public deleteicon = faTrashCan;
  public apiEditProjectionForm: FormGroup;
  public isEditFormSubmitted: boolean = false;
  public isformSubmitSucess: boolean = false;

  constructor(private formgroup: FormBuilder, private apiPorjectionService: ApiProjectionService) {
    this.apiEditProjectionForm = {} as FormGroup;

  }

  ngOnInit() {
    this.initializeForm();
  }

  public initializeForm() {
    this.apiEditProjectionForm = this.formgroup.group({
      id: [],
      apiName: ['', Validators.required],
      // apiYear: ['', Validators.required],
      // apiPeakHour: ['', Validators.required],
      // apiPeakDay: ['', Validators.required],
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
    console.warn("hellp", this.rowData);
    this.apiEditProjectionForm.patchValue(this.rowData);

  }

  deleteButton(deleteModal: any) {
    console.warn(this.rowData)
    this.openEditModal(deleteModal);

  }

  onSubmit() {
    if(this.apiEditProjectionForm.invalid){
      this.isEditFormSubmitted = true;
      return
    }
    const rowData = this.apiEditProjectionForm.value;
    this.apiPorjectionService.patchApiProjectionById(rowData["apiName"], rowData["id"]).subscribe((result) => {
      console.log("patched the value succesfully", result);
      this.componentParent.getTableData();

    });

    this.modalService.dismissAll();
    //this.dataEdited.emit(); 
  }

  confirmDelete() {
    if (Object.keys(this.rowData).length <= 2) {
      this.apiPorjectionService.deleteApiProjecitonById(this.rowData["id"]).subscribe((result) => {
        this.componentParent.getTableData();

      });
    }
    else {
      alert("remove hourly and daily data for deleting")
    }
    this.modalService.dismissAll();


  }
}
