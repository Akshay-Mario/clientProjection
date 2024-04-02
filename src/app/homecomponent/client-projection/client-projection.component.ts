import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  RowGroupingDisplayType,
  createGrid,
} from "ag-grid-enterprise";
import { HttpClient } from '@angular/common/http';
import { Component, inject, TemplateRef } from '@angular/core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeletebuttonComponent } from "../api-projection/edit-deletebutton/edit-deletebutton.component";
import { EditDeleteclientComponent } from "./edit-deleteclient/edit-deleteclient.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiProjectionService } from "src/app/services/api-projection.service";
import { ClientProjectionService } from "src/app/services/client-projection.service";
import { YearService } from "src/app/services/year.service";

@Component({
  selector: 'app-client-projection',
  templateUrl: './client-projection.component.html',
  styleUrls: ['./client-projection.component.css']
})
export class ClientProjectionComponent {

  private modalService = inject(NgbModal)
  public closeResult: string = '';
  public addButton = faCirclePlus;
  gridApi = new GridApi;
  public clientProjectionForm: FormGroup;
  public isAddFormSubmitted: boolean = false;
  public isformSubmitSucess: boolean = false;
  public year: Number[] = [];
  public context: any = {};
  public apiProjectionData: any = [];
  public clientProjectionData: any = [];
  public apiNameMap = new Map;

  public rowData: any = [
    // { "clientName": "XOLT Locator", "year": 2008, "apiID": 123, "apiName": "Michael Phelps", "hourly": 8, "daily": 0 },
    // { "clientName": "XOLT Locator", "year": 2004, "apiID": 123, "apiName": "Michael Phelps", "hourly": 6, "daily": 0 },
    // { "clientName": "XOLT Locator", "year": 2012, "apiID": 123, "apiName": "Michael Phelps", "hourly": 4, "daily": 2 },
    // { "clientName": "XOLT Locator", "year": 2008, "apiID": 343, "apiName": "Natalie Coughlin", "hourly": 1, "daily": 2 },
    // { "clientName": "Jedi Locator", "year": 2008, "apiID": 123, "apiName": "Michael Phelps", "hourly": 8, "daily": 0 },
    // { "clientName": "Jedi Locator", "year": 2004, "apiID": 123, "apiName": "Michael Phelps", "hourly": 6, "daily": 0 },
    // { "clientName": "Jedi Locator", "year": 2012, "apiID": 123, "apiName": "Michael Phelps", "hourly": 4, "daily": 2 },
    // { "clientName": "Jedi Locator", "year": 2008, "apiID": 343, "apiName": "Natalie Coughlin", "hourly": 1, "daily": 2 },

  ];


  public columnDefs: any = [
    { field: "clientName", rowGroup: true, hide: false, minWidth: 200 },
    { field: "year", rowGroup: true, hide: false, maxWidth: 100 },
    { headerName: "Api Name", field: "apiName", minWidth: 200 },
    { headerName: 'Hourly(peak Hours)', field: 'hourly' },
    { headerName: 'Daily(peak Hours)', field: 'daily' },
    { headerName: 'Action', field: 'action', cellRenderer: EditDeleteclientComponent, maxWidth: 100 },

  ];

  public defaultColDef: any = {
    flex: 1,
    minWidth: 100,
  };


  public themeClass: string = "ag-theme-quartz-dark";

  public groupDisplayType: RowGroupingDisplayType = "groupRows";




  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private apiProjectionService: ApiProjectionService,
    private clientProjectionServices: ClientProjectionService,
    private yearService: YearService) {
    this.clientProjectionForm = {} as FormGroup;
    this.context = {
      componentParent: this
    };
  }

  ngOnInit() {
    this.intilizeForm();
    this.getApiNames();
  }

  // Event handler function for GridReady event
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.getClientTableData();
  }

  //intiate add client data form
  public intilizeForm(): void {
    this.clientProjectionForm = this.formBuilder.group({
      id: [''],
      clientName: ['', Validators.required],
      year: ['', Validators.required],
      apiID: ['', Validators.required],
      hourly: [0],
      daily: [0]
    },
    )
  }

  public getClientTableData(): void {
    this.clientProjectionServices.getClientProjection().subscribe((result) => {
      //create mappping for faster look ups

      result.forEach((value, key) => {
        const apiID = value.apiID;
        if (this.apiNameMap.has(apiID)) {
          result[key].apiName = this.apiNameMap.get(apiID);
        }
      })
      this.rowData = result;
    });

  }

  //get api names
  public getApiNames() {
    this.apiProjectionService.getApiProjeciton().subscribe((result) => {
      console.log("apiname", result);
      this.apiProjectionData = result;
      this.apiNameMap = new Map(this.apiProjectionData.map((item: any) => [item.id, item.apiName]));
    });
  }

  //modal popup logic
  public openAddModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'exampleModalCenterTitle', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  //opening add modal
  public openingAddModal(content: TemplateRef<any>): void {
    this.getApiNames();
    this.openAddModal(content);

  }

  //dismiss modal logic
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

  //on submit of clientprojectionform data
  public onSubmit(): void {
    // check if valid
    if (this.clientProjectionForm.invalid) {
      this.isAddFormSubmitted = true;
      return;
    }

    else if (this.isDuplicate()) {
      alert("duplicate data, please use edit option or change the input data")
      return;
    }

    const formValues = this.clientProjectionForm.value
    //if valid add value to id
    formValues["id"] = Math.floor(Math.random() * 100000).toString();

    //update api projections
    const hParameter = 'hourly' + formValues.year;
    const dParameter = 'daily' + formValues.year;


    if (formValues["apiID"][`${hParameter}`]) {
      formValues["apiID"][`${hParameter}`]  += formValues.hourly;
    }
    else {
      formValues["apiID"][`${hParameter}`] = formValues.hourly
    }
    if (formValues["apiID"][`${dParameter}`]) {
      formValues["apiID"][`${dParameter}`] += formValues.daily;
    }
    else {
      formValues["apiID"][`${dParameter}`] = formValues.daily
    }

    console.log("updated value :", formValues["apiID"], this.clientProjectionForm.value.apiID);

    //update api projectiondata
    this.apiProjectionService.patchApiProjectionNDataById(formValues["apiID"], formValues["apiID"].id).subscribe((result) => {
      console.log("patched successfully", result)
    })

    //add client projection data
    if(typeof formValues.apiID === 'object') {
        formValues.apiID = formValues.apiID.id;
    }

    this.clientProjectionServices.postClientProjection(formValues).subscribe((result) => {
      console.log("successfully added clietn projectoin data", result);
      this.getClientTableData();
    });


    this.yearService.getYearData().subscribe((result) => {
      const yearArray = Object.values(result);
      yearArray.pop(); 
      if (!yearArray.includes(formValues.year)) {
        yearArray.push(formValues.year);
        this.yearService.putYearData(yearArray).subscribe((result) => {
          console.log("Added year data:", result);
        });
      }
    });

    //reset form
    this.clientProjectionForm.reset();
    this.isformSubmitSucess = true;
    this.modalService.dismissAll("saved")
  }


  isDuplicate(): boolean {
    const formData = this.clientProjectionForm.value;
    const isDuplicate = this.rowData.some((item: any) =>
      item.apiID === formData["apiID"].id &&
      item.clientName.toLowerCase() === formData["clientName"].toLowerCase() &&
      item.year === formData["year"]);
    console.log(isDuplicate)
    return isDuplicate;

  }

}
