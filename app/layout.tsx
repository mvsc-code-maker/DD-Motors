import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'DD Motors | Veículos Premium e Importados em Guarulhos',
  description: 'Loja de veículos importados e nacionais referência em Guarulhos! Transparência, Excelência e atendimento personalizado!',
  openGraph: {
    title: 'DD Motors | Veículos Premium e Importados',
    description: 'Loja de veículos importados e nacionais referência em Guarulhos! Transparência, Excelência e atendimento personalizado!',
    url: 'https://ddmotors.com.br',
    siteName: 'DD Motors',
    images: [
      {
        url: 'https://placehold.co/1200x630/1a1a1a/ffffff?text=DD+Motors',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              "name": "DD Motors",
              "image": "https://placehold.co/600x400/1a1a1a/ffffff?text=DD+Motors",
              "url": "https://ddmotors.com.br",
              "telephone": "+5511986848481",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Avelino Alves Machado, 48 - Jardim Pinhal",
                "addressLocality": "Guarulhos",
                "addressRegion": "SP",
                "postalCode": "07120-000",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -23.456789,
                "longitude": -46.543210
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </head>
      <body className="bg-zinc-50 text-zinc-900 antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
