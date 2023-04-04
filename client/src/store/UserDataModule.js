import axios from 'axios'

export const UserDataModule = {
    state: () => ({
        editUserInfoId: null,
        classStr: 'classNone',
        userName: '',
        email: '',
        phoneNumber: '',
        //Indicators
        countEvent: [],
        dateNextEvent: [],
        usersInfo: [],
        events: [],
        // Pagination
        pageInfo: 1,
        pageTotalInfo: 0
    }),
    getters: {
        //Count events
        countEvent(state) {            
            for (let i in state.usersInfo) {
                state.usersInfo[i].countEvent = 0;
                for (let j in state.countEvent) {
                    if (state.usersInfo[i].userName === state.countEvent[j]._id) {
                        state.usersInfo[i].countEvent = state.countEvent[j].countTask;
                    } 
                }
            }
            return state.usersInfo.countEvent
        },
        //Next event date
        dateNextEvent(state) {
            for (let i in state.usersInfo) {
                state.usersInfo[i].dateNextEvent = 'Not event';

                for (let j in state.dateNextEvent) {
                    if (state.usersInfo[i].userName === state.dateNextEvent[j]._id) {   
                        state.usersInfo[i].dateNextEvent = new Date(state.dateNextEvent[j].startDate).toLocaleDateString();   
                    } 
                }
            }
            return state.usersInfo.dateNextEvent
        }
    },
    mutations: {
        setEditUserInfoId(state, editUserInfoId) {
            state.editUserInfoId = editUserInfoId;
        },
        setClassStr(state, classStr) {
            state.classStr = classStr;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setPhoneNumber(state, phoneNumber) {
            state.phoneNumber = phoneNumber;
        },
        setCountEvent(state, countEvent) {
            state.countEvent = countEvent;
        },
        setDateNextEvent(state, dateNextEvent) {
            state.dateNextEvent = dateNextEvent;
        },
        setUsersInfo(state, usersInfo) {
            state.usersInfo = usersInfo;
        },
        setEvents(state, events) {
            state.events = events;
        },
        // Paginstion
        setPageInfo(state, pageInfo) {
            state.pageInfo = pageInfo
        },
        setPageTotalInfo(state, pageTotalInfo) {
            state.pageTotalInfo = pageTotalInfo
        }
    },
    actions: {
        // Pagination
        pageClick({commit}, pageCurrent) {
            commit('setPageInfo', pageCurrent)           
        },
        //Request to Server
        async getUsersInfo({state, commit}, selectedSort) {
            if (!selectedSort) {
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                await axios.get(`/usersInfo?pageInfo=${state.pageInfo}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                    commit('setDateNextEvent', response.data.dateNextEvent);
                    commit('setCountEvent', response.data.countTask);
                })
            } else {
                await axios.get(`/usersInfo?pageInfo=${state.pageInfo}&sort=${selectedSort}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                    commit('setDateNextEvent', response.data.dateNextEvent);
                    commit('setCountEvent', response.data.countTask);
                })
            }
        },
        async getEventsInfo({state, commit}) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            await axios.get(`/events`)
            .then(response => {
                commit('setEvents', response.data.events);
            })
        },
    },
    namespaced: true
}