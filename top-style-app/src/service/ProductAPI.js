export const FetchProducts = async (input) => {
    let url = "https://localhost:7246/products?search=" + (input ?? "");

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            let products = [];

            if (data !== null) {
                data.forEach((item) => {
                    let product = {
                        ID: item.productID,
                        Name: item.name,
                        Description: item.description,
                        Price: item.price,
                        Image: item.image,
                    };
                    products.push(product);
                });
            }
            // console.log(products);

            return products;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
};

export const FetchProduct = async (productID) => {
    let url = "https://localhost:7246/product/" + productID;

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let product = null;

            if (data !== null) {
                product = {
                    ID: data.productID,
                    Name: data.name,
                    Description: data.description,
                    Price: data.price,
                    Image: data.image,
                };
            }
            // console.log(products);

            return product;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
};

export const CreateUser = async (userInfo) => {
    let url = "https://localhost:7246/user/";

    return await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
    })
        .then((response) => response.json())
        .then((data) => {
            if (typeof data !== "string") {
                const user = {
                    userID: data.userId,
                    userEmail: data.userEmail,
                };
                return user;
            } else return data;
        })
        .catch((error) => {
            return error;
        });
};

export const LogIn = async (userInfo) => {
    let url = "https://localhost:7246/login/";

    return await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
    })
        .then((response) => response.json())
        .then((data) => {
            if (typeof data !== "string") {
                const user = {
                    userID: data.userId,
                    userEmail: data.userEmail,
                };
                return user;
            } else return data;
        })
        .catch((error) => {
            return error;
        });
};

export const PostOrder = async (order) => {
    let url = "https://localhost:7246/order/";

    return await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
    })
        .then((response) => response.json())
        .then((data) => {
            const order = {
                orderID: data.orderID,
                userID: data.userID,
                price: data.price,
            };
            return order;
        })
        .catch((error) => {
            return error;
        });
};

export const FetchMyOrders = async (userID) => {
    let url = "https://localhost:7246/orders/" + userID;

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let orders = [];

            if (data !== null) {
                data.forEach((item) => {
                    let order = {
                        orderID: item.orderID,
                        userID: item.userID,
                        price: item.price,
                        fullName: item.fullName,
                        address: item.address,
                        zipCode: item.zipCode,
                        city: item.city,
                    };
                    orders.push(order);
                });
            }
            return orders;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
};

export const FetchOrderDetails = async (orderID) => {
    let url = "https://localhost:7246/order/" + orderID;

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let order = {
                orderID: data.orderID,
                userID: data.userID,
                Price: data.price,
                Products: data.products,
            };

            return order;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
