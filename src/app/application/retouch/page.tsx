'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEditor } from '@tiptap/react';

import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import { Center, Loader} from '@mantine/core';
import {Link } from '@mantine/tiptap';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { getApplicationByUserId } from '@/lib/data/application/get';
import { Application } from '@/types/types';
import { Retouch } from '@/components/Application/retouch';

export default function Application() {

    const { data: session, status } = useSession();
    const [app, setApp] = useState<Application>();
    
    const router = useRouter();
    const [canSubmit, setCanSubmit] = useState(false);
    const form = useForm({
      initialValues: {
        title: "",
        name: "",
        email: "",
        phoneNumber: "",
      },
      validate: {
        title: isNotEmpty('Enter title'),
        name: isNotEmpty('Enter name'),
        email: isEmail('Invalid email'), 
        phoneNumber: (value) => (/^\S+/.test(value)) ? null : 'Invalid phoneNumber',
      }
    })

    const editer = useEditor({
        extensions: [
          StarterKit,
          Underline,
          Link,
          Superscript,
          SubScript,
          Highlight,
          TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
    })

    useEffect(() => {
        if (status == "authenticated") {
            
            getApplicationByUserId(session.user.userId)
                .then((ap) => {
                    setApp(ap)
                })

        }
    })

    if (app) {
        return <Retouch app={app} />
    } else {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }
}