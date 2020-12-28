import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { loadBugs, getUnresolvedBugs, resolveBug } from '../store/bugs';

const BugsWithHook = () => {
    
    const dispatch = useDispatch();
    const bugs = useSelector( getUnresolvedBugs );
    //const bugs = useSelector( state => state.entity.bugs.list);
    // useEffect( () => {
    //     dispatch( loadBugs() );
    // }, [])
    const handleDelete = (bug)=> {
        dispatch( resolveBug( bug.id) );
    }
    return (
        <div>
            <h1>BugsWithHook</h1>
            <ul>
                { bugs.map( (bug, index) => (<li key={bug.id} onClick={e=>handleDelete(bug)}> {bug.description}</li>))}
            </ul>
        </div>
    )
}

export default BugsWithHook
