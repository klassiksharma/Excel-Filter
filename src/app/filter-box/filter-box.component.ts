import {Component, ElementRef, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {TableService} from '../table.service';
import {FilterPipe} from '../filter.pipe';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnInit {
  hideFilterBox = true;
  @Input() field = '';
  @Output() addToFilterEvent: EventEmitter<any> = new EventEmitter();

  constructor(public tableService: TableService,
              private refElement: ElementRef, private filterPipe: FilterPipe) {
  }

  ngOnInit() {
  }

  show(field, event) {
    event.stopPropagation();
    this.tableService.uniqueData[field] = this.tableService.copyUnique(this.tableService.filteredData, field);
    this.hideFilterBox = !this.hideFilterBox;
  }

  close() {
    this.hideFilterBox = !this.hideFilterBox;
  }

  addToFilter(item, field, event) {
    if (event.target.checked) {
      console.log('checked one');
      console.log('field', field);
      console.log('item', item);
      if (!this.tableService.currentFilters[field].includes(item)) {
        this.tableService.currentFilters[field].push(item);
      }
      console.log('currentFilters', this.tableService.currentFilters);
      this.tableService.rowData.forEach(thisItem => {
        if (this.tableService.currentFilters.amount.includes(thisItem.amount)
          && this.tableService.currentFilters.balanceAfterTransaction.includes(thisItem.balanceAfterTransaction)
          && this.tableService.currentFilters.description.includes(thisItem.description)
          && this.tableService.currentFilters.type.includes(thisItem.type)
          && this.tableService.currentFilters.firstLevelCategory.includes(thisItem.firstLevelCategory)
          && this.tableService.currentFilters.secondLevelCategory.includes(thisItem.secondLevelCategory)) {
          this.tableService.filteredData.push(thisItem);
          console.log('pushing', thisItem);
        }
      });
      console.log('filteredData', this.tableService.filteredData);
    } else {
      console.log('unchecked one');
      console.log('field', field);
      console.log('item', item);
      const index = this.tableService.currentFilters[field].indexOf(item);
      this.tableService.currentFilters[field].splice(index, 1);
      console.log('currentFilters', this.tableService.currentFilters);
      this.tableService.filteredData = this.filterPipe.transform(this.tableService.filteredData, field, item);
      console.log('filteredData', this.tableService.filteredData);
    }
  }

  addAllToFilter(field, event) {
    if (event.target.checked) {
      console.log('checked all');
      console.log('field', field);
      this.tableService.currentFilters[field] = this.tableService.copyUnique(this.tableService.rowData, field);
      console.log('currentFilters', this.tableService.currentFilters);
      this.tableService.rowData.forEach(thisItem => {
        if (thisItem.hasOwnProperty(field) || thisItem[field]) {
          this.tableService.filteredData.push(thisItem);
        }
        /*if (thisItem.hasOwnProperty(field)) {
          this.tableService.filteredData.push(thisItem);
        }*/
      });
      console.log('filteredData', this.tableService.filteredData);
    } else {
      console.log('unchecked all');
      console.log('field', field);

      this.tableService.currentFilters[field] = [];
      console.log('currentFilters', this.tableService.currentFilters);
      this.tableService.filteredData = this.filterPipe.transform(this.tableService.filteredData, field, '');
      console.log('filteredData', this.tableService.filteredData);
    }
  }

  ifChecked(item, field) {
    let isPresent = false;
    for (let i = 0; i < this.tableService.filteredData.length; i++) {
      if (this.tableService.filteredData[i][field] === item) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  }

  ifCheckedAll(field) {
    return this.tableService.uniqueData[field].length === this.tableService.currentFilters[field].length;
  }

  checkIfFiltered1(field) {
    return this.tableService.currentFilters[field].length === this.tableService.copyUnique(this.tableService.rowData, field).length;
  }
}
