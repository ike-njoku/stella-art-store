import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { CartService } from 'src/app/shared-services/cart.service';
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
  }
}


