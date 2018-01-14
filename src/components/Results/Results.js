import React, {Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import './Results.css';

class Results extends Component{

    constructor(props) {
        super(props);
        this.state = {
            users : this.props.users,
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
                    Header: 'Code',
                    accessor: 'code'
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
    
    render(){
        return(
            <div className="table">
                 <ReactTable
                    data = {this.state.users}
                    columns={this.state.columns}
                    defaultPageSize = {this.state.users.length}
                    showPaginationBottom = {false}
                    sortable = {false}
                    multiSort = {false}
                    pageSize = {this.state.users.length}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users
    }
}

export default connect(mapStateToProps, null)(Results);