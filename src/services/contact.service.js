import http from "./http-common";

class ContactService {
  sendContactMessage(data) {
    return http.post("/contact", data);
  }

  getAllContactMessages() {
    return http.get("/contact");
  }

  getContactMessageById(id) {
    return http.get(`/contact/${id}`);
  }

  deleteContactMessage(id) {
    return http.delete(`/contact/${id}`);
  }
}

export default new ContactService();
