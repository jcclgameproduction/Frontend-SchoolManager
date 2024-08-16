import { useState, useEffect } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import trash from "../../assets/icons/trash.svg";

function ConfirmationModal({ action, id }){
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "#F8F8FF",
        },
        };
        
        function openModal() {
            setIsOpen(true);
        }
    
        function closeModal() {
            setIsOpen(false);
        }

        function deletar(){
            action(id);
            closeModal(); 
        }
        return (    
            <div>
                <button onClick={openModal} className="btn p-0"><img src={trash} /></button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <h4 className="pb-1">Tem certeza que deseja deletar isto?</h4>
                    <div className="row">
                        <div className="col-8">
                            <button className="btn btn-danger col-5" onClick={deletar}>Sim</button>

                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark col-10" onClick={closeModal}>Cancelar</button>

                        </div>
                    </div>
                    
                </Modal>
            </div>
        )
}

export default ConfirmationModal;