import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared-services/cart.service';
import { PayWithPaypalService } from 'src/app/shared-services/pay-with-paypal.service';
import { PayWithPaystackService } from 'src/app/shared-services/pay-with-paystack.service';
import { AddressHelperService, getCountriesDTO, getStateDTO } from './address-helper.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  submitting: boolean = false;
  constructor(
    private addressHelperService: AddressHelperService,
    private formBuilder: FormBuilder,
    public cartService: CartService,
    private payPalService: PayWithPaypalService,
    private payStackService: PayWithPaystackService
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  deliveryAddressForm: FormGroup = this.formBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    emailAddress: [null, [Validators.required, Validators.email]],
    country: ['Country', Validators.required],
    state: ['State', Validators.required],
    city: ['City', Validators.required],
    primaryPhoneNumber: [null, Validators.required],
    secondaryPhoneNumber: [null],
    address: [null, Validators.required]
  });

  countries: getCountriesDTO[] = [];
  states: getStateDTO[] = [];
  selectedCountry = '';
  selectedState: string = '';
  cities: string[] = [];
  countryDialCode: string = '';

  getAllCountries() {
    this.addressHelperService.getCountries()
      .subscribe(
        (response: any) => {
          this.countries = response.data;
        },
        (error: any) => {
          console.log(error)
        }
      )
  }

  getSelectedCountryDialCode() {
    const payLoad = {
      "country": this.selectedCountry
    }

    this.addressHelperService.getCountryDialCode(payLoad)
      .subscribe(
        (response: any) => {
          this.countryDialCode = response.data.dial_code;
          console.table(response.data)
        },
        (error: any) => console.log(error)
      )
  }

  getStates() {
    this.countries.forEach((country) => {
      if (country.name === this.selectedCountry) this.states = country.states;
    })
  }

  getCities() {
    this.cities = [];
    const payLoad = {
      "country": this.selectedCountry,
      "state": this.selectedState
    }
    this.addressHelperService.getCities(payLoad)
      .subscribe(
        (response: any) => {
          console.log(response.data)
          this.cities = response.data
        },
        (error: any) => {
          console.log(error)
        }
      )
  }

  payWithStripe() {
    this.cartService.calculateCartTotal();
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51K3BC0CNWuH7c4sCiCiuWCtmiBJphDqcoRiNvTzaIhWc6pvBx5ptDCuK6rCH4aV1IcfFE42wzTIpg2NEcWJQFlcK00NYlkIMFk',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      // name: 'Stella Arts Store',
      // description: '...',
      amount: this.cartService.cartTotal * 100
    });
  }

  payWithPayStack() {
    this.payStackService.initializePayment(this.deliveryAddressForm.controls.emailAddress.value)
      .subscribe(
        (response: any) => {
          console.table(response)
        }
      )
  }

  openPaymentWindow(url: string) {
  }

  payWithFlutterWave() {
  }

  payWithPayPal() {
    this.payPalService.getAuthToken()
      .subscribe(
        (response: any) => {
          console.log(response)
          if (response.scope) {
          this.payPalService.makePayment(response.access_token)
            .subscribe(
              (response: any) => {
                console.log(response)
                response.links.forEach((link: any) => {
                  if (link.rel == 'approve') {
                    window.location.href = link.href;
                  }
                });
              },
              (error: any) => {
                console.log(error)
              }
            )
          }
        },
        (error: any) => {
          console.log(error)
        }
      )
  }
}


