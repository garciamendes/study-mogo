'use-client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = sessionStorage.getItem('token')

      if (!authToken && shouldBeAuthenticated) {
        router.push('/auth/login')
        return
      }

      if (authToken && !shouldBeAuthenticated) {
        router.push('/home')
        return
      }

      setLoading(false)
    }, [])

    return loading ? <div>Carregando...</div> : <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}