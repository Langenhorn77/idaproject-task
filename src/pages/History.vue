<template>
    <div>
        <div class="payment-history">
            <h1>История платежей</h1>
            <div class="payment-history__info" v-for="(trans, index) in transactions" :key="index">
                <p class="payment-history__content">
                    <span class="payment-history__text">Номер счета:</span>
                    <span class="payment-history__number">{{trans.bill}}</span>
                </p>
                <p class="payment-history__content">
                    <span class="payment-history__text">Cумма платежа:</span>
                    <span class="payment-history__number">{{trans.sum}}</span>
                </p>
                <p class="payment-history__content">
                    <span class="payment-history__text">Имя держателя карты:</span>
                    <span class="payment-history__number">{{trans.name}}</span>
                </p>
                <p class="payment-history__content">
                    <span class="payment-history__text">Дата оплаты:</span>
                    <span class="payment-history__number">{{trans.date}}</span>
                </p>
            </div>
        </div>
        <copyright></copyright>
    </div>
</template>

<script>
  import Copyright from "../components/Copyright";
  export default {
    name: "history",
    components: {
      Copyright: Copyright
    },

    computed: {
      transactions() {
        return this.$store.getters.tArray;
      },
    }
    
  }
</script>

<style scoped lang="scss">
    .payment-history {
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
        
        &:not(:last-of-type) {
            margin-bottom: 20px;
        }
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
        .payment-history {
            width: 100%;
        }
    }

    @media (max-width: 767px) {
        .payment-history {
            padding: 44px 15px;
        
            & h1 {
                font-size: 22px;
                line-height: 24px;
            }
        }
    }

    @media (max-width: 479px) {
        .payment-history {
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
