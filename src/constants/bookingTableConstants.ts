export const DATA_PER_PAGE = 10;

export const statusColors: Record<string, string> = {
  unconfirmed:
    'bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700',
  'checked out':
    'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200',
  'checked in': 'bg-gradient-to-r from-green-200 to-green-500',
};
