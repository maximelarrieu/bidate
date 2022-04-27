import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import '../styles/navbar.css'
const NavBar = () => {
    const currentUser = authService.getCurrentUser();
    console.log('currentUser', currentUser)
    let navigate = useNavigate();

    const logout = async () => {
        return await authService.logout()
        // .then(async response => {
        //     console.log('response', response);
        //     navigate('/login')
        // })
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ms-5">
                <a className="navbar-brand" href="/">BIDATE</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/todate">Daters</a>
                    </li>
                </ul>
                <form className="d-flex">
                    {
                        currentUser !== null
                        ?
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown me-5">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    { currentUser.username }
                                </a>
                                <ul className="dropdown-menu me-5" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/login" onClick={logout}>Sign out</a></li>
                                </ul>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn btn-primary">
                                    <a href="/login">Sign in</a>
                                </button>
                            </li>
                        </ul>
                    }
                </form>
                </div>
            </div>
            </nav>
    )
}

export default NavBar;