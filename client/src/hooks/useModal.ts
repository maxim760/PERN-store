import { useState } from "react"


export const useModal = () => {
  const [show, setShow] = useState(false)
  const onShow = () => setShow(true)
  const onHide = () => setShow(false)
  return { show, onShow, onHide }
}