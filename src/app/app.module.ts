import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableService } from './table.service';
import { FilterPipe } from './filter.pipe';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterPipe,
    FilterBoxComponent,
    ClickOutsideDirective,
    ResetComponent,
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [TableService, FilterPipe, ResetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
