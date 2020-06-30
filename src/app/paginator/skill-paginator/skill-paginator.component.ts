import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global/global.service';

@Component({
  selector: 'app-skill-paginator',
  templateUrl: './skill-paginator.component.html',
  styleUrls: ['./skill-paginator.component.css']
})
export class SkillPaginatorComponent implements OnInit, OnChanges {

  @Input() skillPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['skillPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.skillPaginator.number - 4), this.skillPaginator.totalPages - 5);
    this.to = Math.max(Math.min(this.skillPaginator.totalPages, this.skillPaginator.number + 4), 6);
    if(this.skillPaginator.totalPages > 5) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.skillPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
