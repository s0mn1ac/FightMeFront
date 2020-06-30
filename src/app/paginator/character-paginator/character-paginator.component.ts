import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { GlobalService } from 'src/app/global/global.service';

@Component({
  selector: 'app-character-paginator',
  templateUrl: './character-paginator.component.html',
  styleUrls: ['./character-paginator.component.css']
})
export class CharacterPaginatorComponent implements OnInit, OnChanges {

  @Input() characterPaginator: any;
  pages: number[];
  from: number;
  to: number;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let updated = changes['characterPaginator'];
    if(changes.previousValue) {
      this.startPaginator();
    }
  }

  private startPaginator(): void {
    this.from = Math.min(Math.max(1, this.characterPaginator.number - 4), this.characterPaginator.totalPages - 5);
    this.to = Math.max(Math.min(this.characterPaginator.totalPages, this.characterPaginator.number + 4), 6);
    if(this.characterPaginator.totalPages > 5) {
      this.pages = new Array(this.from - this.to + 1).fill(0).map((valor, indice) => indice + this.to);
    } else {
      this.pages = new Array(this.characterPaginator.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
