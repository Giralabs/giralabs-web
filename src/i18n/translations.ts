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
    project_3_title: "Rewind TV",
    project_3_desc: "Backlog inteligente de películas y series para organizar tu colección",
    project_4_tag: "Red Social",
    project_4_title: "AuraMovies",
    project_4_desc: "La red social definitiva para amantes del cine y series",

    // Footer
    footer_tagline: "Hecho con precisión en España.",
    footer_contact: "Contacto",
    footer_rights: "© 2026 Giralabs. Todos los derechos reservados.",
    footer_email: "support@giralabs.es",

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

    // Blog Page
    blog_page_title: "Blog",
    blog_page_subtitle: "Compartimos nuestras ideas sobre desarrollo de apps móviles, diseño de experiencia y tecnología.",
    blog_hero_eyebrow: "NUESTRAS IDEAS",
    blog_empty_title: "Próximamente",
    blog_empty_desc: "Estamos preparando artículos sobre Flutter, desarrollo nativo, Kubernetes e Inteligencia Artificial aplicada.",
    blog_subscribe_title: "Suscríbete a nuestra newsletter",
    blog_subscribe_placeholder: "Introduce tu email...",
    blog_subscribe_btn: "Suscribirse",
    blog_subscribe_success: "¡Gracias! Te notificaremos tan pronto como publiquemos nuestro primer artículo.",

    // 404 Page
    error_404_title: "404",
    error_404_subtitle: "Página no encontrada",
    error_404_desc: "Lo sentimos, la página que estás buscando no existe, ha sido eliminada o ha cambiado de dirección.",
    error_404_btn: "Volver al inicio",

    // Footer bottom links
    footer_legal: "Aviso Legal",
    footer_privacy: "Política de Privacidad",
    footer_accessibility: "Accesibilidad",

    // Legal Page
    legal_page_title: "Aviso Legal",
    legal_page_subtitle: "Términos, condiciones y aspectos legales de Giralabs.",
    legal_intro_title: "1. Información General",
    legal_intro_desc: "Este sitio web es operado por Giralabs Estudio de Software S.L., con domicilio social en Madrid, España. Para cualquier consulta, comunicación o ejercicio de derechos, puede ponerse en contacto con nuestro equipo técnico y de soporte a través de la dirección de correo electrónico support@giralabs.es.",
    legal_terms_title: "2. Propiedad Intelectual",
    legal_terms_desc: "Todo el software, código fuente, interfaces, sistemas de diseño, animaciones, wireframes, textos y elementos gráficos que componen esta web o nuestros productos son propiedad exclusiva de Giralabs, estando estrictamente prohibida su copia, distribución o ingeniería inversa sin consentimiento previo por escrito.",
    legal_limit_title: "3. Limitación de Responsabilidad",
    legal_limit_desc: "Aunque nos esforzamos por garantizar la máxima disponibilidad técnica y la veracidad de los contenidos informados, Giralabs no asume responsabilidad alguna por posibles caídas del servicio técnico temporal, retrasos o errores tipográficos en el material expuesto.",
    legal_jurisdiction_title: "4. Jurisdicción y Ley Aplicable",
    legal_jurisdiction_desc: "Cualquier controversia relacionada con el uso de este sitio web estará sujeta a la legislación española y a la competencia de los Juzgados y Tribunales de la ciudad de Madrid, renunciando expresamente a cualquier otro fuero.",

    // Privacy Page
    privacy_page_title: "Política de Privacidad",
    privacy_page_subtitle: "Cómo protegemos y tratamos tus datos personales en Giralabs.",
    privacy_collect_title: "1. Datos que Recopilamos",
    privacy_collect_desc: "Recopilamos información de contacto voluntaria (como nombres, correos electrónicos, especificaciones de proyectos y mensajes) a través de nuestros formularios interactivos y la suscripción a boletines de noticias. No utilizamos cookies de rastreo invasivas, solo análisis de tráfico anónimos para optimizar el rendimiento técnico de la web.",
    privacy_purpose_title: "2. Finalidad del Tratamiento",
    privacy_purpose_desc: "Los datos recopilados se procesan para gestionar presupuestos, responder preguntas de soporte y enviar información del blog/newsletter si ha dado su consentimiento explícito. Los datos no se venderán, cederán ni alquilarán a terceros bajo ningún concepto, siendo almacenados de forma segura bajo cifrado SSL.",
    privacy_rights_title: "3. Tus Derechos",
    privacy_rights_desc: "Bajo el Reglamento General de Protección de Datos (RGPD), usted dispone de los derechos de acceso, rectificación, supresión (olvido), limitación del tratamiento, portabilidad y oposición de sus datos personales. Puede ejercer cualquiera de ellos escribiéndonos a support@giralabs.es.",

    // Accessibility Page
    accessibility_page_title: "Declaración de Accesibilidad",
    accessibility_page_subtitle: "Compromiso de Giralabs con la accesibilidad web y la usabilidad para todos.",
    accessibility_standard_title: "1. Nuestro Compromiso",
    accessibility_standard_desc: "Nos esforzamos para que el contenido de esta web sea accesible y utilizable para personas con diversidad funcional, apuntando a cumplir con las pautas de accesibilidad para el contenido web (WCAG 2.1) en su nivel de conformidad AA.",
    accessibility_features_title: "2. Características de Accesibilidad",
    accessibility_features_desc: "Este sitio incluye marcado HTML semántico riguroso para lectores de pantalla, soporte para zoom de texto nativo sin deformaciones del layout, combinaciones cromáticas de alto contraste, y atajos de teclado completos para una navegación libre de ratón.",
    accessibility_feedback_title: "3. Contacto y Sugerencias",
    accessibility_feedback_desc: "Si encuentras barreras de accesibilidad técnica, tienes dificultades para realizar alguna operación o quieres realizarnos alguna sugerencia de mejora, por favor ponte en contacto con nosotros escribiendo a support@giralabs.es.",
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
    project_3_title: "Rewind TV",
    project_3_desc: "Smart movie and series backlog to organize your collection",
    project_4_tag: "Social App",
    project_4_title: "AuraMovies",
    project_4_desc: "The ultimate social network for movie and series lovers",

    // Footer
    footer_tagline: "Crafted with precision in Spain.",
    footer_contact: "Contact",
    footer_rights: "© 2026 Giralabs. All rights reserved.",
    footer_email: "support@giralabs.es",

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

    // Blog Page
    blog_page_title: "Blog",
    blog_page_subtitle: "We share our thoughts on mobile app development, experience design, and technology.",
    blog_hero_eyebrow: "OUR THOUGHTS",
    blog_empty_title: "Coming Soon",
    blog_empty_desc: "We are preparing insightful articles about Flutter, native development, Kubernetes, and applied AI.",
    blog_subscribe_title: "Subscribe to our newsletter",
    blog_subscribe_placeholder: "Enter your email...",
    blog_subscribe_btn: "Subscribe",
    blog_subscribe_success: "Thank you! We will notify you as soon as we publish our first article.",

    // 404 Page
    error_404_title: "404",
    error_404_subtitle: "Page not found",
    error_404_desc: "Sorry, the page you are looking for does not exist, has been removed, or has changed its address.",
    error_404_btn: "Go back home",

    // Footer bottom links
    footer_legal: "Legal Notice",
    footer_privacy: "Privacy Policy",
    footer_accessibility: "Accessibility",

    // Legal Page
    legal_page_title: "Legal Notice",
    legal_page_subtitle: "Terms, conditions, and legal aspects of Giralabs.",
    legal_intro_title: "1. General Information",
    legal_intro_desc: "This website is operated by Giralabs Software Studio S.L., with registered offices in Madrid, Spain. For any inquiry, communication, or exercise of legal rights, you may contact our engineering and support team directly at support@giralabs.es.",
    legal_terms_title: "2. Intellectual Property",
    legal_terms_desc: "All software, source code, user interfaces, design systems, animations, wireframes, text, and visual assets comprising this site are the intellectual property of Giralabs. Copying, distribution, or reverse-engineering without written consent is strictly prohibited.",
    legal_limit_title: "3. Limitation of Liability",
    legal_limit_desc: "While we strive to ensure maximum service uptime and content correctness, Giralabs assumes no liability for temporary server drops, communication delays, or potential typographic errors in the published content.",
    legal_jurisdiction_title: "4. Jurisdiction and Applicable Law",
    legal_jurisdiction_desc: "Any dispute related to the use of this website shall be governed by Spanish law and subject to the exclusive jurisdiction of the Courts of the city of Madrid, Spain.",

    // Privacy Page
    privacy_page_title: "Privacy Policy",
    privacy_page_subtitle: "How we protect and process your personal data at Giralabs.",
    privacy_collect_title: "1. Data We Collect",
    privacy_collect_desc: "We collect contact information voluntarily provided by you (such as names, emails, project details, and messages) through our forms. We do not use intrusive tracking cookies, only anonymous traffic analytics to optimize site performance.",
    privacy_purpose_title: "2. Purpose of Processing",
    privacy_purpose_desc: "The collected data is processed to manage pricing estimates, reply to inquiries, and send blog updates if you opt-in. Your data will never be sold, leased, or shared with third parties, and it is stored securely using SSL/TLS encryption.",
    privacy_rights_title: "3. Your Rights",
    privacy_rights_desc: "Under the General Data Protection Regulation (GDPR), you hold the right to access, rectify, erase, restrict processing, request portability, and object to the processing of your personal data. You can exercise these rights at support@giralabs.es.",

    // Accessibility Page
    accessibility_page_title: "Accessibility Statement",
    accessibility_page_subtitle: "Giralabs' commitment to web accessibility and usability for everyone.",
    accessibility_standard_title: "1. Our Commitment",
    accessibility_standard_desc: "We work actively to make this website accessible to the broadest possible audience, aiming to meet the Web Content Accessibility Guidelines (WCAG 2.1) at the AA compliance level.",
    accessibility_features_title: "2. Accessibility Features",
    accessibility_features_desc: "This site features structural semantic HTML markup optimized for screen readers, native text zooming without layout breaks, high-contrast color pairings, and full keyboard navigation support.",
    accessibility_feedback_title: "3. Contact and Feedback",
    accessibility_feedback_desc: "If you encounter any technical accessibility barriers or would like to suggest usability improvements, please contact us at support@giralabs.es.",
  },
} as const;

export type TranslationKey = keyof typeof translations.es;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] as string;
}
