import { BaseModal } from './BaseModal';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const GameOverModal = ({ open, handleClose }: Props) => {
  return (
    <BaseModal title="Game Over" open={open} handleClose={handleClose}>
      <p>Game over</p>
    </BaseModal>
  );
};
