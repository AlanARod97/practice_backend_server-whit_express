import { productModel } from "../DAO/models/products.model.js";

class productService{
    async getAll(){

        const products = await productModel.find({});
        return products;
    };

    async getAllCount(){
        
            const count = await productModel.countDocuments();
            return count;
    };

    async getAllPagination(limit, pagina,category,order){
        const query = {};
        if(category){
            query.category = category;
        }

        const sortOptions = {};
        if(order === "asc"){
            sortOptions.price = 1
        }else if(order === "desc"){
            sortOptions.price = -1
        }

        const queryResult = await productModel.paginate(query, {
            page: pagina || 1,
            limit: limit ||5,
            sort: sortOptions,
        })

        return queryResult;

    };

    async getById(_id){
        const productById = await productModel.findOne({_id: _id})
        return productById;

    };

    // async getAllRendering() {
    //     const products = await ProductsModel.find(
    //       {},
    //       {
    //         _id: 1,
    //         title: 1,
    //         description: 1,
    //         price: 1,
    //         thumbnail: 1,
    //         code: 1,
    //         stock: 1,
    //       }
    //     ).lean();
    //     return products;
    //   }


    async createProduct({title, description, price, thumbnail, code, stock}){
        const productCreated = await productModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        })

        return productCreated;

    }


    async updateProduct(_id, title, description, price, thumbnail, code, stock ){
        const productUpdated = await productModel.updateOne(
            {_id:_id},
            { title, description, price, thumbnail, code, stock}
        )

        return productUpdated;

    }

    async deleteProduct(_id){
        const productDeleted = await productModel.deleteOne(
            {_id:_id}
        )

        return productDeleted;
    }





}


export const productService = new productService();