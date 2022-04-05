import { Injectable } from '@angular/core';
import {loadScript} from "@paypal/paypal-js";

@Injectable({
  providedIn: 'root'
})
export class NewPaypalPayService {

  constructor() { }
  pay(amount: any) {
    console.log(loadScript)
    loadScript(
      {
        "client-id": "test",

      }
    )
      .then((paypal: any) => {
        paypal
          .Buttons()
          .render("#newPaypalContainer")
          .catch((error: any) => {
            console.error("failed to render the PayPal Buttons", error);
          });
      })
      .catch((error: any) => {
        console.error("failed to load the PayPal JS SDK script", error);
      });
  }

}

//
// paypal: any;

// pay(amount: any) {
//   let script = document.createElement('script');
//   script.src = 'https://www.paypal.com/sdk/js?client-id=AZmqqe04U0w-2KWXKDU-jBC3QmXNyk9ErT351rNtX4kE1jknk_Qd1JWT3UL-2kza55xY2fVzlqbk1Kxm&enable-funding=venmo&currency=USD';
//   script.setAttribute('data-sdk-integration-source', 'button-factory');
//   this.initPayPalButton(amount)
// }

// initPayPalButton(amount: any) {
//   this.paypal.Buttons({
//     style: {
//       shape: 'rect',
//       color: 'black',
//       layout: 'vertical',
//       label: 'pay',

//     },

//     createOrder: function(data: any, actions: any) {
//       return actions.order.create({
//         purchase_units: [{"amount":{"currency_code":"USD","value":amount}}]
//       });
//     },

//     onApprove: function(data: any, actions: any) {
//       return actions.order.capture().then(function(orderData: any) {

//         // Full available details
//         console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

//         // Show a success message within this page, e.g.
//         const element: any = document.getElementById('paypal-button-container');
//         element.innerHTML = '';
//         element.innerHTML = '<h3>Thank you for your payment!</h3>';

//         // Or go to another URL:  actions.redirect('thank_you.html');

//       });
//     },

//     onError: function(err: any) {
//       console.log(err);
//     }
//   }).render('#paypal-button-container');
// }
