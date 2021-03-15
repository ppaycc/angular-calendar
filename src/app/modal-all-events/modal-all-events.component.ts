import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-all-events',
  templateUrl: './modal-all-events.component.html',
  styleUrls: ['./modal-all-events.component.css']
})
export class ModalAllEventsComponent implements OnInit {
  @Input() events;
  @Output() closeModalAllEvents = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.events);
  }
  onClose(event): void{
    event.stopPropagation();
    this.closeModalAllEvents.emit();
  }
}
