import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MonthlyChart } from '@/components/MonthlyChart';

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}