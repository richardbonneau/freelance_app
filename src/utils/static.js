import firebase from "firebase/app";

export const backend = "http://localhost:4000";
export const newEntry = { name: "", hours: "", rate: "" };

export const initialUserDocument = {
  clients: [
    {
      name: "Example Client",
      id: 1,
      email: "example@freelancify.io",
      companyName: "Freelancify",
      addressOne: "1234 Code Street",
      addressTwo: "Apt 1",
      country: "Canada",
      city: "Montréal",
      province: "Québec",
      zip: "H1H1H1"
    }
  ],
  projects: [
    {
      name: "Example Project",
      id: 1,
      clientId: 1,
      projectDebutDate: firebase.firestore.Timestamp.fromDate(new Date()),
      projectEndDate: firebase.firestore.Timestamp.fromDate(new Date())
    }
  ],
  invoices: [
    {
      title: "Example Invoice",
      invoiceNumber: 1,
      id: 1,
      projectId: "new project",
      clientId: 1,
      fromName: "John Doe",
      fromAddressOne: "1138 Cityview Drive",
      fromAddressTwo: "Apt. 1",
      fromCity: "Montreal",
      fromCountry: "Canada",
      invoiceDate: firebase.firestore.Timestamp.fromDate(new Date()),
      dueDate: firebase.firestore.Timestamp.fromDate(new Date()),
      items: [{ name: "Front-End Development", hours: 5, rate: 40, id: "1" }],
      userInfo: {
        name: "You",
        addressOne: "1234 Freelance Street",
        addressTwo: "Apt. 1",
        city: "Atlantis",
        province: "Ares",
        country: "Atlantic Ocean",
        zip: "123456"
      }
    }
  ],
  tasks: [],
  expenses: [
    {
      name: "Computer Monitor",
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      amount: 400.0
    }
  ],
  userInfo: {
    name: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    province: "",
    country: "",
    zip: ""
  }
};
