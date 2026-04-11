import styled from 'styled-components';
import { useRef } from 'react';

interface FileUploaderProps {
  url?: string;
  setUrl: (url?: string) => void;
}

export const FileUploader = (props: FileUploaderProps) => {
  const { url, setUrl } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      throw new Error('No files');
    }
    const file = evt.target.files[0];
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <UserInput
        ref={fileInputRef}
        className="form__input"
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={handleImageChange}
      />
      {url && <UploadedImage src={url} alt="Avatar" />}

      <FilePickerRow>
        {url ? (
          <ClearFileButton
            type="button"
            onClick={() => {
              setUrl(undefined);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Delete
          </ClearFileButton>
        ) : (
          <FilePickerButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span>Choose</span>
            <UploadIcon
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="#c7c7c7"
                strokeWidth="2.0"
              />
              <path
                d="M12 16V8"
                fill="none"
                stroke="#c7c7c7"
                strokeWidth="2.0"
                strokeLinecap="round"
              />
              <path
                d="M8.5 11.5L12 8l3.5 3.5"
                fill="none"
                stroke="#c7c7c7"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </UploadIcon>
          </FilePickerButton>
        )}
      </FilePickerRow>
    </>
  );
};

const UserInput = styled.input`
  display: none;
`;

const FilePickerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  //width: 30px;
  //height: 30px;
  border: 0;
  background: #fff;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #f3f3f3;
  }
`;

const FilePickerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ClearFileButton = styled.button`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #f3f3f3;
  }
`;

const UploadIcon = styled.svg`
  margin-left: 10px;
`;

const UploadedImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
`;
