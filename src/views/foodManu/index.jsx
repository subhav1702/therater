import React, { useState } from 'react';

const FoodOrderingApp = () => {
    const [currentPage, setCurrentPage] = useState('menu'); // 'menu' or 'checkout'
    const [cart, setCart] = useState([]);

    // Product data
    const products = [
        { id: 1, name: 'Chocolate popcorn', price: 110, image: '/api/placeholder/80/80', description: 'Product description here' },
        { id: 2, name: 'Plain popcorn', price: 80, image: '/api/placeholder/80/80', description: 'Product description here' },
        { id: 3, name: 'Cheesy popcorn', price: 120, image: '/api/placeholder/80/80', description: 'Product description here' },
        { id: 4, name: 'Sweet corn', price: 90, image: '/api/placeholder/80/80', description: 'Product description here' },
    ];

    // Add product to cart
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Increase quantity
    const increaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const [itemQuantities, setItemQuantities] = useState({});


    // Handle increasing quantity
    const handleIncreaseQuantity = (itemId) => {
        setItemQuantities({
            ...itemQuantities,
            [itemId]: (itemQuantities[itemId] || 0) + 1
        });
    };

    const handleDecreaseQuantity = (itemId) => {
        if (itemQuantities[itemId] > 1) {
            setItemQuantities({
                ...itemQuantities,
                [itemId]: itemQuantities[itemId] - 1
            });
        } else {
            // Remove the item if quantity becomes 0
            const newQuantities = { ...itemQuantities };
            delete newQuantities[itemId];
            setItemQuantities(newQuantities);
        }
    };

    // Decrease quantity
    const decreaseQuantity = (productId) => {
        setCart(cart.map(item =>
            item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0));
    };

    // Calculate total amount
    const calculateTotal = () => {
        const itemTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = Math.round(itemTotal * 0.15); // Assuming 15% tax
        return { itemTotal, tax, totalPayable: itemTotal + tax };
    };

    // Navigate to checkout
    const goToCheckout = () => {
        if (cart.length > 0) {
            setCurrentPage('checkout');
        }
    };

    // Navigate back to menu
    const goToMenu = () => {
        setCurrentPage('menu');
    };

    // Menu Page Component
    const MenuPage = () => (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white p-4 flex items-center shadow">
                <div className="flex items-center">
                    <button onClick={goToMenu} className="mr-2">
                        &lt;
                    </button>
                    <h1 className="text-xl font-medium">Popcorns</h1>
                </div>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto">
                {products.map(product => (
                    <div key={product.id} className="bg-white mb-3 mx-4 rounded-lg shadow-sm overflow-hidden">
                        <div className="flex p-3 border-b border-gray-100">
                            <div className="flex-1">
                                <h2 className="font-medium">{product.name}</h2>
                                <p className="text-lg">₹{product.price}</p>
                                <p className="text-xs text-gray-500">{product.description}</p>
                            </div>
                            <div className="ml-4 h-16 w-16 relative flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="rounded-md object-cover h-full w-full"
                                />
                            </div>
                        </div>
                        <div className="p-2 bg-white flex justify-end">
                            {itemQuantities[product.id] ? (
                                // Quantity selector
                                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                                    <button
                                        onClick={() => handleDecreaseQuantity(product.id)}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 font-medium text-lg"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 py-1 text-gray-800 font-medium">
                                        {itemQuantities[product.id]}
                                    </span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(product.id)}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 font-medium text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                // Add button
                                <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-1 text-green-500 border border-green-500 rounded"
                            >
                                Add
                            </button>
                            )}
                        </div>
                    </div>
                    // <div key={product.id} className="bg-white mb-4 p-4 rounded shadow flex justify-between items-center">
                    //     <div>
                    //         <h2 className="font-medium">{product.name}</h2>
                    //         <p className="text-lg">₹{product.price}</p>
                    //         <p className="text-xs text-gray-500">{product.description}</p>
                    //     </div>
                    //     <div className="flex items-center">
                    //         <img src={product.image} alt={product.name} className="w-16 h-16 rounded mr-4" />
                    //         <button
                    //             onClick={() => addToCart(product)}
                    //             className="px-4 py-1 text-green-500 border border-green-500 rounded"
                    //         >
                    //             Add
                    //         </button>
                    //     </div>
                    // </div>
                ))}

            </div>

            {/* Bottom Navigation */}
            <div className="p-4">
                <button onClick={goToCheckout} className="w-full bg-red-500 text-white py-3 rounded-md">
                    Cart
                </button>
            </div>

            {/* <div className="bg-white p-4 flex justify-around border-t">
        <button className="text-red-500">
          <div className="flex flex-col items-center">
            <span>Home</span>
          </div>
        </button>
        <button>
          <div className="flex flex-col items-center">
            <span>Profile</span>
          </div>
        </button>
        <button onClick={goToCheckout} className="relative">
          <div className="flex flex-col items-center">
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </button>
      </div> */}
        </div>
    );

    // Checkout Page Component
    const CheckoutPage = () => {
        const { itemTotal, tax, totalPayable } = calculateTotal();

        return (
            <div className="flex flex-col h-screen bg-gray-100">
                {/* Header */}
                <div className="bg-white p-4 flex items-center shadow">
                    <div className="flex items-center">
                        <button onClick={goToMenu} className="mr-2">
                            &lt;
                        </button>
                        <h1 className="text-xl font-medium">Checkout page</h1>
                    </div>
                </div>

                {/* Order Details */}
                <div className="flex-1 overflow-auto p-4">
                    <h2 className="font-medium mb-4">Order details</h2>

                    <div className="bg-white p-4 rounded shadow mb-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b">
                                <span>{item.name}</span>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center"
                                    >
                                        -
                                    </button>
                                    <span className="px-3">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                    <span className="ml-4">₹{item.price * item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bill Details */}
                    <h2 className="font-medium mb-4">Bill Details</h2>
                    <div className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between py-2 border-b">
                            <span>Item total</span>
                            <span>₹{itemTotal}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Tax</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className="flex justify-between py-2 font-medium">
                            <span>To pay</span>
                            <span>₹{totalPayable}</span>
                        </div>
                    </div>
                </div>

                {/* Proceed Button */}
                <div className="p-4">
                    <button className="w-full bg-red-500 text-white py-3 rounded-md">
                        Proceed to Pay
                    </button>
                </div>

                {/* Bottom Navigation */}
            </div>
        );
    };

    return (
        <div>
            {currentPage === 'menu' ? <MenuPage /> : <CheckoutPage />}
        </div>
    );
};

export default FoodOrderingApp;