import {Component, OnInit} from '@angular/core';
import {TableService} from '../table.service';
import {FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  cols: any = [
    {
      'field': 'amount',
      'header': 'Amount',
    },
    {
      'field': 'balanceAfterTransaction',
      'header': 'Balance',
    },
    {
      'field': 'description',
      'header': 'Description',
    },
    {
      'field': 'type',
      'header': 'Type',
    },
    {
      'field': 'firstLevelCategory',
      'header': 'First Category',
    },
    {
      'field': 'secondLevelCategory',
      'header': 'Second Category',
    }
  ];

  constructor(public tableService: TableService, private filterPipe: FilterPipe) {
  }

  currentValue = '';

  ngOnInit() {
  }

  valueChange(field: string, event) {
    console.log(field);
    this.currentValue = event;
    if (this.currentValue.length > 3) {
      this.filterData(field);
    }
  }

  filterData(field: string) {
    this.tableService.filteredData = this.filterPipe.transform(this.tableService.filteredData, field, this.currentValue);
    console.log('filteredData', this.tableService.filteredData);
  }


}
