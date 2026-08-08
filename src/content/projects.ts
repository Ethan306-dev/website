export type Project = {
  slug: string
  name: string
  eyebrow: string
  tagline: string
  summary: string
  image: string
  tags: string[]
  overview: string[]
  highlights: { title: string; body: string }[]
  details: { heading: string; body: string }[]
  facts: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'ace-stats',
    name: 'Ace Stats',
    eyebrow: 'Web · Sports data',
    tagline: 'Your edge in football analysis and betting.',
    summary:
      'A data-driven football platform that turns thousands of global league data points into clear predictions, prop lines, and team insight.',
    image: '/projects/ace-stats.jpg',
    tags: ['Football analytics', 'Betting tools', 'Dashboards'],
    overview: [
      'Ace Stats goes beyond basic scorelines. It harnesses thousands of data points from leagues across the globe to deliver insightful, predictive football statistics for bettors, fans, and analysts.',
      'The draft brings together modelling, custom props, venue splits, and deep team/player dashboards in one focused product experience — constantly updated and built for precision.',
    ],
    highlights: [
      {
        title: 'Advanced data modelling',
        body: 'Predictions shaped by form, league position, injuries, rivalries, and scheduling — context-aware rather than one-size-fits-all.',
      },
      {
        title: 'Custom prop lines',
        body: 'Real-time hit percentages for custom betting props, grounded in statistical modelling.',
      },
      {
        title: 'Home vs away breakdown',
        body: 'Venue-specific splits covering wins, goals, clean sheets, fouls, possession, and more.',
      },
      {
        title: 'Team & player dashboards',
        body: 'Detailed pages for every team, player, and competition — goals, assists, defensive records, and form.',
      },
      {
        title: 'Global leaderboards',
        body: 'Track top goalscorers, playmakers, and defenders across leagues in one place.',
      },
    ],
    details: [
      {
        heading: 'Built for the edge',
        body: 'Whether you’re a data-driven bettor, a fan wanting deeper insight, or someone checking a team’s form, Ace Stats is designed as a go-to tool — clear, predictive, and always updating.',
      },
      {
        heading: 'Community alongside the data',
        body: 'The experience includes a Discord pathway for daily picks, product updates, and support — keeping users close to the signal.',
      },
    ],
    facts: [
      { label: 'Type', value: 'Web product draft' },
      { label: 'Focus', value: 'Football · Betting · Analytics' },
      { label: 'Studio', value: '306.' },
    ],
  },
  {
    slug: 'platinum-body-works',
    name: 'Platinum Body Works',
    eyebrow: 'Web · Automotive',
    tagline: 'A locally trusted body works specialist.',
    summary:
      'A high-contrast automotive website draft for a local body shop — accident repairs, paintwork, and custom bodywork with clear calls to quote and call.',
    image: '/projects/platinum-body-works.jpg',
    tags: ['Automotive', 'Local business', 'Marketing site'],
    overview: [
      'Platinum Body Works needed a site that feels professional and workshop-ready: bold brand presence, strong CTAs, and clear service storytelling for people booking repairs after an accident or planning a respray.',
      'The draft pairs a full-bleed showroom hero with service highlights, trust signals, testimonials, and a direct path to call or request a quote.',
    ],
    highlights: [
      {
        title: 'Accident repairs',
        body: 'From minor scratches to major repairs — restoring vehicles quickly and professionally.',
      },
      {
        title: 'Paintwork',
        body: 'High-quality resprays and touch-ups using modern, durable finishes that last.',
      },
      {
        title: 'Custom bodywork',
        body: 'Personalised modifications and enhancements tailored to each vehicle’s style.',
      },
      {
        title: 'Trust at a glance',
        body: '20+ years’ experience, insurance-approved claims handling, and a locally trusted reputation.',
      },
    ],
    details: [
      {
        heading: 'Designed to convert locally',
        body: 'Call Now and Get a Quote sit front and centre, with workshop imagery and social proof so visitors feel confident booking a local specialist.',
      },
      {
        heading: 'Clear service structure',
        body: 'Welcome copy, equipment and technician credentials, and a dedicated “Why choose us?” section keep the offer easy to scan on mobile and desktop.',
      },
    ],
    facts: [
      { label: 'Type', value: 'Website draft' },
      { label: 'Focus', value: 'Body shop · Local services' },
      { label: 'Studio', value: '306.' },
    ],
  },
  {
    slug: 'finishing-touch',
    name: 'Finishing Touch by Gemma',
    eyebrow: 'Web · Local services',
    tagline: 'Where the little details make the biggest difference.',
    summary:
      'A warm, personal website draft for Gemma’s residential and commercial cleaning business in Barton-upon-Humber.',
    image: '/projects/finishing-touch.jpg',
    tags: ['Cleaning', 'Local business', 'Personal brand'],
    overview: [
      'Finishing Touch by Gemma is built around a personal introduction: Gemma has lived in Barton-upon-Humber for over 20 years and brings more than five years’ experience across residential and commercial cleaning.',
      'The draft keeps the tone welcoming and judgement-free — especially for busy households — with a clean two-column layout, atmospheric photography, and direct contact routes via WhatsApp, email, Facebook, and phone.',
    ],
    highlights: [
      {
        title: 'Personal introduction',
        body: 'A first-person welcome that puts Gemma front and centre — local roots, cleaning experience, and the relief clients feel walking into a finished home.',
      },
      {
        title: 'Residential & commercial',
        body: 'Positioned for regular cleans, deep refreshes, and everything in between — with a mum-of-three, seen-it-all perspective.',
      },
      {
        title: 'Easy contact',
        body: 'WhatsApp, email, Facebook, and phone icons make it simple to get in touch without a long form.',
      },
    ],
    details: [
      {
        heading: 'Calm, credible, local',
        body: 'Dark teal branding, a centred logo lockup, and soft lifestyle imagery create a polished but approachable feel for a one-person local business.',
      },
      {
        heading: 'Detail-led positioning',
        body: 'The line “where the little details make the biggest difference” anchors the brand promise beside Gemma’s portrait — personal trust over generic cleaning copy.',
      },
    ],
    facts: [
      { label: 'Type', value: 'Website draft' },
      { label: 'Focus', value: 'Cleaning · Barton-upon-Humber' },
      { label: 'Studio', value: '306.' },
    ],
  },
  {
    slug: 'rebeccas-tearooms',
    name: "Rebecca's Licensed Tearooms",
    eyebrow: 'Web · Hospitality',
    tagline: 'Where cozy afternoons meet unforgettable events.',
    summary:
      'A rustic, warm landing-page draft for a boutique tearoom and event space — menu, special events, and community gatherings like Silent Book Club.',
    image: '/projects/rebeccas-tearooms.jpg',
    tags: ['Hospitality', 'Events', 'Local business'],
    overview: [
      "Rebecca's Licensed Tearooms sits at the heart of town — a place for cozy afternoons, light bites, and memorable events. The draft leans into a vintage, serif-led aesthetic with soft beiges and deep greens.",
      'Hero storytelling highlights community moments such as Silent Book Club (Wednesdays 6–8pm), while service cards open pathways to the menu and special events.',
    ],
    highlights: [
      {
        title: 'Silent Book Club',
        body: 'A featured community event in the hero — Wednesdays 6pm–8pm — with a simple “Remind Me” call to action.',
      },
      {
        title: 'Our menu',
        body: 'A clear route into teas, cakes, and light bites, supported by rich food photography.',
      },
      {
        title: 'Special events',
        body: 'Themed afternoons, workshops, and seasonal celebrations for guests looking beyond a regular visit.',
      },
      {
        title: 'Guest voices',
        body: 'A row of short testimonials praising food, atmosphere, and friendly service — social proof without clutter.',
      },
    ],
    details: [
      {
        heading: 'Atmosphere first',
        body: 'Blurred café photography, ornate branding, and warm typography set a boutique tearoom mood before visitors even read the copy.',
      },
      {
        heading: 'Developed by 306.',
        body: 'Footer credit and simple Visit / Contact / Services links keep navigation light while pointing guests to the next step.',
      },
    ],
    facts: [
      { label: 'Type', value: 'Website draft' },
      { label: 'Focus', value: 'Tearoom · Events' },
      { label: 'Studio', value: '306.' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
