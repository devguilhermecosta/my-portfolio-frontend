import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api, baseUrl } from '../../../utils/api';
import { WorkProps } from '../../../interfaces/work';
import MainContainer from '../../../components/mainContainer';
import NotFound from '../../../components/notFound';
import Input from '../../../components/input';
import TextArea from '../../../components/textarea';
import Cover from '../../../components/cover';
import Loading from '../../../components/loading';

export default function WorkDetail(): JSX.Element {
  const [work, setWork] = useState<WorkProps | undefined>();
  const [loading, setLoading] = useState(true);

  const workId = work?.id;
  const { slug } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    async function getWork(slug: string | undefined): Promise<void> {
      await api.get(`${baseUrl}/work/api/${slug}/`)
      .then((response) => {
        setWork(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLink(response.data?.link);
        setLoading(false);
      })
      .catch(() => setWork(undefined))
    }

    getWork(slug);

  }, [slug])

  return (
    <MainContainer>

    {loading && <Loading />}

    {work 
    ? <form style={{ width: '100%', maxWidth: '840px' }}>
      <Input 
        labelName='title' 
        value={title} 
        onChange={e => setTitle(e.target.value)}
      />

      <TextArea
        label='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input 
        labelName='link' 
        value={link} 
        onChange={e => setLink(e.target.value)}
      />

      {work?.cover && (
        <Cover coverUrl={`${baseUrl}${work.cover}`} alt={`image of ${title}`}/>
      )}

      </form>
    : <NotFound />
    }
  </MainContainer>
  )
}