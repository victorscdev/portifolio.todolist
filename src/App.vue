<template>
  <v-app id="appMain">
    <Navigation v-if="firebase.authentication.userLogged" />
    <v-main id="vMain">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import Navigation from '@/components/Navigation/Navigation.vue'

export default {
  name: 'App',

  data: () => ({
    firebase: {
        authentication: {
            fireAuth: firebase.auth(),
            userLogged: false
        },
    },
  }),
  components: {
    Navigation
  },
  methods: {
    loggedInUser() {
      this.firebase.authentication.fireAuth
        .onAuthStateChanged((user) => {
          if (user) {
              this.firebase.authentication.userLogged = true
          }
      });
    }
  },
  mounted() {
    this.loggedInUser()
  }
};
</script>

<style lang="scss">
  @import 'assets/scss/import.scss';
  * {
    font-family: 'Quicksand', sans-serif;
  }

  html {
    overflow-y: auto !important;
  }

  #appMain {
    .v-application--wrap {
      .v-main {
        background: #F4F4F4;

        &.deslogado {
          background: #123954;
        }
      }
    }
  }
</style>
