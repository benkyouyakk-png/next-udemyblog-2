import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>小さいお店ですが、専門店ならでわの寝具に置いて良い眠りを提案させています。</p>
    </section>

    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key={id}>
          <Link href={`/posts/${id}`}>
          <img src={`${thumbnail}`} 
            className={styles.thumbnailImage}
          />
          </Link>
          {/* <a className={utilStyle.boldText}>SSGとSSRの使い分けの場面はいくつかな？</a> */}
          <Link href={`/posts/${id}`}>
          <p className={utilStyle.boldText}>{title}</p>
          </Link>
          <small className={utilStyle.light}>{date}</small>
        </article>
        ))}
      </div>

    </section>

  </Layout>
  
}
