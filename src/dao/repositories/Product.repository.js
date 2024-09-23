export default class ProductRepository{
    constructor(model){
        this.modelProduct = model;
    }

    async getProductsData(limite, pagina, order, disponible) {
        let listProducts = await this.modelProduct.aggregate([
          { $sort: { price: order } },
        ]);
        listProducts = await this.modelProduct.paginate(
          { disponible: disponible },
          { limit: limite, page: pagina }
        );
        return listProducts;
      }
      
      async getProductIdData(idProduct) {
        return await this.modelProduct.findById(idProduct);
      }
      
      async newProductData(product) {
        return await this.modelProduct.create(product);
      }
      
      async putProductData(productID, product) {
        return await this.modelProduct.updateOne({ _id: productID }, product);
      }
      
      async deleteProductdata(idProduct) {
        await this.modelProduct.deleteOne({ _id: idProduct });
      }
      

}