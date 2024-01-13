import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const GameOverModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Game Over" isOpen={isOpen} handleClose={handleClose}>
      <p>Game over</p>
    </BaseModal>
  );
};
