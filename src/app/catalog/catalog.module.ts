import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '@app/shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, NgbCarouselModule, CatalogRoutingModule]
})
export class CatalogModule {}
