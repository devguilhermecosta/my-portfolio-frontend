import { AiOutlineUpload } from "react-icons/ai";
import Style from './uploadInput.module.css';
import { ChangeEvent } from "react";

interface UploadProps {
  multiple?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadInput({ ...props }: UploadProps): JSX.Element {
  return (
    <div className={Style.C_custom_input}>
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
        name="cover"
        id="cover"
        accept="image/*"
        className={Style.custom_input_file}
        onChange={(e) => props.onChange(e)}
        multiple={props.multiple ? true : false}
      />
    </div>
  )
}