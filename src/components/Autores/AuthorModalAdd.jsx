import { Dialog, Button, Flex, TextField, Text } from '@radix-ui/themes'
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório'),
});

function AuthorModalAdd({ onSubmit, onChange, values }) {
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

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button mt='3'>Adicionar Autor</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
            <form onSubmit={handleSubmit}>
                <Dialog.Title>Adicionar Autor</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Adicione as informações do autor abaixo.
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
                            defaultValue="George Orwell"
                            placeholder="Coloque o nome do Autor"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            E-mail
                        </Text>
                        <TextField.Input
                            onChange={onChange}
                            id='email'
                            value={values.email || ''}
                            name='email'
                            type="text"
                            defaultValue="george.orwell@yahoo.com"
                            placeholder="Coloque o e-mail do Autor"
                        />
                    </label>
                </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancelar
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button type='submit'>Save</Button>
                    </Dialog.Close>
                </Flex>
            </form>
        </Dialog.Content>
    </Dialog.Root>
}

export default AuthorModalAdd