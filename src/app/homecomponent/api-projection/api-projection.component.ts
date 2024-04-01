import { GridApi } from "ag-grid-community";

import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IapiColDef, IapiProjectionModel } from 'src/app/models/apiprojeciton.model';
import { ApiProjectionService } from 'src/app/services/api-projection.service';
import { YearService } from 'src/app/services/year.service';
import { EditDeletebuttonComponent } from './edit-deletebutton/edit-deletebutton.component';

@Component({
  selector: 'app-api-projection',
  templateUrl: './api-projection.component.html',
  styleUrls: ['./api-projection.component.css']
})
export class ApiProjectionComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  addButton = faCirclePlus
  public apiAddProjection: FormGroup;
  public isAddFormSubmitted: boolean = false;
  public isformSubmitSucess: boolean = false;
  public year: Number[] = [];
  public gridApi = new GridApi
  public context: any = {};
  public faEdit = faEdit;


  // Row Data: The data to be displayed.
  // rowData2 = [
  //   { id= 12 , ApiName: "apiname", Hourly2023: 233232, Daily2023: 323234, Hourly2024: 23093344, Daily2024: 354645 },
  //   { ApiName: "apiname2", Hourly2023: 233232, Daily2023: 323234, Hourly2025: 23093344, Daily2025: 354645 },

  // ];

  rowData: any = []
  // rowData: any= [
  //   { apiName: 'API 1', hourly2024: 100, daily2024: 1000, hourly: 100, daily: 1000 },
  //   { apiName: 'API 1', "2023": { hourly: 100, daily: 1000 }, '2024': { hourly: 200, daily: 2000 }, '2025': { hourly: 300, daily: 3000 } },
  //   { apiName: 'API 2', '2023': { hourly: 150, daily: 1500 }, '2024': { hourly: 250, daily: 2500 }, '2025': { hourly: 350, daily: 3500 } },
  // ];


  colDefs: any = [
    { headerName: 'Actions', field: "actions", cellRenderer: EditDeletebuttonComponent, width: 100 },
    { headerName: 'Api Name', field: "apiName" },
    // {
    //   headerName: "2023", field: "2023", children: [
    //     { headerName: 'Hourly(peak Hours)', field: 'hourly2023' },
    //     { headerName: 'Daily(peak Hours)', field: 'daily2023' }
    //   ]
    // },
    // {
    //   headerName: "2024", field: "2023", children: [
    //     { headerName: 'Hourly(peak Hours)', field: 'hourly2024' },
    //     { headerName: 'Daily(peak Hours)', field: 'daily2024' }
    //   ]
    // },
    // {
    //   headerName: "2025", field: "2023", children: [
    //     { headerName: 'Hourly(peak Hours)', field: 'hourly2025' },
    //     { headerName: 'Daily(peak Hours)', field: 'daily2025' }
    //   ]
    // },

  ];


  constructor(private formgroup: FormBuilder,
    private apiProjectionService: ApiProjectionService,
    private yearService: YearService) {
    this.apiAddProjection = {} as FormGroup;
    this.context = {
      componentParent: this
  }
  }




  // colDefs: IapiColDef[] = [
  //   { headerName: 'Api Name', field: "apiName" },
  //   { headerName: 'Year', field: "apiYear" },
  //   { headerName: 'Peak(Hour Volume)', field: "apiPeakHour" },
  //   { headerName: 'Peak(Day VOlume)', field: "apiPeakDay" },
  //   { headerName: 'Actions', field: "actions",  cellRenderer:  EditDeletebuttonComponent},
  // ]

  ngOnInit() {
    this.initializeForm();
    this.getTableData();
    this.generateColDef();
  }

  // Event handler function for GridReady event
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  public generateColDef(): void {

    this.yearService.getYearData().subscribe((result) => {
      for (let i in result) {
        if (i !== "id") {
          const addColmDef = {
            headerName: result[i], field: result[i], children: [
              { headerName: 'Hourly(peak Hours)', field: `hourly${result[i]}` },
              { headerName: 'Daily(peak Hours)', field: `daily${result[i]}` }
            ]
          }
          this.colDefs.push(addColmDef);
        }
      }
      this.gridApi.setGridOption("columnDefs", this.colDefs);

    })
  }

  public initializeForm() {
    this.apiAddProjection = this.formgroup.group({
      id: [],
      apiName: ['', Validators.required],
    },
    )
  }

  public getTableData() {
    this.apiProjectionService.getApiProjeciton().subscribe((result) => {
      this.rowData = result;
    });
  }

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

  public onSubmit() {
    // check if valid
    if (this.apiAddProjection.invalid) {
      this.isAddFormSubmitted = true;
      return;
    }
    else if (this.isDuplicate()) {
      alert("duplicate data, please use edit option or change the input data")
      return;
    }
    //declare constants
    // const yearValue = this.apiAddProjection.get('apiYear')?.value;
    const formValues = this.apiAddProjection.value

    //if valid add value to id
    formValues["id"] = Math.floor(Math.random() * 100000).toString();

    // //fetch all years and check if year addded was already present
    // this.yearService.getYearData().subscribe((result) => {
    //   result = Object.values(result);
    //   const numericValues = result.filter((value: any) => typeof value === 'number');
    //   this.year = numericValues;

    // if (this.year.indexOf(yearValue) === -1) {
    //   this.year.push(yearValue)
    //   this.yearService.putYearData(this.year).subscribe((result) => {
    //   })
    // }

    // })

    //post methid to add data
    this.apiProjectionService.postApiProjection(formValues).subscribe((result) => {
      console.log('saved successfully', result);
      this.getTableData();
    },
      (error) => {
        console.log('saving unsuccesfull', error);
      }
    )

    //reset form
    this.apiAddProjection.reset();
    this.isformSubmitSucess = true;
    this.modalService.dismissAll("saved")
  }

  //function to edit 5the row data
  editRow(id: number) {
    console.warn("edit id ", id)
  }

  isDuplicate(): boolean {
    const formData = this.apiAddProjection.value;
    return this.rowData.some((item: any) => item.apiName === formData.apiName);
  }


}
