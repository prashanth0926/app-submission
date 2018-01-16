import React, {Component  } from 'react';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions/adminActions';
import Modal from 'react-modal';


import './Results.css';

class Results extends Component{
    static contextTypes = {
        redux: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            pendingFlag: false,
            applicants : this.props.applicants,
            displayCodeModal: false,
            selectedRow: {},
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
                    accessor: 'code',
                    Cell: row => (
                        <div>
                            {
                                (row.original.status === 'Pending') ?
                                <a onClick={this.toggleModal.bind(this, row)}>{row.value}</a> :
                                <span>{row.value}</span>
                            }
                        </div>
                      ),
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
        if (this.props.applicants !== nextProps.applicants) {
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

    toggleModal(row) {
        this.setState({
            displayCodeModal: !this.state.displayCodeModal,
            selectedRow: row && row.original
        });
    }

    filterPendingApplications() {
        const data = this.props.applicants.filter(function(applicant) {
            return (applicant.status == 'Pending');
        });
        this.setState({
            pendingFlag: true,
            applicants: data
        });
    }

    resetFilter() {
        this.setState({pendingFlag: false, applicants: this.props.applicants});
    }

    updateAppStatus(status) {
        this.props.actions.changeStatus(this.state.selectedRow, status);
        this.toggleModal();
        this.setState({applicants: []}, () => { 
            this.state.pendingFlag ? this.filterPendingApplications() : 
            this.setState({applicants: this.props.applicants});
        });
    }

    render(){
        return(
            <div>
                <div>
                    <button className="btn btn-primary" onClick={this.resetFilter.bind(this)}>All</button>
                    <button className="btn btn-primary" onClick={this.filterPendingApplications.bind(this)}>Pending</button>
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
                <Modal isOpen={this.state.displayCodeModal} onRequestClose={this.toggleModal.bind(this)}>
                    <div>{this.state.selectedRow && this.state.selectedRow.code}</div>
                    <button onClick={this.updateAppStatus.bind(this, 'Accept')} className="btn btn-primary"> Accept </button>
                    <button onClick={this.updateAppStatus.bind(this, 'Reject')} className="btn btn-primary"> Reject </button>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        applicants: state.admin.applicants
    }
}

function matchDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(adminActions, dispatch)

    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Results);