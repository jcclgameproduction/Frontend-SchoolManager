import { useState, useEffect } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import trash from "../../assets/icons/trash.svg";

function ConfirmationModal({ action, id, name }){
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
                    <div className="text-center mb-3 px-3">
                        <h5 className="fs-5">Tem certeza que deseja deletar </h5>
                        <h5 className="fs-4">{name}?</h5>
                    </div>
                    
                    <div className="row">
                        <div className="col-8">
                            <button className="btn btn-danger col-5" onClick={deletar}>Sim</button>

                        </div>
                        <div className="col-4">
                            <button className="btn btn-dark col-12" onClick={closeModal}>Cancelar</button>

                        </div>
                    </div>
                    
                </Modal>
            </div>
        )
}

export default ConfirmationModal;