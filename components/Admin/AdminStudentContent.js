import React from 'react'
import { Colors } from '../../utils/Colors'
import { FaAngleDown } from 'react-icons/fa'
import { StudentContainer, DropDown, MenuItems, MenuItem, ContentContainer } from './AdminStudentContent.style'
import { FontsThin } from '../CommonStyles'
import InfoContent from './ContentOfStudent/InfoContent'
import HomeworksContent from './ContentOfStudent/HomeworksContent'
import LessonChange from './ContentOfStudent/LessonChange'
import FileContent from './ContentOfStudent/FilesContent'
import SummaryContent from './ContentOfStudent/SummaryContent'
import WordListContent from './ContentOfStudent/WordlistContent'

export default function AdminStudentContent({ data, student, setData, setNotification }) {
    const [state, setState] = React.useState(false);
    const [selectedMenu, setSelectedMenu] = React.useState('info/edit');

    return (
        <>
            <StudentContainer onClick={() => setState(state => !state)} state={state}>
                <FontsThin>
                    {student.firstName} {student.lastName}
                </FontsThin>
                <FaAngleDown />
            </StudentContainer>
            {
                state
                &&
                <DropDown>
                    <MenuItems>
                        <MenuItem selected={selectedMenu === 'info/edit'} onClick={() => setSelectedMenu('info/edit')}>info/edit</MenuItem>
                        <MenuItem selected={selectedMenu === 'lessons change'} onClick={() => setSelectedMenu('lessons change')}>lessons change</MenuItem>
                        <MenuItem selected={selectedMenu === 'files'} onClick={() => setSelectedMenu('files')}>files</MenuItem>
                        <MenuItem selected={selectedMenu === 'homeworks'} onClick={() => setSelectedMenu('homeworks')}>homeworks</MenuItem>
                        <MenuItem selected={selectedMenu === 'lesson summary'} onClick={() => setSelectedMenu('lesson summary')}>lesson summary</MenuItem>
                        <MenuItem selected={selectedMenu === 'word list'} onClick={() => setSelectedMenu('word list')}>word list</MenuItem>
                    </MenuItems>
                    <ContentContainer>
                        {selectedMenu === 'info/edit' && <InfoContent setData={setData} student={student} setNotification={setNotification} />}
                        {selectedMenu === 'lessons change' && <LessonChange data={data} student={student} setData={setData} setNotification={setNotification} />}
                        {selectedMenu === 'files' && <FileContent data={data} setData={setData} student={student} setNotification={setNotification} />}
                        {selectedMenu === 'homeworks' && <HomeworksContent student={student} setData={setData} setNotification={setNotification} />}
                        {selectedMenu === 'lesson summary' && <SummaryContent student={student} setData={setData} setNotification={setNotification} />}
                        {selectedMenu === 'word list' && <WordListContent student={student} setData={setData} setNotification={setNotification} />}
                    </ContentContainer>
                </DropDown>
            }
        </>
    )
}
