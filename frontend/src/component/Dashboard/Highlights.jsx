export default function Highlights({
  totalSpendingCategoryWise,
  highestSpendingItem,
}) {
  return (
    <>
      <section>
        {/* heading  */}
        <h2>top highlights</h2>

        {/* top highlights data div  */}
        <div>
          {totalSpendingCategoryWise &&
            totalSpendingCategoryWise.map((item, index) => (
              <p key={index}>
                {item.category}: {item.amount}
              </p>
            ))}
        </div>
      </section>

      <section>
        <h2>Highest Spending items of each category</h2>
        {/* top highlights data div  */}
        <div>
          {highestSpendingItem &&
            highestSpendingItem.map((item, index) => (
              <p key={index}>
                {item.category}: {item.highestItem.note}{" "}
                {item.highestItem.totalAmount}
              </p>
            ))}
        </div> 
      </section>
    </>
  );
}
