import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() textButton!: string;

}
