import {AlertDialog, Button} from 'native-base';
import React from 'react';

const Alert = props => {
  const cancelRef = React.useRef(null);

  const onClose = () => {
    props.setIsOpen(false);
  };

  const onConfirm = () => {
    props.onConfirm();
    onClose();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={props.isOpen}
      onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{props.title}</AlertDialog.Header>
        <AlertDialog.Body>{props.body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}>
              {props.cancelText || 'cancel'}
            </Button>
            <Button colorScheme="danger" onPress={onConfirm}>
              {props.confirmText || 'confirm'}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Alert;
