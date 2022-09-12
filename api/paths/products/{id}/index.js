const fetch = require('node-fetch');
const mongoose = require('mongoose');

// Connect to the DB.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://product-pricing-client:pw1234@cluster0.x1k7sdk.mongodb.net/test');
const db = mongoose.connection;
const productPriceSchema = new mongoose.Schema({
  productId: Number,
  value: Number,
  currency_code: String,
});
const Product = mongoose.model('Product', productPriceSchema);

// Get aggregate product data.
const getPricing = async (productId) => 
  await Product.find({productId});
const getProduct = productId => 
  fetch(
    `https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=${productId}`,
  );


module.exports = function () {
    let operations = {GET, PUT};
  
    async function GET(req, res, next) {
      // Fetch from the product api.
      const productId = req.params.id;
      const productResponse = await getProduct(productId);
      const productData = await productResponse.json();

      // Fetch from the pricing db.
      const pricingData = await getPricing(productId);
      const {value, currency_code} = pricingData[0];

      const product = {
        id: productData.data.product.tcin,
        name: productData.data.product.item.product_description.title,
        current_price: {
          value,
          currency_code,
        },
      };

      res.status(200).json(product);
    }

    async function PUT(req, res, next) {
      // Save to the db.
      const doc = await Product.findOneAndUpdate({
          productId: req.body.id
        }, {
          value: req.body.current_price.value,
          currency_code: req.body.current_price.currency_code,
      });
      doc.save();

      res.status(200).send();
    }
  
    GET.apiDoc = {
      summary: 'Fetch aggregate data for a product.',
      operationId: 'getProduct',
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
          description: 'Aggregate data for a product.',
          schema: {
            type: 'object',
            items: {
              $ref: '#/definitions/Product',
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

    PUT.apiDoc = {
      summary: 'Update the product\'s price.',
      operationId: 'updateProductPrice',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          type: 'number',
        },
        {
          in: 'body',
          name: 'product',
          schema: {
            $ref: "#/definitions/Product",
          },
        },
      ],
      responses: {
        200: {
          description: 'Updated ok',
        },
      },
    };
  
    return operations;
};
