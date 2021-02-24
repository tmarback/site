import { useRouter } from "next/router"
import React, { ReactNode, useEffect, useState } from "react"
import { IntlProvider } from "react-intl"

export type I18nProviderProps = {
  children?: ReactNode
}

export function I18nProvider(props: I18nProviderProps) {
  const { children } = props

  const router = useRouter()

  const [messages, setMessages] = useState({})
  useEffect(() => {
    import(`./messages/${router.locale}.json`)
      .then(module => module.default)
      .then(setMessages)
      .catch(console.error)
  }, [router.locale])

  return (
    <IntlProvider
      messages={messages}
      locale={router.locale!}
      defaultLocale={router.defaultLocale}
    >
      {children}
    </IntlProvider>
  )
}
