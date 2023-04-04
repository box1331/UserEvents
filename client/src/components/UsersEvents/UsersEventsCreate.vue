<template>
    <div class="users-events-create">
        <form @submit.prevent>
            <h4 class="name__placing">Create Event</h4>
            <div class="input__validate">
                <ui-input
                    v-model="userName"
                    type="text" 
                    placeholder="UserName"
                    class="row-user-name input__placing"
                    disabled
                />
                <!-- <span v-if="v$.userName.$error"> 
                    {{ this.v$.userName.$errors[0].$message }}
                </span> -->
            </div>
            
            <div class="input__validate">
                <ui-input
                    v-focus 
                    v-model="title"
                    type="text" 
                    placeholder="Title"
                    class="input__placing"
                />
                <span v-if="v$.title.$error"> 
                    {{ this.v$.title.$errors[0].$message }}
                </span>
            </div>
            
            <div class="input__validate">
                <ui-input 
                    v-model="description"
                    type="text" 
                    placeholder="Description"
                    class="input__placing"
                />
                <span v-if="v$.description.$error"> 
                    {{ this.v$.description.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <ui-input 
                    v-model="startDate"
                    type="date" 
                    placeholder="StartDate"
                    class="input__placing"
                />
                <span v-if="v$.startDate.$error"> 
                    {{ this.v$.startDate.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <ui-input 
                    v-model="endDate"
                    type="date" 
                    placeholder="EndDate"
                    class="input__placing"
                />
                <span v-if="v$.endDate.$error"> 
                    {{ this.v$.endDate.$errors[0].$message }}
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
import {mapActions} from 'vuex'
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength} from '@vuelidate/validators'
import validate from '@/validate/validate.js'

export default {
    name: 'users-events-create',
    props: {
        modelValue: {
            type: String
        },
        user: {
            type: String
        }
    },
    data() {
        return {
            v$: useVuelidate(),
            userName: this.user,
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            // Error message
            messageVisible: false,
            messageText: ''
        }
    },
    validations() {
        return {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            title: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            description: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(32)
            },
            startDate: {
                required,
                verifyStartDate: validate.verifyStartDate
            },
            endDate: {
                required,
                verifyEndDate: validate.verifyEndDate
            }        
        }
    },
    methods: {
        multiple() {
            this.validateEvents()
            this.closeDialog()
        },
        validateEvents() {
            this.v$.$validate();
            if (!this.v$.$error) {
                this.createEvent({
                    userName: this.userName, 
                    title: this.title, 
                    description: this.description, 
                    startDate: this.startDate, 
                    endDate: this.endDate
                });
                // alert(`Form successfully submitted ... `);   
            }
            // else {
            //     // alert(`Form failed validation ... `);   
            //     // console.log(this.v$.$errors);
            //     // console.log(this.v$.email.$errors[0].$message)
            // }
        },
        closeDialog() {
            if (this.v$.$errors.length == 0) {
                this.$emit('update:modelValue', false)
            }
        },
        ...mapActions({
            createEvent: 'events/createEvent'
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