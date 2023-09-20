/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shadcn_components/ui/button';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div> Page not found</div>
      <Button variant="destructive" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </>
  );
}
