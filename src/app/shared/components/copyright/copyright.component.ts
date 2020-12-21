import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lcl-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent implements OnInit {
  @Input() bottom: string;
  text: string;
  constructor() {
    // tslint:disable-next-line: prefer-const
    let year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家`;
    this.bottom = '10px';
  }

  ngOnInit() { }

}
