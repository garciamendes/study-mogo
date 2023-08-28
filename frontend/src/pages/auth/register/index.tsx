// React
import { FormEvent, useState } from 'react'

// Third party
import { ArrowLeft, Eye, EyeClosed } from '@phosphor-icons/react'
import { isEqual, repeat } from 'lodash'

// Local
import styles from '../styles.module.scss'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { BULET_PLACEHOLDER, renderBulets } from '../utils'

const Register = () => {
  // State
  const [isCreateUserLoading, setIsCreateUserLoading] = useState(false)
  const [showPassword, setShowPassword] = useState('password')
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '', confirm_password: ''
  })

  // Hook
  const history = useRouter()

  const handleShowPassword = () => {
    if (isEqual(showPassword, 'text'))
      setShowPassword('password')
    else
      setShowPassword('text')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.stopPropagation()
    event.preventDefault()

    if (!form['email'] || !form['password'] || !form['confirm_password']) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    if (!isEqual(form['password'], form['confirm_password'])) {
      toast.error('As senhas não são iguais')
      return
    }

    if (form['password'].length < 8) {
      toast.error('Senha precisa ter mais de 8 caracteres')
      return
    }

    const data = {
      name: {
        first_name: form['first_name'],
        last_name: form['last_name'],
      },
      email: form['email'],
      password: form['password']
    }

    setIsCreateUserLoading(true)
    console.log(data)
    setIsCreateUserLoading(false)
  }

  return (
    <div className={styles.ContainerMain}>
      <div className={styles.contentMain}>
        <button className={`${styles.registerTo} ${styles.register}`} onClick={(event) => {
          event.stopPropagation()
          history.back()
        }}>
          <span>Login</span>
          <ArrowLeft size={20} />
        </button>

        <form onSubmit={handleSubmit}>
          <div className={styles.containerName}>
            <input
              type='text'
              name='first_name'
              placeholder='Ex: example'
              value={form['first_name']}
              onChange={event => setForm({ ...form, [event.target.name]: event.target.value })} />

            <input
              type='text'
              name='last_name'
              placeholder='Ex: example'
              value={form['last_name']}
              onChange={event => setForm({ ...form, [event.target.name]: event.target.value })} />
          </div>

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
              <Eye onClick={handleShowPassword} className='icon-show-password' size={20} /> :
              <EyeClosed onClick={handleShowPassword} className='icon-show-password' size={20} />
            }
          </div>

          <input
            type={showPassword}
            placeholder={renderBulets()}
            name='confirm_password'
            value={form['confirm_password']}
            onChange={event => setForm({ ...form, [event.target.name]: event.target.value })}
            required />

          <button type='submit' disabled={isCreateUserLoading}>{isCreateUserLoading ? 'Carregando...' : 'Registrar'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register