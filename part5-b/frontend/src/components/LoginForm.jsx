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
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
