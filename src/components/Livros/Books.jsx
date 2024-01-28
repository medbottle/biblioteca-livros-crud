import { useEffect } from 'react'
import { useFormik } from 'formik'
import { Table, TableBody } from '@radix-ui/themes'
import LivroModalAdd from './BookModalAdd'
import LivroModalView from './BookModalView'
import LivroAlertDelete from './BookAlertDelete'

function Books({ books, setBooks, setAuthors, authors }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            author: '',
            pages: '',
        },

        onSubmit: (values) => {
            const isDuplicate = books.some(
                (book) =>
                    book.name.toLowerCase() === values.name.toLowerCase() &&
                    book.author.toLowerCase() === values.author.toLowerCase()
            );

            if (isDuplicate) {
                alert('Esse livro já existe.');
                return;
            }

            const nextBookId = Math.max(...books.map((item) => item.id), 0) + 1;
            const nextAuthorId = Math.max(...authors.map((item) => item.id), 0) + 1;
            const updatedBooks = [...books];
            const foundAuthorId = authors.find((author) =>
                values.author.toLowerCase() === author.name.toLowerCase()
            )?.id;
            updatedBooks.push({
                id: nextBookId,
                name: values.name,
                author: values.author,
                author_id: foundAuthorId ?? nextBookId,
                pages: values.pages,
            });
            const updatedAuthors = [...authors];
            if (!foundAuthorId) {
                updatedAuthors.push({
                    id: nextAuthorId,
                    name: values.author,
                    email: "N/A",
                });
            }

            setBooks(updatedBooks);
            setAuthors(updatedAuthors);
            formik.resetForm();
        }
    });

    useEffect(() => { localStorage.setItem('books', JSON.stringify(books)) }, [books])

    const handleDelete = (id) => {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
    };

    return (
        <div className="Books">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row >
                        <Table.ColumnHeaderCell justify={'center'}>ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>Livro</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>Páginas</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify={'center'}>Ações</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                {books.map((val, key) => {
                    return (
                        <TableBody>
                            <Table.Row justify={'center'} align={'center'} key={key}>
                                <Table.Cell justify={'center'}>{val.id}</Table.Cell>
                                <Table.Cell justify={'center'}>{val.name}</Table.Cell>
                                <Table.Cell justify={'center'}>{val.pages}</Table.Cell>
                                <Table.Cell justify={'center'}><LivroAlertDelete handleDelete={handleDelete} id={val.id} /><LivroModalView val={val} /></Table.Cell>
                            </Table.Row>
                        </TableBody>
                    )
                })}
            </Table.Root>
            <LivroModalAdd values={formik.values} onChange={formik.handleChange} onSubmit={formik.handleSubmit} />
        </div >
    )
}

export default Books