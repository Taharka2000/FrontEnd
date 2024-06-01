import axios from "axios";
import { API_URL } from "../db";
import { DataContact } from "../Models/contact.model";

const baseUrl = `${API_URL}`;

const Contact = {
  fetchAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}/allcontact`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  fetchUnused: async () => {
    try {
      const response = await axios.get(`${baseUrl}/unused`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/findContact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching livrable:", error);
      throw error;
    }
  },

  create: async (Contact: DataContact) => {
    try {
      const response = await axios.post(`${baseUrl}/addcontact`, Contact);
      return response.data;
    } catch (error) {
      console.error("Error creating livrable:", error);
      throw error;
    }
  },

  update: async (id: string, Contact: DataContact) => {
    try {
      const response = await axios.put(`${baseUrl}/updateContact/${id}`, Contact);
      return response.data;
    } catch (error) {
      console.error("Error updating livrable:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteContact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting livrable:", error);
      throw error;
    }
  },
   }
   export default Contact;