function addToCart(item) {
    return {
        type: 'ADD',
        item
    };
}

export {addToCart};