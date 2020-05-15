const initCartData = [
    {
        sku: '',
        name: '',
        image: '',
        price: '',
        qty: 0
    }
]

function reducerCart(state = initCartData, action){
    switch (action.type) {
      case 'ADD':
        return [...state, action.item];
      default:
          return state;
    }
}

export default reducerCart;