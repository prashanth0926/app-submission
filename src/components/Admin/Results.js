import React, {Component  } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import {bindActionCreators} from 'redux';
import * as adminActions from '../../actions';
import Modal from 'react-modal';

import './Results.css';
/* table uses react-table library and react-modal for modal */
class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingFlag: false,
            applicants: this.props.applicants,
            displayCodeModal: false,
            selectedRow: {},
            columns: [
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
                                (row.original.status === 'Pending' && this.state.pendingFlag) ?
                                    <a onClick={this.toggleModal.bind(this, row)}>View Code</a> :
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

    componentWillReceiveProps(nextProps) {
        if(this.state.pendingFlag){
            this.filterPendingApplications();
        }else {
            this.setState({
                applicants: nextProps.applicants
            })
        }
    }

    /* request to back-end server to load applicants info is given here*/
    componentDidMount() {
        this.props.actions.loadApplicants();
    }

    /*toggle modal*/
    toggleModal(row) {
        this.setState({
            displayCodeModal: !this.state.displayCodeModal,
            selectedRow: row && row.original
        });
    }
    /* applications pending for evaluation are put together*/
    filterPendingApplications() {
        const data = this.props.applicants.filter(function (applicant) {
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
    /* action method to update status through this*/
    updateAppStatus(status) {
        this.props.actions.changeStatus(this.state.selectedRow, status);
        this.toggleModal();
    }

    render() {
        if (this.props.loadApplicantsFail || this.props.updateStatusFail ) {
            return (<div> {this.props.loadApplicantsFail} ? {this.props.loadApplicantsFail}:{this.props.updateStatusFail}</div> )
        }
        /* modal dimensions*/
        const customStyles = {
            content : {
                top                   : '25%',
                left                  : '25%',
                right                 : '25%',
                bottom                : '25%',
            }
        };
        return (
            <div className="container-fluid">
                <div  style={{textAlign:'center'}}>
                    <button className="adminButtons  btn btn-primary" onClick={this.resetFilter.bind(this)}>All Applicants</button>
                    <button className="adminButtons  btn btn-primary" onClick={this.filterPendingApplications.bind(this)}>Pending Evaluations</button>
                </div>
                <div className="table">
                    <ReactTable
                        data={this.state.applicants}
                        columns={this.state.columns}
                        //  defaultPageSize = {this.state.applicants.length}
                        showPaginationBottom={true}
                        sortable={true}
                        multiSort={true}
                        //pageSize = {this.state.applicants.length}
                    />
                </div>
                <Modal style={customStyles} isOpen={this.state.displayCodeModal} onRequestClose={this.toggleModal.bind(this)}>
                    <div>{this.state.selectedRow && this.state.selectedRow.code}</div>
                    <button style={ {position:'absolute',bottom:'10%', left:'35%'}}onClick={this.updateAppStatus.bind(this, 'Accepted')} className="btn btn-success"> Accept </button>
                    <button  style={ {position:'absolute',bottom:'10%',left:'60%'} } onClick={this.updateAppStatus.bind(this, 'Rejected')} className="btn btn-danger"> Reject </button>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        loading: state.user.loading,
        applicants: state.admin.applicants,
        loadApplicantsFail: state.admin.loadApplicantsFail,
        updateStatusFail:state.admin.updateStatusFail
    }
}

function  matchDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(adminActions, dispatch)

    };
}
export default connect(mapStateToProps, matchDispatchToProps)(Results);
