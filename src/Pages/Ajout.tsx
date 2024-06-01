import React, { useState,  useEffect } from 'react';
import {  Button, Form, Input, message } from 'antd';
import Contact from '../Services/contacSerice';
import { useNavigate, useParams } from "react-router-dom";

const AjoutCompte: React.FC = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const [form] = Form.useForm();
    const navigate = useNavigate();
   
    const handleAddContact = async (values: any) => {
        setLoading(true)
        try {
          const data = { ...values }
          await Contact.create(data)
    
          message.success("Compte créé avec succès");
          navigate("/")
        } catch (error) {
          console.error("Erreur lors de la création d'un compte:", error);
        }
      };
    return (

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
       
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddContact}
            >
                <Form.Item
                    label="Prénom"
                    name="Prenom"
                    rules={[{ required: true, message: 'Please input the first name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nom"
                    name="Nom"
                    rules={[{ required: true, message: 'Please input the last name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    label="Numero"
                    name="Numero"
                    rules={[{ required: true, message: 'Please input the phone number!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Contact
                    </Button>
                </Form.Item>
            </Form>

        </div>

    );
};

export default AjoutCompte;
