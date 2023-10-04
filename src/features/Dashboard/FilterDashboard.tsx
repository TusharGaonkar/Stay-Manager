import { Tabs, TabsList, TabsTrigger } from '@/shadcn_components/ui/tabs';

export default function FilterDashboard({
  setStartDate,
}: {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleDateChange = (value: string) => {
    setStartDate(value);
  };

  return (
    <Tabs defaultValue="This Year" className="w-[400px] mr-2">
      <TabsList>
        <TabsTrigger value="This Year" onClick={() => handleDateChange('This Year')}>
          This Year
        </TabsTrigger>
        <TabsTrigger value="Past 6 Months" onClick={() => handleDateChange('Past 6 Months')}>
          Past 6 Months
        </TabsTrigger>
        <TabsTrigger value="This Month" onClick={() => handleDateChange('Last Month')}>
          Last Month
        </TabsTrigger>
        <TabsTrigger value="This Week" onClick={() => handleDateChange('This Week')}>
          This Week
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
