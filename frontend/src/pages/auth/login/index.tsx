// React
import { FormEvent, useEffect, useState } from 'react'

// Third party
import { isEqual } from 'lodash'
import { toast } from 'react-hot-toast'
import { ArrowRight, Eye, EyeClosed, Warning } from '@phosphor-icons/react'

// Local
import styles from '../styles.module.scss'
import { useRouter } from 'next/navigation'
import { renderBulets } from '../utils'
import { useLoginMutation } from '@/store/modules/auth/api'

const Login = () => {
  // State
  const [showPassword, setShowPassword] = useState('password')
  const [form, setForm] = useState<{
    email: string, password: string
  }>({ email: '', password: '' })

  // Hook
  const history = useRouter()
  const [loginAction, { isLoading: isLoginUserLoading, isSuccess, isError, data, error }] =
    useLoginMutation()

  useEffect(() => {
    console.log(error)
    if (error) {
      const err = error as any
      if (err?.data?.message)
        toast.error(err?.data?.message)
      else
        toast.error('Error ao tentar fazer o login')
      return
    }

    if (isSuccess) {
      sessionStorage.setItem('token', data?.token as string)
      history.push('/')
    }
  }, [data, isLoginUserLoading, isError, isSuccess])

  const handleShowPassword = () => {
    if (isEqual(showPassword, 'text'))
      setShowPassword('password')
    else
      setShowPassword('text')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!form['email'] || !form['password']) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    const data = {
      email: form['email'],
      password: form['password']
    }

    loginAction(data)
  }

  const handleMouseEnter = () => {
    document.querySelector('div#text-warning-id')?.classList.add(styles.textWarningActive)
  }

  const handleMouseLeave = () => {
    document.querySelector('div#text-warning-id')?.classList.remove(styles.textWarningActive)
  }

  return (
    <div className={styles.ContainerMain}>
      <div className={styles.contentMain}>
        <button className={styles.registerTo} onClick={() => history.push('/auth/register')}>
          <span>Registrar</span>
          <ArrowRight size={20} />
        </button>

        <div className={styles.containerWarning}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.warning}>
            <Warning size={25} />
          </div>
          <div id='text-warning-id' className={styles.textWarning}>
            <p>
              <span>Aviso de Privacidade:</span> Sua privacidade é importante para nós! Nossa aplicação não solicita informações sensíveis que possam comprometer você.
              É importante ressaltar que a aplicação foi desenvolvida estritamente para fins de estudo. Seu conforto e segurança são nossa prioridade.
            </p>
          </div>
        </div>


        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Ex: example@example.com'
            name='email'
            value={form['email']}
            onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
            required />
          <div className={styles.password}>
            <input
              type={showPassword}
              placeholder={renderBulets()}
              name='password'
              value={form['password']}
              onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
              required />
            {isEqual(showPassword, 'text') ?
              <Eye onClick={handleShowPassword} className={styles.iconShowPassword} size={20} /> :
              <EyeClosed onClick={handleShowPassword} className={styles.iconShowPassword} size={20} />
            }

          </div>

          <button type='submit' disabled={isLoginUserLoading}>{isLoginUserLoading ? 'Carregando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login