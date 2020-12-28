import React, {useEffect} from 'react'
import { connect } from "react-redux";
import { loadBugs, resolveBug } from '../store/bugs';


const mapStateToProps = state => ({bugs: state.entity.bugs.list.filter(bug=> !bug.resolved)});
const mapDispatchToProps = dispatch => ({
    loadBugs: ()=> dispatch(loadBugs()),
    resolveBug: (id) => dispatch( resolveBug(id))
})
const Bugs = (props) => {
    useEffect( ()=> { props.loadBugs();}, [])
    const handleDelete = bug=> {
        props.resolveBug( bug.id );
    }
    return (
        <div>
            <h1>Bugs</h1>
            <ul>
                { props.bugs.map( (bug, index) => (<li key={index} onClick={e=> handleDelete(bug)}> {bug.description}</li>))}
            </ul>
        </div>
    )
}

export default connect( mapStateToProps, mapDispatchToProps)(Bugs) 
