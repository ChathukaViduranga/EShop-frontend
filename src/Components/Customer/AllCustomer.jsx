// All Customer Details Component
function Customer() {
  const userData = [
    {
      id: "6702652d1a6a34bf70d2d7ec",
      username: "testCustomer",
      passwordHash:
        "$2a$11$HiJpiIFhRcvGlAb7g4kBUusKeGfpV73hTzbYP/L0nv3YXTFi/8eLK",
      role: "Customer",
      email: "testCustomer@example.com",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1989-12-31T18:30:00Z",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "90210",
        country: "USA",
      },
      vendorName: null,
      vendorDescription: null,
      ratings: [],
      averageRating: 0,
    },
    {
      id: "67045d0daa7e0eeec5a89af1",
      username: "testCustomer1",
      passwordHash:
        "$2a$11$29L0WEsSuXio9uhSqm017eDQ1OcDkAsYYlw2gQuVI9Ko7ECjxvRDW",
      role: "Customer",
      email: "testCustomer1@example.com",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1989-12-31T18:30:00Z",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "90210",
        country: "USA",
      },
      vendorName: null,
      vendorDescription: null,
      ratings: [],
      averageRating: 0,
    },
    {
      id: "67046bf6c70c2a13a26c16f0",
      username: "testCustomersrfhy",
      passwordHash:
        "$2a$11$VrlvU8PgTPILR9nWAc2T4u3IvEChQOc.bIolFEqyvoVzDpETH3Ozy",
      role: "Customer",
      email: "terfrstCustomer@example.com",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1989-12-31T18:30:00Z",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "90210",
        country: "USA",
      },
      vendorName: null,
      vendorDescription: null,
      ratings: [],
      averageRating: 0,
    },
  ];
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Customer Details</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>User ID</th>

            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>

            <th>City</th>

            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>

              <td>{user.address.city}</td>

              <td>{user.address.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
