export const STATUS_LABELS: Record<string, string> = {
  // BidRoom Statuses
  LIVE: 'Live Room',
  WAITING: 'Starts In',
  CLOSED: 'Closed',

  // Order Statuses
  Order_Confirmed: 'Order Confirmed',
  VIN_Assigned: 'VIN Assigned',
  PDI_Scheduled: 'PDI Scheduled',
  PDI_Completed: 'PDI Completed',
  Dispatch_Ready: 'Dispatch Ready',
  Delivery_Scheduled: 'Delivery Scheduled',
  Delivered: 'Delivered',
  Closed_Order: 'Closed',

  // Dispute Statuses
  OPEN: 'Open Dispute',
  RESOLVED: 'Resolved',
};

export const getStatusLabel = (status: string): string => {
  return STATUS_LABELS[status] || status;
};
