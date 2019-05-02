import { Component, OnInit, Input } from '@angular/core';
import { HttpModule } from '@angular/http';

import { Mail } from '../../../shared/models/mail';
import { Order } from '../../../shared/models/order';
import { MailService } from '../../../shared/services/mail.service';

@Component({
  selector: 'app-mail-order',
  templateUrl: './mail-order.component.html',
  styleUrls: ['./mail-order.component.scss'],
  providers: [HttpModule, MailService]
})
export class MailOrderComponent implements OnInit {
  @Input()
  order: Order;
  messageSent = false;

  constructor(private _mailService: MailService) { }
  ngOnInit() { }

  // initially fill fields to prevent errors
  public message: Mail = {
    userId: ''
  };

  onSubmit() {
    this.message.userId = this.order.userId;

    this._mailService.postEmail(this.message).subscribe(
      response => this.handleResponse(response),
      error => this.handleResponse(error)
    );
  }

  handleResponse(response) {
    if(response.status == 'success') {
      this.message = {
        userId: 'userId',
      };
      this.messageSent = true;
    }
    if(response.status == 'error') {
      alert('Error');
    }
  }
}
