import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
})
export class DashboardItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() deadline: string;
  @Input() due: number | string;
  @Input() isSelected: boolean;

  constructor() { }

  ngOnInit() {}

}
