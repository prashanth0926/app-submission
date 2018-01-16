import React, {Component} from 'react';
import { connect } from 'react-redux';

import './CodeSubmission.css';
import logo from '../../logo.svg';

import {onCodeSubmit, OnaddingCode} from "../../actions/code";

class CodeSubmit extends Component{

    constructor(props) {
        super(props);
        this.state = {
           code : ''
        }

        this.onClick = this.onClick.bind(this);

    }

    handleChange = event => {
        this.setState({
            code:event.target.value
        });

    }

    handleClose = () => {
        this.setState({
            code: ''
        });
    }
    onClick = (event) => {
        event.preventDefault();
            this.props.OnaddingCode(true);
            let userCode = {
               code : this.state.code,
               _id:this.props.match.params.id
            }
            this.props.onCodeSubmit(userCode);

        };
    componentWillReceiveProps(nextProps) {
        if (!nextProps.addingCode) {
            this.handleClose();
        }
    }

    //console.log(this.props.match.params.id) -> parameters in the URL;

    render(){
        console.log(this.props.codeSubmitError);
        if(this.props.codeSubmitted){
            return (<div> CODE SUBMITTED </div>);
        }/* error here when moving from application page to code page */
        else if(this.props.codeSubmitError.length>0){
            return (<div>{this.props.codeSubmitError} </div>);
        }
       return(
            <div className="container">
                <form className="well" onSubmit={this.onClick} noValidate>
                        <legend>Submit Filler Code here</legend>
                        <div className="form-group">
                            <label>Code</label>
                            <textarea
                                id="code"
                                className="form-control"
                                rows="15"
                                placeholder="Enter Code here"
                                value={this.state.code}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input className=" btn btn-lg btn-success"  type="submit" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        addingCode : state.user.addingCode,
        codeSubmitted : state.user.codeSubmitted,
        codeSubmitError:state.user.codeSubmitError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCodeSubmit: (userCode) => dispatch(onCodeSubmit(userCode)),
        OnaddingCode : (add) => dispatch(OnaddingCode(add))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeSubmit);