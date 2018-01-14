import React, {Component } from 'react';
import { form , 
        Button, 
        FormGroup, 
        FormControl,
        Modal,
        Label } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Home.css';
import logo from '../../logo.svg';

import { onSubmit, onUserAdding } from '../../actions';

class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            lastname: '',
            code : '',
            showModal : false,
            errorClassName : 'noerror'
        }    
    }
    
    handleChange = event => {

        this.setState({
            errorClassName : 'noerror'
        });

        switch(event.target.id){
            case 'firstname' : 
                this.setState({
                    firstname : event.target.value
                });
                break
            case 'lastname' :
                this.setState({
                    lastname : event.target.value
                });
                break
            case 'code' :
                this.setState({
                    code : event.target.value
                });
                break;
            default :
                this.setState( prevState => {
                    return prevState;
                });
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.userAdding){
            this.handleClose();
        }
    }
    
    onClick = () => {
        if(this.state.firstname !== '' && this.state.lastname !== '' && this.state.code !== ''){
            this.setState({
                showModal : true
            });
            this.props.onUserAdding(true);
            let user = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                code : this.state.code
            }
            this.props.onSubmit(user);
        }else{
            this.setState({
                errorClassName : 'error'
            });
        }
    }

    handleClose = () => {
		this.setState({ 
            showModal: false,
            firstname : '',
            lastname: '',
            code: ''
        });
	}

    render(){
        return(
            <div>
                <form>
                    <div className="form-group">
                        <FormGroup>
                            <label>First Name</label>
                            <FormControl
                                    id = "firstname"
                                    type="text"
                                    value={this.state.firstname}
                                    placeholder="Enter first name"
                                    onChange={this.handleChange}
                            />
                            <label>Last Name</label>
                            <FormControl
                                    id = "lastname"
                                    type="text"
                                    value={this.state.lastname}
                                    placeholder="Enter last name"
                                    onChange={this.handleChange}
                            />
                            <label>Code</label>
                            <textarea 
                                id="code"
                                className="form-control" 
                                rows="15" 
                                placeholder="Enter Code"
                                value={this.state.code}
                                onChange={this.handleChange}
                            />
                            <Button 
                                bsStyle="primary" 
                                className="form-control" 
                                onClick = {this.onClick}>
                                Submit
                            </Button>
                            <Label className={this.state.errorClassName}>All Fields are required</Label>
                        </FormGroup>
                    </div>
                </form>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
					<Modal.Body>
                        <img src={logo} className="submit-logo" alt="logo" />
                        <h4>Submitting....</h4>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        userAdding : state.user.userAdding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (user) => dispatch(onSubmit(user)),
        onUserAdding: (adding) => dispatch(onUserAdding(adding))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);