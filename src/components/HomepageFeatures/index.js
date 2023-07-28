import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Use cases',
    svg: 'img/usecases-icn.svg',
    description: (
      <>
        DAO, governance, quadratic funding, UBI, airdrops, oracles, individual
        loans, courts, decentralized ads, censorship free publications,
        reputation system, prediction markets, decentralized insurance,
        decentralized escrow and many more.
      </>
    ),
  },
  {
    title: 'Internet for people, not bots',
    svg: 'img/users-icn.svg',
    description: (
      <>
        Authorize users with Idena. Don`t ask users who they are. Ask them if
        they have multiple of accounts or not.
      </>
    ),
  },
  {
    title: 'Smart contracts and identity',
    svg: 'img/contracts-icn.svg',
    description: (
      <>
        Issue IRC20 tokens and lock them as identity stake. Use token staking
        for airdrops and plutocracy-resistant DAOs governed by token-backed
        identities.
      </>
    ),
  },
];

function Feature({ svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--left padding-horiz--md">
        {svg && (
          <div className="text--left">
            <img height="60px" src={svg} alt={title} />
          </div>
        )}
      </div>
      <div className="text--left padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
