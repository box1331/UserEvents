<template>
    <div class="page-home">
      <h1>User Event</h1>
      <p>NodeJS Express VueJS MongoDB</p>

      <h3 v-if="user"> You`re logged in as {{user.email}}</h3>
      <h3 v-if="!user">You`re not logged in. Please login or register...</h3>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
}
</script>

<style src="@/assets/style/style.css"></style>