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

import { Box, Button, Center, Checkbox, Group, Loader, TextInput } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { notifications } from '@mantine/notifications';
import type { PutBlobResult } from '@vercel/blob';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';

export default function Application() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const form = useForm({
      initialValues: {
        title: '',
        name: '',
        email: '',
        phoneNumber: '',
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

    
  const submit = async (values: {
    title: string;
    name: string;
    email: string;
    phoneNumber: string;
}) => {
    
    const file = new File([editer?.getHTML() || ""], `${values.title}`)

      const response = await fetch(
        `/api/file?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        },
      );
      const newBlob = (await response.json()) as PutBlobResult;

      const res = await fetch(`/api/application`, {
        method: "POST",
        body: JSON.stringify({
          fileurl: newBlob.url,
          title: file.name,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber
        })
      }).then(async res => {
        return await res.json()
      })
      notifications.show({
        title: 'create application',
        message: `Success Create application ${values.title}`
      })

      router.push('/')
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
                    label="name"
                    placeholder='name'
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
              <Button type="submit">Submit</Button>
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