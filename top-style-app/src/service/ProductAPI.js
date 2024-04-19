export const FetchProducts = async (input) => {
    let url = "https://localhost:7246/products?search=" + (input ?? "");

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let products = [];

            if (data !== null) {
                data.forEach((item) => {
                    let product = {
                        ID: item.id,
                        Name: item.productName,
                        Description: item.productDescription,
                        Price: item.productPrice,
                        Image: item.productImage,
                    };
                    products.push(product);
                });
            }
            return products;
        })
        .catch(() => {
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
                    ID: data.id,
                    Name: data.productName,
                    Description: data.productDescription,
                    Price: data.productPrice,
                    Image: data.productImage,
                };
            }

            return product;
        })
        .catch(() => {
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
                    userID: data.id,
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
            return data;
        })
        .catch(() => {
            return null;
        });
};

export const PostOrder = async (order) => {
    let url = "https://localhost:7246/order/";

    return await fetch(url, {
        method: "POST",
        headers: {
            authorization: `bearer ${GetToken()}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then((response) => response.json())
        .then((data) => {
            const order = {
                orderID: data.id,
                userID: data.userId,
                price: data.orderPrice,
                fullName: data.fullName,
                address: data.address,
                zipCode: data.zipCode,
                city: data.city,
            };
            return order;
        })
        .catch(() => {
            return null;
        });
};

export const FetchMyOrders = async () => {
    let url = "https://localhost:7246/orders";
    return await fetch(url, {
        method: "GET",
        headers: {
            authorization: `bearer ${GetToken()}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let orders = [];
            if (data !== null) {
                data.forEach((item) => {
                    let order = {
                        orderID: item.id,
                        userID: item.userId,
                        price: item.orderPrice,
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
        .catch(() => {
            return null;
        });
};

export const FetchOrderDetails = async (orderID) => {
    let url = "https://localhost:7246/order/" + orderID;
    return await fetch(url, {
        method: "GET",
        headers: {
            authorization: `bearer ${GetToken()}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let order = {
                orderID: data.id,
                userID: data.userId,
                Price: data.orderPrice,
                Products: data.products,
            };
            return order;
        })
        .catch(() => {
            return null;
        });
};

const GetToken = () => {
    return localStorage.getItem("currentUser");
};
