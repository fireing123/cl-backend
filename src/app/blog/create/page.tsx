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
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { createPost } from '@/lib/data/post/set';

export default function CreateBlog() {
  const { data: session, status } = useSession();
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: '',
    },
    validate: {
      title: (value: any) => (/^\S+$/.test(value) ? null : 'Invalid title')
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

  const submit = async (values: { title: string }) => {
    setCanSubmit(true)
    
    try { 
      await createPost({ 
        title: values.title,
        html: editer?.getHTML() || "not text"
      })
      notifications.show({
        title: 'create Blog',
        message: `Success Create Blog ${values.title}`
      })

      router.push('/')
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: 'fail create',
        message: error
      })
    }
  }

  if (session?.user) {
    return (
    <Box maw={700} mx="auto">
      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <TextInput
         withAsterisk
         label="Title"
         placeholder='title'
         {...form.getInputProps('title')}
        />
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
  } else {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
}