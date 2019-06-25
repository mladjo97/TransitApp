// kod radi, nema sanse da ovo refaktorisem radi citljivosti sad

function initPaypalButton(isLoggedIn, divId, price, itemId) {

    if (price !== undefined) {
        if (!isLoggedIn) {
            paypal.Buttons({
                style: {
                    layout: 'horizontal',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                    size: 'small'
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: price
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        // Call your server to save the transaction
                        return fetch('http://localhost:52295/api/Tickets/BuyUnregistered', {
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: "mldnmilosevic@gmail.com",
                                orderId: data.orderID
                            })
                        });
                    });
                }
            }).render(`#paypal-button-container-${divId}`);

            $(`#paypal-button-container-${divId}`).data("created", true);

        } else {
            paypal.Buttons({
                style: {
                    layout: 'horizontal',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                    size: 'small'
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: price
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        alert('Transaction completed by ' + details.payer.name.given_name);
                        // Call your server to save the transaction
                        return fetch('http://localhost:52295/api/Tickets/Buy', {
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: "mldnmilosevic@gmail.com",
                                itemId: itemId,
                                orderId: data.orderID
                            })
                        });
                    });
                }
            }).render(`#paypal-button-container-${divId}`);

            $(`#paypal-button-container-${divId}`).data("created", true);
        }

    }
}
