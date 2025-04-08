export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }
  
  export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  }
  
  export function formatDateTime(dateString: string): string {
    return `${formatDate(dateString)} at ${formatTime(dateString)}`;
  }
  
  export function truncateAddress(address: string, chars = 4): string {
    if (!address) return '';
    const start = address.substring(0, chars + 2);
    const end = address.substring(address.length - chars);
    return `${start}...${end}`;
  }
  