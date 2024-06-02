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

import { Box, Button, Center, Group, Loader, TextInput } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { notifications } from '@mantine/notifications';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { createApplication } from '@/lib/data/application/set';
import { useState } from 'react';

export default function Application() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [canSubmit, setCanSubmit] = useState(false);
    const form = useForm({
      initialValues: {
        title: "프로그래밍-동아리-신청서",
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
        content: "<div><p>자기소개서:</p><br/><p>지원동기:</p><br/>  </div>"
    })

    
  const submit = async (values: {
    title: string;
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    setCanSubmit(true)
    await createApplication({ 
      title: values.title,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
      html: editer?.getHTML() || "not text"
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
          <p>자신을 알릴수 있는 경험이나 할수있는 것들을 작성하세요</p>
          <p>자신은 지금까지 무엇을 배우고,</p>
          <p>무엇을 해보았는지 상세히 작성하세요</p>
          <p>당신이 만약 어딘가에서 활동한다면 링크를 첨부해 주세요!</p>
          <p>제목은 되도록 수정하지 마세요!</p>
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
                    label="이메일"
                    placeholder='your@gmail.com'
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="phoneNubmer"
                    placeholder='01000000000'
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
              <Button loading={canSubmit} loaderProps={{ type: "dots" }} type="submit">Submit</Button>
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