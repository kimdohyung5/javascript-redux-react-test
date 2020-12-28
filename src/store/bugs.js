
import { createSlice } from '@reduxjs/toolkit'
import {createSelector} from 'reselect'
import moment from 'moment'
import {apiCallBegan} from './api'

const url = "/bugs";

const slice = createSlice({
    name:"bugs",
    initialState: {
        list:[],
        loading: false,
        lastFetch:null
    },
    reducers : {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload
            bugs.lastFetch = Date.now();
            bugs.loading = false;
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        bugAdded: (bugs, action) => {
            bugs.list.push( action.payload )
        },
        bugRemoved: (bugs, action) => {
            const index = bugs.list.findIndex( bug => bug.id === action.payload.id);
            bugs.list.splice(index, 1);
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex( bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugAssignedToUser: (bugs, action) => {
            const {id: bugId, userId} = action.payload;
            const index = bugs.list.findIndex( bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        }
    }
})

export const getUnresolvedBugs = (state) => state.entity.bugs.list.filter( bug => !bug.resolved )
// export const getUnresolvedBugs = createSelector(
//     state => state.entity.bugs,
//     bugs => bugs.list.filter(bug => !bug.unresolved )
// )
export const getAssignedBugsToUser = userId => createSelector(
    state => state.entity.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId )
)

export const loadBugs = () => (dispatch, getState) => {
    const {lastFetch} = getState().entity.bugs;
    const minDiff = moment().diff( moment( lastFetch), "minutes");
    if( minDiff < 10) return;

    dispatch ( apiCallBegan( { url, onStart: slice.actions.bugsRequested.type
                                , onSuccess: slice.actions.bugsReceived.type 
                                , onError: slice.actions.bugsRequestFailed.type
                            } ) )
}

export const addBug = (bug) => apiCallBegan({url, method:'POST', data:bug,
    onSuccess: bugAdded.type    
})

export const assignBugToUser= (bugId, userId) => apiCallBegan({url: url+ "/" + bugId, method:'patch', data: { userId },
    onSuccess: slice.actions.bugAssignedToUser.type
})

export const resolveBug = bugId => apiCallBegan({ url: url+ "/" + bugId, method:'patch', data: { resolved:true },
    onSuccess: slice.actions.bugResolved.type
})


export default slice.reducer;

export const {bugAdded, bugRemoved, bugResolved} = slice.actions;

