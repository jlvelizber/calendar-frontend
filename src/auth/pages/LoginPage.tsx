import { useEffect } from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";
import { UserInterface } from "../../interfaces";
import Swal from "sweetalert2";

const LoginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const RegisterFormFields = {
  registerEmail: "",
  registerName: "",
  registerPassword: "",
  registerPasswordConfirm: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    
  } = useForm(LoginFormFields);
  const {
    registerEmail,
    registerName,
    registerPassword,
    registerPasswordConfirm,
    onInputChange: onRegisterInputChange,
  } = useForm(RegisterFormFields);


  /// register method

  const onRegisterSubmit = async (event: any) => {
    event.preventDefault();
    
    if(registerPassword !== registerPasswordConfirm)
    {
      Swal.fire('Las contraseñas no son iguales','error', 'error')
      return;
    }

    const paramsRegister: Partial<UserInterface> = {
      email: registerEmail,
      password: registerPassword,
      name: registerName
    } 

    await startRegister(paramsRegister);


  };



  // login method
  const onLoginSubmit = async (event: any) => {
    event.preventDefault();

    const paramsLogin: Partial<UserInterface> = {
      email: loginEmail as string,
      password: loginPassword as string,
    };

    await startLogin(paramsLogin);
  };


  // Show error
  useEffect(() => {
    if (errorMessage !== "") {
      Swal.fire(`Error en la autenticacion`, errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPasswordConfirm"
                value={registerPasswordConfirm}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
