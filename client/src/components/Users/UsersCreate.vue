<template>
    <div class="users-create">
        <form @submit.prevent>
            <h4 class="name__placing">Create User</h4>
            <div class="input__validate">
                <ui-input 
                    v-focus
                    v-model="userName"
                    type="text" 
                    placeholder="UserName"
                    class="input__placing"
                />
                <span v-if="v$.userName.$error && v$.userName.$errors.length"> 
                    {{ this.v$.userName.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <ui-input 
                    v-model="surName"
                    type="text" 
                    placeholder="SurName"
                    class="input__placing"
                />
                <span v-if="v$.surName.$error"> 
                    {{ this.v$.surName.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <ui-input 
                    v-model="email"
                    type="email" 
                    placeholder="Email"
                    class="input__placing"
                />
                <span v-if="v$.email.$error"> 
                    {{ this.v$.email.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <ui-input 
                    v-model="phoneNumber"
                    type="tel" 
                    placeholder="PhoneNumber"
                    class="input__placing"
                />
                <span v-if="v$.phoneNumber.$error"> 
                    {{ this.v$.phoneNumber.$errors[0].$message }}
                </span>
            </div>
            <ui-button
                @click="multiple"
                class="button__placing"
            >
                Create
            </ui-button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, numeric} from '@vuelidate/validators'
import validate from '@/validate/validate.js'

export default {
    name: 'users-create',
    components: { 
        
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
            v$: useVuelidate(),
            userName: '',
            surName: '',
            email: '',
            phoneNumber: ''
        }
    },
    validations() {
        return {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12),         
            },
            surName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            email: {
                required,
                email
            },
            phoneNumber: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10)
            }        
        }
    },
    methods: {
         multiple() {
            this.validateUser();
            this.closeDialog();
        },
        async closeDialog() {
            // Vuelidate + Validate Name (!this.errorUserName == '')
            if (this.v$.$errors.length == 0 && this.errorUserName == '') {
                this.$emit('update:modelValue', false)
            }
        },
        validateUser() {
            this.v$.$validate();
            // Vuelidate + Validate Name (!this.errorUserName == '')
            if (!this.v$.$error && this.errorUserName == '') { 
                this.createUser({userName: this.userName, surName: this.surName, email: this.email, phoneNumber: this.phoneNumber});
            }
        },
        ...mapActions({
            createUser: 'users/createUser'
        })
    }, 
    computed: {
        ...mapGetters({
            errorUserName: 'users/errorUserName'
        })
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
.name__placing {
    margin: 15px auto;
    text-transform: uppercase;
}
.input__placing {
    margin: 0 0 10px 0;
    background: white;
    border-radius: 3px;
    min-height: 50px;
    min-width: 320px;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.4);
}
.button__placing {
    height: 50px;
    width: 320px;
    margin: 15px auto;
    padding: 10px;
}
.input__validate {
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: red;
}
.field__error {
    padding: 15px;
    color: red;
    font-size: 18px;
    font-weight:400;
}
</style>


