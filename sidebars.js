module.exports = {
  developer: [
    {
      type: 'category',
      label: 'Idena app',
      items: [
        'developer/desktop/sign-in',
        'developer/send-dna',
        'developer/send-invite',
        'developer/send-raw',
        'developer/desktop/dna-url',
      ],
    },

    {
      type: 'category',
      label: 'Idena node',
      items: [
        'developer/node/general',
        'developer/node/node-rpc',
        'developer/node/shared',
      ],
    },

    {
      type: 'category',
      label: 'Smart contracts',
      items: [
        'developer/node/smart-contracts',
        'developer/node/quick-start',
        'developer/node/idena-sdk-as',
        'developer/node/smart-contracts-methods',
        {
          type: 'category',
          label: 'Predefined contracts',
          items: [
            'developer/node/oracle-lock',
            'developer/node/refundable-oracle-lock',
            'developer/node/multisig',
            'developer/node/time-lock',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Architecture',
      items: [
        'developer/identity-bridge',
        'developer/ipfs/upload',
        'developer/validation',
      ],
    },
  ],

  wp: [
    {
      type: 'category',
      label: 'Whitepaper',
      items: [
        'wp/summary',
        'wp/manifesto',
        'wp/technology',
        'wp/flip-challenge',
        'wp/economics',
        'wp/roadmap',
      ],
    },
  ],

  community: [
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/resources',
        'community/channels',
        'community/affiliate',
      ],
    },
  ],
};
