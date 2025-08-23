export const getRatingClass = (rating: number) => {
  if (rating <= 4) return "rating--red";
  if (rating <= 5) return "rating--orange";
  if (rating <= 6.5) return "rating--yellow";
  if (rating <= 9) return "rating--light-green";
  return "rating--green";
};