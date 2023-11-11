export const googleAnalyticsPageView = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {
    page_path: url,
  })
}

export const googleAnalyticsEvent = ({ action, params }: { action: string, params: object }) => {
  window.gtag('event', action, params)
}