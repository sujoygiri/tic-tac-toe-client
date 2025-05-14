import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() alertBgColor: string = '';
  @Input() alertMessage: string = '';
  @Input() alertIcon: string = '';
  @Output() closeAlertEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  closeAlert() {
    this.closeAlertEvent.emit(false);
  }
}
