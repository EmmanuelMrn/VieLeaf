import React, { Component } from "react";
import "whatwg-fetch";
import { Link } from "react-router-dom";
import moment from "moment";
import { getFromStorage, setInStorage } from "../../utils/storage";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isActive: false,
      isActiveModal: false,
      items:[],
      showModal: false, 
    };

    this.logout = this.logout.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('the_main_app')) {
      this.setState({isActive: true}, function() {
      })
    }

    //this.interval = setInterval(()=> this.updatethings(),2000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }
  
  /*
  updatethings(){
    fetch('/api/account/agendaarrayaproved?token='+localStorage.getItem('Auth'), {method:'GET'})
      .then(res => res.json())
      .then(json1 => {
        this.setState({
          items : json1,
        });
      });
      console.log('Arriba el TEC')
  }
  */
 
  onEditProfile() {
  const {
    signUpEmail,
    signUpFirstName,
    signUpLastName,
    signUpPassword
  } = this.state;
  fetch(
    "/api/account/editprofile?token=" +
      signUpEmail +
      "&token2=" +
      signUpFirstName +
      "&token3=" +
      signUpLastName +
      "&token4=" +
      signUpPassword +
      ""
  )
    .then(res => res.json())
    .then(json6 => {
      if (json6.success) {
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
    alertify.success("Edited profile");
  }

  onDelete() {
    const { signUpEmail } = this.state;
    fetch("/api/account/deleteaccount?token=" + signUpEmail + "");
    this.toggleModal();
    alertify.error("Your account was deleted");
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    localStorage.removeItem('the_main_app');
    localStorage.removeItem('email');
    localStorage.removeItem('Auth');
    localStorage.removeItem('Rol');
    window.location=('/login')
    alertify.warning("Closed session");
  }

  toggleModal() {
    console.log("qweq");
    this.setState({
      isActiveModal: !this.state.isActiveModal,
      signUpEmail: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpPassword: ""
    });
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    console.log("test");
    this.setState({ showModal: false });
  }
  
  render() {
    const {
      isLoading,
      isActive,
    } = this.state;

    function alerta() {
      if (localStorage.getItem('Role')=="Nutriologist") {
        return (
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-bell fa-fw"></i>
              <span className="badge badge-danger"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown">
            </div>
          </li>
        )
      }
    }

    var ClientsData = Array.from(this.state.items);

    if (isActive && localStorage.getItem('Rol')=="Cliente") {
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="/">VieLyf</a>
            <a href="#menu-toggle" className="btn " id="menu-toggle" 
            onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              } }><i className="fa fa-bars" ></i></a>
              <a style={{color:'#0676f8'}} className="toggle" onClick={
                      function(e) {
                            $(".sidebar").toggleClass('active');
                        
                        }
                        // $(".cancel").click(function () {
                        //   console.log("toggling visibility");
                        //     $(this).parent().toggleClass('gone');
                        
                        // });
                      
                    } ><i style={{color:'#0676f8'}} className="fa fa-bell"></i></a>
              <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav ml-auto ml-md-0">
                {alerta()}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editProfileModal" onClick={this.toggleModal} >Edit profile</a> 
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.logout}>Log out</a>       
                  </div>
                </li>
              </ul>
              </nav>
              {/* <div class="sidebar">
                  <h2>Notifications</h2>
                  <div class="notibox">
                    Wash the Car
                    <div class="cancel">✕</div>
                  </div>
                  <div class="notibox">
                    Do Laundry
                    <div class="cancel">✕</div>
                  </div>
                  <div class="notibox">
                    Feed the Cat
                    <div class="cancel">✕</div>
                  </div>
               </div>
           */}
           <div className="sidebar">
                  <h2>Notifications</h2>
                  <div className="news_inner">
                  { ClientsData.map(function(client, aceptar, negar, handleClick, isToggleOn){
                    var dia = new Date(client.startDateTime).getDay();
                    var anio = new Date(client.startDateTime).getFullYear();
                    var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                    var diferencia = new Date(client.startDateTime).getHours() - new Date(client.endDateTime).getHours();
                    console.log(moment.duration(diferencia, "hours").humanize())
                      return( 
                        <div style={{color: '#fff'}} key={client._id} className="news_item">
                            <a><h4>{client.name}</h4></a>
                            <a><h6>{"Para: "+dia+ " de " + monthMinusOneName + " del " + anio}</h6></a>
                            <a><h6>{"Con una duracion de "+moment.duration(diferencia, "hours").humanize()}</h6></a>
                            <button type="button" id='hide' name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch("/api/account/editagenda?token="+client._id)
                            }}>Accept</button>
                            <button type="button" name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id)
                                $(".cancel").click(function () {
                                  console.log("toggling visibility");
                                    $(this).parent().toggleClass('gone');
                                });
                              
                            }}>Deny</button>
                            <div className="cancel" onClick={
                      function(e) {
                        $(".cancel").click(function () {
                          console.log("toggling visibility");
                            $(this).parent().toggleClass('gone');
                        });
                      }
                    } >✕</div>
                        </div>
                        )
                    })}
                    </div>
                  {/* <div class="notibox">
                    cita dummie
                    <div class="cancel" onClick={
                      function() {
                        $(".cancel").click(function () {
                          console.log("toggling visibility");
                            $(this).parent().toggleClass('gone');
                        });
                      }
                    } >✕</div> */}
                  {/* </div> */}
               </div>
              <div id="wrapper">
                <div id="sidebar-wrapper">
                  <ul className="sidebar-nav">
                      <li className="sidebar-brand">
                          <a href="/vistacliente">
                              Profile
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Diary</Link>
                    </li>
                    <li>
                      <Link id="nutri" to="/nutritionalblog" onClick={ $('#menu-toggle').click() }>Nutrirional Blog</Link>
                    </li>
                    <li>
                      <Link to="/catalogueNutriologist" onClick={ $('#menu-toggle').click() }>Nutriologist Catalogue</Link>
                    </li>
                    <li>
                      <Link to="/charts" onClick={ $('#menu-toggle').click() }>Charts</Link>
                    </li>
                    <li>
                      <Link to="/diet" onClick={ $('#menu-toggle').click() }>Diet</Link>
                    </li>
                    </ul>
                  </ul>
                </div>
              </div>  
            </header>
      )
    } else if (isActive && localStorage.getItem('Rol')=="Nutriologo") {
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
            <a className="navbar-brand mr-1" href="/">VieLyf</a>
            <a href="#menu-toggle" className="btn " id="menu-toggle" 
            onClick={ function(e) {
              e.preventDefault();
              $("#wrapper").toggleClass("toggled")
              } }><i className="fa fa-bars" ></i></a>
              <a style={{color:'#0676f8'}} className="toggle" onClick={
                      function(e) {
                            $(".sidebar").toggleClass('active');
                        
                        }
                        // $(".cancel").click(function () {
                        //   console.log("toggling visibility");
                        //     $(this).parent().toggleClass('gone');
                        
                        // });
                      
                    } ><i style={{color:'#0676f8'}} className="fa fa-bell"></i></a>
              <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav ml-auto ml-md-0">
                {alerta()}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user-circle fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editProfileModal" onClick={this.toggleModal} >Edit profile</a> 
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" onClick={this.logout} >Logout</a>       
                  </div>
                </li>
              </ul>
            </nav>
              

           <div className="sidebar">
                  <h2>Notifications</h2>
                  <div className="news_inner">
                  { ClientsData.map(function(client, aceptar, negar, handleClick, isToggleOn){
                    var dia = new Date(client.startDateTime).getDay();
                    var anio = new Date(client.startDateTime).getFullYear();
                    var monthMinusOneName =  moment().subtract(new Date(client.startDateTime).getMonth(), "month").startOf("month").format('MMMM');
                    var diferencia = new Date(client.startDateTime).getHours() - new Date(client.endDateTime).getHours();
                    console.log(moment.duration(diferencia, "hours").humanize())
                      return( 
                        
                        <div style={{color: '#fff'}} key={client._id} className="news_item cancel">
                        <br/>
                            <a><h4>{client.name}</h4></a>
                            <a><h6>{"Para: "+dia+ " de " + monthMinusOneName + " del " + anio}</h6></a>
                            <a><h6>{"Con una duracion de "+moment.duration(diferencia, "hours").humanize()}</h6></a>
                            <button type="button" id='hide' name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch("/api/account/editagenda?token="+client._id)
                            }}>Accept</button>
                            <button type="button" name="" className="btn btn-dark" onClick={function aceptar() {
                              fetch('/api/account/deleteagenda?token='+client._id)
                              $(this).parent().toggleClass('gone');
                            }}>Deny</button>
                        </div>
                        )
                    })}
                    </div>
                  {/* <div class="notibox">
                    cita dummie
                    <div class="cancel" onClick={
                      function() {
                        $(".cancel").click(function () {
                          console.log("toggling visibility");
                            $(this).parent().toggleClass('gone');
                        });
                      }
                    } >✕</div> */}
                  {/* </div> */}
               </div>
              <div id="wrapper">
                <div id="sidebar-wrapper">
                  <ul className="sidebar-nav">
                      <li className="sidebar-brand">
                          <a href="/vistanutriologo">
                                Profile
                          </a>
                      </li>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li>
                      <Link to="/agenda" onClick={ $('#menu-toggle').click() }>Diary</Link>
                    </li>
                    <li>
                      <Link id="nutri" to="/nutritionalblog" onClick={ $('#menu-toggle').click() }>Nutrirional Blog</Link>
                    </li>
                    <li>
                      <Link to="/catalogueNutriologist" onClick={ $('#menu-toggle').click() }>Nutriologist Catalogue</Link>
                    </li>
                    <li>
                      <Link to="/charts" onClick={ $('#menu-toggle').click() }>Charts</Link>
                    </li>
                    <li>
                      <Link to="/transition" onClick={ $('#menu-toggle').click() }>Diet</Link>
                    </li>
                    </ul>
                  </ul>
                </div>
              </div> 
              
              {this.state.isActiveModal ? (
                <Modal onRequestClose={this.toggleModal} isOpen={this.state.isActiveModal} style={customStyles}>
                  <p>Edit profile</p>
                  <input
                    type="firstName"
                    name="signUpFirstName"
                    placeholder="Nombre"
                    value={this.state.signUpFirstName}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <input
                    type="lastName"
                    name="signUpLastName"
                    placeholder="Apellido"
                    value={this.state.signUpLastName}
                    onChange={this.handleInputChange}
                  />
                  <br />
                  <input
                    type="email"
                    name="signUpEmail"
                    placeholder="Correo electronico"
                    value={this.state.signUpEmail}
                    onChange={this.handleInputChange}
                  />
                  <br />
  
                  <input
                    type="password"
                    name="signUpPassword"
                    placeholder="Contraseña"
                    value={this.state.signUpPassword}
                    onChange={this.handleInputChange}
                  />
  
                  <br />
                  <button
                  id="btnEdit"
                  type="button"
                  className="btn btn-dark"
                  onClick={this.onEditProfile}>
                    Submit changes
                  </button>
  
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={this.onDelete}>
                      Delete Account
                  </button>
                  <button onClick={this.toggleModal}>Cancel</button>
                </Modal>
              ) : (
                ""
              )}

            </header>
      )
    } else {

    return(
      <header>
           <nav className="navbar bg-dark text-white">
             <Link to="/" className="navbar-brand text-white">VieLyf</Link>      
               <Link to="/nutritionalBlog" className="text-white">Nutritional Blog</Link>
               <Link to="/catalogueNutriologist" className="text-white">Nutritionist Catalogue</Link>
             <div>
               <Link to="/signup" className="navbar-brand text-white">Sign up</Link>
               <Link to="/login" className="navbar-brand text-white">Log in</Link>
             </div>
           </nav>
         </header>
    );
  }
  }
}

export default Header;
