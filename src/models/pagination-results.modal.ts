export default interface PaginationResultsModal<T> {
     itemsPerPage: number;
     totalItems: number;
     currentPage: number;
     totalPages: number;
     items: T[];
}
