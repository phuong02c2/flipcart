import { Component, OnInit, ViewChild } from '@angular/core';
import { NewslettersService } from '../../services/newsletters/newsletters.service';

import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Newsletter } from 'src/app/models/newsletters/newsletter';

@Component({
  selector: 'app-newsletter-list',
  templateUrl: './newsletter-list.component.html',
  styleUrls: ['./newsletter-list.component.css'],
})
export class NewsletterListComponent implements OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'description' },
    { field: 'readTime' },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  protected rowData: Newsletter[];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private readonly service: NewslettersService) {}

  ngOnInit() {
    this.service.getNewsletters().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        console.log(response);

        this.rowData = response;
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        console.log(error);
      },
      () => {
        //complete() callback
        console.info('Request completed'); //This is actually not needed
      }
    );
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
