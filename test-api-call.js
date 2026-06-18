const testPost = async () => {
  const payload = {
    service: null, // Set to null to skip FK constraint
    date: '2026-06-20',
    time: '14:30',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    notes: 'Test via Drizzle ORM - SUCCESS!'
  };

  try {
    const res = await fetch('http://localhost:3001/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('Response:', JSON.stringify(data, null, 2));

    // Now GET to verify
    const getRes = await fetch('http://localhost:3001/api/appointments');
    const appointments = await getRes.json();
    console.log('\nAll appointments:', JSON.stringify(appointments, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testPost();
