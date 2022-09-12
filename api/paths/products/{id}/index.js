const fetch = require('node-fetch');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/products-api');
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
});


const getProduct = productId => 
  fetch(
    `https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=${productId}`,
  );

const getPricingByProductId = productId => ({
    value: 10.49,
    currency_code: 'USD',
  });


module.exports = function () {
    let operations = {GET};
  
    async function GET(req, res, next) {
      const productId = req.params.id;
      const productResponse = await getProduct(productId);
      const productData = await productResponse.json();

      const pricingData = getPricingByProductId(productId);

      const product = {
        id: productData.data.product.tcin,
        name: productData.data.product.item.product_description.title,
        current_price: {
          pricingData,
        },
      };

      res.status(200).json(product);
    }
  
    GET.apiDoc = {
      summary: "Fetch aggregate data for a product.",
      operationId: "getProduct",
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'The unique product ID.',
          required: true,
          type: 'number',
        }
      ],
      responses: {
        200: {
          description: "Aggregate data for a product.",
          schema: {
            type: "object",
            items: {
              $ref: "#/definitions/Product",
            },
            example: {
              id: 13860428,
              name: 'The Big Lebowski (Blu-ray) (Widescreen)',
              current_price: {
                value: 13.49,
                currency_code: 'USD',
              },
            },
          },
        },
      },
    };
  
    return operations;
};
