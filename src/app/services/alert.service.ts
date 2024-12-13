import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.alertSubject.next({ message, type });
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}
