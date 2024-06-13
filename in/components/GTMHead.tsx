import Head from 'next/head';

export default function GTMHead() {
  const gtmScript = `
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-5NMK2796');
  `;

  return (
    <Head>
      {/* Pasting this code as high in the <head> of the page as possible */}
      <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      {/* End Google Tag Manager */}
    </Head>
  );
}
