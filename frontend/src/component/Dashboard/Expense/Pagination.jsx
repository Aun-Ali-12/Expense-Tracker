"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  expense,
  paginatedData,
}) {
  return (
    <>
      <div>
        {page && page > 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-secondary hover:bg-slate-50 hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {limit === "all" ? (
                <span className="text-sm text-text-secondary px-1">
                  showing all pages
                </span>
              ) : (
                <div>
                  <span className="text-sm text-text-secondary px-1">
                    Page{" "}
                    <span className="font-medium text-text-primary">
                      {page}{" "}
                    </span>
                    of
                    <span className="font-medium text-text-primary">
                      {" "}
                      {totalPages}
                    </span>
                  </span>
                </div>
              )}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-secondary hover:bg-slate-50 hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            {/* Limit selector */}
            <div className="flex flex-col items-center gap-2">
              <div>
                <label htmlFor="limit" className="text-xs text-text-secondary">
                  Show{" "}
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={(e) => {
                    setLimit(e.target.value);
                    setPage(1);
                  }}
                  className="text-sm text-text-primary border border-border rounded-lg px-2.5 py-1.5 bg-card focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="all">Show all</option>
                </select>
              </div>
              <div>
                <span className="text-sm text-text-secondary px-1">
                  Showing{" "}
                  <span className="font-medium text-text-primary">
                    {paginatedData.length}{" "}
                  </span>
                  entries out of
                  <span className="font-medium text-text-primary">
                    {" "}
                    {expense.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
