import { NextPage } from 'next';
import CommonFooter from '../components/molecules/CommonFooter';
import Head from 'next/head';
import GraphTags from '../components/GraphTags';

const UHHO: NextPage & {getLayout?:any} = ({
 
}) => {
  
  return (
    <div>
      <Head>
      <link rel="canonical" href="https://www.ultraviolette.com/uh-ho" />
      <GraphTags
          title="Ultraviolette Automotive | uh-ho"
          description=""
          image=""
          url="https://www.ultraviolette.com/uh-ho"
        />
      </Head>
      <div className='h-[50vh] text-7xl flex justify-center items-center'> 
        UH HO!
      </div>
      <CommonFooter/>
    </div>
  );
};



export default UHHO;
