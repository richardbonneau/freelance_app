export const backend = "http://localhost:4000";

export const initialUserDocument = {
  clients: [
    {
      name: "Example Client",
      id: 1,
      email: "example@mail.com",
      companyName: "ThisWebsite"
    }
  ],
  invoices: [
    {
      title: "Example Invoice",
      invoiceNumber: 1,
      projectId: "new project",
      clientId: 1,
      columns: [{ name: "Tcing", description: "cyril", hours: 5, rate: 40 }]
    }
  ]
};
