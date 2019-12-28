export const backend = "http://localhost:4000";

export const newEntry = { name: "", hours: "", rate: "" };

export const initialUserDocument = {
  clients: [
    {
      name: "Example Client",
      id: 1,
      email: "example@freelancify.io",
      companyName: "Freelancify",
<<<<<<< Updated upstream
      addressOne: "123 Code Street",
      addressTwo:"apt 1",
=======
      street: "123 Code Street",
      streetTwo:"apt1",
>>>>>>> Stashed changes
      city: "Montréal",
      province:"Québec",
      zip: "h2w1w2"

    }
  ],
  invoices: [
    {
      title: "Example Invoice",
      invoiceNumber: 1,
      id:1,
      projectId: "new project",
      clientId: 1,
      columns: [{ name: "Front-End Development", hours: 5, rate: 40 }]
    }
  ]
};
