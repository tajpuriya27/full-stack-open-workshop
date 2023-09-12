const LoginForm = (props) => {
  console.log("Props from Login-from", props);
  const {
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
