export const DATA_PER_PAGE = 10;

export const statusColors: Record<string, string> = {
  unconfirmed: 'bg-gradient-to-r from-danger-200 to-danger-300 text-danger-foreground',
  confirmed: 'bg-gradient-to-r from-blue-300 to-blue-600',
  'checked out':
    'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200',
  'checked in': 'bg-gradient-to-r from-green-200 to-green-500',
};
