describe("Type Alias", () => {
    test("type alias", () => {
        const category = {
            id: 1,
            name: "Smartphone",
        };
        const product = {
            id: "1",
            name: "Iphone 16 Pro Max",
            price: 23500000,
            category: category,
        };
        const value = 100;
        console.log(category);
        console.log(product);
        console.log(value);
    });
});
export {};
