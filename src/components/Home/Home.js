import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Redirect } from "react-router";
import './Home.css';
import logo from '../../logo.svg';

import { onSubmit, onUserAdding } from '../../actions';


function validate(e){
    // regular expression from https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ans= re.test(e.email);
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
            showModal : false,
            submitted:false,
            errorClassName : 'noerror',
        }
        this.onClick = this.onClick.bind(this);
    }
    
    handleChange = event => {

        this.setState({
            errorClassName : 'noerror'
        });

        switch(event.target.id){
            case 'firstname' :

                this.setState({
                    user :{...this.state.user,firstname:event.target.value} ,
                    touched: { ...this.state.touched, firstname: true }
                });

                break
            case 'lastname' :
                this.setState({
                    user :{...this.state.user,lastname:event.target.value}
                });
                break
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
    handleClose = () => {
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
            showModal : false,
            submitted:false,
            errorClassName : 'noerror',

        });
    }

   componentWillReceiveProps(nextProps){
        if(!nextProps.userAdding ){
            console.log("ddd",this.props , nextProps, this.state)
           this.handleClose();
            this.setState({submitted:true});
        }
    }


    onClick = (event) => {
        event.preventDefault();
        let Errors=validate(this.state.user);
        if(!Errors.firstname && !Errors.lastname && !Errors.email && !Errors.zipcode){
            this.setState({
                showModal : true
            });
            this.props.onUserAdding(true);
            let user = {
                firstname : this.state.user.firstname,
                lastname : this.state.user.lastname,
                email: this.state.user.email,
                zipcode:this.state.user.zipcode,
                code:this.state.user.code
            }
           this.props.onSubmit(user);
}else{
            this.setState({
                errorClassName : 'error'
            });
        }
    }

    handleInput= (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }
    render(){
    if(this.state.submitted){
        const _id=this.props.id;
        console.log(this.state,_id);
        return (<Redirect to={`/code/${_id}`}/>)
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
                        <legend>Application</legend>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            className={classNames("form-control",isError('firstname')?"error":"")}
                            onInput={this.handleInput('firstname')}
                            id = "firstname"
                            value={this.state.user.firstname}
                            placeholder="Enter first name"
                            onChange={this.handleChange}
                             required={true}
                        />
                        <span className={isError('firstname')?"errortext":"noerror"}>Enter your First name</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            className={classNames("form-control",isError('lastname')?"error":"")}
                            onInput={this.handleInput('lastname')}
                            id = "lastname"
                            type="text"
                            value={this.state.user.lastname}
                            placeholder="Enter last name"
                            onChange={this.handleChange}
                            required={true}
                        />
                        <span className={isError('lastname')?"errortext":"noerror"}>Enter your Last name</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"> E-mail </label>
                        <input
                            className={classNames("form-control",isError('email')?"error":"")}
                            onInput={this.handleInput('email')}
                            id="email"
                            type="email"
                            value={this.state.user.email}
                            placeholder="Enter your e-mail id"
                            required={true}
                            onChange={this.handleChange}
                        />
                        <span className={isError('email')?"errortext":"noerror"}>Enter a Valid Email address</span>

                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                            className={classNames("form-control",isError('zipcode')?"error":"")}
                            id="zipcode"
                            type="text"
                            value={this.state.user.zipcode}
                            placeholder="Zip code"
                            required={true}
                            onChange={this.handleChange}
                            onInput={this.handleInput('zipcode')}
                        />
                        <span className={isError('zipcode')?"errortext":"noerror"}>Enter your zip code</span>
                    </div>
                    <input className=" btn btn-lg btn-success"  type="submit" />
                     <p className={(this.props.userAddError.length>0)? "errortext":"noerror"}>{this.props.userAddError}</p>
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
        userAddError:state.user.userAddError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (user) => dispatch(onSubmit(user)),
        onUserAdding: (adding) => dispatch(onUserAdding(adding))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);