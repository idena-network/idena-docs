module.exports = {
  developer: [
    {
      type: 'category',
      label: 'Idena node',
      items: [
        'developer/node/general',
        'developer/node/shared',
        'developer/node/node-rpc',
        {
          type: 'category',
          label: 'Smart contracts',
          items: [
            'developer/node/smart-contracts',
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
      ],
    },
    {
      type: 'category',
      label: 'Idena desktop',
      items: ['developer/desktop/dna-url'],
    },
    'developer/desktop/sign-in',
    'developer/validation',
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
      ],
    },
  ],

};
