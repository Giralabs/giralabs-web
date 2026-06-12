export type Lang = "es" | "en";

export const translations = {
  es: {
    // Meta
    meta_title: "Giralabs | Estudio de Apps Móviles",
    meta_description:
      "Giralabs es un estudio especializado en desarrollo de apps móviles, digitalización de empresas y experiencias digitales premium.",

    // Navbar
    nav_services: "Servicios",
    nav_services_all: "Todos los servicios",
    nav_projects: "Proyectos",
    nav_about: "Nosotros",
    nav_blog: "Blog",
    nav_contact: "Contacto",
    nav_cta: "Hablemos",

    // Hero
    hero_label: "Estudio de apps móviles",
    hero_tagline: "Diseñamos y desarrollamos apps que las personas <span class='gradient-text'>aman usar</span>.",
    hero_sub:
      "De la idea al lanzamiento. Apps nativas, multiplataforma y soluciones digitales para empresas que quieren crecer.",
    hero_cta_primary: "Ver proyectos",
    hero_cta_secondary: "Conocer servicios",

    // Stats
    stats_apps: "Apps entregadas",
    stats_clients: "Clientes satisfechos",
    stats_years: "Años de experiencia",
    stats_countries: "Países",

    // Services dark section header
    sd_eyebrow: "LO QUE HACEMOS",
    sd_title: "Construimos producto digital premium.\nIntegramos tecnología que acelera tu negocio.",

    // Service cards (6 total)
    service_1_title: "Descubrimiento de Producto",
    service_1_tag: "Estrategia",
    service_1_desc:
      "Definimos tu MVP en 2 semanas. Validamos la idea, diseñamos el alcance técnico y cerramos un precio fijo. Cero código hasta estar seguros.",

    service_2_title: "Diseño de Experiencia (UX/UI)",
    service_2_tag: "Diseño",
    service_2_desc:
      "Interfaces limpias que convierten. Sistemas de diseño escalables, prototipos interactivos y pruebas reales con usuarios antes del desarrollo.",

    service_3_title: "Ingeniería Móvil & Backend",
    service_3_tag: "Desarrollo",
    service_3_desc:
      "De Figma a producción en 16 semanas. Flutter Partner oficial en frontend, y backend robusto en Go. Arquitecturas preparadas para millones de peticiones.",

    service_4_title: "Crecimiento Continuo",
    service_4_tag: "Evolución",
    service_4_desc:
      "El lanzamiento es solo el primer paso. Escalamos tu producto con sprints basados en métricas reales de usuario, no en opiniones.",

    service_5_title: "Inteligencia Artificial Aplicada",
    service_5_tag: "IA · Integración",
    service_5_desc:
      "Modelos de lenguaje, agentes autónomos y RAG empresarial integrados en tu núcleo de negocio. Resultados medibles sin rodeos técnicos.",

    service_6_title: "Digitalización de Empresas",
    service_6_tag: "Procesos",
    service_6_desc:
      "Desarrollamos aplicaciones personalizadas para digitalizar empresas. Soluciones a medida que automatizan tus operaciones, optimizan flujos de trabajo y aceleran el crecimiento.",

    // Services page translations
    services_page_title: "Nuestros Servicios",
    services_page_subtitle: "Construimos software a medida con precisión de ingeniería y diseño excepcional.",
    services_page_cta: "Cuéntanos tu proyecto",
    services_included: "Qué incluye:",
    service_1_feature_1: "Definición del alcance técnico y funcional.",
    service_1_feature_2: "Prototipo interactivo (Wireframes).",
    service_1_feature_3: "Presupuesto cerrado de desarrollo.",
    service_2_feature_1: "Diseño de interfaz de usuario de alta fidelidad.",
    service_2_feature_2: "Sistemas de diseño escalables.",
    service_2_feature_3: "Pruebas de usabilidad reales.",
    service_3_feature_1: "Aplicaciones móviles nativas con Flutter.",
    service_3_feature_2: "Backend escalable y seguro en Go.",
    service_3_feature_3: "Despliegue y nube en Kubernetes (GKE).",
    service_4_feature_1: "Instrumentación y analítica avanzada de uso.",
    service_4_feature_2: "Optimización continua y pruebas A/B.",
    service_4_feature_3: "Sprints ágiles de evolución mensual.",
    service_5_feature_1: "Integración de Modelos de Lenguaje (LLMs).",
    service_5_feature_2: "Agentes inteligentes y automatización.",
    service_5_feature_3: "Sistemas de recuperación de información (RAG).",
    service_6_feature_1: "Sistemas personalizados de gestión (CRM/ERP).",
    service_6_feature_2: "Integración segura de servicios cloud y APIs.",
    service_6_feature_3: "Automatización de flujos de trabajo.",
    service_details_title: "Detalles del servicio",
    service_next_cta: "Siguiente servicio",
    service_back_list: "Volver a todos los servicios",
    service_1_details: "Analizamos tu idea a fondo antes de tirar una sola línea de código. Definimos los requerimientos y el alcance funcional, creamos los wireframes interactivos y diseñamos una hoja de ruta con un presupuesto de desarrollo cerrado para mitigar cualquier riesgo técnico.",
    service_2_details: "Diseñamos interfaces que cautivan y convierten. Creamos flujos limpios y sistemas de diseño consistentes para asegurar que la experiencia sea intuitiva en cualquier pantalla, validando las decisiones con pruebas de usabilidad reales.",
    service_3_details: "Desarrollamos aplicaciones robustas con rendimiento nativo utilizando Flutter, combinadas con arquitecturas de backend altamente escalables en Go y desplegadas en la nube de Kubernetes para garantizar alta disponibilidad.",
    service_4_details: "El lanzamiento es solo el punto de partida. Implementamos analítica avanzada, monitorizamos el comportamiento del usuario y ejecutamos sprints ágiles de mejora continua basados en datos reales para maximizar el engagement.",
    service_5_details: "Integramos de manera práctica modelos de lenguaje natural (LLMs), agentes autónomos y sistemas de recuperación RAG en la estructura de tu negocio para automatizar tareas complejas y habilitar nuevas capacidades inteligentes.",
    service_6_details: "Modernizamos tus operaciones creando CRMs, ERPs y flujos de trabajo automatizados a medida que se integran sin problemas con tus herramientas existentes para eliminar cuellos de botella y reducir costes.",

    // How we work
    how_label: "Cómo trabajamos",
    how_title: "Un proceso claro,\nresultados concretos.",
    how_1_title: "Descubrimiento",
    how_1_desc:
      "Entendemos tu negocio, usuarios y objetivos antes de escribir una sola línea de código.",
    how_2_title: "Diseño",
    how_2_desc:
      "Creamos prototipos interactivos y sistemas de diseño que el equipo y los usuarios validan.",
    how_3_title: "Desarrollo",
    how_3_desc:
      "Código limpio, iteraciones rápidas y entregas continuas. Siempre sabés en qué punto estamos.",
    how_4_title: "Lanzamiento",
    how_4_desc:
      "Publicación, analítica, monitoreo. Tu app en manos de tus usuarios en el menor tiempo posible.",

    // Statement section
    statement_heading: "La mayoría de apps no fracasan.\nNacen sin dirección.",
    statement_h_light1: "La mayoría de apps",
    statement_h_bold: "no fracasan.",
    statement_h_light2: "Nacen sin dirección.",
    statement_sub:
      "Sin saber qué construir ni para quién. Sin el equipo adecuado ni estrategia detrás.",
    statement_sub2:
      "En Giralabs unimos estrategia de producto, diseño e ingeniería. Para convertir ideas con potencial en apps que la gente elige usar.",
    statement_cta: "HABLEMOS ANTES DEL PRIMER COMMIT",

    // Manifesto
    manifesto_label: "NUESTRA VENTAJA",

    // Pioneers section (Flutter)
    pioneers_eyebrow: "TECNOLOGÍA DE VANGUARDIA",
    pioneers_title: "Rendimiento nativo. Stack moderno. Cero deuda técnica.",
    pioneers_p1: "Seleccionamos las herramientas más avanzadas para darte una <strong>ventaja competitiva real</strong>. Desarrollamos con tecnologías robustas que garantizan escalabilidad y velocidad.",
    pioneers_p2: "Desde desarrollo móvil y multiplataforma hasta infraestructuras cloud integradas de alta disponibilidad. Sin fricciones, solo resultados excepcionales.",
    pioneers_button: "CONOCE NUESTRO STACK",

    // Projects summary section
    projects_eyebrow: "CASOS DE ÉXITO",
    projects_title: "Proyectos que hablan por sí solos.",
    project_1_tag: "App móvil",
    project_1_title: "Gipsi",
    project_1_desc: "Gestión inteligente de citas y reservas para barberías",
    project_2_tag: "E-commerce",
    project_2_title: "Nexus",
    project_2_desc: "Marketplace moderno de comercio electrónico y ofertas",
    project_3_tag: "Entretenimiento",
    project_3_title: "Le Pokedex",
    project_3_desc: "Enciclopedia Pokémon interactiva con rendimiento nativo",
    project_4_tag: "Red Social",
    project_4_title: "AuraMovies",
    project_4_desc: "La red social definitiva para amantes del cine y series",

    // Footer
    footer_tagline: "Hecho con precisión en España.",
    footer_contact: "Contacto",
    footer_rights: "© 2026 Giralabs. Todos los derechos reservados.",
    footer_email: "support@giralabs.com",

    // About Page
    about_page_title: "Nosotros",
    about_page_subtitle: "Diseñamos y desarrollamos soluciones digitales premium con pasión por el detalle.",
    about_hero_eyebrow: "NUESTRA HISTORIA",
    about_intro_p1: "En Giralabs creemos que el software excelente no surge por accidente. Nace de la combinación perfecta entre estrategia de negocio, diseño intuitivo e ingeniería de alto rendimiento.",
    about_intro_p2: "No somos una consultora masiva. Somos un equipo boutique enfocado en la calidad, la transparencia y el impacto real. Trabajamos codo con codo con fundadores y líderes de producto para convertir visiones ambiciosas en aplicaciones memorables.",
    about_value_1_title: "Precisión de Ingeniería",
    about_value_1_desc: "Escribimos código limpio, robusto y escalable. Optimizamos el rendimiento al milisegundo y tratamos la seguridad como una prioridad absoluta.",
    about_value_2_title: "Diseño de Vanguardia",
    about_value_2_desc: "Creemos en la simplicidad y en interfaces que guíen al usuario sin fricciones. Cada píxel, animación y transición está diseñado con un propósito.",
    about_value_3_title: "Transparencia Total",
    about_value_3_desc: "Sin sorpresas ni rodeos. Compartimos nuestro progreso en tiempo real y nos comprometemos con presupuestos y plazos de entrega realistas.",
    about_team_title: "El Equipo Detrás del Código",
    about_team_subtitle: "Un grupo de apasionados por la tecnología comprometidos con crear experiencias memorables.",
    team_member_1_name: "Jose M.",
    team_member_1_role: "Co-Founder & Lead Engineer",
    team_member_1_bio: "Especialista en arquitecturas de alta disponibilidad, Flutter y sistemas en la nube. Obsesionado con el rendimiento del frontend y la robustez del backend.",
    team_member_2_name: "Laura G.",
    team_member_2_role: "Lead UX/UI Designer",
    team_member_2_bio: "Creadora de experiencias interactivas y sistemas de diseño escalables. Combina psicología y estética para diseñar productos que enamoran.",
    about_stats_title: "Nuestras Métricas de Calidad",
    about_stats_1: "Líneas de Código Limpias",
    about_stats_2: "Tasa de Disponibilidad",
    about_stats_3: "Horas de QA y Pruebas",
    about_stats_4: "Proyectos de Impacto",
  },

  en: {
    // Meta
    meta_title: "Giralabs | Mobile App Studio",
    meta_description:
      "Giralabs is a studio specialized in mobile app development, business digitalization, and premium digital experiences.",

    // Navbar
    nav_services: "Services",
    nav_services_all: "All services",
    nav_projects: "Projects",
    nav_about: "About",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_cta: "Let's talk",

    // Hero
    hero_label: "Mobile app studio",
    hero_tagline: "We design and build apps people <span class='gradient-text'>love to use</span>.",
    hero_sub:
      "From idea to launch. Native apps, cross-platform and digital solutions for companies ready to grow.",
    hero_cta_primary: "View projects",
    hero_cta_secondary: "Explore services",

    // Stats
    stats_apps: "Apps delivered",
    stats_clients: "Happy clients",
    stats_years: "Years of experience",
    stats_countries: "Countries",

    // Services dark section header
    sd_eyebrow: "WHAT WE DO",
    sd_title: "We build premium digital products.\nWe integrate technology that accelerates your business.",

    // Service cards (6 total)
    service_1_title: "Product Discovery",
    service_1_tag: "Strategy",
    service_1_desc:
      "We define your MVP in 2 weeks. Validating the idea, planning the technical scope, and fixing a budget. Zero code until we are sure.",

    service_2_title: "Experience Design (UX/UI)",
    service_2_tag: "Design",
    service_2_desc:
      "Clean, conversion-oriented interfaces. Scalable design systems, interactive prototypes, and real-user testing before writing code.",

    service_3_title: "Mobile & Backend Engineering",
    service_3_tag: "Development",
    service_3_desc:
      "From Figma to production in 16 weeks. Google's Flutter Partner on client, robust Go backend on server. Built to scale to millions.",

    service_4_title: "Continuous Growth",
    service_4_tag: "Evolution",
    service_4_desc:
      "Launch day is just day one. We scale your product with bi-weekly sprints driven by clear user metrics, not opinions.",

    service_5_title: "Applied Artificial Intelligence",
    service_5_tag: "AI · Integration",
    service_5_desc:
      "LLMs, autonomous agents, and enterprise RAG integrated directly into your business core. Real, measurable results, no hype.",

    service_6_title: "Business Digitalization",
    service_6_tag: "Processes",
    service_6_desc:
      "We build custom applications to digitalize businesses. Tailor-made solutions that automate operations, optimize workflows, and accelerate growth.",

    // Services page translations
    services_page_title: "Our Services",
    services_page_subtitle: "We build custom software with engineering precision and exceptional design.",
    services_page_cta: "Tell us about your project",
    services_included: "What's included:",
    service_1_feature_1: "Technical and functional scope definition.",
    service_1_feature_2: "Interactive MVP wireframing.",
    service_1_feature_3: "Fixed budget proposal for development.",
    service_2_feature_1: "High-fidelity UI interface design.",
    service_2_feature_2: "Scalable design system architecture.",
    service_2_feature_3: "Real user usability testing.",
    service_3_feature_1: "Native cross-platform mobile apps (Flutter).",
    service_3_feature_2: "Secure, high-performance Go backend.",
    service_3_feature_3: "Cloud deployment in Kubernetes (GKE).",
    service_4_feature_1: "Advanced analytical usage tracking.",
    service_4_feature_2: "Continuous optimization and A/B testing.",
    service_4_feature_3: "Monthly evolution agile sprints.",
    service_5_feature_1: "Large Language Model (LLM) integrations.",
    service_5_feature_2: "Intelligent autonomous agents.",
    service_5_feature_3: "Retrieval-Augmented Generation (RAG) systems.",
    service_6_feature_1: "Custom management software (CRM/ERP).",
    service_6_feature_2: "Secure cloud integrations and APIs.",
    service_6_feature_3: "Process workflow automation.",
    service_details_title: "Service details",
    service_next_cta: "Next service",
    service_back_list: "Back to all services",
    service_1_details: "We analyze your idea in depth before writing a single line of code. We define functional and technical requirements, build interactive wireframes, and design a development roadmap with a closed budget to mitigate technical risk.",
    service_2_details: "We design interfaces that captivate and convert. We create clean user flows and consistent design systems to ensure an intuitive experience on any screen, validating design choices with real usability testing.",
    service_3_details: "We build robust mobile apps with native performance using Flutter, coupled with highly scalable Go backend architectures, deployed on Kubernetes cloud to guarantee high availability.",
    service_4_details: "Launching is just the starting point. We implement advanced analytics, monitor user behavior, and execute agile continuous improvement sprints based on real data to maximize engagement.",
    service_5_details: "We integrate large language models (LLMs), autonomous agents, and RAG retrieval systems into your business structure to automate complex tasks and enable smart new capabilities.",
    service_6_details: "We modernize your operations by building custom CRMs, ERPs, and automated workflows that integrate seamlessly with your existing tools to eliminate bottlenecks and cut costs.",

    // How we work
    how_label: "How we work",
    how_title: "A clear process,\nconcrete results.",
    how_1_title: "Discovery",
    how_1_desc:
      "We understand your business, users and goals before writing a single line of code.",
    how_2_title: "Design",
    how_2_desc:
      "We create interactive prototypes and design systems that the team and users validate.",
    how_3_title: "Development",
    how_3_desc:
      "Clean code, fast iterations and continuous delivery. You always know where we are.",
    how_4_title: "Launch",
    how_4_desc:
      "Publishing, analytics, monitoring. Your app in users hands in the shortest time possible.",

    // Statement section
    statement_heading: "Most apps don't fail.\nThey launch without direction.",
    statement_h_light1: "Most apps",
    statement_h_bold: "don't fail.",
    statement_h_light2: "They launch without direction.",
    statement_sub:
      "Without knowing what to build or for whom. Without the right team or strategy behind.",
    statement_sub2:
      "At Giralabs we combine product strategy, design and engineering. To turn ideas with potential into apps people choose to use.",
    statement_cta: "LET'S TALK BEFORE THE FIRST COMMIT",

    // Manifesto
    manifesto_label: "OUR EDGE",

    // Pioneers section (Flutter)
    pioneers_eyebrow: "VANGUARD TECH STACK",
    pioneers_title: "Native performance. Modern stack. Zero technical debt.",
    pioneers_p1: "We select the most advanced tools to give you a <strong>real competitive advantage</strong>. We develop with robust technologies that guarantee scalability and speed.",
    pioneers_p2: "From mobile and cross-platform development to highly available integrated cloud infrastructures. Zero friction, only exceptional results.",
    pioneers_button: "EXPLORE OUR TECH STACK",

    // Projects summary section
    projects_eyebrow: "SUCCESS STORIES",
    projects_title: "Projects that speak for themselves.",
    project_1_tag: "Mobile App",
    project_1_title: "Gipsi",
    project_1_desc: "Smart appointment and booking management for barbershops",
    project_2_tag: "E-commerce",
    project_2_title: "Nexus",
    project_2_desc: "Modern e-commerce marketplace and real-time deals",
    project_3_tag: "Entertainment",
    project_3_title: "Le Pokedex",
    project_3_desc: "Interactive Pokémon encyclopedia with native performance",
    project_4_tag: "Social App",
    project_4_title: "AuraMovies",
    project_4_desc: "The ultimate social network for movie and series lovers",

    // Footer
    footer_tagline: "Crafted with precision in Spain.",
    footer_contact: "Contact",
    footer_rights: "© 2026 Giralabs. All rights reserved.",
    footer_email: "support@giralabs.com",

    // About Page
    about_page_title: "About Us",
    about_page_subtitle: "We design and build premium digital solutions with passion for detail.",
    about_hero_eyebrow: "OUR STORY",
    about_intro_p1: "At Giralabs, we believe excellent software doesn't happen by accident. It is born from the perfect blend of business strategy, intuitive design, and high-performance engineering.",
    about_intro_p2: "We are not a mass-market consultancy. We are a boutique team focused on quality, transparency, and real impact. We work hand-in-hand with founders and product leaders to turn ambitious visions into memorable applications.",
    about_value_1_title: "Engineering Precision",
    about_value_1_desc: "We write clean, robust, and scalable code. We optimize performance to the millisecond and treat security as an absolute priority.",
    about_value_2_title: "Vanguard Design",
    about_value_2_desc: "We believe in simplicity and in interfaces that guide the user without friction. Every pixel, animation, and transition is crafted with purpose.",
    about_value_3_title: "Total Transparency",
    about_value_3_desc: "No surprises, no runarounds. We share our progress in real-time and commit to realistic budgets and delivery deadlines.",
    about_team_title: "The Team Behind the Code",
    about_team_subtitle: "A group of tech enthusiasts committed to building memorable experiences.",
    team_member_1_name: "Jose M.",
    team_member_1_role: "Co-Founder & Lead Engineer",
    team_member_1_bio: "Specialist in high-availability architectures, Flutter, and cloud systems. Obsessed with frontend performance and backend robustness.",
    team_member_2_name: "Laura G.",
    team_member_2_role: "Lead UX/UI Designer",
    team_member_2_bio: "Creator of interactive experiences and scalable design systems. Combines psychology and aesthetics to design products people love.",
    about_stats_title: "Our Quality Metrics",
    about_stats_1: "Lines of Clean Code",
    about_stats_2: "Uptime Rate",
    about_stats_3: "QA & Testing Hours",
    about_stats_4: "High-Impact Projects",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] as string;
}
