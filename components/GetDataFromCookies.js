import axios from 'axios'

// this function will run before application --> we will use this for getting data
export async function getServerSideProps(context) {
  const cookies = context.req.cookies;
  const userCookie = cookies.userCookie;
  let user = null;
  if (userCookie) {
    // call get account with id
    await axios.get(`user?userCookie=${userCookie}`)
      .then((data) => user = data.data)
  }

  return {
    props: {
      userData: user
    }
  }
}
