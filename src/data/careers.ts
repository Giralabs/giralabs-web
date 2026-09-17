// ----------------------------------------------------------------
// Careers: open positions and the copy for /empleo and /en/careers.
//
// A position lives here once, in both languages. The listing, the offer page,
// its JobPosting structured data, the sitemap and the application endpoint all
// read from this file, so publishing or closing an offer is a data change only.
// To close an offer, set `open: false`: its page stays up (links shared on
// LinkedIn keep working) but the form is replaced by a "closed" notice.
// ----------------------------------------------------------------

export type CareersLang = 'es' | 'en';

export interface JobLevelQuestion {
  /** Form field name, also used in the application email */
  name: string;
  label: string;
}

export interface JobCopy {
  title: string;
  /** Short title used in cards, emails and the browser tab */
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  department: string;
  location: string;
  workplace: string;
  employmentType: string;
  experience: string;
  salary: string;
  aboutProduct: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  offer: string[];
  process: { title: string; desc: string }[];
  stack: string[];
  /** Tech-specific self-assessment asked in the form */
  levelQuestions: JobLevelQuestion[];
}

export interface Job {
  slug: string;
  open: boolean;
  datePosted: string; // YYYY-MM-DD
  validThrough: string; // YYYY-MM-DD
  /** schema.org employmentType */
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'INTERN';
  monthsOfExperience: number;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  es: JobCopy;
  en: JobCopy;
}

export const jobs: Job[] = [
  {
    slug: 'full-stack-developer',
    open: true,
    datePosted: '2026-09-17',
    validThrough: '2026-12-31',
    employmentType: 'FULL_TIME',
    monthsOfExperience: 12,
    addressLocality: 'Sevilla',
    addressRegion: 'Andalucía',
    addressCountry: 'ES',
    es: {
      title: 'Full Stack Developer (Flutter · Angular · Spring Boot)',
      shortTitle: 'Full Stack Developer',
      metaTitle: 'Oferta de empleo: Full Stack Developer Flutter, Angular y Spring · Bipsy',
      metaDescription:
        'Buscamos Full Stack Developer con 1 año de experiencia en Flutter, Angular y Spring Boot para construir Bipsy, la plataforma de reservas de Giralabs. Envía tu CV.',
      summary:
        'Buscamos a una persona desarrolladora full stack que quiera construir producto propio de principio a fin: apps móviles en Flutter, paneles web en Angular y servicios en Spring Boot. Trabajarás en Bipsy, la plataforma de reservas para barberías, peluquerías y centros de estética que estamos creando en Giralabs.',
      department: 'Producto · Bipsy',
      location: 'Sevilla, España',
      workplace: 'Híbrido (Sevilla) o remoto desde España',
      employmentType: 'Jornada completa · Contrato indefinido',
      experience: 'Mínimo 1 año de experiencia profesional',
      salary: 'Según experiencia y valía',
      aboutProduct: [
        'Bipsy es el producto propio de Giralabs: un ecosistema de reservas para barberías, peluquerías y centros de estética. Son dos apps conectadas por el mismo motor: Bipsy, para que el cliente descubra negocios y reserve cita, y Bipsy Business, para que el negocio gestione agenda, servicios, equipo y clientes desde el móvil.',
        'Estamos en plena fase de construcción y beta cerrada con negocios piloto. Eso significa decisiones técnicas reales, código que llega a producción y usuarios que te dan feedback sobre lo que has construido.',
      ],
      responsibilities: [
        'Desarrollar nuevas funcionalidades de las apps Bipsy y Bipsy Business con Flutter y Dart, cuidando rendimiento, accesibilidad y la calidad visual.',
        'Construir y mantener los paneles web de gestión y administración en Angular y TypeScript.',
        'Diseñar e implementar APIs REST y servicios de backend con Java y Spring Boot: reservas, disponibilidad, pagos y notificaciones.',
        'Modelar datos y escribir consultas eficientes sobre bases de datos relacionales (PostgreSQL).',
        'Escribir tests, participar en revisiones de código y mantener una base de código limpia y documentada.',
        'Colaborar con diseño y producto para convertir el feedback de los negocios piloto en mejoras concretas.',
        'Participar en la publicación y el mantenimiento de las apps en App Store y Google Play.',
      ],
      requirements: [
        'Al menos 1 año de experiencia profesional como desarrollador/a (full stack, frontend, móvil o backend).',
        'Experiencia desarrollando apps con Flutter y Dart: widgets, navegación, gestión de estado (Riverpod, Bloc, Provider o similar) y consumo de APIs.',
        'Conocimientos sólidos de Angular y TypeScript: componentes, servicios, routing, formularios reactivos y RxJS.',
        'Experiencia con Java y Spring Boot: APIs REST, Spring Data JPA, validación y seguridad básica (Spring Security, JWT).',
        'Conocimientos de bases de datos relacionales y SQL (PostgreSQL, MySQL o similar).',
        'Manejo fluido de Git y flujos de trabajo con ramas y pull requests.',
        'Fundamentos de HTML, CSS y diseño responsive.',
        'Capacidad para leer documentación técnica en inglés.',
        'Español fluido y buena comunicación en equipo.',
      ],
      niceToHave: [
        'Supabase, Firebase u otros backends como servicio.',
        'Docker y despliegues en la nube (AWS, GCP o similar).',
        'CI/CD con GitHub Actions o Codemagic.',
        'Testing: unit tests y widget tests en Flutter, JUnit y Mockito en Spring.',
        'Experiencia publicando apps en App Store y Google Play.',
        'Integraciones de pago (Stripe o Redsys) y notificaciones push.',
        'Interés por el diseño de producto y la experiencia de usuario, y soltura con Figma.',
      ],
      offer: [
        'Contrato indefinido a jornada completa.',
        'Salario competitivo acorde a tu experiencia.',
        'Modelo híbrido en Sevilla o remoto desde España, con horario flexible.',
        'Construir un producto propio desde cero y ver tu trabajo en manos de usuarios reales.',
        'Equipo pequeño: tu opinión técnica cuenta y tu impacto se nota desde el primer día.',
        'Presupuesto para formación, cursos y certificaciones.',
        'Equipo de trabajo a tu elección.',
      ],
      process: [
        { title: 'Revisión del CV', desc: 'Leemos cada candidatura y respondemos a todas, tanto si seguimos adelante como si no, en un máximo de 10 días laborables.' },
        { title: 'Primera conversación', desc: 'Videollamada de 30 minutos para conocernos, hablar de tu experiencia y resolver tus dudas sobre Bipsy.' },
        { title: 'Entrevista técnica', desc: 'Repasamos juntos un ejercicio práctico corto sobre Flutter, Angular y Spring. Sin pizarras ni preguntas trampa.' },
        { title: 'Oferta', desc: 'Conversación final con el equipo y propuesta de incorporación.' },
      ],
      stack: ['Flutter', 'Dart', 'Angular', 'TypeScript', 'RxJS', 'Java', 'Spring Boot', 'PostgreSQL', 'Git', 'REST'],
      levelQuestions: [
        { name: 'level_flutter', label: 'Nivel en Flutter / Dart' },
        { name: 'level_angular', label: 'Nivel en Angular / TypeScript' },
        { name: 'level_spring', label: 'Nivel en Java / Spring Boot' },
      ],
    },
    en: {
      title: 'Full Stack Developer (Flutter · Angular · Spring Boot)',
      shortTitle: 'Full Stack Developer',
      metaTitle: 'Job opening: Full Stack Developer Flutter, Angular & Spring · Bipsy',
      metaDescription:
        'We are hiring a Full Stack Developer with 1 year of experience in Flutter, Angular and Spring Boot to build Bipsy, the booking platform by Giralabs. Send your CV.',
      summary:
        'We are looking for a full stack developer who wants to build a product end to end: mobile apps in Flutter, web dashboards in Angular and services in Spring Boot. You will work on Bipsy, the booking platform for barbershops, hair salons and beauty studios we are building at Giralabs.',
      department: 'Product · Bipsy',
      location: 'Seville, Spain',
      workplace: 'Hybrid (Seville) or remote from Spain',
      employmentType: 'Full time · Permanent contract',
      experience: 'At least 1 year of professional experience',
      salary: 'Based on experience',
      aboutProduct: [
        'Bipsy is Giralabs\' own product: a booking ecosystem for barbershops, hair salons and beauty studios. Two apps share the same engine: Bipsy, so clients can discover venues and book, and Bipsy Business, so the venue can run its calendar, services, team and clients from the phone.',
        'We are in the middle of building it, with a closed beta running with pilot venues. That means real technical decisions, code that ships to production and users giving you feedback on what you built.',
      ],
      responsibilities: [
        'Build new features for the Bipsy and Bipsy Business apps with Flutter and Dart, caring about performance, accessibility and visual quality.',
        'Build and maintain the management and admin web dashboards in Angular and TypeScript.',
        'Design and implement REST APIs and backend services with Java and Spring Boot: bookings, availability, payments and notifications.',
        'Model data and write efficient queries on relational databases (PostgreSQL).',
        'Write tests, take part in code reviews and keep the codebase clean and documented.',
        'Work with design and product to turn feedback from pilot venues into concrete improvements.',
        'Take part in releasing and maintaining the apps on the App Store and Google Play.',
      ],
      requirements: [
        'At least 1 year of professional experience as a developer (full stack, frontend, mobile or backend).',
        'Experience building apps with Flutter and Dart: widgets, navigation, state management (Riverpod, Bloc, Provider or similar) and API integration.',
        'Solid knowledge of Angular and TypeScript: components, services, routing, reactive forms and RxJS.',
        'Experience with Java and Spring Boot: REST APIs, Spring Data JPA, validation and basic security (Spring Security, JWT).',
        'Knowledge of relational databases and SQL (PostgreSQL, MySQL or similar).',
        'Comfortable with Git and branch / pull request workflows.',
        'HTML, CSS and responsive design fundamentals.',
        'Able to read technical documentation in English.',
        'Fluent Spanish and good team communication.',
      ],
      niceToHave: [
        'Supabase, Firebase or other backend-as-a-service platforms.',
        'Docker and cloud deployments (AWS, GCP or similar).',
        'CI/CD with GitHub Actions or Codemagic.',
        'Testing: unit and widget tests in Flutter, JUnit and Mockito in Spring.',
        'Experience publishing apps on the App Store and Google Play.',
        'Payment integrations (Stripe or Redsys) and push notifications.',
        'Interest in product design and user experience, and comfortable with Figma.',
      ],
      offer: [
        'Permanent, full-time contract.',
        'Competitive salary based on your experience.',
        'Hybrid in Seville or remote from Spain, with flexible hours.',
        'Build a product from scratch and see your work in the hands of real users.',
        'Small team: your technical opinion matters and your impact shows from day one.',
        'Budget for training, courses and certifications.',
        'Work equipment of your choice.',
      ],
      process: [
        { title: 'CV review', desc: 'We read every application and reply to all of them, whether we move forward or not, within 10 working days.' },
        { title: 'First conversation', desc: 'A 30-minute video call to get to know each other, talk about your experience and answer your questions about Bipsy.' },
        { title: 'Technical interview', desc: 'We walk through a short practical exercise on Flutter, Angular and Spring together. No whiteboards, no trick questions.' },
        { title: 'Offer', desc: 'A final conversation with the team and a job offer.' },
      ],
      stack: ['Flutter', 'Dart', 'Angular', 'TypeScript', 'RxJS', 'Java', 'Spring Boot', 'PostgreSQL', 'Git', 'REST'],
      levelQuestions: [
        { name: 'level_flutter', label: 'Flutter / Dart level' },
        { name: 'level_angular', label: 'Angular / TypeScript level' },
        { name: 'level_spring', label: 'Java / Spring Boot level' },
      ],
    },
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

/** Spanish and English base paths of the careers section */
export const careersBasePath: Record<CareersLang, string> = {
  es: '/empleo',
  en: '/en/careers',
};

export function jobPath(slug: string, lang: CareersLang): string {
  return `${careersBasePath[lang]}/${slug}`;
}

// CV upload limits, shared by the form and the endpoint. Vercel rejects request
// bodies above 4.5 MB before the function runs, so the file has to stay below it
// with room for the rest of the multipart body.
export const CV_MAX_BYTES = 4 * 1024 * 1024;
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx'] as const;

// Values are stable identifiers (they travel in the form and the email); the
// labels are what the candidate sees.
export const applicationOptions = {
  experience: ['lt1', '1-2', '2-4', 'gt4'],
  level: ['none', 'basic', 'intermediate', 'advanced'],
  availability: ['immediate', '2weeks', '1month', 'more'],
  workPermit: ['yes', 'no'],
  source: ['linkedin', 'infojobs', 'website', 'referral', 'other'],
} as const;

export const careersCopy = {
  es: {
    metaTitle: 'Trabaja con nosotros | Empleo en Giralabs y Bipsy',
    metaDescription:
      'Ofertas de empleo en Giralabs. Únete al equipo que construye Bipsy, nuestra plataforma de reservas, y trabaja con Flutter, Angular y Spring Boot.',
    eyebrow: 'Trabaja con nosotros',
    title: 'Construye Bipsy con nosotros',
    subtitle:
      'Somos un equipo pequeño de ingeniería y diseño en Sevilla. Si te gusta llevar producto real a producción y cuidar cada detalle, aquí hay sitio para ti.',
    heroCta: 'Ver ofertas abiertas',
    whyEyebrow: 'Por qué Giralabs',
    whyTitle: 'Lo que vas a encontrar',
    why: [
      { title: 'Producto propio', desc: 'Trabajas en Bipsy, nuestro producto, no en proyectos que se entregan y se olvidan. Lo que construyes hoy lo usan negocios reales mañana.' },
      { title: 'Impacto desde el día uno', desc: 'Sin capas de gestión. Propones, decides y ves el resultado de tu trabajo en producción en semanas, no en trimestres.' },
      { title: 'Ingeniería cuidada', desc: 'Revisiones de código, tests y tiempo para hacer las cosas bien. Preferimos menos funcionalidades y mejor hechas.' },
    ],
    openingsEyebrow: 'Ofertas abiertas',
    openingsTitle: 'Posiciones disponibles',
    viewOffer: 'Ver oferta y aplicar',
    noOpenings: 'Ahora mismo no tenemos ofertas abiertas, pero puedes enviarnos tu candidatura espontánea.',
    closedBadge: 'Cerrada',
    spontaneousTitle: '¿No encuentras tu puesto?',
    spontaneousDesc: 'Envíanos tu CV y cuéntanos qué te gustaría construir. Guardamos las candidaturas espontáneas para futuras posiciones.',
    spontaneousCta: 'Escribir a support@giralabs.es',
  },
  en: {
    metaTitle: 'Careers at Giralabs | Jobs building Bipsy',
    metaDescription:
      'Job openings at Giralabs. Join the team building Bipsy, our booking platform, and work with Flutter, Angular and Spring Boot.',
    eyebrow: 'Careers',
    title: 'Build Bipsy with us',
    subtitle:
      'We are a small engineering and design team in Seville. If you enjoy shipping real product to production and caring about every detail, there is a place for you here.',
    heroCta: 'See open positions',
    whyEyebrow: 'Why Giralabs',
    whyTitle: 'What you will find',
    why: [
      { title: 'Our own product', desc: 'You work on Bipsy, our product, not on projects that get delivered and forgotten. What you build today is used by real businesses tomorrow.' },
      { title: 'Impact from day one', desc: 'No layers of management. You propose, decide and see your work in production in weeks, not quarters.' },
      { title: 'Careful engineering', desc: 'Code reviews, tests and time to do things properly. We prefer fewer features, better built.' },
    ],
    openingsEyebrow: 'Open positions',
    openingsTitle: 'Available roles',
    viewOffer: 'View offer and apply',
    noOpenings: 'We have no open positions right now, but you can send us a spontaneous application.',
    closedBadge: 'Closed',
    spontaneousTitle: 'Can\'t find your role?',
    spontaneousDesc: 'Send us your CV and tell us what you would like to build. We keep spontaneous applications for future positions.',
    spontaneousCta: 'Email support@giralabs.es',
  },
};

export const jobPageCopy = {
  es: {
    breadcrumbCareers: 'Empleo',
    backToCareers: 'Todas las ofertas',
    applyCta: 'Aplicar a la oferta',
    posted: 'Publicada',
    metaDepartment: 'Equipo',
    metaLocation: 'Ubicación',
    metaWorkplace: 'Modalidad',
    metaType: 'Contrato',
    metaExperience: 'Experiencia',
    metaSalary: 'Salario',
    aboutTitle: 'Sobre Bipsy',
    responsibilitiesTitle: 'Qué harás',
    requirementsTitle: 'Qué buscamos',
    niceToHaveTitle: 'Se valorará',
    offerTitle: 'Qué ofrecemos',
    stackTitle: 'Stack',
    processTitle: 'Proceso de selección',
    closedTitle: 'Esta oferta ya está cerrada',
    closedDesc: 'Gracias por tu interés. Echa un vistazo a las demás posiciones o envíanos una candidatura espontánea.',
    share: 'Compartir oferta',
    shareLinkedIn: 'Compartir en LinkedIn',
    copyLink: 'Copiar enlace',
    copied: 'Enlace copiado',
    finalTitle: '¿Encajas en el puesto?',
    finalDesc: 'Aplica en unos 5 minutos. Leemos todas las candidaturas y respondemos a todas.',
    applyTime: '5 min',
  },
  en: {
    breadcrumbCareers: 'Careers',
    backToCareers: 'All positions',
    applyCta: 'Apply for this job',
    posted: 'Posted',
    metaDepartment: 'Team',
    metaLocation: 'Location',
    metaWorkplace: 'Workplace',
    metaType: 'Contract',
    metaExperience: 'Experience',
    metaSalary: 'Salary',
    aboutTitle: 'About Bipsy',
    responsibilitiesTitle: 'What you will do',
    requirementsTitle: 'What we are looking for',
    niceToHaveTitle: 'Nice to have',
    offerTitle: 'What we offer',
    stackTitle: 'Stack',
    processTitle: 'Hiring process',
    closedTitle: 'This position is closed',
    closedDesc: 'Thanks for your interest. Take a look at the other positions or send us a spontaneous application.',
    share: 'Share this job',
    shareLinkedIn: 'Share on LinkedIn',
    copyLink: 'Copy link',
    copied: 'Link copied',
    finalTitle: 'Sounds like you?',
    finalDesc: 'Apply in about 5 minutes. We read every application and reply to all of them.',
    applyTime: '5 min',
  },
};

export const applicationFormCopy = {
  es: {
    title: 'Envía tu candidatura',
    subtitle: 'Los campos marcados con * son obligatorios. Tardarás unos 5 minutos.',
    requiredHint: 'obligatorio',
    sectionPersonal: 'Datos personales',
    sectionProfile: 'Perfil profesional',
    sectionSkills: 'Conocimientos técnicos',
    sectionMotivation: 'Motivación y CV',
    stepPersonal: 'Sobre ti',
    stepExperience: 'Experiencia',
    stepCv: 'CV y motivación',
    stepOf: 'Paso {n} de {total}',
    next: 'Continuar',
    back: 'Atrás',
    close: 'Cerrar formulario',
    applyingFor: 'Candidatura para',
    name: 'Nombre y apellidos',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    city: 'Ciudad de residencia',
    cityHint: 'Ciudad y provincia, por ejemplo: Sevilla, Sevilla.',
    workPermit: '¿Tienes permiso de trabajo en España?',
    linkedin: 'Perfil de LinkedIn',
    portfolio: 'GitHub o portfolio',
    urlHint: 'Enlace completo, empezando por https://',
    experience: 'Años de experiencia profesional como developer',
    availability: 'Disponibilidad para incorporarte',
    salary: 'Expectativa salarial bruta anual',
    salaryHint: 'Opcional. Por ejemplo: 26.000 €.',
    levelHint: 'Sé sincero/a: no descartamos a nadie por marcar "Básico" en alguna tecnología.',
    coverLetter: '¿Por qué te interesa trabajar en Bipsy?',
    coverLetterHint: 'Cuéntanos tu experiencia más relevante con Flutter, Angular o Spring y un proyecto del que estés orgulloso/a. Entre 50 y 3000 caracteres.',
    cv: 'Currículum (CV)',
    cvHint: 'PDF, DOC o DOCX. Tamaño máximo 4 MB.',
    cvSelect: 'Seleccionar archivo',
    cvNone: 'Ningún archivo seleccionado',
    source: '¿Dónde has visto la oferta?',
    privacy: 'He leído y acepto la <a href="/privacidad" target="_blank" rel="noopener">política de privacidad</a> y consiento el tratamiento de mis datos para este proceso de selección.',
    privacyNote: 'Responsable: Giralabs. Finalidad: gestionar tu candidatura. Conservamos tus datos un máximo de 12 meses. Puedes ejercer tus derechos en support@giralabs.es.',
    select: 'Selecciona una opción',
    submit: 'Enviar candidatura',
    sending: 'Enviando candidatura…',
    successTitle: '¡Candidatura recibida!',
    successDesc: 'Gracias por tu interés en Bipsy. Te hemos enviado un correo de confirmación y te responderemos en un máximo de 10 días laborables.',
    errorGeneric: 'No hemos podido enviar tu candidatura. Inténtalo de nuevo en unos minutos o escríbenos a support@giralabs.es con tu CV.',
    errorSummary: 'Revisa los campos marcados antes de enviar.',
    errors: {
      required: 'Este campo es obligatorio.',
      email: 'Introduce un correo electrónico válido.',
      phone: 'Introduce un teléfono válido.',
      url: 'Introduce un enlace válido que empiece por https://',
      minLength: 'Escribe al menos 50 caracteres.',
      cvType: 'El CV debe ser un archivo PDF, DOC o DOCX.',
      cvSize: 'El CV supera el tamaño máximo de 4 MB.',
      privacy: 'Debes aceptar la política de privacidad para enviar tu candidatura.',
    },
    options: {
      experience: { lt1: 'Menos de 1 año', '1-2': 'Entre 1 y 2 años', '2-4': 'Entre 2 y 4 años', gt4: 'Más de 4 años' },
      level: { none: 'Sin experiencia', basic: 'Básico', intermediate: 'Intermedio', advanced: 'Avanzado' },
      availability: { immediate: 'Inmediata', '2weeks': 'En 15 días', '1month': 'En 1 mes', more: 'Más de 1 mes' },
      workPermit: { yes: 'Sí', no: 'No' },
      source: { linkedin: 'LinkedIn', infojobs: 'InfoJobs', website: 'Web de Giralabs', referral: 'Recomendación', other: 'Otro' },
    },
  },
  en: {
    title: 'Send your application',
    subtitle: 'Fields marked with * are required. It takes about 5 minutes.',
    requiredHint: 'required',
    sectionPersonal: 'Personal details',
    sectionProfile: 'Professional profile',
    sectionSkills: 'Technical skills',
    sectionMotivation: 'Motivation and CV',
    stepPersonal: 'About you',
    stepExperience: 'Experience',
    stepCv: 'CV and motivation',
    stepOf: 'Step {n} of {total}',
    next: 'Continue',
    back: 'Back',
    close: 'Close form',
    applyingFor: 'Applying for',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    city: 'City of residence',
    cityHint: 'City and region, for example: Seville, Spain.',
    workPermit: 'Do you have a work permit for Spain?',
    linkedin: 'LinkedIn profile',
    portfolio: 'GitHub or portfolio',
    urlHint: 'Full link, starting with https://',
    experience: 'Years of professional experience as a developer',
    availability: 'When could you start?',
    salary: 'Expected gross annual salary',
    salaryHint: 'Optional. For example: €26,000.',
    levelHint: 'Be honest: nobody is ruled out for choosing "Basic" in a technology.',
    coverLetter: 'Why do you want to work on Bipsy?',
    coverLetterHint: 'Tell us about your most relevant experience with Flutter, Angular or Spring and a project you are proud of. Between 50 and 3000 characters.',
    cv: 'Résumé (CV)',
    cvHint: 'PDF, DOC or DOCX. Maximum size 4 MB.',
    cvSelect: 'Choose file',
    cvNone: 'No file chosen',
    source: 'Where did you see this job?',
    privacy: 'I have read and accept the <a href="/en/privacy" target="_blank" rel="noopener">privacy policy</a> and consent to my data being processed for this hiring process.',
    privacyNote: 'Controller: Giralabs. Purpose: managing your application. We keep your data for up to 12 months. You can exercise your rights at support@giralabs.es.',
    select: 'Select an option',
    submit: 'Send application',
    sending: 'Sending application…',
    successTitle: 'Application received!',
    successDesc: 'Thanks for your interest in Bipsy. We have sent you a confirmation email and will get back to you within 10 working days.',
    errorGeneric: 'We could not send your application. Please try again in a few minutes or email your CV to support@giralabs.es.',
    errorSummary: 'Please review the highlighted fields before sending.',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      phone: 'Enter a valid phone number.',
      url: 'Enter a valid link starting with https://',
      minLength: 'Write at least 50 characters.',
      cvType: 'Your CV must be a PDF, DOC or DOCX file.',
      cvSize: 'Your CV is larger than 4 MB.',
      privacy: 'You must accept the privacy policy to send your application.',
    },
    options: {
      experience: { lt1: 'Less than 1 year', '1-2': '1 to 2 years', '2-4': '2 to 4 years', gt4: 'More than 4 years' },
      level: { none: 'No experience', basic: 'Basic', intermediate: 'Intermediate', advanced: 'Advanced' },
      availability: { immediate: 'Immediately', '2weeks': 'In 2 weeks', '1month': 'In 1 month', more: 'More than 1 month' },
      workPermit: { yes: 'Yes', no: 'No' },
      source: { linkedin: 'LinkedIn', infojobs: 'InfoJobs', website: 'Giralabs website', referral: 'Referral', other: 'Other' },
    },
  },
};
