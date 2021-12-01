import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared-services/navigation.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {

  constructor(
    public navService: NavigationService
  ) { }

  ngOnInit(): void {
  }

}
