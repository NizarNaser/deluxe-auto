
import "./Home.css"
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Main from "../main/Main";

function Home() {

    const { t } = useTranslation();

  return (
    <div>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="/icon.png" />
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <meta name="keywords" content={t('keywords')} />
        <meta name="robots" content="index, follow" />
      </Helmet>
        
        <Main/>
        

        
    </div>
  )
}

export default Home