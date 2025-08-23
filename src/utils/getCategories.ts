export const getCategoryClass = (category: string, section:string) => {
  switch (category) {
    case "top_rated":
      return `${section}--top_rated`;
    case "popular":
      return `${section}--popular`;
    case "upcoming":
      return `${section}--upcoming`;
    default:
      return `${section}--upcoming`;
  }
};
