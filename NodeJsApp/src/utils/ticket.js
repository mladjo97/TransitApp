import moment from 'moment';

export const validate = (ticketType, timeOfPurchase) => {
    let isValid = true;
    const dateNow = moment();
    const dateOfPurchase = moment(timeOfPurchase);

    switch (ticketType) {
        case 'SingleUse':
            isValid = dateNow.isBefore(dateOfPurchase.add('1', 'hours'));
            break;
        case 'Daily':
            isValid = dateNow.isBefore(dateOfPurchase.add('1', 'day').startOf('day'));
            break;
        case 'Monthly':
            isValid = dateNow.isBefore(dateOfPurchase.add('1', 'months').startOf('month'));
            break;
        case 'Annual':
            isValid = dateNow.isBefore(dateOfPurchase.add('1', 'year').startOf('year'));
            break;
        default:
            isValid = false;
            break;
    }

    return isValid;
};