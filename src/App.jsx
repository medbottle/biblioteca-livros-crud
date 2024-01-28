import { useState } from 'react';
import Books from './components/Livros/Books';
import Authors from './components/Autores/Authors';
import { Box, Flex } from '@radix-ui/themes';


function App() {
    const [books, setBooks] = useState(JSON.parse(localStorage.getItem('books')) ?? [])
    const [authors, setAuthors] = useState(JSON.parse(localStorage.getItem('authors')) ?? [])

    return (
        <Flex pt='9' gap='6' align={'center'} justify={'center'}>
            <Box width={'15%'} >
                <Books setAuthors={setAuthors} authors={authors} books={books} setBooks={setBooks} />
            </Box>
            <Box width={'15%'}>
                <Authors authors={authors} setAuthors={setAuthors} books={books} />
            </Box>
        </Flex>
    )
}

export default App;