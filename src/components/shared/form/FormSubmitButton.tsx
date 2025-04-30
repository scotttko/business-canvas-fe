import { Button, Form, FormInstance } from 'antd'
import { PropsWithChildren, useEffect, useState } from 'react'

interface FormSubmitButtonProps extends PropsWithChildren {
  form: FormInstance
  onClick?: () => void
}

function FormSubmitButton({ form, children, onClick }: FormSubmitButtonProps) {
  const [submittable, setSubmittable] = useState<boolean>(false)

  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} onClick={onClick}>
      {children}
    </Button>
  )
}

export default FormSubmitButton
