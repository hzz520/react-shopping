import {shippingAddress,emailAddress,cardInfo,billingAddress} from './product.json'

const TIMEOUT = 100;

export default {
  getProducts: (cb,products, timeout) => setTimeout((products) => cb(products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  getShippingAddress: (cb, timeout) => setTimeout(() => cb(shippingAddress), timeout || TIMEOUT),
  getBillingAddress:(cb,timeout) => setTimeout(() => cb(billingAddress),timeout||TIMEOUT),
  getEmailAddress: (cb, timeout) => setTimeout(() => cb(emailAddress), timeout || TIMEOUT),
  getCardInfo: (cb, timeout) => setTimeout(() => cb(cardInfo), timeout || TIMEOUT),
}