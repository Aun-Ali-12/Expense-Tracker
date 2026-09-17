"use client";
import { Pencil, Trash2 } from "lucide-react";
import Filters from "./Filters";
import Pagination from "./Pagination";
import { TableSkeleton } from "./Loader/TableSkeleton";

export default function ExpenseCard({
  paginatedData,
  handleDel,
  handleEdit,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  isOpen,
  setIsOpen,
  getCategoryColor,
  expense,
  expenseLoading,
}) {
  return (
    <section className="bg-card rounded-2xl p-4 border border-border capitalize">
      {/* Top section: heading and filter  */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-text-primary mb-4">
          Your Expense
        </h1>
        <Filters />
      </div>

      {/*  DESKTOP: TABLE VIEW  */}
      <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/50">
              <th className="text-left font-medium text-text-secondary text-xs uppercase tracking-wide px-5 py-3">
                Date
              </th>
              <th className="text-left font-medium text-text-secondary text-xs uppercase tracking-wide px-5 py-3">
                Note
              </th>
              <th className="text-left font-medium text-text-secondary text-xs uppercase tracking-wide px-5 py-3">
                Amount
              </th>
              <th className="text-left font-medium text-text-secondary text-xs uppercase tracking-wide px-5 py-3">
                Category
              </th>
              <th className="text-right font-medium text-text-secondary text-xs uppercase tracking-wide px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {expenseLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableSkeleton key={i} />
                ))
              : paginatedData.map((e) => (
                  <tr
                    key={e._id}
                    className="border-b border-border last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5 text-text-secondary">
                      {new Date(e.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-text-primary font-medium">
                      {e.note}
                    </td>
                    <td className="px-5 py-3.5 text-text-primary font-semibold">
                      Rs. {e.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(e.category)} `}
                      >
                        {e.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            handleEdit(e, e._id);
                            setIsOpen(!isOpen);
                          }}
                          aria-label="Edit expense"
                          className="p-1.5 rounded-lg text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDel(e._id)}
                          aria-label="Delete expense"
                          className="p-1.5 rounded-lg text-text-secondary hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

            {paginatedData.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-3.5 text-text-primary font-medium text-center"
                  colSpan={5}
                >
                  No data found
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>

      {/*  MOBILE: CARD VIEW */}
      <div className="flex flex-col gap-3 md:hidden">
        {paginatedData &&
          paginatedData.map((e) => (
            <div
              key={e._id}
              className="bg-card rounded-2xl border border-border p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {e.note}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {new Date(e.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  Rs. {e.amount}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full`}
                >
                  {e.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleEdit(e, e._id);
                      setIsOpen(!isOpen);
                    }}
                    aria-label="Edit expense"
                    className="p-1.5 rounded-lg text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDel(e._id)}
                    aria-label="Delete expense"
                    className="p-1.5 rounded-lg text-text-secondary hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* pagination */}
      <div>
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPages={totalPages}
          expense={expense}
          paginatedData={paginatedData}
        />
      </div>
    </section>
  );
}
