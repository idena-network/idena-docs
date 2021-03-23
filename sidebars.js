module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Idena node',
      items: [
        'node/general',
        'node/node-rpc',
        {
          type: 'category',
          label: 'Smart contracts',
          items: [
            'node/smart-contracts',
            'node/smart-contracts-methods',
            {
              type: 'category',
              label: 'Predefined contracts',
              items: [
                'node/oracle-lock',
                'node/refundable-oracle-lock',
                'node/multisig',
                'node/time-lock',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Idena desktop',
      items: ['desktop/dna-url', 'desktop/sign-in'],
    },
  ],
};
