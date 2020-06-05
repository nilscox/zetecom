import React, { useCallback } from 'react';

type ImageUploadProps = {
  allowedTypes: string[];
  onUpload: (file: File) => void;
  children: JSX.Element;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ allowedTypes, onUpload, children }) => {
  const fileInputRef = React.createRef<HTMLInputElement>();

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files.length === 0)
      return;

    // TODO: warning message
    if (!allowedTypes.includes(files[0].type.split('/')[1]))
      return;

    onUpload(files[0]);
  }, [allowedTypes, onUpload]);

  return (
    <>
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <div
        style={{ display: 'inline-flex', cursor: 'pointer' }}
        onClick={() => fileInputRef.current.click()}
      >
        {children}
      </div>
    </>
  );
};

export default ImageUpload;
