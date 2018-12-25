import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        username: '',
        sex: '',
        phone: '',
        stuId: '',
        keti: ''
    },
    mutations: {
        setUsername(state, username) {
            var userId = document.cookie.split('=')[1]
            if(userId) {
                axios.get('/students/getStuMess',{
                    params: {
                        userId: userId
                    }
                })  
                .then(data => {
                    state.username = data.data.doc.username
                })              
            }
            else state.username = username
        },
        getUsername(state) {
            var userId = document.cookie.split('=')[1]
            axios.get('/students/getStuMess',{
                params: {
                    userId: userId
                }
            })
            .then(data => {
                console.log(data)
                var temp = data.data.doc
                if(temp){
                    state.username = temp.username
                    state.sex = temp.sex
                    state.phone = temp.phone
                    state.stuId = temp.userStuId,
                    state.keti = temp.select
                }
                else{
                    console.log('errr')
                }
            })
        }
    },
    actions: {
        getUsername( {commit} , username) {
            console.log(username)
            commit('getUsername',username)
        }
    }
})

export default store