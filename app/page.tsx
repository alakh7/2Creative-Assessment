"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Contact {
  id: number;
  name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface SearchParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function ContactSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  // dummy data
  const mockContacts: Contact[] = [
    { id: 1, name: "John Doe", dob: "1990-05-15", email: "john@example.com", phone: "1234567890", address: "123 Main St", city: "New York", state: "NY", zipCode: "10001" },
    { id: 2, name: "Jane Smith", dob: "1985-10-20", email: "jane@example.com", phone: "9876543210", address: "456 Elm St", city: "Los Angeles", state: "CA", zipCode: "90001" },
    { id: 3, name: "Alice Johnson", dob: "1992-07-30", email: "alice@example.com", phone: "5551234567", address: "789 Pine St", city: "Austin", state: "TX", zipCode: "73301" },
    { id: 4, name: "Bob Brown", dob: "1988-03-22", email: "bob@example.com", phone: "4449876543", address: "321 Oak St", city: "Miami", state: "FL", zipCode: "33101" },
    { id: 5, name: "Charlie Davis", dob: "1995-09-10", email: "charlie@example.com", phone: "3332221111", address: "654 Birch St", city: "Seattle", state: "WA", zipCode: "98001" },
    { id: 6, name: "Daniel Evans", dob: "1993-06-25", email: "daniel@example.com", phone: "7778889999", address: "987 Cedar St", city: "Chicago", state: "IL", zipCode: "60601" },
    { id: 7, name: "Emma White", dob: "1987-12-15", email: "emma@example.com", phone: "6665554444", address: "246 Maple St", city: "San Francisco", state: "CA", zipCode: "94101" },
    { id: 8, name: "Frank Green", dob: "1991-04-18", email: "frank@example.com", phone: "1112223333", address: "159 Spruce St", city: "Denver", state: "CO", zipCode: "80201" },
    { id: 9, name: "Grace Hall", dob: "1986-08-29", email: "grace@example.com", phone: "9990001111", address: "753 Willow St", city: "Phoenix", state: "AZ", zipCode: "85001" },
    { id: 10, name: "Henry Scott", dob: "1994-02-11", email: "henry@example.com", phone: "8887776666", address: "852 Chestnut St", city: "Houston", state: "TX", zipCode: "77001" },
  ];

  //  event handler to update search params
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };


  // event handler to search contacts
  const handleSearch = () => {
    const filteredContacts = mockContacts.filter((contact) => {
      const nameParts = contact.name.toLowerCase().split(" ");
      const firstNameMatch = searchParams.firstName ? nameParts[0]?.includes(searchParams.firstName.toLowerCase()) : true;
      const lastNameMatch = searchParams.lastName ? nameParts[1]?.includes(searchParams.lastName.toLowerCase()) : true;
      const emailMatch = searchParams.email ? contact.email.toLowerCase().includes(searchParams.email.toLowerCase()) : true;
      const phoneMatch = searchParams.phone ? contact.phone.includes(searchParams.phone) : true;
      const dobMatch = searchParams.dob ? contact.dob === searchParams.dob : true;
      const cityMatch = searchParams.city ? contact.city.toLowerCase().includes(searchParams.city.toLowerCase()) : true;
      const stateMatch = searchParams.state ? contact.state.toLowerCase().includes(searchParams.state.toLowerCase()) : true;
      const zipMatch = searchParams.zipCode ? contact.zipCode.includes(searchParams.zipCode) : true;
      // console.log(filteredContacts.length);
      return firstNameMatch && lastNameMatch && emailMatch && phoneMatch && dobMatch && cityMatch && stateMatch && zipMatch;
    });

    if (filteredContacts.length === 0) {
      alert("No contacts found");
    } else {
      setContacts(filteredContacts);
      setCurrentPage(1);
    }
  };


  // event handler to reset search params
  const handleReset = () => {
    setSearchParams({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setContacts([]);
    setSelectedContact(null);
    setCurrentPage(1);
  };

  const handleSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = contacts.slice(indexOfFirstResult, indexOfLastResult);

  const nextPage = () => {
    if (indexOfLastResult < contacts.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Contact Search</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.keys(searchParams).map((key) => (
          <input
            key={key}
            type={key === "dob" ? "date" : "text"}
            name={key}
            value={searchParams[key as keyof SearchParams]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="p-2 bg-gray-800 rounded border border-gray-600"
          />
        ))}
      </div>

      <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 rounded mr-2">Search</button>
      <button onClick={handleReset} className="bg-gray-500 px-4 py-2 rounded">Reset</button>

      {/* <div className="mt-6">
        {currentResults.map((contact) => (
          <div key={contact.id} onClick={() => handleSelect(contact)} className="p-4 bg-gray-700 my-2 rounded cursor-pointer">
            {contact.name} - {contact.email}
          </div>
        ))}
      </div> */}
      <div className="mt-6">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          {currentResults.map((contact) => (

            <tr key={contact.id} onClick={() => handleSelect(contact)} className="w-[100vw] bg-[#000000] text-center p-[10px] mb-4">
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zipCode}</td>
            </tr>
          ))}
        </table>
      </div>
      {contacts.length > resultsPerPage && (
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-600 px-4 py-2 rounded mx-2">Previous</button>
          <button onClick={nextPage} disabled={indexOfLastResult >= contacts.length} className="bg-gray-600 px-4 py-2 rounded mx-2">Next</button>
        </div>
      )}
    </div>
  );
}
