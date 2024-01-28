import { Dialog, Button, Flex, TextField, Text } from '@radix-ui/themes';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório'),
    author: Yup.string().required('O autor é obrigatório'),
});

function BookModalAdd({ onSubmit, onChange, values }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(values, { abortEarly: false });
            onSubmit();
        } catch (error) {
            const errorMessage = error.errors.join('\n');
            alert(errorMessage);
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button mt='3'>Adicionar Livro</Button>
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <form onSubmit={handleSubmit}>
                    <Dialog.Title>Adicionar Livro</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Adicione as informações do seu livro abaixo.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Nome
                            </Text>
                            <TextField.Input
                                onChange={onChange}
                                id='name'
                                value={values.name || ''}
                                name='name'
                                type="text"
                                placeholder="Coloque o nome do seu livro"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Autor
                            </Text>
                            <TextField.Input
                                onChange={onChange}
                                id='author'
                                value={values.author || ''}
                                name='author'
                                type="text"
                                placeholder="Coloque o nome do autor"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Páginas
                            </Text>
                            <TextField.Input
                                onChange={onChange}
                                id='pages'
                                value={values.pages || ''}
                                name='pages'
                                type="number"
                                placeholder="Coloque o número de páginas"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type='submit'>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default BookModalAdd;
