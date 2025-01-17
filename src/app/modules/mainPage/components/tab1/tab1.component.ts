import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pasantia } from 'src/app/shared/models/pasantia';
import { InternshipService } from 'src/app/shared/services/internship.service';

@Component({
  selector: 'tab1',
  template: `<header translucent="true">
  <title> Pasantias </title>
  <div class=" container text-teal ">
    <input [(ngModel)]="search" placeholder="Tu pasantia perfecta">
    <button type="button" mat-button (click)="searchInternship()"> <mat-icon>search</mat-icon> </button>
  </div>
</header>

<content fullscreen="true" >
  <div class="margin">
    <div class="centerh" *ngIf="emptyList">
      <div>
        <p class="center">No exiten pasantias por el momento</p>
      </div>
      <div>
        <img class="image-empty"src="assets/img/inbox.png"/>
      </div>
    </div>
    <div *ngIf="loader;else showLoadPasantias">
      <div class="row">
        <div *ngFor="let pasantia of pasantias; let i = index" class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
          <div [class.cardcolorbl]="i%2==0" [class.cardcolorgra]="i%2==1">
            <div class="derecha">
              <button (click)="postular(pasantia)" mat-raised-button > Postular </button>
            </div>
            <div class="space">
              <div class="center-img">
                <img class="img-padding" src="{{pasantia.logo}}" />
              </div>

              <div>
                <h3 color="light">{{pasantia.nombre}}</h3>
                <div class="spacebetween">
                  <div color="light">{{pasantia.area}}</div>
                  <span (click)="seeMore(pasantia)" class="material-icons">
                    arrow_drop_down
                    </span>

                </div>
              </div>
            </div>

            <div *ngIf="pasantia.visibilidad">
              {{pasantia.requisistos}}
            </div>
          </div>
        </div>
      </div>

    </div>

    <ng-template  #showLoadPasantias>
      <div class="col">
        <ngx-skeleton-loader count="7" appearance="circle" [animation]="animation" [theme]="{
          'border-radius': '50px',
          height: '50px',
          width:'50px',
          'background-color': '#00b347',

          'animation-duration': '2s'
        }">
          </ngx-skeleton-loader>

      </div>

    </ng-template>
  </div>


</content>



<!-- Pagination -->
<div class=" center  padding-32">
  <div class=" bar">
    <a href="#" class=" bar-item  button  hover-black">«</a>
    <a href="#" class=" bar-item  black  button">1</a>
    <a href="#" class=" bar-item  button  hover-black">2</a>
    <a href="#" class=" bar-item  button  hover-black">3</a>
    <a href="#" class=" bar-item  button  hover-black">4</a>
    <a href="#" class=" bar-item  button  hover-black">»</a>
  </div>
</div>
`,
  styleUrls: ['./tab1.component.scss']
})
export class Tab1Component implements OnInit {
  @Output() internshipTab1 = new EventEmitter();


  description: boolean = false;
  pasantias: Pasantia[] = [];
  emptyList: boolean = false;
  loader: boolean = false;

  search: string;
  total = [];


  private path = 'pasantias/'
  constructor(private internshipService: InternshipService) { }
  ngOnInit(): void {
    this.getpasantias();
  }


  seeMore(pasantia) {
    pasantia.visibilidad = this.chageVisivilidad(pasantia)
  }
  chageVisivilidad(pasantia) {
    return !pasantia.visibilidad
  }

  postular(pasantia) {
    this.internshipTab1.emit(pasantia);
  }

  getpasantias() {
    this.internshipService.getCollectionPasantia<Pasantia>(this.path).subscribe((res) => {
      if (res) {
        this.pasantias = this.sortList(res);
        this.loader = true;
        console.log('PASANTIAS', this.pasantias, res)
      }
      if (this.pasantias.length == 0) {
        this.emptyList = true;
      } else {
        this.emptyList = false;
      }
    });
    console.log('PASANTIAS', this.pasantias);

  }

  sortList(pasantias: any) {
    return pasantias.sort((a, b) => b.date - a.date);
  }

  searchInternship(): void {
    this.total = [];
    if (this.search == null || this.search == '') {
      this.getpasantias();
      this.total = [];
      console.log('Total:', this.total);
    } else {
      this.pasantias.filter(s =>
        s.area.includes(this.search.toLowerCase()) ? this.total.push(s) : '' ||
          s.nombre.includes(this.search.toLowerCase()) ? this.total.push(s) : ''
      );
      this.pasantias = this.total.filter(s => s.nombre);
      console.log('Total:', this.total);
    }
  }
}
