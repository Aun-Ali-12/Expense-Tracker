export default function Pagination({
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
}) {
  return (
    <>
      {/* Pagination  */}
      <section>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page.length === totalPages}
        >
          Next
        </button>
      </section>

      <section>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            setPage(1);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="all">show all</option>
        </select>
      </section>
    </>
  );
}
