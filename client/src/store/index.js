import {createStore} from 'vuex'

import {UserDataModule} from '@/store/UserDataModule.js'
import {UsersModule} from '@/store/UsersModule.js'
import {UsersEventsModule} from '@/store/UsersEventsModule.js'
import {UsersAuthModule} from '@/store/UsersAuthModule.js'


export default createStore({
    modules: {
        data: UserDataModule,
        users: UsersModule,
        events: UsersEventsModule,
        auth: UsersAuthModule
    }
})