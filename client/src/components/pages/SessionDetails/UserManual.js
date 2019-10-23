import React from 'react';

import { SubDetailsContent } from './SessionDetails.Style';

export default () => {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <SubDetailsContent style={{ fontSize: '16px', marginBottom: '0.75rem' }}>
        Here you can manage your list of course participants to share relevant
        session infos with them.
      </SubDetailsContent>
      <SubDetailsContent
        style={{ fontWeight: '700', fontSize: '16px', marginBottom: '0.75rem' }}
      >
        This is how it works:
      </SubDetailsContent>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <span
            style={{
              fontWeight: '700',
              fontSize: '16px',
              textDecoration: 'underline',
              marginBottom: '0.75rem',
            }}
          >
            Adding emails:
          </span>
          <SubDetailsContent
            style={{
              fontSize: '16px',
              marginBottom: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            You can either copy an existing list of emails separated by commas,
            spaces etc. or input each address manually. If you wanted to copy a
            list of emails from a session you can click the copy icon above the
            input field. When choosing to input emails manually - clicking your
            mouse or pressing enter will store each email address.
          </SubDetailsContent>
          <SubDetailsContent
            style={{
              fontSize: '16px',
              marginBottom: '0.75rem',
            }}
          >
            Clicking the update button will store the updated list of emails.
          </SubDetailsContent>
        </li>
        <li>
          <span
            style={{
              fontWeight: '700',
              fontSize: '16px',
              textDecoration: 'underline',
              marginBottom: '0.75rem',
            }}
          >
            Removing emails:
          </span>
          <SubDetailsContent
            style={{
              fontSize: '16px',
              marginBottom: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            You can click the x icon next to each email address. This will
            remove participants from the list. Then click the update button to
            store the updated list.
          </SubDetailsContent>
        </li>
        <li>
          <span
            style={{
              fontWeight: '700',
              fontSize: '16px',
              textDecoration: 'underline',
              marginBottom: '0.75rem',
            }}
          >
            Deleting all emails:
          </span>
          <SubDetailsContent
            style={{
              fontSize: '16px',
              marginBottom: '0.75rem',
              marginTop: '0.75rem',
            }}
          >
            You can click the trash icon to delete a whole list of emails.
          </SubDetailsContent>
          <SubDetailsContent
            style={{
              fontSize: '16px',
              marginBottom: '0.75rem',
            }}
          >
            Then click the update button to store the updated list.
          </SubDetailsContent>
        </li>
      </ul>
    </div>
  );
};
