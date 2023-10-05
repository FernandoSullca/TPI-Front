import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() textMessage: string = '';
  @Input() typeMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
