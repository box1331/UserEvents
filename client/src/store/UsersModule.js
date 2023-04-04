import axios from 'axios'

export const UsersModule = {
    state: () => ({
        users: [],
        errorUserName: '',
        editUserId: null,
        classStr: 'classNone',
        _id: '',
        userName: '',
        surName: '',
        email: '',
        phoneNumber: '',
        // Pagination
        page: 1,
        pageTotal: 0,
        //Delete User
        deleteUser: [],
        isUser: 0,
        // Error message
        messageVisible: false,
        messageText: ''
    }),
    getters: {
        users(state) {
            return state.users;
        },
        // nameValidation(back)
        errorUserName(state) {
            return state.errorUserName
        },
        userName(state) {
            return state.userName
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setEditUserId(state, editUserId) {
            state.editUserId = editUserId;
        },
        setClassStr(state, classStr) {
            state.classStr = classStr;
        },
        setId(state, _id) {
            state._id = _id;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setSurName(state, surName) {
            state.surName = surName;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setPhoneNumber(state, phoneNumber) {
            state.phoneNumber = phoneNumber;
        },
        // nameValidation(back)
        setErrorUserName(state, errorUserName) {
            state.errorUserName = errorUserName;
        },
        // Pagination
        setPage(state, page) {
            state.page = page
        },
        setPageTotal(state, pageTotal) {
            state.pageTotal = pageTotal
        },
        //Delete User
        setDeleteUser(state, deleteUser) {
            state.deleteUser = deleteUser
        },
        setIsUser(state, isUser) {
            state.isUser = isUser
        },
        // Error message
        setMessageVisible(state, messageVisible) {
            state.messageVisible = messageVisible
        },
        setMessageText(state, messageText) {
            state.messageText = messageText
        }
    },
    actions: {
        // Pagination
        pageClick({commit}, pageCurrent) {
            commit('setPage', pageCurrent)           
        },
        //Request to Server
        async getUsers({state, commit}, selectedSort) {
            if (!selectedSort) {
                await axios.get(`/users?page=${state.page}`)
                .then(response => {
                    commit('setUsers', response.data.users);
                    commit('setPageTotal', response.data.pageTotal)
                })
            } else {
                await axios.get(`/users?page=${state.page}&sort=${selectedSort}`)
                .then(response => {
                    commit('setUsers', response.data.users);
                    commit('setPageTotal', response.data.pageTotal)
                })
            }
        },
        async createUser({commit, dispatch, state}, data) {
            await axios.post('/users', {
                userName: data.userName,
                surName: data.surName,
                email: data.email,
                phoneNumber: data.phoneNumber,
            })
            .then(response => {
                dispatch('getUsers')
                commit('setMessageText', `BackEnd: Form successfully submitted ... `)
                commit('setMessageVisible', true)
            })
            .catch(err => {
                // Validate Name
                // commit('setMessageText', `BackEnd: ${err.response.data.errors}`)
                commit('setMessageText', `BackEnd: ${err.response.data.message}`)
                commit('setMessageVisible', true)
            })
        },
        
        // Delete: Deletion User with condition
        async getEvents({commit}) {
            await axios.get(`/events`)
            .then(response => {
                commit('setDeleteUser', response.data.events);    
            })
        },
        async deleteUserId({ state, commit, dispatch }, data) {
            dispatch('getEvents')        
            for (let i = 0; i < state.deleteUser.length; i++) {
                if (state.deleteUser[i].userName == data.userName) {
                    // alert('Deletion is not possible! User has open tasks ...')
                    commit('setMessageVisible', true)
                    commit('setMessageText', 'Deletion is not possible! User has open tasks ...')
                    return commit('setIsUser', state.isUser += 1)
                } else {
                    commit('setIsUser', state.isUser = 0)
                }
            }
            if (state.isUser !== 1) {
                await axios.delete(`/users/${data._id}`)
                .then(response => {
                    dispatch('getUsers')
                }) 
            } else {
                // return alert('Deletion is not possible! User has open tasks ...')
                commit('setErrorVisible', true)
                return commit('setMessageError', 'Deletion is not possible! User has open tasks ...')
            }
        },

        // Delete: Include to test server side control
        // async deleteUserId({ dispatch }, data) {
        //     await axios.delete(`/users/${data._id}?userName=${data.userName}`, { 
        //        userName: data.userName
        //     })
        //     .then(response => {
        //         dispatch('getUsers')
        //     })
        // }

        // Error message
        messageDialog({commit}) {
            commit('setMessageVisible', false)
        }
    },
    namespaced: true
}