import { AiOutlineUpload } from "react-icons/ai";
import Style from './uploadInput.module.css';
import { ChangeEvent, CSSProperties } from "react";

interface UploadProps extends CSSProperties {
  multiple?: boolean;
  testId?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadInput({ ...props }: UploadProps): JSX.Element {
  return (
    <div className={Style.C_custom_input} style={{ ...props }}>
      <AiOutlineUpload 
        id="strokeCover" 
        size={100} 
        style={{
          borderRadius: '8px',
          display: 'block',
        }}
      />
      <input
        type="file" 
        data-testid={!props.testId ? 'upload_images' : props.testId}
        accept="image/*"
        className={Style.custom_input_file}
        onChange={(e) => props.onChange(e)}
        multiple={props.multiple ? true : false}
      />
    </div>
  )
}