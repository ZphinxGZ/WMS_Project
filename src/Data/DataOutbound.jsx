
const Products = [
    { id: 1, name: "Product A", quantity: 10, unit: "kg", category: "ประเภท A", date: "2024-11-10", confirmed: false },
    { id: 2, name: "Product B", quantity: 5, unit: "pcs", category: "ประเภท B", date: "2024-11-11", confirmed: false },
    { id: 3, name: "Product C", quantity: 20, unit: "ltr", category: "ประเภท C", date: "2024-11-12", confirmed: false },
    { id: 4, name: "Product D", quantity: 15, unit: "kg", category: "ประเภท A", date: "2024-11-13", confirmed: false },
    { id: 5, name: "Product E", quantity: 8, unit: "pcs", category: "ประเภท B", date: "2024-11-14", confirmed: false },
    { id: 6, name: "Product F", quantity: 25, unit: "ltr", category: "ประเภท C", date: "2024-11-15", confirmed: false },
    { id: 7, name: "Product G", quantity: 30, unit: "kg", category: "ประเภท A", date: "2024-11-16", confirmed: false },
    { id: 8, name: "Product H", quantity: 12, unit: "pcs", category: "ประเภท B", date: "2024-11-17", confirmed: false },
    { id: 9, name: "Product I", quantity: 18, unit: "ltr", category: "ประเภท C", date: "2024-11-18", confirmed: false },
    { id: 10, name: "Product J", quantity: 22, unit: "kg", category: "ประเภท A", date: "2024-11-19", confirmed: false },
    { id: 11, name: "Product K", quantity: 14, unit: "pcs", category: "ประเภท B", date: "2024-11-20", confirmed: false },
    { id: 12, name: "Product L", quantity: 32, unit: "ltr", category: "ประเภท C", date: "2024-11-21", confirmed: false },
    { id: 13, name: "Product M", quantity: 40, unit: "kg", category: "ประเภท A", date: "2024-11-22", confirmed: false },
    { id: 14, name: "Product N", quantity: 24, unit: "pcs", category: "ประเภท B", date: "2024-11-23", confirmed: false },
    { id: 15, name: "Product O", quantity: 28, unit: "ltr", category: "ประเภท C", date: "2024-11-24", confirmed: false },
    { id: 16, name: "Product P", quantity: 35, unit: "kg", category: "ประเภท A", date: "2024-11-25", confirmed: false },
    { id: 17, name: "Product Q", quantity: 27, unit: "pcs", category: "ประเภท B", date: "2024-11-26", confirmed: false },
    { id: 18, name: "Product R", quantity: 45, unit: "ltr", category: "ประเภท C", date: "2024-11-27", confirmed: false },
    { id: 19, name: "Product S", quantity: 50, unit: "kg", category: "ประเภท A", date: "2024-11-28", confirmed: false },
    { id: 20, name: "Product T", quantity: 20, unit: "pcs", category: "ประเภท B", date: "2024-11-29", confirmed: false },
    { id: 21, name: "Product U", quantity: 60, unit: "ltr", category: "ประเภท C", date: "2024-11-30", confirmed: false },
    { id: 22, name: "Product V", quantity: 16, unit: "kg", category: "ประเภท A", date: "2024-12-01", confirmed: false },
    { id: 23, name: "Product W", quantity: 19, unit: "pcs", category: "ประเภท B", date: "2024-12-02", confirmed: false },
    { id: 24, name: "Product X", quantity: 21, unit: "ltr", category: "ประเภท C", date: "2024-12-03", confirmed: false },
    { id: 25, name: "Product Y", quantity: 25, unit: "kg", category: "ประเภท A", date: "2024-12-04", confirmed: false },
    { id: 26, name: "Product Z", quantity: 30, unit: "pcs", category: "ประเภท B", date: "2024-12-05", confirmed: false },
    { id: 27, name: "Product AA", quantity: 35, unit: "ltr", category: "ประเภท C", date: "2024-12-06", confirmed: false },
    { id: 28, name: "Product AB", quantity: 40, unit: "kg", category: "ประเภท A", date: "2024-12-07", confirmed: false },
    { id: 29, name: "Product AC", quantity: 45, unit: "pcs", category: "ประเภท B", date: "2024-12-08", confirmed: false },
    { id: 30, name: "Product AD", quantity: 50, unit: "ltr", category: "ประเภท C", date: "2024-12-09", confirmed: false },
    { id: 31, name: "Product AE", quantity: 55, unit: "kg", category: "ประเภท A", date: "2024-12-10", confirmed: false },
    { id: 32, name: "Product AF", quantity: 60, unit: "pcs", category: "ประเภท B", date: "2024-12-11", confirmed: false },
    { id: 33, name: "Product AG", quantity: 65, unit: "ltr", category: "ประเภท C", date: "2024-12-12", confirmed: false },
    { id: 34, name: "Product AH", quantity: 70, unit: "kg", category: "ประเภท A", date: "2024-12-13", confirmed: false },
    { id: 35, name: "Product AI", quantity: 75, unit: "pcs", category: "ประเภท B", date: "2024-12-14", confirmed: false },
    { id: 36, name: "Product AJ", quantity: 80, unit: "ltr", category: "ประเภท C", date: "2024-12-15", confirmed: false },
    { id: 37, name: "Product AK", quantity: 85, unit: "kg", category: "ประเภท A", date: "2024-12-16", confirmed: false },
    { id: 38, name: "Product AL", quantity: 90, unit: "pcs", category: "ประเภท B", date: "2024-12-17", confirmed: false },
    { id: 39, name: "Product AM", quantity: 95, unit: "ltr", category: "ประเภท C", date: "2024-12-18", confirmed: false },
    { id: 40, name: "Product AN", quantity: 100, unit: "kg", category: "ประเภท A", date: "2024-12-19", confirmed: false },
    { id: 41, name: "Product AO", quantity: 105, unit: "pcs", category: "ประเภท B", date: "2024-12-20", confirmed: false },
    { id: 42, name: "Product AP", quantity: 110, unit: "ltr", category: "ประเภท C", date: "2024-12-21", confirmed: false },
    { id: 43, name: "Product AQ", quantity: 115, unit: "kg", category: "ประเภท A", date: "2024-12-22", confirmed: false },
    { id: 44, name: "Product AR", quantity: 120, unit: "pcs", category: "ประเภท B", date: "2024-12-23", confirmed: false },
    { id: 45, name: "Product AS", quantity: 125, unit: "ltr", category: "ประเภท C", date: "2024-12-24", confirmed: false },
    { id: 46, name: "Product AT", quantity: 130, unit: "kg", category: "ประเภท A", date: "2024-12-25", confirmed: false },
    { id: 47, name: "Product AU", quantity: 135, unit: "pcs", category: "ประเภท B", date: "2024-12-26", confirmed: false },
    { id: 48, name: "Product AV", quantity: 140, unit: "ltr", category: "ประเภท C", date: "2024-12-27", confirmed: false },
    { id: 49, name: "Product AW", quantity: 145, unit: "kg", category: "ประเภท A", date: "2024-12-28", confirmed: false },
    { id: 50, name: "Product AX", quantity: 150, unit: "pcs", category: "ประเภท B", date: "2024-12-29", confirmed: false },
    { id: 51, name: "Product AY", quantity: 155, unit: "ltr", category: "ประเภท C", date: "2024-12-30", confirmed: false },
    { id: 52, name: "Product AZ", quantity: 160, unit: "kg", category: "ประเภท A", date: "2024-12-31", confirmed: false },
  ];
  export function fetchProducts() {
    return Products;
  }