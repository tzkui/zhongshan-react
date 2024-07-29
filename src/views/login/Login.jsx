import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { getCode, loginApi } from "../../api/index";
import { SM4Util } from "sm4util";
const sm4 = new SM4Util();
function Login() {
  const [codeUrl, setCodeUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [codeKey, setCodeKey] = useState("")
  const addSercet = (str) => {
    return sm4.encryptCustom_ECB(str, "Wex!qaz@87667229")
  }
  const getCodeUrl = () => {
    getCode().then((res) => {
      setCodeUrl(res.data.image)
      setCodeKey(res.data.captchaKey)
    })
  }
  useEffect(()=>{
    getCodeUrl()
  },[])
  const doLogin = () => {
    let param = {
      username: addSercet(username),
      password: addSercet(password),
      code: addSercet(code),
      codeKey: addSercet(codeKey)
    }
    console.log("xxxxx",param)
    loginApi(param)
  }
  return (
    <div className={styles.loginbox}>
      <div className={styles.login}>
        <div className={styles.logintitle}>
          <img src="../../assets/image/login_logo.png" alt="" />
          <span>用户登录</span>
        </div>
        <div className={styles.logincontent}>
          <div className={styles.login_form_row}>
            <div className={styles.login_form_item}>
              <img src="../../assets/image/login_icon1.png" alt="" />
              <input type="text" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
          </div>
          <div className={styles.login_form_row}>
            <div className={styles.login_form_item}>
              <img src="../../assets/image/login_icon2.png" alt="" />
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
          </div>
          <div className={styles.login_form_row}>
            <div className={styles.login_form_item}>
              <img src="../../assets/image/login_icon3.png" alt="" />
              <input type="text" value={code} onChange={e=>setCode(e.target.value)} />
            </div>
            <div className={styles.login_code} onClick={getCodeUrl}>
              <img src={codeUrl} alt="" />
            </div>
          </div>
          <div className={styles.login_btn} onClick={doLogin}>登录</div>
        </div>
      </div>
    </div>
  );
}
export default Login;
