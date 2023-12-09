import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api, baseUrl } from '../../../utils/api';
import { WorkProps } from '../../../interfaces/work';

export default function WorkDetail(): JSX.Element {
  const [work, setWork] = useState<WorkProps | undefined>();
  const { slug } = useParams();

  useEffect(() => {
    async function getWork(slug: string | undefined): Promise<void> {
      await api.get(`${baseUrl}/work/api/${slug}/`)
      .then((response) => setWork(response.data))
    }

    getWork(slug);

  }, [slug])

  return work ? <h1>{work.title}</h1> : <h1>work not found</h1>
}