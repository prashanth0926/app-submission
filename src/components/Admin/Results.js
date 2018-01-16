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

    componentWillReceiveProps(nextProps){
        console.log('applicants1: ', this.props.applicants);
        if (JSON.stringify(this.props.applicants) !== JSON.stringify(nextProps.applicants)) {
            this.setState({
                applicants: nextProps.applicants
            });
        }
        // if( this.props.applicants && (this.props.applicants.length !== nextProps.applicants.length)){
        //     this.props.applicants = nextProps.applicants;
        //     console.log('applicants2: ',nextProps.applicants);
        // }
    }

    componentDidMount(){
      // this.props.loadApplicants();
        this.props.actions.loadApplicants();
        // console.log(this.context.redux.getState());
    }

    filterPendingApplications() {
        const data = this.state.applicants;
        data.filter(applicant => {return applicant.status === 'Pending'});
        this.setState({applicants: data});
    }

    filterData(filter) {
        this.setState({applicants: this.props.applicants});
    }

    render(){
        return(
            <div>
                <div>
                    <button onClick={this.filterData.bind(this)}>All</button>
                    <button onClick={this.filterPendingApplications.bind(this)}>Pending</button>
                </div>
                <div className="table">
                <ReactTable
                    data = {this.state.applicants}
                    columns={this.state.columns}
                  //  defaultPageSize = {this.state.applicants.length}
                    showPaginationBottom = {true}
                    sortable = {false}
                    multiSort = {false}
                    //pageSize = {this.state.applicants.length}
                />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        applicants: state.admin.applicants
    }
}

function matchDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(adminActions, dispatch)

    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Results);