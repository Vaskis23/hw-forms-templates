import { getProducts } from "../modules/data.mjs";
//HW переписать код на async await
// getProducts( (products) => {console.log(products)})
getProducts().then(products => console.log(products))

