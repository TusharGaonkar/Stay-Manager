import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn_components/ui/card';

export default function StatCard({
  stat,
}: {
  stat: { label: string; value: string; icon: React.ComponentType };
}) {
  return (
    <Card
      key={stat.label}
      className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-400 via-gray-600 to-blue-800"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
        <div>
          <stat.icon />
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-lg">{stat.value}</div>
      </CardContent>
    </Card>
  );
}
