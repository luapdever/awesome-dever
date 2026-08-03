import { faqItems } from "../../../rawDatas/faq";
import { tx } from "../../../data";
import { useLandingLang } from "../../../context/landingLang";
import styles from "../../../../styles/specific/about/faq.module.css";

/* Bloc FAQ visible, adossé au schéma FAQPage émis par la page.
   `<details>` natif : accessible au clavier, sans JS, et le texte reste dans le
   DOM même replié — condition pour que Google le prenne en compte. */
export default function Faq() {
  const { lang } = useLandingLang();
  const fr = lang === "fr";

  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        {fr ? "Questions fréquentes" : "Frequently asked questions"}
      </h2>
      <p className={styles.intro}>
        {fr
          ? "Les questions que les recruteurs posent le plus souvent — celles auxquelles PaulBot répond au quotidien."
          : "The questions recruiters ask most often — the ones PaulBot answers every day."}
      </p>

      <div className={styles.list}>
        {faqItems.map((item, i) => (
          <details key={i} className={styles.item}>
            <summary className={styles.q}>{tx(item.q, lang)}</summary>
            <p className={styles.a}>{tx(item.a, lang)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
