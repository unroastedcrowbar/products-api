var fetch = require('node-fetch');

const getProductById = id => 
  fetch(
    'https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1',
    {
      key: '3yUxt7WltYG7MFKPp7uyELi1K40ad2ys',
      tcin: id,
    }
  );

module.exports = function () {
    let operations = {GET};
  
    function GET(req, res, next) {
      console.log(req.params.id);

      const response = getProductById(req.params.id);
      const product = {
        id: res.data.product.tcin,
        name: res.data.product.item.product_description.title,
      };;

      // TODO: Return data from
      // https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=13860428
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
            }
          },
        },
      },
    };
  
    return operations;
};
