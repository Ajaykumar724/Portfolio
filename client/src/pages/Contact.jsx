import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl mb-4">Contact</h1>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 bg-[#1b1b1b] border border-gray-700 rounded"
          required
        />

        <input
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 bg-[#1b1b1b] border border-gray-700 rounded"
          required
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 bg-[#1b1b1b] border border-gray-700 rounded h-32"
          required
        />

        <button className="px-4 py-2 bg-blue-600 rounded" type="submit">Send</button>
      </form>

      {status === 'sending' && <div className="mt-3 text-yellow-300">Sending...</div>}
      {status === 'sent' && <div className="mt-3 text-green-400">Message sent — thank you!</div>}
      {status === 'error' && <div className="mt-3 text-red-400">Failed to send message.</div>}
    </div>
  );
}

export default Contact;