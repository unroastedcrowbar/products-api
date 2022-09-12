module.exports = function () {
    let operations = {GET};
  
    function GET(req, res, next) {
      console.log(req.params.id);
      const productId = req.params.id;
      const product = { id: productId, name: "Peanut butter" };

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
