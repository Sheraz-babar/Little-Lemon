import { useEffect } from 'react'
export default function useTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} • Little Lemon` : 'Little Lemon'
    return () => { document.title = prev }
  }, [title])
}
