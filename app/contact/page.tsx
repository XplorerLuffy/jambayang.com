import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Jambayang Singye",
  description: "Get in touch to start a project.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4">
        Let&apos;s <span className="gold-text">Talk</span>
      </h1>
      <p className="font-cormorant text-xl text-text-muted mb-14">
        Tell me about your business and what you want to automate.
      </p>
      <ContactForm />
    </main>
  );
}
