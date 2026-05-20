export const formatPrice = (value: number, short: boolean = false): string => {
  if (value === 0) return '₹0';
  if (short && value >= 100000) {
    const lakhs = value / 100000;
    return `₹${lakhs.toFixed(1).replace(/\.0$/, '')}L`;
  }
  
  // Format as Indian Standard Locale (e.g. 13,18,000)
  const valString = Math.floor(value).toString();
  const lastThree = valString.substring(valString.length - 3);
  const otherNumbers = valString.substring(0, valString.length - 3);
  
  const formattedOther = otherNumbers !== '' 
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' 
    : '';
    
  return `₹${formattedOther}${lastThree}`;
};
