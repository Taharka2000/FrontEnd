import React, { useState, useCallback, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import Contact from '../Services/contacSerice';
import { useNavigate } from "react-router-dom";
import { DataContact } from '../Models/contact.model';
import {
  DeleteOutlined, EditOutlined,
} from "@ant-design/icons";

const RegistrationForm: React.FC = () => {
  const [contacts, setContacts] = useState<DataContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<DataContact | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await Contact.fetchAll();
      setContacts(result);
    } catch (error) {
      console.error("Une erreur s'est produite lors du chargement des données :", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showEditModal = (contact: DataContact) => {
    setCurrentContact(contact);
    form.setFieldsValue(contact);
    setIsEditModalVisible(true);
  };

  const showViewModal = (contact: DataContact) => {
    setCurrentContact(contact);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
    form.resetFields();
    setCurrentContact(null);
  };

  const handleEditContact = async (values: any) => {
    if (!currentContact) return;
    setLoading(true);
    try {
      const data = { ...values, _id: currentContact._id };
      await Contact.update(currentContact._id, data);
      message.success("Contact modifié avec succès");
      setIsEditModalVisible(false);
      setCurrentContact(null);
      loadData();
    } catch (error) {
      console.error("Erreur lors de la modification du contact:", error);
      message.error("Erreur lors de la modification du contact");
    } finally {
      setLoading(false);
    }
  };
  const handleViewContact = async (id: string) => {
    try {
      const contact = await Contact.getById(id);
      setCurrentContact(contact);
      setIsViewModalVisible(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du contact :", error);
      message.error("Erreur lors de la récupération des détails du contact");
    }
  };
  const handleDeleteContact = async (id: string) => {
    try {
      await Contact.delete(id);
      message.success("Contact supprimé avec succès !");
      loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
      message.error("Erreur lors de la suppression du contact");
    }
  };

  const columns = [
    {
      title: "Prénom",
      dataIndex: "Prenom",
      key: "Prenom",
      width: 200,
    },
    {
      title: "Nom",
      dataIndex: "Nom",
      key: "Nom",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: 200,
    },
    {
      title: "Numero",
      dataIndex: "Numero",
      key: "Numero",
      width: 200,
    },
    {
      title: "Editer un  Contact",
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text: any, record: DataContact) => (
        <Button
          type="link"
          style={{ color: "#66BB6A" }}
          icon={<EditOutlined />}
          onClick={() => showEditModal(record)}
        />
      ),
    },
    {
      title: "Afficher un Contact",
      key: "view",
      fixed: "right",
      width: 100,
      render: (text: any, record: DataContact) => (
        <Button
          type="link"
          style={{ color: "#1890FF" }}
          onClick={() => showViewModal(record)}
        >
          Voir
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "delete",
      fixed: "right",
      width: 100,
      render: (text: any, record: DataContact) => (
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer ce contact ?"
          onConfirm={() => handleDeleteContact(record._id)}
          okText="Oui"
          cancelText="Non"
          okButtonProps={{ style: { color: "white", background: "#66BB6A" } }}
          cancelButtonProps={{ style: { color: "white", background: "#FF7900" } }}
        >
          <Button
            type="link"
            style={{ color: "red" }}
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    
    <div className="bg-white p-8 rounded-lg shadow-md">
      <Button
        type="primary"
        onClick={() => navigate('/ajout')}
        style={{ marginBottom: 16 }}
      >
        Add New Contact
      </Button>
      <Table
        columns={columns as any}
        dataSource={contacts}
        loading={loading}
        rowKey={(r: any) => r._id}
      />

      <Modal
        title="Modifier le contact"
        visible={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditContact}
        >
          <Form.Item
            label="Prénom"
            name="Prenom"
            rules={[{ required: true, message: 'Veuillez entrer le prénom!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nom"
            name="Nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Veuillez entrer l\'email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Numero"
            name="Numero"
            rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Modifier le contact
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Détails du contact"
        visible={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentContact && (
          <div>
            <p><strong>Prénom:</strong> {currentContact.Prenom}</p>
            <p><strong>Nom:</strong> {currentContact.Nom}</p>
            <p><strong>Email:</strong> {currentContact.Email}</p>
            <p><strong>Numéro:</strong> {currentContact.Numero}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RegistrationForm;
