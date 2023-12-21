import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import envFetch from "@/lib/envfetch";

export default async function SignUp() {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!session) {
      return (
        <>로그인을 하세요</>
      )
    } else {
      const res = await envFetch(`/api/users?email=${email}`)
      const { has } = await res.json()
      console.log(email)
      console.log(has)
      if (has) {
        return <div>로그인 성공</div>
      } else {
        const res = await envFetch(`/api/users`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email
          })
        })
        if ((await res.json()).type) {
          return <div>회원가입 성공</div>
        } else {
          return <div>실패</div>
        }
      }
    }
}