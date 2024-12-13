import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [ButtonComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private route: Router) {}

  start() {
    this.route.navigate(["home"]);
  }
}
