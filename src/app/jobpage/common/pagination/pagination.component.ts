import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  ngOnInit(): void {
  }

  getPageNumbers(): (number | string)[] {
    const pageNumbers: (number | string)[] = [];
    if (this.totalPages <= 1) {
      return pageNumbers;
    }

    const startPage = Math.max(this.currentPage - 1, 1);
    const endPage = Math.min(this.currentPage + 1, this.totalPages - 1);

    pageNumbers.push(0);

    if (this.currentPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < this.totalPages - 2) {
      pageNumbers.push('...');
    }

    if (this.totalPages > 1 && !pageNumbers.includes(this.totalPages - 1)) {
      pageNumbers.push(this.totalPages - 1);
    }

    return pageNumbers;
  }

  onPageClick(page: number | string): void {
    if (typeof page === 'number' && page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onPreviousClick(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNextClick(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  protected readonly Number = Number;
}
