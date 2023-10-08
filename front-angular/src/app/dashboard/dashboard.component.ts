import { Component, OnInit } from '@angular/core';
import { ExpeditionList } from '../actions/expedition-list';
import { ExpeditionsService } from '../actions/expeditions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  expeditions: ExpeditionList[] = [];

  constructor(private expeditionsService: ExpeditionsService) {
    
  }

  ngOnInit(): void {
    this.getExpeditions();
  }

  private getExpeditions(){
    this.expeditionsService.getExpeditionLists().subscribe(data => {
      this.expeditions = data;
    });
  }

  removeExp(id: String) {
    this.expeditionsService.deleteExpeditionLists(id).subscribe( data => {
      console.log(data);
      this.getExpeditions();
    })
  }
}
