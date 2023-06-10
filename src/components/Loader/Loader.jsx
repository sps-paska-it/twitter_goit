import { Backdrop } from './Loader.styled';
import { SpinnerCircular } from 'spinners-react';

export const Loader = () => {
  return (
    <Backdrop>
      <SpinnerCircular />
    </Backdrop>
  );
};
