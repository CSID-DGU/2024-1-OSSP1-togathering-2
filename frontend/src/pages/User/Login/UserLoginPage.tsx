import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { Link, useNavigate } from 'react-router-dom'
import { Root } from './styled'

export const UserLoginPage = () => {
  const navigate = useNavigate()

  const onClickLoginButton = () => {
    navigate('/')
  }

  const onKeyPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickLoginButton()
    }
  }

  return (
    <Root>
      <Header showLogo={true} />
      <div className="Mainframe">
        <div className="PageTitle">LOGIN</div>
        <form className="LoginBox">
          <input className="InputBox" name="ID" type="text" placeholder="아이디 또는 이메일" />
          <input className="InputBox" name="PW" type="password" placeholder="패스워드" onKeyDown={onKeyPressEnter} />
          <Link className="LinkStyle" to="/">
            <input className="LoginButton" type="submit" value="Log In" />
          </Link>
        </form>
        <div className="DivLine"></div>
        <Link className="LinkStyle" to="/">
          <button className="SNSLogin">소셜 로그인</button>
        </Link>
        <div className="GotoFindPW">
          <Link className="LinkStyle" to="/">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
      <div className="Subframe">
        계정이 없으신가요?
        <Link className="LinkStyle" to="/user/join">
          회원 가입
        </Link>
      </div>
      <TabBar />
    </Root>
  )
}
