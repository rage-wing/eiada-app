import {AlertDialog, Button} from 'native-base';
import React from 'react';
import {useState, useRef} from 'react';
import {useSelector} from 'react-redux';

const Alert = ({onConfirm, onCancel}) => {
  const [isOpen, setIsOpen] = useState(true);
  const cancelRef = useRef(null);
  const alert = useSelector(state => state.app.alert);

  const confirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const cancel = () => {
    setIsOpen(false);
    onCancel();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{alert.title}</AlertDialog.Header>
        <AlertDialog.Body>{alert.body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={cancel}
              ref={cancelRef}>
              {alert.cancelText}
            </Button>
            <Button colorScheme="danger" onPress={confirm}>
              {alert.confirmText}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Alert;
