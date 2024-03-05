export interface PaginationData<T> {
  items: T[];
  links: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
