import { ExpenseProvider } from "@/Context/ExpenseData";
import { UserProvider } from "@/Context/User";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }) {
  return <>
    {/* user context provider  */}
    <UserProvider>
      {/* expense context provider  */}
      <ExpenseProvider>
        {children}
      </ExpenseProvider>
    </UserProvider>
  </>;
}