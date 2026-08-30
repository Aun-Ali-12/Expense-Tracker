"use client";
export default function ExpenseCard({ expense, handleDel, handleEdit }) {
  return (
    <>
      <section>
        <h1>Your Expense</h1>

        {/* table  */}
        <table>
          <thead>
            <tr>
              <td>note</td>
              <td>amount</td>
              <td>category</td>
              <td>actions</td>
            </tr>
          </thead>
          {/* expense body  */}
          <tbody>
            {expense &&
              expense.map((e, index) => (
                <tr key={index}>
                  <td>{e.note}</td>
                  <td>{e.amount}</td>
                  <td>{e.category}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(e, e._id);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        handleDel(e._id);
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
