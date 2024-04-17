/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shadcn_components/ui/button';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <div> Go Back</div>
      <Button variant="destructive" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </>
  );
}
