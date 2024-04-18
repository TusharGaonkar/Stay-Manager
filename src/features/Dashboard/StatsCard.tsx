/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn_components/ui/card';

export default function StatCard({
  stat,
}: {
  stat: { label: string; value: string | number; icon: React.ComponentType };
}) {
  return (
    <Card key={stat.label} className="text-secondary bg-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
        <div>
          <stat.icon />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{stat?.value ?? 'No enough data'}</div>
      </CardContent>
    </Card>
  );
}
