import { CalendarService } from './../calendar.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
  @Input() date;
  @Output() closeModal = new EventEmitter<any>();
  public value: string = '';
  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {
  }
  onCancel(): void{
    this.closeModal.emit();
  }
  getDate(): any{
    const d = new Date(this.date.fullDate);
    const yyyy = d.getFullYear();
    const mm = d.getMonth()+1 > 10 ? d.getMonth()+1 : '0'+(d.getMonth()+1);
    const dd = d.getDate() > 10 ? d.getDate() : '0'+d.getDate();
    return `${yyyy}.${mm}.${dd}`;
  }
  onChange(event): void{
    this.value = event.target.value;
  }
  onAdd(): void{
    if (this.value.trim()){
      this.calendar.addEvent({
        value: this.value,
        date: this.date.fullDate
      });
      this.closeModal.emit();
    }
  }

}
