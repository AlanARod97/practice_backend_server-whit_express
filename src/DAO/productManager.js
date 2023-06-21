import { readFile, writeFile } from 'fs/promises';

 class ProductManager{
    constructor(path){
        this.path = path
        this.products = [];
    }


    async addProduct(product){
        try{
            const requiredFields = ['title', 'description', 'code', 'price', 'stock']
            for(const field of requiredFields){
                if(!product.hasOwnProperty(field)){
                    throw new Error(`need to add some field: ${field}`)
                }
            }

        const products = await this.getProducts();

        if(products.some(p => p.code ===product.code)){
            throw new Error(`the product is already exist: ${product.code}`)
        }
        
        const id = products.length !==0 ? products[products.lenght -1].id+1 : 1
        const thumbnails = product.thumbnails ? product.thumbnails : [];
        const newProduct = {
            id,
            ...product,
            thumbnails
        }

        products.push(newProduct)

        await writeFile(this.path, JSON.stringify(products))

        return newProduct;
        
    }catch(error){
        console.log(`erro /products: ${error}`)
        return null;
    }}

     async getProducts(limit) {
        try {
          const products = await readFile(this.path, 'utf-8');
          const parsedProducts = JSON.parse(products);
      
          if (!limit || limit > parsedProducts.length) {
            return parsedProducts;
          }
    
          return  parsedProducts.slice(0, limit);
        } catch (error) {
          console.error(`Error getting /products: ${error}`);
          return [];
        }
      }

      async getProductsById(id){
        const products = await this.getProducts()
        return products.find((p)=> p.id ===id)
      }


    async updateProduct(id, updatedFiels){
        const products = await this.getProducts();
        const productIndex = products.findIndex((p)=>p.id === id)

        if(productIndex === -1){
            return null
        }

        const updatedProduct = {...products[productIndex], ...updatedFiels}
        products[productIndex] = updatedProduct
        await this.saveProducts(products)

        return updatedProduct;
    }

    async deleteProduct(id){
        const products = await this.getProducts()
        const filteredProduct = products.filter((p)=> p.id !== id)

        await this.saveProducts(filteredProduct)
        return filteredProduct;
    }

    async saveProducts(products){
        try{
            await writeFile(this.path, JSON.stringify(products))
            console.log("added product")
        }catch(err){
            console.log(`error`)
        }
    }

    
}

export default ProductManager;