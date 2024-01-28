import { Flex, AlertDialog, Button } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'


function BookAlertDelete({ handleDelete, id }) {

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button mt='2' mb='2' mr='3' color="red"><TrashIcon /></Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Apagar Livro</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Você tem certeza? Esse livro será removido.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => handleDelete(id)}>
              Remover
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root >
  )
}

export default BookAlertDelete