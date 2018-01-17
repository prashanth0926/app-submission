import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Redirect } from "react-router";
import './Home.css';
import logo from '../../logo.svg';
import { RingLoader } from 'react-spinners';

import { onSubmit } from '../../actions';

/* validates text fields firstname,lastname,email,zipcode*/
function validate(e){
    // regular expression from https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const ans= re.test(e.email);
    return {
        firstname: e.firstname.length === 0,
        lastname: e.lastname.length === 0,
        email: e.email.length === 0 || !ans,
        zipcode: e.zipcode.length === 0,
    }
}
class Home extends Component{
        constructor(props) {
        super(props);
        this.state = {
           user: {
               firstname: '',
               lastname: '',
               email: '',
               zipcode: '',
               code: '',
           },
            touched: {
                firstname:false,
                lastname:false,
                email: false,
                zipcode: false,
            },
            submitted:false,
            errorClassName : false,
            errorFromServer:false,
        },
        this.onClick = this.onClick.bind(this)
    }
    
    handleChange = event => {

        switch(event.target.id){
            case 'firstname' :

                this.setState({
                    user :{...this.state.user,firstname:event.target.value} ,
                    touched: { ...this.state.touched, firstname: true }
                });

                break;
            case 'lastname' :
                this.setState({
                    user :{...this.state.user,lastname:event.target.value}
                });
                break;
           case 'email':
                this.setState({
                    user :{...this.state.user,email:event.target.value}
                });
                break;
            case 'zipcode':
                this.setState({
                    user :{...this.state.user,zipcode:event.target.value}
                });
                break;
            default :
                this.setState( prevState => {
                    return prevState;
                });
        }
    }
    /* clears the application fields when useradding action is processed and Useradd is dispatched in actions */

  /*     handleClose = () => {
        this.setState({
            user: {
                firstname: '',
                lastname: '',
                email: '',
                zipcode: '',
                code: '',
            },
            touched: {
                firstname:false,
                lastname:false,
                email: false,
                zipcode: false,
            },

            submitted:false,
            errorClassName : false,

        });
    }
*/

   componentWillReceiveProps(nextProps){
       if(nextProps.userAddError && nextProps.userAddError.length>0){
           this.setState({errorFromServer : true})
       }
       if(!nextProps.userAdding) {
           if (!nextProps.userAddError) {
               //this.handleClose();
               this.setState({submitted: true}); //when 'userAdding' action  is finished and submit button is pressed
           }
       }
    }

   onClick = (event) => {
        event.preventDefault();
        let Errors=validate(this.state.user);
        //if no erros for any of the fields
        if(!Errors.firstname && !Errors.lastname && !Errors.email && !Errors.zipcode){
            let user = {
                firstname : this.state.user.firstname,
                lastname : this.state.user.lastname,
                email: this.state.user.email,
                zipcode:this.state.user.zipcode,
                code:this.state.user.code
            }

           this.props.onSubmit(user) //onSubmit invokes backend call to persist applicant info and dispatches actions
        }else{
            this.setState({
                errorClassName : true
            });
        }
    }

    /* when key is entered in respective fields*/
   handleInput= (field) => () => {
        if(this.state.errorClassName){
            this.setState({errorClassName : false });
        }
        if(this.state.errorFromServer)
            this.setState({ errorFromServer : !this.state.errorFromServer});
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

   render(){
           if(this.props.loading) {
           return (<div className='sweet-loading'>
               <RingLoader
                   color={'#A9A9A9'}
                   loading={this.props.loading}
               />
           </div>)
       }

        if(this.state.submitted && this.props.id && !this.props.userAddError){
            const _id=this.props.id;
            return (<Redirect push to={`/code/${_id}`}/>)
        }

   const errors=validate(this.state.user);
        const isError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        return(
            <div className="container">
                <form className="well" onSubmit={this.onClick} noValidate>
                    <fieldset>
                        <legend> Application Info</legend>
                    <div className="form-group">
                        <div className="row ">
                        <label htmlFor="firstname" className="fieldLabel col-md-offset-2 float-right col-md-2 col-col-form-label">First Name</label>
                            <div className={"col-md-4"}>
                        <input
                            type="text"
                            className={["form-control",isError('firstname')?"error":""].join(' ')}
                            onInput={this.handleInput('firstname')}
                            id = "firstname"
                            value={this.state.user.firstname}
                            placeholder="Enter first name"
                            onChange={this.handleChange}
                             required={true}
                        />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={"row"}>
                        <label htmlFor="lastname " className={"fieldLabel col-md-offset-2 col-md-2 col-form-label"}>Last Name</label>
                        <div className={"col-md-4"}>
                        <input
                            className={["form-control",isError('lastname')?"error":""].join(' ')}
                            onInput={this.handleInput('lastname')}
                            id = "lastname"
                            type="text"
                            value={this.state.user.lastname}
                            placeholder="Enter last name"
                            onChange={this.handleChange}
                            required={true}
                        />
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={"row"}>
                        <label htmlFor="email" className={"fieldLabel col-md-offset-2 col-md-2 col-form-label"}> E-mail </label>
                        <div className={"col-md-4"}>
                        <input
                            className={["form-control",isError('email')?"error":""].join(' ')}
                            onInput={this.handleInput('email')}
                            id="email"
                            type="email"
                            value={this.state.user.email}
                            placeholder="Enter your e-mail id"
                            required={true}
                            onChange={this.handleChange}
                        />
                        </div>
                            <span className={[ "fieldLabel","col-md-3","pull-left",isError('email')?"errortext":"noerror"].join(' ')}>Enter a Valid Email address</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={"row"}>
                        <label htmlFor="zipcode" className={" fieldLabel col-md-offset-2 col-md-2 col-form-label"}>Zipcode</label>
                        <div className={"col-md-4"}>
                        <input
                            className={["form-control",isError('zipcode')?"error":""].join(' ')}
                            id="zipcode"
                            type="text"
                            value={this.state.user.zipcode}
                            placeholder="Zip code"
                            required={true}
                            onChange={this.handleChange}
                            onInput={this.handleInput('zipcode')}
                        />
                        </div>
                    </div>
                    </div>
                     <input style={{marginTop:'1.6em',marginBottom:'1em'}} className=" btn btn-lg  btn-success center-block"  type="submit" />
                     <p className={this.state.errorFromServer ? "errortext":"noerror"}> {this.props.userAddError}  </p>
                      <p style={{fontSize:'1em'}}className={ this.state.errorClassName  ? "errortext":"noerror"}> missing required fields </p>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        userAdding : state.user.userAdding,
        id : state.user.id,
        userAddError:state.user.userAddError,
        loading:state.user.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (user) => dispatch(onSubmit(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);