import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;



@Component({
  selector: 'app-shuffler',
  templateUrl: './shuffler.component.html',
  styleUrls: ['./shuffler.component.scss']
})
export class ShufflerComponent implements OnInit {

  lvItems = [
    { carClass: 'Truck', mpg: 21, mpgrange: 1, brand:'Toyota', carline:'B' },
    { carClass: 'Sedan', mpg: 21, mpgrange: 1, brand: 'Ford', carline:'C' },
    { carClass: 'Coupe', mpg: 27, mpgrange: 2, brand: 'Honda', carline:'D' },
    { carClass: 'Jeep', mpg: 23, mpgrange: 1, brand: 'Chevy', carline:'E' },
    { carClass: 'Truck', mpg: 27, mpgrange: 2, brand: 'Toyota', carline:'F' },
    { carClass: 'Coupe', mpg: 21, mpgrange: 1, brand:'GM', carline:'G' },
    { carClass: 'Sedan', mpg: 27, mpgrange: 2, brand:'Honda', carline:'H' },
    { carClass: 'Coupe', mpg: 27, mpgrange: 2, brand:'GM', carline:'I' },
    { carClass: 'Truck', mpg: 21, mpgrange: 1, brand:'Chevy', carline: 'J' },
    { carClass: 'Jeep', mpg: 25, mpgrange: 2, brand:'GM', carline:'K' },
    { carClass: 'Coupe', mpg: 23, mpgrange: 1, brand:'Honda', carline:'L' },
    { carClass: 'Truck', mpg: 27, mpgrange: 2, brand:'Ford', carline:'M' },
    { carClass: 'Sedan', mpg: 21, mpgrange: 1, brand:'Toyota', carline:'N' },
    { carClass: 'Jeep', mpg: 27, mpgrange: 2, brand:'GM', carline:'O' },
    { carClass: 'Coupe', mpg: 23, mpgrange: 1, brand: 'Honda', carline:'P' },
    { carClass: 'Truck', mpg: 21, mpgrange: 1, brand: 'GM', carline:'Q' },
    { carClass:  'Sedan', mpg: 27, mpgrange: 2, brand: 'Toyota', carline:'R' },
    { carClass: 'Coupe', mpg: 25, mpgrange: 2, brand: 'Ford', carline: 'S' },
    { carClass: 'Sedan', mpg: 21, mpgrange: 1, brand: 'Chevy', carline: 'T' },
    { carClass: 'Truck', mpg: 27, mpgrange: 2, brand: 'Honda', carline: 'U' },
    { carClass: 'Sedan', mpg: 27, mpgrange: 2, brand: 'GM', carline: 'V' },
    { carClass: 'Coupe', mpg: 21, mpgrange: 1, brand: 'Toyota', carline: 'W' },
    { carClass: 'Truck', mpg: 27, mpgrange: 2, brand: 'Honda', carline: 'X' },
    { carClass: 'Sedan', mpg: 25, mpgrange: 2, brand: 'GM', carline: 'Y' },
    { carClass: 'Coupe', mpg: 21, mpgrange: 1, brand: 'Ford', carline: 'Z' },
    { carClass: 'Coupe', mpg: 27, mpgrange: 2, brand: 'Chevy', carline: 'AA' },
    { carClass: 'Truck', mpg: 25, mpgrange: 2, brand: 'Honda', carline: 'AB' },
    { carClass: 'Coupe', mpg: 27, mpgrange: 2, brand: 'Chevy', carline: 'AC' },
    { carClass: 'Truck', mpg: 21, mpgrange: 1, brand: 'Toyota', carline: 'AD' },
    { carClass: 'Sedan', mpg: 25, mpgrange: 2, brand: 'Honda', carline: 'AE' },
    { carClass: 'Sedan', mpg: 21, mpgrange: 1, brand: 'Ford', carline: 'AF' },
    { carClass: 'Truck', mpg: 27, mpgrange: 2, brand: 'Honda', carline: 'AG' },
    { carClass: 'Coupe', mpg: 25, mpgrange: 2, brand: 'Toyota', carline: 'AH' }
];

  lv: any;
  columnSpace = 0; // adjust space between sorted blocks of squares
  expanded = false; // binary variable to determined if a square is expanded or none
  storedCSS: any; // used to store information on selected square
  storedTransform: any; // used to get original position of a selected square

  constructor() { }

  ngOnInit() {
    // $('#btnTest').on('click', function () {
    //   alert('test');
    // });
    // this.initiateSquares();
  }

  initiateSquares() {

    this.lv = $('#lv').kendoIBEListView({
        local: true,
        localData: this.lvItems,
        templateID: 't_car',
        displayMode: 'sortedBlocks',
        // displayMode: 'tile',
        bgColor: 'transparent',
        // bgColor: 'white',
        // blockSort: 'brand, carclass, mpgrange',
        blockSort: 'brand,mpgrange,carclass',
        blockMaxRows: 5,
        blockColumnWidth: 110,
        blockRowHeight: 110,
        width: 768,
        onSelect: function(sel) {

            if (this.expanded === false) {

                this.storedCSS = $('[data-uid=\'' + sel.uid + '\']').css([
                    'width', 'height', 'position', 'z-index', '-webkit-transform'
                ]);

                 this.storedTransform = this.storedCSS[0].style.webkitTransform;

                $('[data-uid=\'' + sel.uid + '\']').css({
                    '-webkit-transition': 'width .4s, height .4s, -webkit-transform .4s',
                    '-ms-transition': 'width .4s, height .4s, -ms-transform .4s',
                    'transition': 'width .4s, height .4s, transform .4s',
                    'width': '1016px',
                    'height': '696px',
                    'position': 'fixed',
                    'z-index': '10',
                    '-webkit-transform': 'translate(0px, 0px)',
                    '-ms-transform': 'translate(0px,0px)',
                    'transform': 'translate(0px,0px)'
                });

                $('[data-uid=\'' + sel.uid + '\']').children().css({
                    'visibility': 'hidden'
                });

                this.expanded = true;
            } else {
                $(' [data-uid=\'' + sel.uid + '\'] ').css({
                    '-webkit-transition': 'width .4s, height .4s, -webkit-transform .4s, z-index 4s',
                    '-ms-transition': 'width .4s, height .4s, -ms-transform .4s, z-index 4s',
                    'transition': 'width .4s, height .4s, transform .4s, z-index 4s',
                    'width': '100px',
                    'height': '100px',
                    'position': 'absolute',
                    'z-index': '0',
                    'top': '0',
                    'left': '0',
                    '-webkit-transform': this.storedTransform,
                    '-ms-transform': this.storedTransform,
                    'transform': this.storedTransform
                });

                $('[data-uid=\'' + sel.uid + '\']').children().css({
                    'visibility': 'visible'
                });

                setTimeout(function() {
                    $('[data-uid=\'' + sel.uid + '\']').css({
                        'z-index': '0'
                    });
                }, 3000);

                this. expanded = false;
            }

        }
    }).data('kendoIBEListView');
    }


}
