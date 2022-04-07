import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import authService from "../services/auth.service";
import typeService from "../services/type.service";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
}
// const dismatchpassword = () => {
//   return (
//     <div className="alert alert-danger" role="alert">
//       Passwords did'nt match.
//     </div>
//   )
// }

const Register = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [utype, setUType] = useState();
  const [password, setPassword] = useState();
  // const [confirmpassword, setConfirmPassword] = useState();
  const [types, setTypes] = useState([]);
  const [error, setError] = useState()

  useEffect(() => {
    typeService.getTypes().then(response => {
      if(response.status === 200) {
        console.log('types received.');
        setTypes(response.data.types);
      } else {
          setError(`No type founded`);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('username', username);
    console.log('email', email);
    console.log('birthdate', birthDate);
    console.log('utype', utype);
    console.log('password', password);

    authService.register(
      username, email, birthDate.toISOString().slice(0,19).replace('T', ' '), utype, password
    ).then(response => {
      console.log('reponse', response)
    })
    // if(password !== confirmpassword) {
    //   dismatchpassword()
    // }
    // alert(`submiting ${username}`)
  }

  return (
    <div className="container">
      <h2 className="text-center">CREATE YOUR PROFILE</h2>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type='text'
                className='form-control'
                name='username'
                value={username}
                onChange={u => setUsername(u.target.value)}
                validations={[required, vusername]}
              />
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="email">Email</label>
                <Input
                  type='text'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={u => setEmail(u.target.value)}
                  validations={[required, vemail]}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="birthDate">Birth Date</label>
                <DatePicker
                  selected={birthDate}
                  className='form-control'
                  name='birthDate'
                  // value={birthDate}
                  onChange={u => setBirthDate(u)}
                  validations={[required]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 col-sm-6">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={u => setPassword(u.target.value)}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-sm-6">
                <label htmlFor="confirmpassword">Confirm Password</label>
                {/* <Input
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={u => setConfirmPassword(u.target.value)}
                  validations={[required, vpassword, dismatchpassword]}
                /> */}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <ul>
              {
                types.length > 0
                ?
                types.map((t, index) => {
                  return ( 
                    <div key={index} className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="type" value={t.id} onChange={u => setUType(u.target.value)} />
                      <label className="form-check-label" htmlFor="type">
                        {t.name}
                      </label>
                    </div>
                  )
                })
                :
                <h2>{error}</h2>
              }
            </ul>
          </div>
          <input style={{textAlign: "center"}} type="submit" value="Submit" />
        </div>
      </Form>
    </div>
  )
}
//};
//export default className Register extends Component {
//  constructor(props) {
//    super(props);
//    this.handleRegister = this.handleRegister.bind(this);
//    this.onChangeUsername = this.onChangeUsername.bind(this);
//    this.onChangeEmail = this.onChangeEmail.bind(this);
//    this.onChangePassword = this.onChangePassword.bind(this);
//    this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
//    this.state = {
//      username: "",
//      email: "",
//      password: "",
//      birthdate: "",birthdate
//      successful: false,
//      message: ""
//    };
//  }
//  onChangeUsername(e) {
//    this.setState({
//      username: e.target.value
//    });
//  }
//  onChangeEmail(e) {
//    this.setState({
//      email: e.target.value
//    });
//  }
//  onChangePassword(e) {
//    this.setState({
//      password: e.target.value
//    });
//  }
//  onChangeBirthdate(e) {
//    this.setState({
//      birthdate: e.target.value
//    })
//  }
//  handleRegister(e) {
//    e.preventDefault();
//    this.setState({
//      message: "",
//      successful: false
//    });
//    this.form.validateAll();
//    if (this.checkBtn.context._errors.length === 0) {
//      AuthService.register(
//        this.state.username,
//        this.state.email,
//        this.state.password
//      ).then(
//        response => {
//          this.setState({
//            message: response.data.message,
//            successful: true
//          });
//        },
//        error => {
//          const resMessage =
//            (error.response &&
//              error.response.data &&
//              error.response.data.message) ||
//            error.message ||
//            error.toString();
//          this.setState({
//            successful: false,
//            message: resMessage
//          });
//        }
//      );
//    }
//  }
//  render() {
//    const [startDate, setStartDate] = useState(new Date());
//    return (
//      <div className="container">
//        <Form
//          onSubmit={this.handleRegister}
//          ref={c => {
//            this.form = c;
//          }}
//        >
//          {!this.state.successful && (
//            <Fragment>
//              <h2 style={{fontSize: 30, textAlign: "center"}}>Create your profile</h2>
//              <div className="row">
//                <div className="col-sm-12 col-md-6 col-lg-6">
//                  <div className="form-group">
//                    <label htmlFor="username">Username</label>
//                    <Input
//                      type="text"
//                      className="form-control"
//                      name="username"
//                      value={this.state.username}
//                      onChange={this.onChangeUsername}
//                      validations={[required, vusername]}
//                    />
//                  </div>
//                  <div className="row">
//                    <div className="col-sm-12 col-md-6 col-lg-6">
//                      <div className="form-group">
//                        <label htmlFor="username">Ville</label>
//                        <Input
//                          type="text"
//                          className="form-control"
//                          name="username"
//                          value={this.state.username}
//                          onChange={this.onChangeUsername}
//                          validations={[required, vusername]}
//                        />
//                      </div>
//                    </div>
//                    <div className="col-sm-12 col-md-6 col-lg-6">
//                      <div className="form-group">
//                        <label htmlFor="username">Date de naissance</label>
//                        {/* <Input
//                          type="text"
//                          className="form-control"
//                          name="birthdate"
//                          value={this.state.birthdate}
//                          onChange={this.onChangeBirthdate}
//                          validations={[required]}
//                        /> */}
//                        <DatePicker name="birthdate" selected={new Date()} onChange={this.onChangeBirthdate} />
//                      </div>
//                    </div>
//                  </div>
//                  <div className="form-group">
//                    <label htmlFor="email">Email</label>
//                    <Input
//                      type="text"
//                      className="form-control"
//                      name="email"
//                      value={this.state.email}
//                      onChange={this.onChangeEmail}
//                      validations={[required, email]}
//                    />
//                  </div>
//                  <div className="form-group">
//                    <label htmlFor="password">Password</label>
//                    <Input
//                      type="password"
//                      className="form-control"
//                      name="password"
//                      value={this.state.password}
//                      onChange={this.onChangePassword}
//                      validations={[required, vpassword]}
//                    />
//                  </div>
//                </div>
//                <div className="col-sm-12 col-md-6 col-lg-6">
//                  <h3>zebi</h3>
//                </div>
//              </div>
//              <div className="text-center" style={{border: '1px solid'}}>
//                <button className="btn btn-primary btn-lg btn-block">Sign Up</button>
//              </div>
//            </Fragment>
//          )}
//          {this.state.message && (
//            <div className="form-group">
//              <div
//                className={
//                  this.state.successful
//                    ? "alert alert-success"
//                    : "alert alert-danger"
//                }
//                role="alert"
//              >
//                {this.state.message}
//              </div>
//            </div>
//          )}
//          <CheckButton
//            style={{ display: "none" }}
//            ref={c => {
//              this.checkBtn = c;
//            }}
//          />
//        </Form>
//      </div>
//    );
//  }
//}
//

export default Register;