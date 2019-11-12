import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { catalogItems } from './catalog.utils';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  // tslint:disable-next-line: max-line-length

  catalogItems: any[];
  currentCatalogItem: any;
  currentProduct: any;

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.catalogItems = catalogItems;
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const catalogName = paramMap.get('catalogName');
      this.currentCatalogItem = this.catalogItems.find(
        item => item.name === catalogName
      );
      this.currentProduct = { image: this.currentCatalogItem.images[0] }
    });
  }

  onClickBottomImage = (image: string) => {
    this.currentProduct = { image: image }
    // console.log(this.carousel);
    // console.log(this.carousel.slides.first.id);
    // // this.carousel.slides()[5].active = true
    // console.log(this.carousel.slides);
    // // tslint:disable-next-line: radix
    // const id = `ngb-slide-${parseInt(
    //   this.carousel.slides.first.id.split('-').slice(-1)[0]
    // ) + idx}`;
    // this.carousel.select(id);
    // console.log(idx);
  };
}
