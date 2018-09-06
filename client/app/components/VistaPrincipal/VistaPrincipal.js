import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

require("moment/locale/es.js");

class VistaPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      isLoading: true,
      signUpError: "",
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      items: [],
      token: "",
      UserProfile:[],
      goProfile:"Loading"
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value
      },
      function() {
      }
    );
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  UserProfile(UserNameRequest){
    fetch('/api/account/getUserByUserName?PathName='+UserNameRequest)
   .then(res => res.json())
   .then (json=> {
       if (json.doc == null){
           this.setState({
             goProfile:"NotFound"
           });
       }else{
         this.setState({
             UserProfile:json.doc,
             goProfile:"Found"
           });
       }
       
   });
  }
 
  ProfileNutritionist(){
     var user = this.state.UserProfile;
     return(
     <div className="container">
         <div className="row">
         
             <div className="col-4">
             <div className="col-md-6" align="center">
                 <br />
                     <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
             </div>
             <div className="col-md-6">
                     <p className="text-center"><strong>{user.FirstName} {user.LastName}</strong></p>
               <p className="text-center"><em>UserName: {user.Email}</em></p>
             </div>
 
             <div className="col-md-8">
               <br />
               <ul className="list-group list-primary">
                 <a className="list-group-item">First Name: {user.FirstName}</a>
                 <a className="list-group-item">Last Name: {user.LastName}</a>
                 <a className="list-group-item">Phone: {user.Phone}</a>
                 <a className="list-group-item">Email: {user.Email}</a>
             </ul>
           </div>   
             </div>
 
             
             <div className="col-8">
                 <br />
                 <div className="col-md-12" align="center">
                     <h3 align="center">Nutritionist Account<p><small>Profile's Content</small></p></h3>
                 </div>
                 <br />
                 <div className="card text-center">
                     <div className="card-header">
                         Featured
                     </div>
                     <div className="card-body">
                         <h5 className="card-title">Content</h5>
                         <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                         <a href="#" className="btn btn-primary">Go somewhere</a>
                     </div>
                     <div className="card-footer text-muted">
                         2 days ago
                     </div>
                 </div>
             </div>
             </div>           
     </div>
     )
  }

  ProfileClient(){
  var user = this.state.UserProfile;
  return(
  <div className="container">
      <div className="row">
      
          <div className="col-4">
          <div className="col-md-6" align="center">
              <br />
                  <img height='120px' src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"/>
          </div>
          <div className="col-md-6">
                  <p className="text-center"><strong>{user.FirstName} {user.LastName}</strong></p>
            <p className="text-center"><em>UserName: {user.Email}</em></p>
          </div>

          <div className="col-md-8">
            <br />
            <ul className="list-group list-primary">
              <a className="list-group-item">First Name: {user.FirstName}</a>
              <a className="list-group-item">Last Name: {user.LastName}</a>
              <a className="list-group-item">Phone: {user.Phone}</a>
              <a className="list-group-item">Email: {user.Email}</a>
          </ul>
        </div>   
          </div>

          
          <div className="col-8">
              <br />
              <div className="col-md-12" align="center">
                  <h3 align="center">Client Account<p><small>Profile's Content</small></p></h3>
                  
              </div>
              <br />
              <div className="card text-center">
                  <div className="card-header">
                      Featured
                  </div>
                  <div className="card-body">
                      <h5 className="card-title">Content</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                  <div className="card-footer text-muted">
                      2 days ago
                  </div>
              </div>
          </div>
          </div>           
  </div>
  )
  }

  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword,
      items,
      Name
    } = this.state;
    var ClientsData = Array.from(this.state.items);
    if (localStorage.getItem('Rol') == "Nutriologo") {
      return (
        <div>
            {this.ProfileNutritionist()}
        </div>
      );
    } else if (localStorage.getItem('Rol') == "Cliente") {
      return (
        <div>
            {this.ProfileClient()}               
        </div>
      );
    } else {
      return <div>No session found</div>;
    }
  }
}

export default VistaPrincipal;