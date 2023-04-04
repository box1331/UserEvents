<template>
    <div class="users-rules">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th>UserName</th>
                    <th>SurName</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th class="my-table__action">Action</th>
                </tr>
                
                <template v-for="user in users" :key="user._id">
                    <tr class="table-user-row">
                        <div class="table-user__edit">
                            <transition-group name="users-rules">
                                <!-- UserOne -->
                                <th class="row my-table__nameLink" @click="$router.push(`/users/${user._id}`), userClick">{{user.userName}}</th>
                                <td class="row">{{user.surName}}</td>
                                <td class="row">{{user.email}}</td>
                                <td class="row">{{user.phoneNumber}}</td>
                                <td class="my-table__action">
                                    <ui-button
                                        @click.prevent="changeEditUserId(user._id, user.userName, user.surName, user.email, user.phoneNumber)"
                                         style="margin-left: 10px"
                                    >
                                        Edit
                                    </ui-button>
                                    <ui-button
                                        @click.prevent="deleteUserId({_id: user._id, userName: user.userName})"
                                         style="margin-left: 10px"
                                    >
                                        Delete
                                    </ui-button>
                                </td> 
                            </transition-group>    
                        </div>                       
                           
                        <div class="table-user__correct">
                            <tr :class="isEdit(user._id) ? '' : classStr" class="input__validates">
                                <transition-group name="users-rules">
                                    <div class="table-user__update">
                                        <div class="input__validate">
                                            <td class="row"><ui-input class="row-user-name" v-model="userName" type="text" disabled></ui-input></td>
                                            <span v-if="v$.userName.$error && v$.userName.$errors.length"> 
                                                {{ this.v$.userName.$errors[0].$message }}
                                            </span>    
                                        </div>

                                        <div class="input__validate">
                                            <td class="row"><ui-input v-model="surName" type="text"></ui-input></td>
                                            <span v-if="v$.surName.$error && v$.surName.$errors.length"> 
                                                {{ this.v$.surName.$errors[0].$message }}
                                            </span>
                                        </div>

                                        <div class="input__validate">
                                            <td class="row"><ui-input v-model="email" type="text"></ui-input></td>
                                            <span v-if="v$.email.$error && v$.email.$errors.length"> 
                                                {{ this.v$.email.$errors[0].$message }}
                                            </span>
                                        </div>
                                        
                                        <div class="input__validate">
                                            <td class="row"><ui-input v-model="phoneNumber" type="text"></ui-input></td>
                                            <span v-if="v$.phoneNumber.$error && v$.phoneNumber.$errors.length"> 
                                                {{ this.v$.phoneNumber.$errors[0].$message }}
                                            </span>
                                        </div>
                                        
                                        <td class="row">
                                            <ui-button
                                                @click.prevent="updateUser(user._id, user.userName, user.surName, user.email, user.phoneNumber)"
                                            >
                                                Update
                                            </ui-button>
                                        </td>
                                    </div>
                                </transition-group>
                            </tr>
                        </div>
                        
                    </tr>
                </template>
            </table>

            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotal"
                    :key="pageCurrent"
                    :class="{'page__selected' : page === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}                    
                </div>
            </div>

        </div>  

        <!-- BackendMessage -->
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
import {mapState, mapMutations, mapActions} from 'vuex'
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, numeric} from '@vuelidate/validators'

export default {
    name: 'users-rules',
    components: {

    },
    // Sorting on Server
    props: {
        selectedSort: {
            type: String
        },
    },
    data() {
        return {
            v$: useVuelidate(),
            _id: '',
            userName: '',
            surName: '',
            email: '',
            phoneNumber: '',
            editUserId: null,
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
                maxLength: maxLength(12),
                // validateUserName: validate.validateUserName               
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
        updateUser(_id) {
            this.editUserId = null;

            this.v$.$validate();
            // Vuelidate + Validate Name (!this.errorUserName == '')
            if (!this.v$.$error) {
                axios.put(`http://localhost:7000/users/${_id}`, {
                    userName: this.userName,
                    surName: this.surName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                })
                .then(response => {
                    this.getUsers()
                    // this.$emit('update:modelValue', true)
                })
                .catch((err => {
                    this.messageText = `Backend: ${err.response.data.message} \n ${err.response.data.errors}`
                    this.messageVisible = true
                }))
            }
            else {
                if (this.v$.surName.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.surName.$errors[0].$message} `
                    this.messageVisible = true
                }
                else if (this.v$.email.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.email.$errors[0].$message} `
                    this.messageVisible = true
                }
                else if (this.v$.phoneNumber.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.phoneNumber.$errors[0].$message} `
                    this.messageVisible = true
                }
            }
        },
        changeEditUserId(_id, userName, surName, email, phoneNumber) {
            this.editUserId = _id;

            this.userName = userName,
            this.surName = surName,
            this.email = email,
            this.phoneNumber = phoneNumber    
        },
        isEdit(_id) {
            return this.editUserId === _id
        },
        // Error message
        messageDialog() {
            this.messageVisible = false
        },
        ...mapMutations({
            setUsers: 'users/setUsers',
            setEditUserId: 'users/setEditUserId',
            setClassStr: 'users/setClassStr',
            setId: 'users/setId',
            setUserName: 'users/setUserName',
            setSurName: 'users/setSurName',
            setEmail: 'users/setEmail',
            setPhoneNumber: 'users/setPhoneNumber', 
            //Delete User
            setDeleteUser: 'users/setDeleteUser'
        }),
        ...mapActions({
            SortByUserName: 'users/SortByUserName',
            SortBySurName: 'users/SortBySurName',
            SortByEmail: 'users/SortByEmail',
            SortByPhoneNumber: 'users/SortByPhoneNumber',
            getUsers: 'users/getUsers', 
            deleteUserId: 'users/deleteUserId',
            // Pagination
            pageClick: 'users/pageClick',
            //Delete User
            getEvents: 'users/getEvents'

        })
    },
    computed: {
        ...mapState({
            users: state => state.users.users,
            editUserId: state => state.users.editUserId,
            // View table Edit
            classStr: state => state.users.classStr,
            _id: state => state.users._id,
            userName: state => state.users.userName,
            surName: state => state.users.surName,
            email: state => state.users.email,
            phoneNumber: state => state.users.phoneNumber,
            // Pagination
            page: state => state.users.page,
            pageTotal: state => state.users.pageTotal,
            //Delete User
            deleteUser: state => state.users.deleteUser
        })
    },
    mounted() {
        this.getUsers();
        this.getEvents();
    },
    watch: {
        page() {
            this.getUsers();
        },
        selectedSort() {
            this.getUsers(this.selectedSort)    
        }
    }
}
</script>



<style>
/* Animation add and delete */
.users-rules-item {
  display: inline-block;
  margin-right: 10px;
}
.users-rules-enter-active,
.users-rules-leave-active {
  transition: all 0.3s ease;
}
.users-rules-enter-from,
.users-rules-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* Animation move */
.users-rules-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
/* Validation */
.input__validates {
    display:flex;
    flex-direction: column;
}
.input__validate {
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    color: red;
    margin: 10px;
    text-align: center;
}

.classNone {
    display: none;
}

</style>

<style src="@/assets/style/style.css"></style>