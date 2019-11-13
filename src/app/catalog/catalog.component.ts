import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { catalogItems, saveText } from './catalog.utils';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  dropdownList: any[] = [];
  displayedCols: { name: string, label: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  descriptionFieldList: { name: string, label: string }[] = []
  checked = false

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {    
    this.catalogItems = catalogItems;
    this.catalogItems.map(item => {
      item.products = item.images.map((img: any) => <any>{
        image: img,
        descriptionFieldList: [
          { name: 'code', label: 'Code', displayed: true },
          { name: 'label', label: 'Label', displayed: true },
          { name: 'size', label: 'Size', displayed: true },
          { name: 'color', label: 'Color', displayed: false },
          { name: 'volume', label: 'Volume', displayed: false }
        ], descriptions: [
          { code: 'No 120', label: 'Product No 120', size: '10x20x30 cm', color: 'Yellow', volume: '1000ml' },
          { code: 'No 120', label: 'Product No 120', size: '10x20x30 cm', color: 'Yellow', volume: '1000ml' },
          { code: 'No 120', label: 'Product No 120', size: '10x20x30 cm', color: 'Yellow', volume: '1000ml' },
          { code: 'No 120', label: 'Product No 120', size: '10x20x30 cm', color: 'Yellow', volume: '1000ml' }
        ]
      })
    })
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const catalogName = paramMap.get('catalogName');
      this.currentCatalogItem = this.catalogItems.find(
        item => item.name === catalogName
      );
      this.currentProduct = this.currentCatalogItem.products[0]
    });
    this.descriptionFieldList = [
      { name: 'code', label: 'Code' },
      { name: 'label', label: 'Label' },
      { name: 'size', label: 'Size' },
      { name: 'color', label: 'Color' },
      { name: 'volume', label: 'Volume' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
      // itemsShowLimit: 3
      // allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  addDescriptionField = () => {
    const newCol = {
      name: `label${this.currentProduct.descriptionFieldList.length}`,
      label: `New Label ${this.currentProduct.descriptionFieldList.length}`,
      displayed: true
    }
    this.currentProduct.descriptionFieldList.push(newCol)
  }

  addDescription = () => {
    const newDescription = {}
    this.currentProduct.descriptionFieldList.map((field: any) => { newDescription[field.name] = undefined })
    this.currentProduct.descriptions.push(newDescription)
  }

  onChangeColLabel = (col: { name: string, label: string }) => {
    const field = this.descriptionFieldList.find(field => field.name === col.name)
    if (field) { field.label = col.label }
  }

  onChangeProduct = (product: any) => {
    this.currentProduct = product
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

  saveDataToFile = () => {
    saveText(JSON.stringify(this.catalogItems), 'catalogData.json')
  }
}
