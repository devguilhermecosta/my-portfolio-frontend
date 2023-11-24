export default function LoginForm(): JSX.Element {
  return (
    <form name='login_form' id='login_form'>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
    </form>
  )
}