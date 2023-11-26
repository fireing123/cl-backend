
'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useSession } from 'next-auth/react';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const { data: session, status } = useSession();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  
  if (status === "loading") {
    return (
      <p>loading...</p>
    )
  }
  return (
    <>
      <h1>Upload Your Post</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }
          
          const file = inputFileRef.current.files[0];

          if (file.name.endsWith(".mdx")) {
            const response = await fetch(
              `/api/file?filename=${file.name}`,
              {
                method: 'POST',
                body: file,
              },
            );
            const newBlob = (await response.json()) as PutBlobResult;
  
            setBlob(newBlob);

            const res = await fetch(`/api/post`, {
              method: "POST",
              body: JSON.stringify({
                fileurl: newBlob.url,
                title: file.name.replace(".mdx", ""),
                pubished: true
              })
            }).then(async res => {
              return await res.json()
            })
            console.log(res)

          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}

    </>
  );
}