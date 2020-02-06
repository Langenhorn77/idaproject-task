<template>
<ul class="nav-menu">
    <li class="nav-menu__item"  v-for="(item, index) in menu" :key="index" >
        <router-link class="nav-menu__link" :to="item.link">{{item.content}}</router-link>
    </li>
</ul>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {
        menu: [
          {
            content: 'Личный кабинет',
            link: '/login',
            classType: 'nav-menu__link--main'
          },

          {
            content: 'Платежи (активная)',
            link: '/',
            classType: 'nav-menu__link--main'
          },

          {
            content: 'История платежей',
            link: '/history',
            classType: 'nav-menu__link--main'
          },

          {
            content: 'Настройки',
            link: '/settings',
            classType: ''
          },

          {
            content: 'Выйти',
            link: '#',
            classType: ''
          },
        ],
        show: false,
      }
    }
  }
</script>

<style scoped lang="scss">
    .nav-menu {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 320px;
        
        &__item {
            min-height: 75px;
            box-sizing: border-box;
            background-color: #191c24;
            
            &:last-of-type {
                border-top:rgba(32, 35, 43, 0.4) 1px solid;
                
                & a {
                    color: #808592;
                }
            }
        }
        
        &__link {
            display: block;
            width: 100%;
            min-height: 75px;
            box-sizing: border-box;
            padding: 25.5px 29px;
            font-family: "Open Sans", sans-serif;
            font-weight: 700;
            font-size: 18px;
            line-height: 24px;
            color: #ffffff;
            text-decoration: none;
            text-align: left;
            background-color: #191c24;
        }
        
        &__link--main {
            background-color: #1f2229;
        }
    }

    .router-link-exact-active {
        background-color: #2a2d37;
        color: #808592;
    }

    @media (max-width: 999px) {
        .nav-menu {
            width: 100%;
    
            &__link {
                text-align: center;
            }
        }
    }

</style>
