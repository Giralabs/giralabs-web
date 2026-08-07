---
title: "Publicar una app en App Store y Google Play: requisitos, plazos y los rechazos que nadie te avisa"
slug: "publicar-app-store-google-play-requisitos-rechazos"
description: "Qué necesitas para publicar una aplicación en App Store y Google Play en 2026: cuentas, requisitos, plazos de revisión y los motivos de rechazo más frecuentes."
date: "2026-08-08"
tags: ["Aplicaciones Móviles", "App Store", "Google Play"]
readingTime: "8 min"
image: "../../assets/blog/store_publishing.webp"
---

Terminar de programar una app no es terminar el proyecto. Queda el trámite de publicarla, y ese trámite tiene la mala costumbre de sorprender a quien no lo ha vivido: cuentas que tardan semanas en verificarse, revisiones que se rechazan por motivos que parecen absurdos y requisitos legales que hay que tener resueltos antes, no después.

Esta es la lista de lo que hace falta y de dónde se atasca la gente.


## Lo que necesitas antes de subir nada

### Las cuentas de desarrollador

**Apple:** 99 $ al año. Si publicas como empresa necesitas un número DUNS asociado a tu sociedad, y conseguirlo puede llevar de días a un par de semanas. **Sácalo con antelación**: es el cuello de botella clásico que retrasa lanzamientos.

**Google:** 25 $ una sola vez. Desde hace unos años exige verificación de identidad y, para cuentas de empresa, documentación mercantil. También lleva su tiempo.

Ninguna de las dos cuentas se crea la tarde antes de lanzar.

### Los textos y el material gráfico

- Nombre de la app (30 caracteres en Apple) y subtítulo.
- Descripción corta y larga.
- Palabras clave (solo Apple, 100 caracteres, y sí, cuentan para que te encuentren).
- Icono en alta resolución.
- Capturas para varios tamaños de pantalla, en cada idioma en el que publiques.
- Categoría y clasificación por edades.

Preparar esto bien lleva más tiempo del que la gente calcula, y es lo que determina si alguien se descarga tu app cuando la encuentra.

### Lo legal

- **Política de privacidad** accesible en una URL pública. Obligatoria en ambas tiendas, sin excepción.
- **Declaración de datos:** las dos tiendas te obligan a declarar qué datos recoges, para qué y si los compartes. Apple lo muestra como etiqueta de privacidad; Google, como sección de seguridad de datos. Declarar de menos y que luego se detecte es motivo de retirada.
- **Cuenta de prueba** si tu app tiene login. El revisor necesita entrar. Es uno de los motivos de rechazo más tontos y más frecuentes.


## Cuánto tardan las revisiones

**Apple:** normalmente entre 24 y 48 horas. Puede alargarse en la primera revisión de una app nueva o si estás cerca de festivos grandes.

**Google:** más variable. Las actualizaciones suelen ser rápidas, pero **una cuenta nueva puede tener revisiones de varios días**, y ciertas categorías se revisan con más detenimiento.

Conclusión práctica: no anuncies fecha de lanzamiento hasta que la app esté aprobada. Aprobada, no enviada.


## Los rechazos más frecuentes

### En Apple

**Funcionalidad insuficiente.** Es el rechazo más común y el más frustrante. Si tu app es esencialmente tu web dentro de un contenedor, la rechazan. Apple quiere aplicaciones que aporten algo que la web no da: notificaciones, uso sin conexión, integración con el dispositivo.

**Fallos o pantallas rotas.** Prueban la app de verdad. Un error a la primera es rechazo directo.

**El acceso no funciona.** No dejaste cuenta de prueba, o caducó, o el registro necesita un SMS que el revisor no puede recibir.

**Pagos fuera de su sistema.** Si vendes contenido digital que se consume dentro de la app y no usas su sistema de compras, rechazo. Hay excepciones —bienes y servicios físicos, sobre todo— pero conviene revisarlas antes de construir el modelo de negocio.

**Permisos sin justificar.** Pides acceso a la ubicación o al micrófono y el texto explicativo es genérico. Hay que decir para qué, en concreto.

**Enlaces a información legal que no funcionan.** Se comprueban.

### En Google

**Declaración de datos incoherente** con lo que la app hace de verdad. Lo detectan con análisis automático.

**Permisos sensibles sin justificación**, especialmente ubicación en segundo plano, SMS o registro de llamadas. Hay que rellenar un formulario explicando por qué.

**Incumplimiento de la política de contenidos** o metadatos engañosos en la ficha.

**Versión objetivo de Android obsoleta.** Google sube el mínimo cada año y deja de aceptar apps por debajo.


## Consejos que ahorran semanas

**Sube una versión de prueba pronto**, aunque esté incompleta, para desatascar el papeleo de cuentas y certificados mientras se sigue desarrollando. Las dos tiendas tienen canales internos (TestFlight y las pistas de prueba) que no son públicos.

**Lee el aviso de rechazo entero.** Suele decir exactamente qué directriz has incumplido. Y se puede responder y discutir: no es un muro, hay conversación.

**No hagas el envío el mismo día que quieres lanzar.** Deja una semana de margen.

**Escribe los textos de permisos con cuidado.** "Necesitamos tu ubicación" es rechazo. "Usamos tu ubicación para mostrarte los salones más cercanos" es aprobación.

**Cuida las capturas.** Son lo primero que ve un usuario y lo que decide la descarga. No pongas pantallazos crudos: cuenta qué hace la app.


## Después de publicar

Publicar no es el final. Toca vigilar los informes de fallos, responder reseñas —que influyen en la posición dentro de la tienda— y, sobre todo, mantener el ritmo de actualizaciones: una app que no se actualiza pierde posiciones y termina incumpliendo requisitos nuevos.

Nosotros pasamos por esto con cada proyecto, y ahora mismo también con [Bipsy](/proyecto/bipsy), nuestro producto propio, que todavía está en desarrollo y aún no ha llegado a las tiendas.

Si estás cerca de publicar y quieres que alguien revise que no te falta nada, [escríbenos](/contacto). Y si quieres ver cómo estructuramos un proyecto de principio a fin, está en [creación de aplicaciones móviles](/servicio/aplicaciones-moviles).
