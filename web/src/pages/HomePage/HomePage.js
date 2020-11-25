import BlogLayout from 'src/layouts/BlogLayout'
import BlogPostsCell from 'src/components/BlogPostsCell'

import { useIdentityContext } from 'react-netlify-identity'

const HomePage = () => {
  const formRef = React.useRef()
  const { loginUser, signupUser } = useIdentityContext()
  return (
    <BlogLayout>
      <BlogPostsCell />

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          const email = e.target.email.value
          const password = e.target.password.value
          loginUser(email, password, true)
            .then((user) => {
              console.log('Success! Logged in', user)
            })
            .catch((err) => console.error(err))
        }}
      >
        <div>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
        </div>
        <div>
          <input type="submit" value="Log in" />
        </div>
      </form>
    </BlogLayout>
  )
}

export default HomePage
