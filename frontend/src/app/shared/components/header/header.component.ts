import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  name!: string;

  constructor(private router:Router, private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.dataService.getLoggedUser().subscribe((user) => {
      this.name = user ? `${user.name}` : '';
    });
  }

  onLogout() {
    localStorage.clear();
    this.dataService.setIsLoggedIn(false);
    this.router.navigate(['auth']);
  }

}
