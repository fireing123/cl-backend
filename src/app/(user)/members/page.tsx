'use client'
import { getUserInfos } from '@/lib/data/user/get';
import { MinUser, Rank } from '@/types/types';
import { Avatar, Badge, Table, Group, Text, Anchor, Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';

const jobColors: Record<Rank, string> = {
    'admin': 'yellow',
    'observer': 'cyan',
    'member': 'blue',
    'person': 'blue'
  };
  
export default function UsersTable() {
    const [data, setData] = useState<MinUser[]>();


    useEffect(() => {
        getUserInfos().then((users) => {
            const newUsers = users.filter((value, i, array) => value.rank !== 'person')
            setData(newUsers)
        })
    }, [])

    if (data) {
        const rows = data.map((item) => (
          <Table.Tr key={item.name}>
            <Table.Td>
              <Group gap="sm">
                <Avatar size={30} src={item.image} radius={30} />
                <Text fz="sm" fw={500} component='a' href={`/user/${item.email}`}>
                  {item.username || item.name}
                </Text>
              </Group>
            </Table.Td>
            <Table.Td>
              <Badge color={jobColors[item.rank]} variant="light">
                {item.rank}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Anchor component="button" size="sm">
                {item.mailcom || item.email}
              </Anchor>
            </Table.Td>
          </Table.Tr>
        ));
      
        return (
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Employee</Table.Th>
                  <Table.Th>Rank</Table.Th>
                  <Table.Th>Email</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        );
    } else {
        return <Center>
            <Loader />
        </Center>
    }

  }