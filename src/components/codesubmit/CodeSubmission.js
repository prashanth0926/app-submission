import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CodeSubmission.css';
import { RingLoader } from 'react-spinners';
import {onCodeSubmit, OnaddingCode} from "../../actions";


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
    /* clears code field*/
    handleClose = () => {
        this.setState({
            code: ''
        });
    }

    /* triggered on code submit button click*/
    onClick = (event) => {
        event.preventDefault();
        this.props.OnaddingCode(true);
        let userCode = {
           code : this.state.code,
           _id:this.props.match.params.id
        }
        this.props.onCodeSubmit(userCode);
    }
    
    componentWillReceiveProps(nextProps) {
        if (!nextProps.addingCode) {
            this.handleClose();
        }
    }

    //console.log(this.props.match.params.id) -> parameters in the URL;

    render(){
        if(this.props.loading) {
            return (<div className='sweet-loading'>
                <RingLoader
                    color={'#A9A9A9'} 
                    loading={this.props.loading} 
                    />
                </div>)
        }
        /* rendered on successfull submission*/
        else if(this.props.codeSubmitted){
            return (<div className={"codeSubmitFeedback"}> YOUR CODE IS SUBMITTED SUCCESSFULLY.</div>);
        }
        /* rendered On error*/
        else if( this.props.codeSubmitError && this.props.codeSubmitError.length>0){
            return (<div className={"codeSubmitFeedback"}>{this.props.codeSubmitError} </div>);
        }
       return(
           /* continer with placeholder for code text*/
            <div className="container">
                <form className="well" onSubmit={this.onClick} noValidate>
                    <legend>Submit Your Code here</legend>
                    <div className="form-group">
                        <textarea
                            id="code"
                            className="form-control"
                            rows="15"
                            placeholder="Enter Code here"
                            value={this.state.code}
                            onChange={this.handleChange}
                        />
                    </div>
                    <input className=" btn btn-lg btn-success center-block"  type="submit" />
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        addingCode : state.user.addingCode,
        codeSubmitted : state.user.codeSubmitted,
        codeSubmitError:state.user.codeSubmitError,
        loading : state.user.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCodeSubmit: (userCode) => dispatch(onCodeSubmit(userCode)),
        OnaddingCode : (add) => dispatch(OnaddingCode(add))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeSubmit);