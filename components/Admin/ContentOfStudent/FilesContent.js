import React, { useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next';
import { FaFolderOpen, FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa'
import { FileContentRemoveFile, FileContentFilesWrapper, FileContentFile, FileContentBackButtonContainer, FileContentAddButtonContainer, FileContentUploadButton, FileContentInput, FileContentChooseFile, FileContentItem, FileContentItemContainer, FileContentAddContainer, FileContentContainer } from './FilesContent.style'

export default function FileContent({ data, setData, student, setNotification }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [add, setAdd] = React.useState(false)
  const id = getCookie('userCookie')

  const removeFile = async (file) => {
    const test = "a"
    await axios('user.change', {
      method: 'DELETE',
      data: {
        adminId: id,
        studentId: student.id,
        erasable: file,
        difference: "file"
      }    
    }
    ).then(({ data }) => {
      if (data) setData(data)
      else setNotification('Change failed.')
    })
    .finally(() => setNotification("File Was Removed ! #goodNotification"))
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append('file', selectedFile)

    await axios.post(`upload.file?id=${student.id}&adminId=${data.id}`, formData, {
      headers: {
        "content-type": "multipart/form-data"
      },
    }).then(({ data }) => {
      if (data) setData(data)
      else setNotification('Change failed.')
    }).finally(() => setNotification("File Was Uploaded ! #goodNotification"))
  };

  return (
    <>
      {add
        ?
        <>
          <FileContentContainer>
            <FileContentAddContainer>
              <FileContentChooseFile>
                <span>Choose file:</span>
                <FileContentInput type="file" onChange={handleFileChange} />
              </FileContentChooseFile>
            </FileContentAddContainer>
            <FileContentUploadButton onClick={handleSubmit}>upload file</FileContentUploadButton>
          </FileContentContainer>
          <FileContentBackButtonContainer onClick={() => setAdd(prevState => !prevState)}>
            <FaMinusSquare />
          </FileContentBackButtonContainer>
        </>
        :

        student.files.length > 0
          ?
          <>
            <FileContentContainer>
              <FileContentItemContainer>
                {/* <FileContentItem>Files:</FileContentItem> */}
                {student.files.map((file, index) =>
                  <FileContentFilesWrapper key={index}>
                    <FileContentFile href={`images/${file}`} target='_blank'>{file.slice(14,)}</FileContentFile>
                    <FileContentRemoveFile onClick={() => removeFile(file)}>
                      <FaTrash />
                    </FileContentRemoveFile>
                  </FileContentFilesWrapper>
                )}

              </FileContentItemContainer>
            </FileContentContainer>
            <FileContentAddButtonContainer onClick={() => setAdd(prevState => !prevState)}>
              <FaPlusSquare />
            </FileContentAddButtonContainer>
          </>
          :
          <>
            <FileContentContainer>
              <p>You have not imported any file yet!</p>
              <FaFolderOpen />

            </FileContentContainer>
            <FileContentAddButtonContainer onClick={() => setAdd(prevState => !prevState)}>
              <FaPlusSquare />
            </FileContentAddButtonContainer>
          </>
      }
    </>
  );
}