import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeading } from './ui';
import { SERVICES } from '../data/content';
import { BUSINESS, fullAddress, locationLabel } from '../config/business';
import { isAppointmentApiConfigured } from '../lib/appointmentApi';

// Answers are generated from verified configuration only — nothing about
// pricing, availability, walk-ins or policies is asserted.
const contactChannels = () => {
  const channels = [];
  if (BUSINESS.phone) channels.push(`call us at ${BUSINESS.phone}`);
  if (BUSINESS.email) channels.push(`email ${BUSINESS.email}`);
  if (isAppointmentApiConfigured) channels.push('send a request through the appointment form on this page');
  return channels;
};

const joinList = (items) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}` : items[0];

function buildFaqs() {
  const channels = contactChannels();
  const reach = channels.length
    ? `You can ${joinList(channels)}.`
    : 'Contact details for the salon will be shared on this page.';
  const services = SERVICES.map((s) => s.title.toLowerCase());

  return [
    {
      q: 'What services does Royal Nail Store offer?',
      a: `Our services include ${joinList(services)}. See the Services section above for more about each one.`,
    },
    {
      q: 'How can I request an appointment?',
      a: isAppointmentApiConfigured
        ? 'Fill out the appointment request form on this page. Your appointment is confirmed once the salon contacts you to confirm availability.'
        : `${reach} Online appointment requests will be available soon.`,
    },
    {
      q: 'Can I request more than one service?',
      a: 'Yes. Choose “Multiple Services” in the appointment form and list the services you are interested in under Additional Notes.',
    },
    {
      q: 'Where is Royal Nail Store located?',
      a: fullAddress ? `We are located at ${fullAddress}.` : `Royal Nail Store is in ${locationLabel}.`,
    },
    {
      q: 'How can I ask about service pricing?',
      a: `Please contact the salon for current pricing on the services you are interested in. ${reach}`,
    },
    { q: 'How can I contact the salon?', a: reach },
  ];
}

export default function FAQSection() {
  const faqs = buildFaqs();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="reveal">
          <SectionHeading id="faq-title" title={['Frequently asked', 'questions']} align="center" className="heading--inline" light />
        </div>
        <div className="faq__list reveal reveal--rise">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className={`faq__item${open ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    {item.q}
                    <Plus size={20} strokeWidth={1.4} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__answer" hidden={!open}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
