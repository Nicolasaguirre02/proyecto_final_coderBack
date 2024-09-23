export default class CartRepository {
  constructor(model) {
    this.cartsModel = model;
  }

  async getAllCartsData() {
    return await this.cartsModel.find();
  }
  

  async getCartIdData(idCart) {
    return this.cartsModel.findById(idCart);
    /* .populate("products.product") */
  }

  async getCartDetailsIdData(idCart) {
    return this.cartsModel.findById(idCart).populate("products.product");
  }
  
  async newCartData(newCart) {
    return await this.cartsModel.create(newCart);
  }
  
  async newProductToCartData(cartSelect) {
    await cartSelect.save();
  }
  
  async deletProdcutFromCartData(cart) {
    return await cart.save();
  }
  
  async deleteAllProductsFromCartData(cart) {
    return await cart.save();
  }
}
