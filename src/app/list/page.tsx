"use client";

export default function List() {
  let member = ["a", "b", "c"]
  
  return (
    <div>
      <button onClick={fff}>어머넛</button>
      <h1 className="title">게시판</h1>
      {
        member.map((v, i) => {
            return Node(v, i)
        })
      }
    </div>
  )
}

function fff() {
  fetch("/api/client", {
    method: "POST",
    body: JSON.stringify({
      name: "김도현",
      nickname: "fireing123",
      email: "gimd82368@gmail.com"
    })
  }).then((res) => console.log(res))
}

function Node(v: string, i: number) {
  return (
    <div key={i}>
      <h4>{v}</h4>
    </div>
  )
}