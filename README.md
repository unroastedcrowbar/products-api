# products-api
myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps.

The goal for this exercise is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller.

Your goal is to create a RESTful service that can retrieve product and price details by ID. The URL structure is up to you to define, but try to follow some sort of logical convention.

- [x] Reads product info from external API and pricing info from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response.
- [x] BONUS: Accepts an HTTP PUT request and updates the product's price in the data store.
- [ ] Unit tests.
- [ ] Error Handling.
- [ ] Logging / Monitoring.

# How to run
```bash
# Install dependencies
npm i

# Run the app
npm run start
```

## View Docs
`http://localhost:8080/api-documentation`

<img width="1437" alt="image" src="https://user-images.githubusercontent.com/8432353/189594731-0aab23a2-cd05-4e9d-bd92-5fe8d55e428a.png">
<img width="1437" alt="image" src="https://user-images.githubusercontent.com/8432353/189594619-72751753-4b31-4079-a44a-25cca73a0546.png">

## Testing
Manually tested.
### Get a product
<img width="1602" alt="image" src="https://user-images.githubusercontent.com/8432353/189603587-f1d4569c-c146-4b6e-8a63-1902add6709b.png">
### Update that product's price
<img width="1611" alt="image" src="https://user-images.githubusercontent.com/8432353/189603690-578796f6-7fdc-471f-af68-dac019e56963.png">
### Confirm that the price changed
<img width="1615" alt="image" src="https://user-images.githubusercontent.com/8432353/189603759-0b87711a-bf15-490c-8df8-5a2e6647bba1.png">
![image](https://user-images.githubusercontent.com/8432353/189604255-42856472-544c-4d6a-a419-86fbc507d44a.png)



