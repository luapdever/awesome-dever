import Head from "next/head";

const SITE_NAME = "Dever - Awesome portfolio | Paul M. ZANNOU";
const DEFAULT_DESCRIPTION =
  "Paul M. ZANNOU (Luap Dever) is a fullstack developer of digital solutions, creative interfaces, web services and APIs. With years of experience in Internet and Multimedia, he merges 2D, 3D and code to build interactive, experimental applications.";

// Normalize the configured app URL (it ships with a trailing slash) into a
// clean origin we can safely concatenate paths and assets onto.
const ORIGIN = (process.env.appUrl || "https://luap-dever.netlify.app").replace(/\/+$/, "");

/**
 * Centralized <head> for SEO: title, description, canonical, Open Graph,
 * Twitter cards and optional JSON-LD structured data.
 */
function Seo({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "awesome-dever.png",
  type = "website",
  jsonLd,
}) {
  const url = `${ORIGIN}${path}`;
  const imageUrl = image?.startsWith("http") ? image : `${ORIGIN}/${image.replace(/^\/+/, "")}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content="Paul M. ZANNOU" />
      <link rel="canonical" href={url} />
      <link rel="image_src" href={imageUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} key="ogsite" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content={type} key="ogtype" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:image" content={imageUrl} key="ogimage" />
      <meta property="og:image:secure_url" content={imageUrl} key="ogimagesecure" />
      <meta property="og:image:type" content="image/png" key="ogimagetype" />
      <meta property="og:image:width" content="1490" key="ogimagew" />
      <meta property="og:image:height" content="990" key="ogimageh" />
      <meta property="og:image:alt" content={title} key="ogimagealt" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}

export default Seo;
