import axios from 'axios'

export const UsersEventsModule = {
    state: () => ({
        events: [],
        editEventId: null,
        classStr: 'classNone',
        _id: '',
        userName: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        //Pagination
        page: 1,
        pageTotal: 0,
        //BackendMessage
        messageVisible: false,
        messageText: '',
        // Error message
        messageVisible: false,
        messageText: ''
    }),
    getters: {
        getEvents(state) {
            return state.events
        },
        getPage(state) {
            return state.page
        },
        getPageTotal(state) {
            return state.pageTotal
        },
        getEditEventId(state, editEventId) {
            state.editEventId = editEventId
        }
    },
    mutations: {
        setEvents(state, events) {
            state.events = events
        },
        setPage(state, page) {
            state.page = page
        },
        setPageTotal(state, pageTotal) {
            state.pageTotal = pageTotal
        },
        setEditEventId(state, editEventId) {
            state.editEventId = editEventId
        },
        setId(state, _id) {
            state,_id = _id
        },
        setUserName(state, userName) {
            state.userName = userName
        },
        setTitle(state, title) {
            state.title = title
        },
        setDescription(state, description) {
            state.description = description
        },
        setStartDate(state, startDate) {
            state.startDate = startDate
        },
        setEndDate(state, endDate) {
            state.endDate = endDate
        },
        //BackendMessage
        setMessageVisible(state, messageVisible) {
            state.messageVisible = messageVisible
        },
        setMessageText(state, messageText) {
            state.messageText = messageText
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
        // Paginations
        pageClick({commit}, pageCurrent) {
            commit('setPage', pageCurrent)
        },

        //Request to Server
        async getEventsAll({state, commit}, selectedSort) {
            if (!selectedSort) {
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                await axios.get(`/events?page=${state.page}`)
                .then(response => {
                    commit('setEvents', response.data.events)
                    commit('setPageTotal', response.data.pageTotal)
                })
            } else {
                await axios.get(`/events?page=${state.page}&sort=${selectedSort}`)
                .then(response => {
                    commit('setEvents', response.data.events)
                    commit('setPageTotal', response.data.pageTotal)
                })
            }
        },

        async getEvents({state, commit}, selectedSort) {
            if (!selectedSort) {
                await axios.get(`/events?page=${state.page}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    commit('setEvents', response.data.events)
                    commit('setPageTotal', response.data.pageTotal)
                })
            } else {
                await axios.get(`/events?page=${state.page}&sort=${selectedSort}`)
                .then(response => {
                    commit('setEvents', response.data.events)
                    commit('setPageTotal', response.data.pageTotal)
                })
            }
        },

        async createEvent({commit, dispatch}, data) {
            await axios.post('/events', {
                userName: data.userName,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
            })
            .then(response => {
                dispatch('getEvents')
                commit('setMessageText', `BackEnd: Form successfully submitted ... `)
                commit('setMessageVisible', true)
            })
            .catch(err => {
                // commit('setMessageText', `BackEnd: ${err.response.data.errors}`)
                commit('setMessageText', `BackEnd: ${err.response.data.message}`)
                commit('setMessageVisible', true)
            })
        },

        async deleteEventId({dispatch}, _id) {
            await axios.delete(`/events/${_id}`)
            .then(response => {
                dispatch('getEvents')
            })
        },

        async updateEvent({commit, dispatch}, data) {
            await axios.put(`/events/${data._id}`, {
                userName: data.userName,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
            })
            .then(response => {
                dispatch('getEvents')
            })
            .catch((err => {
                commit('setMessageVisible', true)
                commit('setMessageText', `BackEnd: ${err.response.data.message} \n ${err.response.data.errors}`)
                dispatch('getEvents')
            }))
            commit('setEditEventId', null)
        },

        changeEditEventId({commit}, data) {
            commit('setEditEventId', data._id)

            commit('setUserName', data.userName)
            commit('setTitle', data.title)
            commit('setDescription', data.description)
            commit('setStartDate', data.startDate)
            commit('setEndDate', data.endDate)
        },

        //BackendMessage
        messageDialog({commit, dispatch}) {
            commit('setMessageVisible', false)
            dispatch('getEvents');
        }
    },
    namespaced: true
}