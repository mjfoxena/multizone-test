import Document, { Html, Head, Main, NextScript } from "next/document";
import { API_CONSTANTS } from "../services/constants";
const favUrl = `${API_CONSTANTS.BASE_IMAGE_URL_CDN}`;


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=AW-11305888644"
          ></script>
          <script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=G-8QPKM87RBW"
          ></script>
          <script defer
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11305888644');
              gtag('config', 'G-8QPKM87RBW');
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '177984335268253'); 
              fbq('track', 'PageView');
                if (window.location.href.indexOf("thank") > -1) {
                  gtag('event', 'conversion', {'send_to': 'AW-11305888644/UBMtCMDPwuMYEITXiI8q' });
                  gtag('event', 'thanks', {'send_to': 'G-8QPKM87RBW' });
                  gtag('event', 'conversion', {
                    'event_category': test-ride,
                    'event_label': form_submitted,
                  });
                  fbq('track', 'Lead')
                }
            `,
            }}
          ></script>
          <link
            rel="icon"
            // href="/images/icons/uv-logo.svg"
            href={`${favUrl}/uv-logo.svg`}
            type="image/png"
            sizes="36x36"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
          />          
          <link
            // eslint-disable-next-line max-len
            href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,500,500i,700,700i,900,900i&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
