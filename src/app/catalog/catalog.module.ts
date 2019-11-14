import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '@app/shared';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbCarouselModule,
    CatalogRoutingModule,
    AngularEditorModule
  ]
})
export class CatalogModule {}
