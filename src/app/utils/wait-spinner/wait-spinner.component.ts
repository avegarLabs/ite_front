import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-spinner',
  templateUrl: './wait-spinner.component.html',
  styleUrls: ['./wait-spinner.component.css']
})
export class WaitSpinnerComponent implements OnInit {
  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
