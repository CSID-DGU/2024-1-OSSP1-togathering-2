import { postUserLogin } from 'apis/user/postUserLogin'
import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { USER_ACCESS_TOKEN_KEY, USER_REFRESH_TOKEN_KEY } from 'constants/user'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveLocalStorage } from 'utils/handleLocalStorage'
import { Root } from './styled'

export const UserLoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onClickLoginButton = () => {
    postUserLogin({ username, password })
      .then((res) => {
        if (res) {
          saveLocalStorage(USER_ACCESS_TOKEN_KEY, res.data.result.accessToken)
          saveLocalStorage(USER_REFRESH_TOKEN_KEY, res.data.result.refreshToken)
          navigate('/')
        }
      })
      .catch((res) => {
        if (res) {
          alert(res.response.data.message)
        }
      })
  }

  const onKeyPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickLoginButton()
    }
  }

  const onClickSocialLoginButton = () => {
    alert('아직 지원하지 않는 기능입니다.')
  }

  return (
    <Root>
      <Header showLogo={true} />
      <div className="Mainframe">
        <div className="PageTitle">LOGIN</div>
        <div className="LoginBox">
          <input
            className="InputBox"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="ID"
            type="text"
            placeholder="아이디 또는 이메일"
          />
          <input
            className="InputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="PW"
            type="password"
            placeholder="패스워드"
            onKeyDown={onKeyPressEnter}
          />
          <input className="LoginButton" type="submit" value="Log In" onClick={onClickLoginButton} />
        </div>
        <div className="DivLine"></div>
        <button className="SNSLogin" onClick={onClickSocialLoginButton}>
          소셜 로그인
        </button>
        <div className="GotoFindPW">
          {/* <Link className="LinkStyle" to="/">
            비밀번호를 잊으셨나요?
          </Link> */}
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
