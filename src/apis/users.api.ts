/**
 * functions - use to call apis,
 *
 */

import request from "./request";
import { User, CreateUserRequestBody } from "../store/interfaces";

export default {
  fetchUsers: async () => {
    try {
      const resp = await request.get("users");
      return { code: "200", data: resp.data };
    } catch (error) {
      return { code: "500", data: error };
    }
  },
  createUser: async (body: CreateUserRequestBody) => {
    try {
      const resp = await request.post("users", body);
      return { code: "200", data: resp.data };
    } catch (error) {
      return { code: "500", data: error };
    }
  },
  updateUser: async (id: number, body: User) => {
    try {
      const resp = await request.put(`users/${id}`, body);
      return { code: "200", data: resp.data };
    } catch (error) {
      return { code: "500", data: error };
    }
  },
  deleteUser: async (id: number) => {
    try {
      const resp = await request.delete(`users/${id}`);
      return { code: "200", data: resp.data };
    } catch (error) {
      return { code: "500", data: error };
    }
  },
};
