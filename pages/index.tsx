import Link from 'next/link'
import style from '../styles/home.module.css';

export default function Home() {
  return (
    <div className={style.home}>
      <h1 className={style.title}>KA SHI WA</h1>
      <div className={style.signin_wrapper}>
        <div className={style.go_button_wrapper}>
          <div className={style.go_button}>
            <Link href="/signup">
              SignUp
            </Link>
          </div>
        </div>
      </div>
      <div className={style.signin_wrapper}>
        <div className={style.go_button_wrapper}>
          <div className={style.go_button}>
            <Link href="/signin">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
