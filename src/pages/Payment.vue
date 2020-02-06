<template>
    <div>
        <div class="payment">
            <h1 class="visually-hidden">Платежи</h1>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form class="payment__form" @submit.prevent="handleSubmit(successHandler)" action="https://js.dump.academy/kekstagram" enctype="multipart/form-data">
                    <p class="payment__info-name">Информация по оплате:</p>
                    <div class="payment__form-group">
                        <ValidationProvider rules="required|numeric" v-slot="{classes, errors }">
                            <div class="payment__bill-number" :class="classes">
                                <label for="bill">Номер счета:</label>
                                <input type="text" id="bill" v-model="billInput" placeholder="87123658716587">
                            </div>
                        </ValidationProvider>
                        <ValidationProvider rules="required|numeric" v-slot="{classes, errors }">
                            <div class="payment__total-sum" :class="classes">
                                <label for="sum">Сумма платежа:</label>
                                <input type="text" id="sum" ref="sumField" v-model="sumInput" placeholder="100" @keydown="enlargeInput()">
                                <span> руб.</span>
                            </div>
                        </ValidationProvider>
                    </div>
                    <h2>Данные банковской карты</h2>
                    <div class="payment__form-wrapper">
                        <fieldset class="payment__form-field-left">
                            <div class="payment__form-group">
                                <p>Номер карты</p>
                                
                                <div class="payment__card-number">
                                    <ValidationProvider rules="required|digits:4" v-slot="{classes, errors }">
                                        <div :class="classes">
                                            <input v-model="cardInput1" type="number"/>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|digits:4" v-slot="{classes, errors }">
                                        <div :class="classes">
                                            <input v-model="cardInput2" type="number"/>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|digits:4" v-slot="{classes, errors }">
                                        <div :class="classes">
                                            <input v-model="cardInput3" type="number"/>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider rules="required|digits:4" v-slot="{classes, errors }">
                                        <div :class="classes">
                                            <input v-model="cardInput4" type="number"/>
                                        </div>
                                    </ValidationProvider>
                                </div>
                            
                            </div>
                            <div class="payment__form-group">
                                <p>Срок действия</p>
                                <div class="payment__card-expiration">
                                    <div class="payment__card-expiration-wrapper">
                                        <label class="visually-hidden" for="month">Выберите месяц</label>
                                        <select name="month" id="month" v-model="selectedMonth">
                                            <option v-for="(item, index) in months" :key="index">
                                                {{item}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="payment__card-expiration-wrapper">
                                        <label class="visually-hidden" for="year">Выберите год</label>
                                        <select name="year" id="year" v-model="selectedYear">
                                            <option v-for="(item, index) in years" :key="index">
                                                {{item}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <ValidationProvider rules="required|name" v-slot="{classes, errors }">
                                <div class="payment__card-name" :class="classes">
                                    <input type="text" v-model="nameInput" placeholder="Держатель карты">
                                </div>
                            </ValidationProvider>
                        </fieldset>
                        <fieldset class="payment__form-field-right">
                            <div class="payment__form-group">
                                <p>Код CVV2 / CVC2</p>
                                <ValidationProvider rules="required|digits:3" v-slot="{classes, errors }">
                                    <div class="payment__card-code" :class="classes">
                                        <label class="visually-hidden" for="code">Введите код</label>
                                        <input type="number" id="code" minlength="3" v-model="code">
                                        <span class="payment__card-tip">Введите трехзначный код на оборотной стороне карты</span>
                                    </div>
                                </ValidationProvider>
                                
                            </div>
                        </fieldset>
                    </div>
                    
                    <button class="payment__form-button" type="submit">Оплатить</button>
                </form>
            </ValidationObserver>
        </div>
        <copyright></copyright>
    </div>
</template>

<script>

  import Copyright from "../components/Copyright";

  import {ValidationProvider, extend} from 'vee-validate';
  import {ValidationObserver} from 'vee-validate';
  import {regex, digits, min, numeric} from 'vee-validate/dist/rules';
  import {configure} from 'vee-validate';

  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });

  extend('name', value => {
    return value.match(/^[a-z]{3,}\s?[a-z]+?$/i);
  });

  extend('regex', {
    ...regex,
    message: ''
  });

  extend('digits', {
    ...digits,
    message: ''
  });

  extend('min', {
    ...min,
    message: ''
  });

  extend('numeric', {
    ...numeric,
    message: ''
  });

  extend('required', {
    validate(value) {
      return {
        required: true,
        valid: ['', null, undefined].indexOf(value) === -1
      };
    },
    message: 'Заполните это поле!',
    computesRequired: true
  });

  export default {
    name: "payment",

    data() {
      return {
        billInput: '',
        sumInput: '',
        nameInput: '',

        cardInput1: '',
        cardInput2: '',
        cardInput3: '',
        cardInput4: '',

        code: '',

        months: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ],

        selectedMonth: '04',

        years: [
          '2018',
          '2019',
          '2020',
          '2021',
          '2022',
          '2023',
        ],
        selectedYear: '2018'
      }
    },
    components: {
      Copyright: Copyright,
      ValidationProvider,
      ValidationObserver
    },

    methods: {
      successHandler() {

        let dataObj = {
          bill: this.billInput,
          sum: this.sumInput,
          name: this.nameInput,
          date: new Date().toLocaleString()
        };

        this.$store.dispatch('setCurrentTransaction', dataObj);
        this.$store.dispatch('reloadTransArray', dataObj);

        this.$store.dispatch('acceptTransition');
        this.$router.push({path: '/success'})
      },

      handleSubmit() {
      },

      enlargeInput() {
        let input = this.$refs.sumField;
        input.style.width = ((input.value.length + 3) * 9) + 'px'
      }

    }
  }
</script>

<style scoped lang="scss">
    .payment {
        width: 640px;
        box-sizing: border-box;
        padding: 44px 29px;
        background-color: #f7f8f8;
        font-family: "Arial", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        
        &__form {
            text-align: left;
            
            & h2 {
                font-family: "Open Sans", sans-serif;
                font-weight: 700;
                font-size: 22px;
                line-height: 25.5px;
                margin-top: 30px;
                margin-bottom: 24px;
            }
        }
        
        &__info-name {
            color: #bec6cf;
            margin: 0;
            margin-bottom: 18px;
        }
        
        &__bill-number,
        &__total-sum {
            display: flex;
            width: 300px;
            
            & label {
                display: block;
                min-width: 155px;
            }
            
            & input {
                background-color: transparent;
                border: none;
                height: 21px;
                padding-left: 5px;
                padding-right: 5px;
                box-sizing: border-box;
                border-bottom: #bebfbe 1px solid;
                outline: none;
                
                &:focus {
                    /* background-color: #ffffff;*/
                    /*border-bottom: #005abf 1px solid;*/
                }
            }
        }
        
        &__bill-number {
            margin-bottom: 5px;
            
            & input {
                width: 150px;
            }
        }
        
        &__total-sum {
            & input {
                width: 36px;
                flex-grow: 0;
            }
            
            & span {
                color: #535864;
            }
        }
        
        &__form-wrapper {
            position: relative;
        }
        
        &__form-field-left {
            position: relative;
            z-index: 5;
            background-color: #f7f8f8;
            margin: 0;
            border-radius: 10px;
            box-sizing: border-box;
            width: 350px;
            padding: 20px 14px 13px 14px;
            border: rgb(228, 233, 238) 1px solid;
            
        }
        
        &__form-group {
            color: #bec6cf;
            margin-bottom: 14px;
            
            & p {
                margin: 0;
                margin-bottom: 3px;
            }
        }
        
        &__card-number {
            display: flex;
            justify-content: space-between;
            padding-right: 33px;
            
            & input {
                border: rgb(228, 233, 238) 1px solid;
                box-sizing: border-box;
                padding-left: 7px;
                padding-right: 7px;
                width: 65px;
                height: 42px;
                outline: none;
                appearance: none;
                -moz-appearance: textfield;
                
                &::-ms-clear {
                    display: none;
                }
                
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                &:hover {
                    -moz-appearance: textfield;
                }
                
                &:focus {
                    border: #56A1FF 1px solid;
                    -moz-appearance: textfield;
                }
            }
        }
        
        &__card-expiration {
            display: flex;
        }
        
        &__card-expiration-wrapper {
            
            & select {
                border: rgb(228, 233, 238) 1px solid;
                box-sizing: border-box;
                height: 42px;
                width: 70px;
                padding-left: 15px;
                margin-right: 9px;
                outline: none;
                background-color: #ffffff;
                background-image: url("../assets/arrow.png");
                background-size: 16px 8px;
                background-repeat: no-repeat;
                background-position: top 15px right 7px;
                
                font-family: "Arial", sans-serif;
                font-size: 16px;
                line-height: 21px;
                color: #373c43;
                appearance: none;
            }
            
            &:last-of-type select {
                width: 86px;
            }
        }
        
        &__card-name {
            & input {
                border: rgb(228, 233, 238) 1px solid;
                box-sizing: border-box;
                width: 100%;
                height: 42px;
                padding-left: 11px;
                outline: none;
                
                &::placeholder {
                    color: #bec6cf;
                    font-family: "Arial", sans-serif;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 21px;
                }
                
                
                &:focus {
                    border: #56A1FF 1px solid;
                }
            }
        }
        
        &__form-field-right {
            position: absolute;
            right: 16px;
            top: 20px;
            min-height: 236px;
            z-index: 2;
            margin: 0;
            border-radius: 10px;
            box-sizing: border-box;
            width: 350px;
            padding: 20px 14px 13px 14px;
            border: rgb(228, 233, 238) 1px solid;
            
            & .payment__form-group {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                padding-top: 55px;
                margin-top: 5px;
                
                & p {
                    margin-right: 10px;
                }
                
                &::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 42px;
                    top: 0;
                    right: -15px;
                    background-color: #e4e9ee;
                }
            }
        }
        
        &__card-code {
            width: 138px;
            position: relative;
    
            &:hover .payment__card-tip {
                display: block;
            }
            
            &::before {
                content: "";
                position: absolute;
                top: 9px;
                right: 9px;
                width: 26px;
                height: 26px;
                box-sizing: border-box;
                border: rgb(228, 233, 238) 1px solid;
                border-radius: 50%;
                cursor: pointer;
            }
            
            
            &::after {
                content: "?";
                position: absolute;
                top: 12px;
                right: 16px;
                width: 10px;
                height: 10px;
                color: rgb(228, 233, 238);
                cursor: pointer;
            }
            
            & input {
                width: 100%;
                border: rgb(228, 233, 238) 1px solid;
                box-sizing: border-box;
                padding-left: 10px;
                padding-right: 10px;
                height: 42px;
                outline: none;
                -moz-appearance: textfield;
                
                &::-ms-clear {
                    display: none;
                }
                
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                &:hover {
                    -moz-appearance: textfield;
                }
                
                &:focus {
                    border: #56A1FF 1px solid;
                    -moz-appearance: textfield;
                }
            }
        }
    
        &__card-tip {
            display: none;
            width: 80px;
            box-sizing: border-box;
            border-radius: 10px;
            border: rgb(228, 233, 238) 1px solid;
            background-color: #ffffff;
            text-align: center;
            font-size: 12px;
            position: absolute;
            bottom: -130px;
            right: 0;
        }
        
        &__form-button {
            background: linear-gradient(to bottom, #005abf 0%, #004ca2 100%);
            width: 133px;
            height: 40px;
            margin-top: 38px;
            margin-left: 15px;
            border: none;
            border-radius: 20px;
            font-size: 14px;
            font-family: "Open Sans", sans-serif;
            line-height: 18px;
            font-weight: 700;
            color: #ffffff;
            
        }
    }
    
    .is-invalid {
        
        & input {
            border-color: red;
        }
    }
    
    @media screen and (min--moz-device-pixel-ratio: 0) {
        .payment__card-name {
            & input {
                &::placeholder {
                    line-height: 42px;
                }
            }
        }
    }
    
    @media (max-width: 999px) {
        .payment {
            width: 100%;
            
            &__form-wrapper {
                
                & fieldset {
                    width: 55%;
                }
            }
            
            &__card-number {
                padding-right: 0;
                
                & input {
                    width: 20%;
                }
            }
        }
    }
    
    @media (max-width: 767px) {
        .payment {
            
            &__form-wrapper {
                
                & fieldset {
                    width: 100%;
                }
            }
            
            &__card-number {
                padding-right: 0;
                
                & input {
                    width: 20%;
                }
            }
            
            &__form-field-left {
                display: block;
                margin-bottom: 30px;
            }
            
            &__form-field-right {
                position: static;
                padding-left: 0;
                padding-right: 0;
                
                & .payment__form-group {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    padding-top: 55px;
                    margin-top: 5px;
                    
                    & p {
                        margin-right: 27px;
                    }
                    
                    &::before {
                        right: 0;
                    }
                }
            }
            
            &__card-code {
                margin-right: 20px;
            }
            
            &__form-button {
                width: 200px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }
    
    @media (max-width: 479px) {
        .payment {
            padding-left: 10px;
            padding-right: 10px;
            
            &__form {
                
                & h2 {
                    text-align: center;
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 20px;
                    margin-top: 35px;
                    
                }
            }
            
            &__info-name {
                font-size: 18px;
                line-height: 20px;
                text-align: center;
            }
            
            &__bill-number,
            &__total-sum {
                width: 280px;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 15px;
                
                & label {
                    min-width: 125px;
                }
            }
            
        }
    }

</style>
