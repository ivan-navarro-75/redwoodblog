import { Flash, useFlash, useMutation } from '@redwoodjs/web'
import {
  Form,
  FormError,
  TextField,
  TextAreaField,
  FieldError,
  Label,
  Submit,
} from '@redwoodjs/forms'
import BlogLayout from 'src/layouts/BlogLayout'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const { addMessage } = useFlash()
  const formMethods = useForm({ mode: 'onBlur' })
  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      addMessage('Thank you for your submission!', {
        style: { backgroundColor: 'green', color: 'white', padding: '1rem' },
      })
    },
  })
  const onSubmit = (data) => {
    createContact({ variables: { input: data } })
    console.log(data)
  }
  return (
    <BlogLayout>
      <Flash timeout={2000} />
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Label name="name" errorClassName="error">
          Your Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" />

        <Label name="email">Email</Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" />

        <Label name="message">Message</Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          style={{ display: 'block' }}
          validation={{ required: true }}
        />
        <FieldError name="message" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
