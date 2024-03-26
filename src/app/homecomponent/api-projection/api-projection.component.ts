import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ColGroupDef } from 'ag-grid-community'; // Column Definition Type Interface
import { ApiProjectionService } from 'src/app/services/api-projection.service';
import { YearService } from 'src/app/services/year.service';

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
  // Row Data: The data to be displayed.
  rowData2 = [
    { ApiName: "apiname", Hourly2023: 233232, Daily2023: 323234, Hourly2024: 23093344, Daily2024: 354645 },
    { ApiName: "apiname", Hourly2023: 233232, Daily2023: 323234, Hourly2025: 23093344, Daily2025: 354645 },

  ];

  colDefs2: (ColDef<{ ApiName: string; Hourly: string; Daily: number; }> | ColGroupDef)[] = [
    { headerName: 'Api Name', field: "ApiName" },
    {
      headerName: "2023", children: [
        { headerName: 'Hourly(peak Hours)', field: 'Hourly2023' },
        { headerName: 'Daily(peak Hours)', field: 'Daily2023' }
      ]
    },
    {
      headerName: "2024", children: [
        { headerName: 'Hourly(peak Hours)', field: 'Hourly2024' },
        { headerName: 'Daily(peak Hours)', field: 'Daily2024' }
      ]
    },
    {
      headerName: "2025", children: [
        { headerName: 'Hourly(peak Hours)', field: 'Hourly2025' },
        { headerName: 'Daily(peak Hours)', field: 'Daily2025' }
      ]
    },
  
  ];

  constructor(private formgroup: FormBuilder,
    private apiProjectionService: ApiProjectionService,
    private yearService: YearService) {
    this.apiAddProjection = {} as FormGroup;
  }

  ngOnInit() {
    this.initializeForm();
  }

  public initializeForm() {
    this.apiAddProjection = this.formgroup.group({
      id: [],
      apiName: ['', Validators.required],
      apiYear: ['', Validators.required],
      apiPeakHour: ['', Validators.required],
      apiPeakDay: ['', Validators.required],
    },
    )
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
    //declare constants
    const yearValue = this.apiAddProjection.get('apiYear')?.value;
    const formValues = this.apiAddProjection.value

    //if valid add value to id 
    formValues["id"] = Math.floor(Math.random() * 100000);
  
    //fetch all years and check if year addded was already present
    this.yearService.getYearData().subscribe((result) => {
      result = Object.values(result);
      const numericValues = result.filter((value: any) => typeof value === 'number');
      this.year = numericValues;

      if (this.year.indexOf(yearValue) === -1) {
        this.year.push(yearValue)
        console.log("yeartest:", this.year)
        this.yearService.putYearData(this.year).subscribe((result) => {
          console.log('added year successfully', result);
        })
      }

    })

    //post methid to add data
    this.apiProjectionService.postApiProjection(formValues).subscribe((result) => {
      console.log('saved successfully', result);
    },
      (error) => {
        console.log('saving unsuccesfull', error);
      }
    )

    //reset form
    this.apiAddProjection.reset();
    this.isformSubmitSucess = true;
    this.isformSubmitSucess ? this.isAddFormSubmitted = false : this.isAddFormSubmitted = true;

  }

}
