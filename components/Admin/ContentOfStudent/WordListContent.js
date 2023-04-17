import React from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { FaSurprise, FaRegEdit, FaCheck } from 'react-icons/fa'
import { WordListKeyInputAttribute, WordListKeyAttribute, WordListAttributes, WordListSVGContainer, WordListContentURL, WordListContentURLContainer, WordListContentContainer, WordListContentMainContainer, WordListContentEmptyPhrase } from './WordListContent.style'

export default function WordListContent({ student, setData, setNotification }) {
    const [edit, setEdit] = React.useState(false)
    const wordListRef = React.useRef(null)
    const id = getCookie('userCookie')
    const studentId = student.id

    const changeWordList = async () => {
        const changedWordList = wordListRef.current.value
        await axios('http://localhost:3000/api/user.change', {
            method: 'PATCH',
            data: {
                adminId: id,
                studentId,
                changedWordList
            }
        }).then(({ data }) => {
            if (data) setData(data)
            else alert('Change failed.')
        }).finally(() => setEdit(prevState => !prevState))
        setNotification("Word List Was Edited #goodNotification")
    }

    return (
        <>
            {edit
                ?
                <>
                    <WordListContentURLContainer>
                        <WordListAttributes>
                            <WordListKeyAttribute>word list: </WordListKeyAttribute>
                            <WordListKeyInputAttribute ref={wordListRef} defaultValue={student.wordList} disabled={!edit} readOnly={!edit} editable={edit} />
                        </WordListAttributes>
                    </WordListContentURLContainer>
                    <WordListSVGContainer onClick={() => setEdit(prevState => !prevState)}>
                        <FaRegEdit />
                    </WordListSVGContainer>
                    <WordListSVGContainer onClick={() => changeWordList()}>
                        <FaCheck />
                    </WordListSVGContainer>
                </>
                :
                student.wordList.length == 0
                    ?
                    <>
                        <WordListContentMainContainer>
                            <WordListContentContainer>
                                <WordListContentEmptyPhrase>{`You haven't added any word list!`}</WordListContentEmptyPhrase>
                                <FaSurprise />
                            </WordListContentContainer>
                        </WordListContentMainContainer>
                        <WordListSVGContainer onClick={() => setEdit(prevState => !prevState)}>
                            <FaRegEdit />
                        </WordListSVGContainer>
                    </>
                    :
                    <>
                        <WordListContentURLContainer>
                            <WordListContentURL>{student.wordList}</WordListContentURL>
                        </WordListContentURLContainer>
                        <WordListSVGContainer onClick={() => setEdit(prevState => !prevState)}>
                            <FaRegEdit />
                        </WordListSVGContainer>
                    </>
            }
        </>
    )
}