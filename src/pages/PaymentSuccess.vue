<template>
    <div>
        <div class="payment-success">
            <h1>Платеж успешно выполнен!</h1>
            <div class="payment-success__info">
                <p class="payment-success__content">
                    <span class="payment-success__text">Номер счета:</span>
                    <span class="payment-success__number">{{transactionInfo.bill}}</span>
                </p>
                <p class="payment-success__content">
                    <span class="payment-success__text">Cумма платежа:</span>
                    <span class="payment-success__number">{{transactionInfo.sum}}</span>
                </p>
                <p class="payment-success__content">
                    <span class="payment-success__text">Имя держателя карты:</span>
                    <span class="payment-success__number">{{transactionInfo.name}}</span>
                </p>
                <p class="payment-success__content">
                    <span class="payment-success__text">Дата оплаты:</span>
                    <span class="payment-success__number">{{transactionInfo.date}}</span>
                </p>
            </div>
        </div>
        <copyright></copyright>
    </div>
</template>

<script>
  import Copyright from "../components/Copyright";

  export default {
    name: "paymentSuccess",
    props: {
    
    },
    data () {
      return {
      
      }
    },
    
    components: {
      Copyright: Copyright
    },
    
    computed: {
      transactionInfo() {
        return this.$store.getters.cTransaction;
      },
    },

    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('denyTransition');
      next()
    }
  }
</script>

<style scoped lang="scss">
    
    .payment-success {
        width: 640px;
        box-sizing: border-box;
        padding: 44px 29px;
        background-color: #f7f8f8;
        font-family: "Arial", sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        
        & h1 {
            text-align: center;
        }
        
        &__info {
            padding: 15px;
            border: rgb(228, 233, 238) 1px solid;
            border-radius: 10px;
        }
        
        &__content {
            display: flex;
            margin: 0;
            margin-bottom: 5px;
            
        }
        
        &__text {
            display: block;
            color: #bec6cf;
            min-width: 200px;
        }
        
        &__number {
            color: #535864;
        }
    }

    @media (max-width: 999px) {
        .payment-success {
            width: 100%;
        }
    }

    @media (max-width: 767px) {
        .payment-success {
            padding: 44px 15px;
            
            & h1 {
                font-size: 22px;
                line-height: 24px;
            }
        }
    }

    @media (max-width: 479px) {
        .payment-success {
            & h1 {
                font-size: 18px;
                line-height: 20px;
            }
    
            &__content {
                flex-direction: column;
                margin-bottom: 20px;
            }
    
            &__text {
                margin-bottom: 7px;
            }
        }
    }

</style>
