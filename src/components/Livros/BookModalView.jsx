import { Button, Dialog, Flex, Table, Inset, TableBody } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

function BookModalView({ val }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button mt='2' mb='2' mr='3'><MagnifyingGlassIcon /></Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{val.name}</Dialog.Title>
        <Dialog.Description>
          Autor: {val.author ?? 'N/A'}
        </Dialog.Description>

        <Inset side="x" my="5">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Páginas</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <TableBody>
              <Table.Row>
                <Table.RowHeaderCell>{val.id}</Table.RowHeaderCell>
                <Table.Cell>{val.name}</Table.Cell>
                <Table.Cell>{val.pages ?? 'N/A'}</Table.Cell>
              </Table.Row>
            </TableBody>
          </Table.Root>
        </Inset>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Fechar
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root >
  )
}

export default BookModalView