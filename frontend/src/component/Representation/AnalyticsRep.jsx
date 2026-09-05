import PieCharts from "../Dashboard/Analytics/PieChart";
import BarCharts from "../Dashboard/Analytics/BarChart";
import ProgressChart from "../Dashboard/Analytics/ProgressChart";
import TransactionCountChart from "../Dashboard/Analytics/TransactionsChart";

export default function AnalyticsRep() {
  return (
    <>
      <PieCharts />
      <BarCharts />
      <ProgressChart />
      <TransactionCountChart />
    </>
  );
}
