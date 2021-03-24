import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Use cases',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        DAO, governance, quadratic funding, UBI, airdrops, oracles, individual
        loans, courts, decentralized ads, censorship free publications,
        reputation system, prediction markets, decentralized escrow and many
        more.
      </>
    ),
  },
  {
    title: 'Internet for people, not bots',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Authorize users with Idena. Don`t ask users who they are. Ask them if
        they might have multiple of accounts.
      </>
    ),
  },
  {
    title: 'Smart contracts for everyone',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        We cannot make blockchain transactions cheap. But we can make it so that
        anyone can mine cryptocurency and spend it when using smart contracts.
      </>
    ),
  },
];

const clients = [
  {
    caption: 'Gitcoin',
    infoLink: 'https://gitcoin.io',
    image: 'img/gitcoin.png',
  },

  {
    caption: 'Idena discord bot',
    infoLink: 'https://github.com/iyomisc/idenauth',
    image: 'img/discord.png',
  },

  {
    caption: 'Idena forum',
    infoLink: 'https://discuss.idena.website/',
    image: 'img/idenaforum.png',
  },

  {
    caption: 'Fairdrop',
    infoLink: 'https://fairdrop.io/',
    image: 'img/fairdrop.png',
  },

  {
    caption: 'Idenary',
    infoLink: 'https://idenary.com/',
    image: 'img/idenary.png',
  },
  {
    caption: 'iOS/Android app',
    infoLink: 'https://github.com/redDwarf03/my-idena',
    image: 'img/iosandroid.png',
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Client({ image, caption, infoLink }) {
  const imgUrl = useBaseUrl(image);
  return (
    <div className={clsx('col col--2', styles.feature)}>
      {imgUrl && (
        <div style={{ textAlign: 'center' }}>
          <a href={infoLink}>
            <img
              style={{ minHeight: '40px', maxHeight: '40px' }}
              src={imgUrl}
              alt={caption}
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Idena Documentation ${siteConfig.title}`}
      description="Build with Idena: cryptoidentity is the building block for Web 3.0"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/node/general/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        {clients && clients.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <h1 style={{ textAlign: 'center' }}>Projects using Idena</h1>
              <div className="row">
                {clients.map((props, idx) => (
                  <Client key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
