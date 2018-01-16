import React, {Component  } from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions/adminActions';


import './Results.css';

class Results extends Component{
    static contextTypes = {
        redux: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            applicants : this.props.applicants,
            columns : [
                {
                    Header: 'First Name',
                    accessor: 'firstname'
                },
                {
                    Header: 'Last Name',
                    accessor: 'lastname'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Code',
                    accessor: 'code'
                },
                {
                    Header: 'Status',
                    accessor: 'status'
                }
            ]
        }
    }

    componentWillMount(){
        // let usersInfo = localStorage.getItem('users');

        // if(usersInfo !=null){
        //     this.setState({
        //         users : JSON.parse(usersInfo)
        //     });
        // }
    }

    componentDidMount(){
      // this.props.loadApplicants();
        this.props.actions.loadApplicants();
        console.log(this.context.redux.getState());
    }

    render(){
        return(
            <div className="table">
                <ReactTable
                    data = {this.props.applicants}
                    columns={this.state.columns}
                  //  defaultPageSize = {this.state.applicants.length}
                    showPaginationBottom = {true}
                    sortable = {false}
                    multiSort = {false}
                    //pageSize = {this.state.applicants.length}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        appicants: state.applicants
    }
}

function matchDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(adminActions, dispatch)

    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Results);