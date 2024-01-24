export const GetProducts = async (input) => {

    let url = "https://localhost:7246/products?search=" + (input ?? '');

    return await fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let products = [];

        if (data !== null) {
            data.forEach((item) => {
                let product = {
                    ID: item.productID,
                    Name: item.name,
                    Description: item.description,
                    Price: item.price,
                    Image: item.image
                };
                products.push(product);
            });

            
        };
        console.log(products);

        return products;
    })
    .catch(error => {console.log(error); return[];})
}