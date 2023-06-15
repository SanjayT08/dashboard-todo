import styles from "./Login.module.css";
import { FaUserAlt, FaKey } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

type UserInfo = {
  username: string;
  password: string;
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<UserInfo>({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  // const [isLoggedin, setIsLoggedin] = useState(false)

  // const [errorMessage, setErrorMessage] = useState();

  const handleVisible = () => setVisible(!visible);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newData = JSON.stringify(formData);

      const { data } = await axios.post(
        "http://localhost:5000/users",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );
     
       
      localStorage.setItem("user", JSON.stringify(data));
      // setIsLoggedin(true);
      setFormData({
        username: "",
        password: "",
      });
      
    
    } catch (error) {
      console.log(error);
    }
    navigate('/dashboard') 
  };



  const { username, password } = formData;

  const isValid = username && password;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <h2>Login</h2>
        <div className={styles.form__control}>
          <label htmlFor="username">Username</label>
          <div className={styles.form__input}>
            <FaUserAlt />
            <input
              id="username"
              name="username"
              placeholder="John Doe"
              type="text"
              onChange={handleOnChange}
              value={username}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.form__control}>
          <label htmlFor="password">Password</label>
          <div className={styles.form__input}>
            <FaKey />
            <input
              id="password"
              name="password"
              placeholder="**************"
              type={visible ? "text" : "password"}
              onChange={handleOnChange}
              value={password}
              autoComplete="off"
            />
            <div className={styles.eye} onClick={handleVisible}>
              {!visible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          
          className={`${
            isValid
              ? `${styles.login__button}`
              : `${styles.login__button_inactive}`
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;