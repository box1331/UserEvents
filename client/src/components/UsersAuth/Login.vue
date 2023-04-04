<template>
    <div class="wrapper">
        <form @submit.prevent="handleSubmit" class="box"> 

            <ui-error v-if="error" :error="error" />

            <h1>Login</h1>
            <ui-input v-focus type="email" v-model="email" name="email" placeholder="Email"></ui-input>
            <ui-input type="password" v-model="password" name="password" placeholder="Password"></ui-input>
            <ui-input @click="userLogin" type="submit" value="Login"></ui-input>

        </form>

        <!-- Message -->
        <ui-dialog v-model:show="messageVisible" class="dialog__error">    
            <div class="delete__content">
                <h3>{{messageText}}</h3>
            </div>
            <div class="delete__btns">
                <ui-button @click="messageDialog">Close</ui-button>
            </div>
        </ui-dialog>

    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        error: '',
        // Error message
        messageVisible: false,
        messageText: ''
      }
    },
    methods: {
      async handleSubmit() {
        try{
          const response = await axios.post('login', {
                email: this.email,
                password: this.password
            })   

          localStorage.setItem('token', response.data.token);
          // this.$store.dispatch('auth/user', response.data.user);
          this.USER(response.data.user);
          this.$router.push('/');
        } catch(err) {
          this.error = 'Invalid UserName or Password ...';
          if (err) {
              this.messageText = `Form failed validation, please enter correct data`
              this.messageVisible = true
          }  
        }   
      },
      ...mapActions({
        USER: 'auth/USER'
      }),

      // Error message
      messageDialog() {
          this.messageVisible = false;
      }
    }
}
</script>

<style scoped src="@/assets/style/login.css"></style>
