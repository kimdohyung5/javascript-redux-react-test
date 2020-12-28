import {combineReducers} from 'redux'
import projectReducer from './projects'
import bugsReducer from './bugs'
import usersReducer from './users'

export default combineReducers({
    projects: projectReducer,
    bugs: bugsReducer,
    users: usersReducer
})
