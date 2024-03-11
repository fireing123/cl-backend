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

import { Box, Button, Center,  Group, Loader, TextInput } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { notifications } from '@mantine/notifications';

import { Application } from '@/types/types';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useState } from 'react';
import { patchApplication } from '@/lib/data/application/patch';

export function Retouch({ app }: { app: Application }) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [canSubmit, setCanSubmit] = useState(false);

    const form = useForm({
        initialValues: {
          title: app.title,
          name: app.name,
          email: app.email,
          phoneNumber: app.phoneNumber,
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
        content: app.html
    })

    const submit = async (values: {
    title: string;
    name: string;
    email: string;
    phoneNumber: string;
    }) => {
        setCanSubmit(true)
        const file = new File([editer?.getHTML() || "작성되지 않음"], values.title)
        try {
          await patchApplication(app.id!, values.title, values.email, values.name, values.phoneNumber, file)
          notifications.show({
            title: 'create application',
            message: `Success Create application ${values.title}`
          })
  
          router.push('/')
        } catch (error) {
          console.error(error)
        }
        
    }

    if (status === "authenticated") {
    return (
        <Box maw={700} mx="auto">
          <form onSubmit={form.onSubmit((values) => submit(values))}>
            <TextInput
             withAsterisk
             label="Title"
             placeholder='title'
             {...form.getInputProps('title')}
            />
            <Group mt="md">
                <TextInput
                    withAsterisk
                    label="학번-이름"
                    placeholder='10101-김모씨'
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="email"
                    placeholder='email'
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="phoneNubmer"
                    placeholder='phoneNumber'
                    {...form.getInputProps('phoneNumber')}
                />
            </Group>
            <RichTextEditor editor={editer}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
            <Group justify="flex-end" mt="md">
              <Button loading={canSubmit} loaderProps={{ type: "dots" }} type="submit">수정하기</Button>
            </Group>
          </form>
        </Box>
        );
    } else if (status === "loading") {
    return (
      <Center>
        <Loader />
      </Center>
    )
    } else {
    return <div>로그인이 필요한 페이지입니다.</div>
    }
    }