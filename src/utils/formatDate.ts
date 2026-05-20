import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatPattern: string = 'dd MMM yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatPattern);
  } catch {
    // Fallback if not an ISO string
    try {
      const date = new Date(dateString);
      return format(date, formatPattern);
    } catch {
      return dateString;
    }
  }
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
