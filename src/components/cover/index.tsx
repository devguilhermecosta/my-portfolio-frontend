import Style from './cover.module.css';

export default function Cover({ coverUrl, alt }: { coverUrl: string | undefined, alt: string }): JSX.Element {

  return (
    <>
      <img src={coverUrl} alt={alt} className={Style.Image_preview}/>
    </>
  )
}

//TODO make all tests