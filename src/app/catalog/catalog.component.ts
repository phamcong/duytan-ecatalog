import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { catalogItems, saveText } from './catalog.utils';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  // tslint:disable-next-line: max-line-length

  catalogItems: any[] = [];
  currentCatalogItem: any = {};
  currentProduct: any = {};
  dropdownList: any[] = [];
  displayedCols: { name: string; label: string }[] = [];
  descriptionFieldList: { name: string; label: string }[] = [];
  checked = false;
  editorConfig: AngularEditorConfig;
  selectedDescription: any;
  onEditting = true;

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote'
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1'
        }
      ],
      toolbarPosition: 'top'
    };

    this.catalogItems = catalogItems;
    this.catalogItems.map(item => {
      item.products = item.images.map(
        (img: any) =>
          <any>{
            image: img,
            descriptionFieldList: [
              { name: 'code', label: 'Code', displayed: true },
              { name: 'label', label: 'Label', displayed: true },
              { name: 'size', label: 'Size', displayed: true },
              { name: 'color', label: 'Color', displayed: false },
              { name: 'volume', label: 'Volume', displayed: false }
            ],
            descriptions: [
              {
                code: 'No 120',
                label: 'Product No 120',
                size: '10x20x30 cm',
                color: 'Yellow',
                volume: '1000ml'
              },
              {
                code: 'No 120',
                label: 'Product No 120',
                size: '10x20x30 cm',
                color: 'Yellow',
                volume: '1000ml'
              },
              {
                code: 'No 120',
                label: 'Product No 120',
                size: '10x20x30 cm',
                color: 'Yellow',
                volume: '1000ml'
              }
            ],
            richTextDescription: ''
          }
      );
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const catalogName = paramMap.get('catalogName');
      this.currentCatalogItem = this.catalogItems.find(
        item => item.name === catalogName
      );
      if (this.currentCatalogItem)
        this.currentProduct = this.currentCatalogItem.products[0];
    });
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
    };
    this.currentProduct.descriptionFieldList.push(newCol);
  };

  addDescription = () => {
    const newDescription = {};
    this.currentProduct.descriptionFieldList.map((field: any) => {
      newDescription[field.name] = undefined;
    });
    this.currentProduct.descriptions.push(
      Object.assign(
        {},
        this.currentProduct.descriptions[
          this.currentProduct.descriptions.length - 1
        ]
      )
    );
  };

  removeDescription = () => {
    if (!this.selectedDescription) {
      alert('Please select a row to delete');
      return;
    }
    this.currentProduct.descriptions = this.currentProduct.descriptions.filter(
      (des: any) => des !== this.selectedDescription
    );
    this.selectedDescription = undefined;
  };

  onChangeColLabel = (col: { name: string; label: string }) => {
    const field = this.descriptionFieldList.find(
      field => field.name === col.name
    );
    if (field) {
      field.label = col.label;
    }
  };

  onChangeProduct = (product: any) => {
    this.currentProduct = product;
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

  onFileChanged = (event: any) => {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.catalogItems = JSON.parse(fileReader.result as string);
      if (this.currentProduct) {
        this.catalogItems.map(catItem => {
          const foundProduct = catItem.products.find(
            (item: any) => item.image === this.currentProduct.image
          );
          if (foundProduct) this.currentProduct = foundProduct;
        });
      }
    };
    fileReader.onerror = error => {
      console.log(error);
    };
  };

  saveDataToFile = () => {
    saveText(JSON.stringify(this.catalogItems), 'catalogData.json');
  };
}
