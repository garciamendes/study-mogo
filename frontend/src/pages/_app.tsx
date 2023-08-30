import { AppProps } from 'next/app'
import '@/styles/global.scss'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1B1D1E',
            color: '#fff'
          },

        }}
      />
      <Component {...pageProps} />
    </Provider>
  )
}