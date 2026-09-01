import { useHighlights } from "@/hooks/dashboard/useHighlights";

export default function Highlights() {
  const { totalSpendingCategoryWise } = useHighlights();
  console.log(totalSpendingCategoryWise);

  return <>Top Highlights</>;
}
