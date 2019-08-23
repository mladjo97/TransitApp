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
                    console.log('Creating order - price: ' + price);
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: price
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    console.log('Approving order - orderID: ' + data.orderID);
                    return actions.order.capture().then(function (details) {
                        return fetch('http://localhost:2525/api/tickets/buyUnregistered', {
                            method: 'post',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                itemId: itemId,
                                orderId: data.orderID
                            })
                        });
                    });
                }
            }).render(`#paypal-button-container-${divId}`);

            $(`#paypal-button-container-${divId}`).data("created", true);

        } else {
            let token = localStorage.getItem("token");

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
                        return fetch('http://localhost:2525/api/tickets/buy', {
                            method: 'post',
                            headers: {
                                'content-type': 'application/json',
                                'Authorization': 'Bearer ' + JSON.parse(token).token
                            },
                            body: JSON.stringify({
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
