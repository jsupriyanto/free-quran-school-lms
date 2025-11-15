import http from "./http-common";

class EmailTemplateDataService {
  getAll() {
    return http.get("/email-template");
  }

  get(id) {
    return http.get(`/email-template/${id}`);
  }

  create(data) {
    return http.post("/email-template", data);
  }

  update(id, data) {
    return http.put(`/email-template/${id}`, data);
  }

  delete(id) {
    return http.delete(`/email-template/${id}`);
  }
}

export default new EmailTemplateDataService();