export function outputDelay(item) {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);
  
    const diff = Math.abs(estimated - advertised);
  
    return Math.floor(diff / (1000 * 60)) + " minuter";
  }