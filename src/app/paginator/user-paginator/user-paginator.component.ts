import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global/global.service';

@Component({
  selector: 'app-user-paginator',
  templateUrl: './user-paginator.component.html',
  styleUrls: ['./user-paginator.component.css']
})
export class UserPaginatorComponent implements OnInit, OnChanges {

  @Input() userPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['userPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.userPaginator.number - 4), this.userPaginator.totalPages - 5);
    this.to = Math.max(Math.min(this.userPaginator.totalPages, this.userPaginator.number + 4), 6);
    if(this.userPaginator.totalPages > 5) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.userPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
