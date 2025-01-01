interface Paging {
  size: number;
  current_page: number;
  total_page: number;
}

export interface Pageable<T> {
  data: Array<T>;
  paging: Paging;
}
