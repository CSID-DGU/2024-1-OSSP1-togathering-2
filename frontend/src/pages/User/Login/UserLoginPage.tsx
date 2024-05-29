import { Root } from './styled'
import { Link } from 'react-router-dom'
import React from 'react'
import { TabBar } from 'components/TabBar'
import { Header } from 'components/Header'

export const UserLoginPage = () => {
  return (
    <Root>
      <Header showLogo={true} />
      <div className="Mainframe">
        <div className="PageTitle">LOGIN</div>
        <form className="LoginBox">
          <input className="InputBox" name="ID" type="text" placeholder="아이디 또는 이메일" />
          <input className="InputBox" name="PW" type="text" placeholder="패스워드" />
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
