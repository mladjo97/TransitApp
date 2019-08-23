/* eslint-disable quotes */
/* eslint-disable no-prototype-builtins */
import config from '@config';

/**
 * PayPal Node JS SDK dependency
 */
import checkOutSdk from '@paypal/checkout-server-sdk';

/**
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
const client = () => {
    return new checkOutSdk.core.PayPalHttpClient(environment());
};

/**
 *  Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 *  This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 */
const environment = () => {
    console.log('Setting up the environment for PayPal ...');
    const clientId = config.payPalClientId || 'PAYPAL-SANDBOX-CLIENT-ID';
    const clientSecret = config.payPalClientSecret || 'PAYPAL-SANDBOX-CLIENT-SECRET';

    return new checkOutSdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
};

export default { client: client };