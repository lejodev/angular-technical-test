import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private homeService: HomeService) { }

  title = 'angular-technical-test';

  ngOnInit() {
    this.homeService.getData().subscribe(data => {
      console.log(data)
    })
  }

}
