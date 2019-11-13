import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '@app/shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbCarouselModule,
    CatalogRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class CatalogModule { }
