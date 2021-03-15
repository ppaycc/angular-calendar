import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() content;
  public showEditModal = false;
  public value = '';
  public bg = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.5)`;
  constructor(private calendar: CalendarService) { }

  ngOnInit(): void {
    this.value = this.content.value;
  }
  onDelete(event): void{
    event.stopPropagation();
    if (confirm('Ds действительно хотите удалить, ... ?')){
      console.log('on delete');
      this.calendar.deleteEvent(this.content._id);
    }
  }
  onEdit(event): void{
    event.cancelBubble = false;
    event.stopPropagation();
    console.log(event);
    this.showEditModal = true;
  }
  saveChanges(): void{
    const body = {
      _id: this.content._id,
      value: this.value,
      date: this.content.date
    }
    if (this.value){
      this.calendar.editEvent(body);
      this.showEditModal = false;
    }
  }
  onChange(e): void{
    e.stopPropagation();
    this.value = e.target.value;
  }
  onSaveEdit(e): void{
    e.stopPropagation();
    const body = {
      _id: this.content._id,
      value: this.value,
      date: this.content.date
    }
    if (this.value){
      this.calendar.editEvent(body);
      this.showEditModal = false;
    }
  }
  cancel(e): void{
    e.stopPropagation();
    this.showEditModal = false;
  }
}
