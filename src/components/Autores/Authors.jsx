import { useEffect } from 'react'
import { useFormik } from 'formik'
import { Table } from '@radix-ui/themes'
import AuthorModalAdd from './AuthorModalAdd'
import AuthorModalView from './AuthorModalView'
import AuthorAlertDelete from './AuthorAlertDelete'

function Authors({ books, authors, setAuthors }) {
    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            email: '',
        },
        onSubmit: (values) => {
            const isAuthorExists = authors.some(
                (author) => author.name.toLowerCase() === values.name.toLowerCase() || author.email.toLowerCase() === values.email.toLowerCase()
            );

            if (isAuthorExists) {
                alert('Esse autor já existe.');
                return;
            }

            const nextId = Math.max(...authors.map((item) => item.id), 0) + 1;
            const updatedAuthors = [...authors];
            updatedAuthors.push({
                id: nextId,
                name: values.name,
                email: values.email,
            });

            setAuthors(updatedAuthors);
            formik.resetForm();
        },
    });

    useEffect(() => {
        localStorage.setItem('authors', JSON.stringify(authors));
    }, [authors]);

    const handleDelete = (id) => {
        const updatedAuthors = authors.filter((author) => author.id !== id);
        setAuthors(updatedAuthors);
    };

    return (
        <div className="Authors">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell justify={'center'}>ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>Nome</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>E-mail</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>Ações</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                {authors.map((val, key) => (
                    <Table.Row justify={'center'} align={'center'} key={key}>
                        <Table.Cell justify={'center'}>{val.id}</Table.Cell>
                        <Table.Cell justify={'center'}>{val.name}</Table.Cell>
                        <Table.Cell justify={'center'}>{val.email}</Table.Cell>
                        <Table.Cell justify={'center'}>
                            <AuthorAlertDelete handleDelete={handleDelete} id={val.id} />
                            <AuthorModalView books={books} val={val} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Root>
            <AuthorModalAdd
                values={formik.values}
                onChange={formik.handleChange}
                onSubmit={formik.handleSubmit}
            />
        </div>
    );
}

export default Authors;