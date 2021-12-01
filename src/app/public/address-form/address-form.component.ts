import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { CartService } from 'src/app/shared-services/cart.service';
import { FlutterwavePaymentPayLoad, PaymentsService } from 'src/app/shared-services/payments.service';
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
    private cartService: CartService,
    private paymentService: PaymentsService
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
  selectedCountry = 'Country';
  selectedState: string = 'State';
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

  payWithFlutterWave() {
    this.submitting = true;
    this.cartService.calculateCartTotal();
    const userId = this.deliveryAddressForm.controls.emailAddress.value.trim();
    const phoneNumber = this.countryDialCode + this.deliveryAddressForm.controls.primaryPhoneNumber.value.trim();
    const userName = this.deliveryAddressForm.controls.firstName.value.trim() + '' + this.deliveryAddressForm.controls.lastName.value.trim();

    // let payLoad: FlutterwavePaymentPayLoad = {
    //   tx_ref: 'a1234w',
    //   amount: this.cartService.cartTotal,
    //   currency: 'USD',
    //   redirect_url: '',
    //   payment_options: 'card',
    //   meta: {
    //     consumer_id: userId,
    //     consumer_mac: ''
    //   },
    //   customer: {
    //     email: userId,
    //     phonenumber: phoneNumber ,
    //     name: userName
    //   },
    //   customizations: {
    //     title: 'Stella Arts Store',
    //     description: '',
    //     logo: 'http://localhost:4200/assets/static-images/stella-arts-01.jpeg'
    //   }
    // }

    let payLoad: FlutterwavePaymentPayLoad = {
      "tx_ref":"hooli-tx-1920bbtytty",
      "amount":"100",
      "currency":"NGN",
      "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
      "payment_options":"card",
      "meta":{
         "consumer_id":23,
         "consumer_mac":"92a3-912ba-1192a"
      },
      "customer":{
         "email":"user@gmail.com",
         "phonenumber":"080****4528",
         "name":"Yemi Desola"
      },
      "customizations":{
         "title":"Pied Piper Payments",
         "description":"Middleout isn't free. Pay the price",
         "logo":"https://assets.piedpiper.com/logo.png"
      }
   }
    window.alert('paying with flutter wave')

    this.paymentService.payWithFlutterwave(payLoad)
      .subscribe(
        (response: ServerResponseDto) => console.log(response),
        (error: any) => console.log(error)
      )
    this.submitting = false;
  }
}


