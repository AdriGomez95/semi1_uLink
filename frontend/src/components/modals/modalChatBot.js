import React from 'react';
import { Grid, Card, Text, Row, Col, Input, Button } from "@nextui-org/react";
import Modal from 'react-modal';
const customStyles = {
    content: {
      top: 'auto',
      left: 'auto',
      right: '0',
      bottom: '0%',
    },
  };
export default function ChatBot({modalIsOpen,closeModal}) {
  return (
    <div>
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Button color="primary" onPress={() => closeModal()} style={{}}>
                        Close
        </Button>
        <iframe
         
         height="600px"
         width="400px"
         src="https://widget.kommunicate.io/chat?appId=d8ebcfbf971a9ac44a77c66e2c57de2d"
         allow="microphone; geolocation;"
     >
</iframe>
    </Modal>
  </div>
  );
}
