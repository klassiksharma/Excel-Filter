import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataArray: any[], field: string, item: string): any[] {
    console.log('dataArray', dataArray);
    console.log('field', field);
    console.log('item', item);
    if (!dataArray) {
      return [];
    }

    if (item === '') {
      dataArray = dataArray.filter(value => {
        return value[field] === item;
      });
    }

    dataArray = dataArray.filter(value => {
      return value[field] !== item;
    });


    return dataArray;


  }

}
