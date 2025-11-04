// app/casos/data.ts
export type Opcion = { id: string; texto: string; esCorrecta?: boolean; explicacion?: string };

export type Paso =
  | {
      id: string;
      tipo: "mcq"; // alternativa múltiple
      enunciado: string;
      opciones: Opcion[];
    }
  | {
      id: string;
      tipo: "short"; // respuesta corta (reflexiva)
      enunciado: string;
      guia: string; // qué se espera que el estudiante considere
    };

export type Caso = {
  id: string; // ¡coincide EXACTO con la URL!
  modulo: "Anticoncepción" | "ITS";
  dificultad: "Media" | "Alta";
  titulo: string;
  vigneta: string; // más extensa
  pasos: Paso[];   // preguntas encadenadas
  referencias?: string[];
};

export const CASOS: Caso[] = [
  // =============== ANTICONCEPCIÓN — MEDIA ===============
  
  // =============== ANTICONCEPCIÓN — ALTA ===============
 {
  id: "ac-migrana-aura",  // Importante: usar 'migrana' sin ñ para URLs
  modulo: "Anticoncepción",
  dificultad: "Alta",
  titulo: "Migraña con aura: elegir LARC seguro",
  vigneta:
    "Mujer de 22 años, nuligesta, diagnóstico de migraña con aura por neurólogo. No fuma. Desea método de altísima eficacia, ojalá LARC. Sin antecedentes de TEP/TVP ni hipertensión. Examen físico normal.",
  pasos: [
    {
      id: "p1",
      tipo: "mcq",
      enunciado:
        "¿Qué método es MÁS adecuado considerando seguridad (MEC) y eficacia?",
      opciones: [
        {
          id: "a",
          texto: "ACO combinado (etinilestradiol + progestina) en pauta continua",
          esCorrecta: false,
          explicacion:
            "Estrógeno contraindicado en migraña con aura por mayor riesgo trombótico."
        },
        {
          id: "b",
          texto: "Implante subdérmico de etonogestrel",
          esCorrecta: true,
          explicacion:
            "Altísima eficacia, sin estrógeno; opción segura en migraña con aura."
        },
        {
          id: "c",
          texto: "Parche transdérmico combinado",
          esCorrecta: false,
          explicacion: "Contiene estrógeno; se mantiene la contraindicación."
        }
      ]
    },
    {
      id: "p2",
      tipo: "short",
      enunciado:
        "Menciona una estrategia de consejería para plan de manejo de efectos adversos.",
      guia:
        "Explicar sangrados irregulares del implante, señales de alarma, control a 3 meses, alternativas si persisten molestias."
    }
  ],
  referencias: ["OMS MEC: Migraña con aura → evitar métodos con estrógeno."]
},

  {
    id: "ac-posparto-larc",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Puerperio inmediato con deseo de LARC",
    vigneta:
      "Paciente de 19 años, 12 horas post parto vaginal normoevolutivo. Planea lactancia. Hemodinámicamente estable, sin hemorragia. Desea anticoncepción antes del alta.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado:
          "¿Qué estrategia es preferible HOY considerando puerperio inmediato y lactancia?",
        opciones: [
          {
            id: "a",
            texto: "Iniciar ACO combinado a las 12 h postparto",
            esCorrecta: false,
            explicacion:
              "Riesgo trombótico en puerperio inmediato y posible impacto en lactancia.",
          },
          {
            id: "b",
            texto: "Implante subdérmico inmediato postparto",
            esCorrecta: true,
            explicacion:
              "Seguro en lactancia, eficaz y evita pérdida de oportunidad.",
          },
          {
            id: "c",
            texto: "Diferir método y citar en 6 semanas",
            esCorrecta: false,
            explicacion:
              "Ventana sin protección y riesgo de abandono del seguimiento.",
          },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado:
          "Indica dos mensajes de educación posparto relacionados con LARC y señales de alarma.",
        guia:
          "Sangrado esperable, control, signos de infección, uso dual según riesgo, acceso a retiro si no tolera.",
      },
    ],
    referencias: ["LARC en posparto: seguridad e inicio inmediato."],
  },

  // =============== ITS — MEDIA ===============
  {
    id: "its-cervicitis-sindromico",
    modulo: "ITS",
    dificultad: "Media",
    titulo: "Cervicitis: manejo sindrómico y parejas",
    vigneta:
      "Mujer de 22 años con flujo aumentado, disuria leve y sangrado poscoital. Examen: cérvix eritematoso con secreción mucopurulenta. Test de embarazo negativo. No hay PCR inmediata para GC/CT.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado:
          "Conducta inicial adecuada en ausencia de diagnóstico inmediato:",
        opciones: [
          {
            id: "a",
            texto: "Solo analgesia y control si persiste",
            esCorrecta: false,
            explicacion:
              "Riesgo de progresión; requiere tratamiento empírico.",
          },
          {
            id: "b",
            texto:
              "Tratamiento empírico GC/CT + consejería + notificación/manejo de pareja(s)",
            esCorrecta: true,
            explicacion:
              "Manejo sindrómico corta transmisión y previene complicaciones.",
          },
          {
            id: "c",
            texto: "Derivar sin tratar hasta tener PCR",
            esCorrecta: false,
            explicacion:
              "Demora innecesaria; iniciar empírico según sospecha.",
          },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado:
          "Escribe dos recomendaciones educativas para cortar cadena de transmisión.",
        guia:
          "Abstinencia temporal hasta completar esquema, uso de condón, tratar pareja(s), control clínico.",
      },
    ],
    referencias: ["Manejo sindrómico de ITS; notificación a parejas."],
  },

  // =============== ITS — ALTA ===============
  {
    id: "its-epi-ambulatorio",
    modulo: "ITS",
    dificultad: "Alta",
    titulo: "EPI: criterios de manejo ambulatorio",
    vigneta:
      "Mujer de 24 años con dolor pélvico bilateral, dolor a la movilización cervical y sensibilidad anexial. Fiebre 38,2 °C. Hemodinámicamente estable, prueba de embarazo negativa. Sin signos de abdomen agudo. Probable buena adherencia a tratamiento y control.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado:
          "¿Qué conducta inicial es más adecuada hoy considerando criterios ambulatorios?",
        opciones: [
          {
            id: "a",
            texto:
              "Hospitalizar a toda paciente con dolor pélvico y dar antibióticos EV",
            esCorrecta: false,
            explicacion:
              "No todas requieren hospitalizar; depende de criterios y adherencia.",
          },
          {
            id: "b",
            texto:
              "Iniciar antibióticos ambulatorios según guías + control estrecho + manejo de pareja(s)",
            esCorrecta: true,
            explicacion:
              "Paciente estable y sin abdomen agudo; manejo ambulatorio razonable.",
          },
          {
            id: "c",
            texto:
              "Solo AINEs y citar si no mejora en 7 días (sin antibióticos)",
            esCorrecta: false,
            explicacion:
              "Riesgo de progresión; requiere antibióticos oportunos.",
          },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado:
          "Menciona un criterio que SÍ te llevaría a hospitalizar en vez de manejo ambulatorio.",
        guia:
          "Embarazo, abdomen agudo, sepsis, imposibilidad de adherencia, falta de respuesta al esquema ambulatorio.",
      },
    ],
    referencias: ["Guías EPI: criterios de hospitalización vs ambulatorio."],
  },

  {
    id: "its-sifilis-gestacional", // URL-friendly: sin tilde
    modulo: "ITS",
    dificultad: "Alta",
    titulo: "Sífilis en el embarazo: interpretación y manejo",
    vigneta:
      "Gestante de 18 semanas, sin controles previos. VDRL 1:8 y prueba treponémica positiva. Asintomática. Pareja no evaluada. No alergias conocidas. Sin fiebre ni exantema. Ecografía con feto vivo acorde a EG.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Cuál es la conducta inicial más correcta HOY?",
        opciones: [
          {
            id: "a",
            texto: "Esperar confirmación con nuevo VDRL en 4 semanas",
            esCorrecta: false,
            explicacion:
              "Demora riesgosa; con VDRL reactivo y prueba treponémica positiva se debe tratar.",
          },
          {
            id: "b",
            texto:
              "Iniciar penicilina benzatina según estadio y gestionar manejo de pareja(s)",
            esCorrecta: true,
            explicacion:
              "Tratamiento inmediato reduce riesgo de sífilis congénita; coordinación de pareja(s) clave.",
          },
          {
            id: "c",
            texto: "Dar macrólidos y posponer penicilina por embarazo",
            esCorrecta: false,
            explicacion: "Penicilina es el tratamiento de elección en gestantes.",
          },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado:
          "Anota dos puntos críticos de seguimiento en control prenatal tras el tratamiento.",
        guia:
          "Títulos serológicos en descenso, adherencia de pareja(s) al tratamiento, educación y prevención, signos de reacción de Jarisch-Herxheimer.",
      },
    ],
    referencias: ["Manejo de sífilis gestacional y prevención de transmisión congénita."],
  },  // =============== ANTICONCEPCIÓN — ALTA (Inductores enzimáticos) ===============
  {
    id: "ac-inductores-enzimaticos",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Epilepsia con carbamazepina: elegir método no afectado",
    vigneta:
      "Mujer de 23 años con epilepsia controlada con carbamazepina. IMC 26, no fuma. Desea un método de alta eficacia que no interfiera con su tratamiento. No embarazo, test negativo hoy. Ciclos regulares.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué método ofrece anticoncepción eficaz NO afectada por inductores enzimáticos?",
        opciones: [
          { id: "a", texto: "ACO combinado 30 μg EE + progestina", esCorrecta: false, explicacion: "Menor eficacia por inducción enzimática." },
          { id: "b", texto: "Implante de etonogestrel", esCorrecta: false, explicacion: "Eficacia puede disminuir con inductores enzimáticos." },
          { id: "c", texto: "DMPA (medroxiprogesterona) o DIU (cobre o LNG)", esCorrecta: true, explicacion: "DMPA y DIU no se ven afectados por inductores." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Menciona una recomendación de respaldo/derivación al iniciar el método elegido.",
        guia: "Consejería sobre interacciones, control neurológico, uso de condón si cambia fármacos, seguimiento clínico."
      }
    ],
    referencias: ["Interacciones anticonceptivos–anticonvulsivantes; elección de método no afectado."]
  },

  // =============== ANTICONCEPCIÓN — MEDIA (Postaborto inmediato) ===============
  {
    id: "ac-postaborto-inmediato",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Inicio inmediato postaborto: oportunidad de LARC",
    vigneta:
      "Paciente de 19 años, aborto del primer trimestre resuelto hoy en APS. Hemodinámicamente estable, sin signos de infección. Desea método que reduzca riesgo de nuevo embarazo en el corto plazo.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué estrategia es adecuada HOY considerando seguridad y adherencia?",
        opciones: [
          { id: "a", texto: "Diferir la anticoncepción y citar en 4 semanas", esCorrecta: false, explicacion: "Se pierde oportunidad; mayor riesgo de abandono." },
          { id: "b", texto: "Ofrecer LARC inmediato (DIU cobre o LNG) o implante", esCorrecta: true, explicacion: "Eficaz y seguro postaborto inmediato si no hay infección." },
          { id: "c", texto: "Solo condón y educación, sin método de larga duración", esCorrecta: false, explicacion: "Menor eficacia; no asegura continuidad." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Indica dos elementos de consejería clave para este contexto.",
        guia: "Signos de alarma, control, ITS/cribado, uso dual, elección informada del método."
      }
    ],
    referencias: ["Inicio inmediato postaborto: evidencia de mayor continuidad y eficacia."]
  },

  // =============== ANTICONCEPCIÓN — ALTA (HTA + tabaquismo) ===============
  {
    id: "ac-hta-tabaquismo",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Hipertensión y tabaquismo en mayor de 35 años",
    vigneta:
      "Mujer de 36 años, TA repetida 152/92 mmHg, fuma ~10 cigarrillos/día. IMC 27. Sin migraña con aura. Desea método eficaz, ojalá de baja mantención.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué opción es más segura considerando HTA y tabaquismo?",
        opciones: [
          { id: "a", texto: "ACO combinado 20–30 μg EE", esCorrecta: false, explicacion: "Estrógeno desaconsejado por riesgo CV en >35 y HTA." },
          { id: "b", texto: "LNG-IUS o implante; valorar preferencia y perfil de sangrado", esCorrecta: true, explicacion: "Sin estrógeno, alta eficacia; elegir según sangrado y adherencia." },
          { id: "c", texto: "Parche combinado", esCorrecta: false, explicacion: "Contiene estrógeno; mismo problema." },
        ],
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "Si la paciente tiene menstruaciones abundantes y anemia, ¿qué opción priorizarías?",
        opciones: [
          { id: "a", texto: "DIU cobre", esCorrecta: false, explicacion: "Puede aumentar el sangrado menstrual." },
          { id: "b", texto: "LNG-IUS", esCorrecta: true, explicacion: "Reduce sangrado; útil si hay anemia por HMB." },
          { id: "c", texto: "Condón como único método", esCorrecta: false, explicacion: "Menor eficacia; no resuelve HMB." },
        ],
      }
    ],
    referencias: ["MEC: evitar estrógeno en HTA y tabaquismo >35; LNG-IUS útil en HMB."]
  },

  // =============== ANTICONCEPCIÓN — MEDIA (Lamotrigina) ===============
  {
    id: "ac-lamotrigina",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Lamotrigina y anticoncepción: evitar disminuir su nivel",
    vigneta:
      "Mujer de 24 años con epilepsia controlada con lamotrigina en monoterapia. No fuma. Refiere buen control y desea anticoncepción eficaz sin alterar su tratamiento.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué método evita la disminución de niveles de lamotrigina?",
        opciones: [
          { id: "a", texto: "ACO combinado (etinilestradiol + progestina)", esCorrecta: false, explicacion: "Puede disminuir niveles de lamotrigina." },
          { id: "b", texto: "LNG-IUS, DIU cobre o DMPA", esCorrecta: true, explicacion: "No afectan niveles de lamotrigina." },
          { id: "c", texto: "Parche o anillo combinados", esCorrecta: false, explicacion: "Contienen estrógeno; mismo problema." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Escribe un mensaje de consejería sobre coordinación con neurología.",
        guia: "Ajuste de dosis si cambia método, seguimiento, registro de eventos."
      }
    ],
    referencias: ["Interacción estrógeno–lamotrigina; preferir métodos sin estrógeno."]
  },

  // =============== ANTICONCEPCIÓN — MEDIA (Menorragia y miomas) ===============
  {
    id: "ac-miomas-hmb",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Miomas y sangrado menstrual abundante",
    vigneta:
      "Mujer de 30 años con miomatosis sintomática y menstruaciones abundantes. Hb limítrofe. Sin deseo reproductivo por ahora. Busca método de alta eficacia y que ayude al sangrado.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué método ofrece anticoncepción y mejora del sangrado?",
        opciones: [
          { id: "a", texto: "DIU cobre", esCorrecta: false, explicacion: "Suele aumentar sangrado; no es ideal en HMB." },
          { id: "b", texto: "LNG-IUS", esCorrecta: true, explicacion: "Reduce HMB; útil con miomas (si cavidad permite)." },
          { id: "c", texto: "Implante de etonogestrel", esCorrecta: false, explicacion: "Puede alterar el patrón, no necesariamente reduce HMB." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Menciona un criterio anatómico o clínico para evaluar antes de insertar LNG-IUS en miomas.",
        guia: "Distorsión de cavidad, tamaño/ubicación submucoso, ecografía, inserción asistida si es necesario."
      }
    ],
    referencias: ["Manejo de HMB y elección de método; LNG-IUS en miomas seleccionados."]
  },

  // =============== ANTICONCEPCIÓN — ALTA (Olvido de ACO semana 1) ===============
  {
    id: "ac-olvido-semana1",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Olvido de ACO en semana 1 con relación sin protección",
    vigneta:
      "Mujer de 21 años en ACO combinado. Olvidó 2 comprimidos en la semana 1 del blíster y tuvo relación sin protección hace 48 h. Test de embarazo no realizado aún.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué conducta es más adecuada HOY?",
        opciones: [
          { id: "a", texto: "Tomar 2 píldoras hoy y continuar, sin AE", esCorrecta: false, explicacion: "No cubre relación reciente con alto riesgo (semana 1)." },
          { id: "b", texto: "Anticoncepción de emergencia apropiada + retomar ACO + respaldo 7 días", esCorrecta: true, explicacion: "Semana 1 con UPSI amerita AE + respaldo." },
          { id: "c", texto: "Suspender el blíster y esperar el siguiente ciclo", esCorrecta: false, explicacion: "Aumenta riesgo de embarazo; no recomendado." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Indica el periodo de uso de preservativo posterior y una recomendación de seguimiento.",
        guia: "Respaldo 7 días; considerar test de embarazo en 3 semanas si toma AE; educación sobre olvido."
      }
    ],
    referencias: ["Manejo de olvidos: énfasis en semana 1 y UPSI."]
  },  // =============== ITS — MEDIA/ALTA (Vaginitis con LNG-IUS) ===============
  {
    id: "its-vaginitis-candidiasis-lngius",
    modulo: "ITS",
    dificultad: "Alta",
    titulo: "Prurito y flujo blanquecino en usuaria de LNG-IUS",
    vigneta:
      "Usuaria de 23 años consulta en CESFAM por prurito genital y pérdida de flujo vaginal desde hace 10 días. ANTECEDENTES: madre con HTA. Hábitos: OH(-), tabaco(+) 3 cig/día. IMC 21. PA 120/70. Gineco-obstétricos: nuligesta. Sin uso previo de preservativo. MAC: LNG-IUS (Mirena) colocado hace 1 mes. FUR: hace 2 semanas. Ciclos V/28 días. Nº parejas sexuales: 4. EXAMEN: genitales externos irritados. Especuloscopia: secreción blanquecina abundante, sin sangrado, sin olor fétido descrito.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Con la viñeta descrita, ¿cuál es el diagnóstico más probable que explica prurito genital y secreción blanquecina en esta paciente con LNG-IUS reciente?",
        opciones: [
          { id: "a", texto: "Candidiasis vulvovaginal no complicada", esCorrecta: true, explicacion: "Prurito intenso, secreción blanquecina y eritema vulvar orientan a candidiasis." },
          { id: "b", texto: "Vaginosis bacteriana", explicacion: "Suele presentar flujo grisáceo con olor fétido, no prurito intenso." },
          { id: "c", texto: "Tricomoniasis", explicacion: "Flujo espumoso maloliente y signos cervicales suelen caracterizarla." }
        ]
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "¿Qué examen al pie de cama es más útil para orientar el manejo inicial en APS ante una sospecha de vaginitis?",
        opciones: [
          { id: "a", texto: "pH vaginal + test de aminas (KOH) + frotis en fresco", esCorrecta: true, explicacion: "Permite diferenciar candidiasis, vaginosis y tricomoniasis en el entorno primario." },
          { id: "b", texto: "PCR de rutina para GC/CT", explicacion: "Útil si se sospecha cervicitis, pero no es el primer paso en vaginitis típica." },
          { id: "c", texto: "Ecografía transvaginal inmediata", explicacion: "No aporta en el estudio inicial de una vaginitis no complicada." }
        ]
      },
      {
        id: "p3",
        tipo: "mcq",
        enunciado: "Teniendo en cuenta la clínica y que la paciente no refiere fiebre ni dolor abdominal importante, ¿cuál es la conducta inmediata más adecuada?",
        opciones: [
          { id: "a", texto: "Iniciar tratamiento antifúngico (óvulo o crema tópica o fluconazol oral si no embarazada) y mantener LNG-IUS", esCorrecta: true, explicacion: "Tratamiento empírico dirigido a Candida es razonable; no es necesario retirar el dispositivo intrauterino por candidiasis no complicada." },
          { id: "b", texto: "Retirar el LNG-IUS por sospecha de complicación relacionada con el dispositivo", explicacion: "El retiro no está indicado salvo que exista evidencia de infección pélvica asociada o malposición." },
          { id: "c", texto: "Derivar sin tratar y esperar resultados de laboratorio antes de cualquier intervención", explicacion: "Si la clínica es típica, iniciar tratamiento empírico es aceptable en APS." }
        ]
      },
      {
        id: "p4",
        tipo: "short",
        enunciado: "Escribe dos mensajes de consejería específicos que darías en la consulta para reducir las molestias y prevenir recurrencias.",
        guia: "Evitar duchas vaginales; ropa interior de algodón; secado cuidadoso; uso de preservativo si hay irritación; cuándo volver si no mejora; cuándo considerar pruebas para ITS."
      }
    ],
    referencias: [
      "Abordaje de vaginitis en APS; diferencias clínicas entre Candida/VB/Trichomonas; manejo con MAC intrauterino."
    ]
  },  // =============== AC 1 — Adolescente solicita LARC (Implante) ===============
  {
    id: "ac-adolescente-implante",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Consejería adolescente: preferencia por implante",
    vigneta:
      "Usuaria de 17 años, consulta en Espacio Amigable por consejería. ISA hace 2 meses. AMF: abuela DM2. Hábitos: OH social, tabaco(-), marihuana ocasional. IMC 23, PA 110/60. Nuligesta. Condón 'a veces'. Sin MAC actual. FUR hace 1 semana. Ciclos irregulares 30–45 días. Pareja actual desde hace 2 meses. GE Tanner V sin hallazgos. Solicita 'algo de larga duración, como el implante'.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Teniendo en cuenta la preferencia de la paciente por un método de larga duración y su perfil (adolescente, sin MAC actual), ¿qué opción es la más adecuada según MEC y adherencia esperada?",
        opciones: [
          { id: "a", texto: "ACO combinado diario con recordatorios", explicacion: "Requiere alta adherencia diaria; menos coherente con su preferencia por LARC." },
          { id: "b", texto: "Implante subdérmico de etonogestrel con consejería completa", esCorrecta: true, explicacion: "Alta eficacia, larga duración y adecuado para quien desea un método 'instalado'." },
          { id: "c", texto: "Método natural (calendario) + condón ocasional", explicacion: "Eficacia baja; no aconsejable si busca alta eficacia." }
        ]
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Enumera dos puntos clave de consejería que incluirías antes de insertar el implante en una paciente adolescente.",
        guia: "Explicar patrón de sangrado esperado; uso dual/prevención de ITS; confidencialidad; cuándo volver y control a 3 meses."
      },
      {
        id: "p3",
        tipo: "mcq",
        enunciado: "Con FUR hace 1 semana y ciclos irregulares, ¿qué paso previo y de seguridad realizarías antes de proceder a la inserción del implante?",
        opciones: [
          { id: "a", texto: "Realizar test de embarazo y, si negativo, ofrecer inserción con respaldo 7 días", esCorrecta: true, explicacion: "Confirmar no gestación es buena práctica; asumir inserción con respaldo si procede." },
          { id: "b", texto: "Requerir esperar 3 ciclos para decidir método", explicacion: "No necesario; puede iniciarse con evaluación adecuada." },
          { id: "c", texto: "Programar inserción únicamente en centro de referencia", explicacion: "No siempre necesario para implante estándar en APS." }
        ]
      },
      {
        id: "p4",
        tipo: "mcq",
        enunciado: "Si la adolescente expresa preocupación por el impacto en la fertilidad futura, ¿qué respuesta es la más apropiada en la consejería?",
        opciones: [
          { id: "a", texto: "Asegurar que el implante no produce esterilidad y la fertilidad se recupera tras su retiro", esCorrecta: true, explicacion: "Información clara sobre reversibilidad mejora la adherencia y la toma de decisión informada." },
          { id: "b", texto: "Decir que podría ser difícil quedar embarazada después del implante", explicacion: "Esto genera miedos innecesarios e inexactitudes." },
          { id: "c", texto: "Evitar hablar de fertilidad hasta después de la inserción", explicacion: "La consejería debe abordar dudas previas a la inserción." }
        ]
      }
    ],
    referencias: ["Consejería adolescente; inicio rápido y respaldo."]
  },

  // =============== AC 3 — >35, fumadora + ACO actual ===============
  {
    id: "ac-mayor35-fumadora-aco",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: ">35 años fumadora con ACO: cambio de método",
    vigneta:
      "Usuaria 38 años. AMF: madre HTA, padre IAM a los 50. Migraña sin aura. Fuma 10–15 cig/día. IMC 29, PA 135/85. G2P2. Usa ACO combinado (EE 30 mcg + drospirenona) hace 5 años. Ciclos regulares con ACO. Consulta por riesgo de 'pastillas después de 35 y fumando'.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Según MEC y riesgo cardiovascular en una mujer de 38 años que fuma, ¿qué opción deberías priorizar hoy?",
        opciones: [
          { id: "a", texto: "Mantener ACO combinado y reducir dosis de estrógeno", explicacion: "Seguir con estrógenos en >35 fumadora sigue siendo de riesgo y no se recomienda solo ajuste de dosis." },
          { id: "b", texto: "Cambiar a un LARC sin estrógeno (LNG-IUS o implante)", esCorrecta: true, explicacion: "Evita estrógeno y disminuye riesgo cardiovascular asociado; es la opción segura y eficaz." },
          { id: "c", texto: "Usar parche combinado", explicacion: "Contiene estrógeno y no soluciona el riesgo cardiovascular." }
        ]
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "Si la paciente además refiere menstruaciones muy abundantes, ¿qué método LARC sería preferible para abordar ambos problemas?",
        opciones: [
          { id: "a", texto: "DIU de cobre", explicacion: "Puede empeorar el sangrado menstrual." },
          { id: "b", texto: "LNG-IUS (Mirena)", esCorrecta: true, explicacion: "Reduce sangrado y ofrece anticoncepción sin estrógeno." },
          { id: "c", texto: "Implante subdérmico", explicacion: "No está indicado específicamente para reducir HMB." }
        ]
      },
      {
        id: "p3",
        tipo: "short",
        enunciado: "Escribe dos mensajes clave de consejería que darías hoy relacionados con el riesgo cardiovascular y el tabaquismo.",
        guia: "Beneficios de cesar tabaco, control de la presión arterial, reconocimiento de signos de alarma y planificación de seguimiento." 
      },
      {
        id: "p4",
        tipo: "mcq",
        enunciado: "Si la paciente está indecisa entre LNG-IUS e implante, ¿qué factor podría inclinar la elección hacia LNG-IUS?",
        opciones: [
          { id: "a", texto: "Deseo de reducir sangrado menstrual y anemia asociada", esCorrecta: true, explicacion: "LNG-IUS es efectivo para disminuir HMB y mejorar anemia." },
          { id: "b", texto: "Preferencia por un método que no requiera revisión", explicacion: "Ambos son LARC y requieren seguimiento, pero LNG-IUS ofrece beneficio en HMB." },
          { id: "c", texto: "Miedo a la inserción en la consulta", explicacion: "No es determinante clínico para preferir LNG-IUS sobre el implante." }
        ]
      }
    ],
    referencias: ["MEC: evitar estrógeno en >35 fumadora; LNG-IUS en HMB."]
  },

  // =============== AC 4 — Puérpera 10 días, LME, desea MAC que no afecte lactancia ===============
  {
    id: "ac-puerpera-10d-lme",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Puerperio temprano y lactancia: elección segura",
    vigneta:
      "Puérpera de 28 años en control de diada a 10 días postparto vaginal. LME a libre demanda, amenorrea. IMC 26, PA 115/70. Sin MAC actual. Solicita método 'que no afecte la leche'. GE: loquios hemáticos escasos. Útero contraído.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "En una puérpera de 10 días que lacta a libre demanda, ¿qué alternativa de anticoncepción es más segura considerando lactancia y riesgo trombótico?",
        opciones: [
          { id: "a", texto: "Iniciar ACO combinado inmediato", explicacion: "Se desaconseja por el posible riesgo en el puerperio temprano y efecto sobre la lactancia." },
          { id: "b", texto: "Ofrecer implante subdérmico o DMPA (progestágeno solo)", esCorrecta: true, explicacion: "Métodos con sólo progestágeno son aceptables en lactancia y evitan estrógenos." },
          { id: "c", texto: "No ofrecer ningún método y citar a las 6 semanas", explicacion: "Se pierde oportunidad y puede aumentar riesgo de embarazo no deseado." }
        ]
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "Si la paciente opta por implante hoy, ¿qué medida de respaldo recomendarías durante los primeros días si sus ciclos son irregulares?",
        opciones: [
          { id: "a", texto: "No necesita respaldo si se inserta hoy", explicacion: "Según protocolos, puede necesitar respaldo 7 días según el timing; verificar FUR y protocolo local." },
          { id: "b", texto: "Usar preservativo por 7 días tras la inserción si no está segura del momento del ciclo", esCorrecta: true, explicacion: "Respaldo corto recomendado si no hay certeza del momento del ciclo o FUR incierta." },
          { id: "c", texto: "Prescribir ACO combinado como respaldo indefinido", explicacion: "No es la conducta habitual; usar respaldo temporal si procede." }
        ]
      },
      {
        id: "p3",
        tipo: "short",
        enunciado: "Anota dos mensajes de educación posparto que darías hoy relacionados con lactancia y el método elegido.",
        guia: "Efectos esperables en sangrado, signos de alarma, cuándo volver y apoyo para la lactancia."
      },
      {
        id: "p4",
        tipo: "short",
        enunciado: "¿Qué elementos incluirías en el plan de seguimiento (primer control) después de ofrecer e insertar un MAC en el puerperio inmediato?",
        guia: "Cita a 3 meses para evaluar sangrado/efectos adversos; instrucción sobre uso dual; contacto para efectos adversos o retirada si lo desea."
      }
    ],
    referencias: ["LARC/DMPA seguros en lactancia; oportunidad en puerperio."]
  },

  // =============== AC 5 — DIU Cu con dolor y HMB a 3 meses ===============
  {
    id: "ac-diu-cu-dolor-hmb",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "DIU de cobre: dolor y hipermenorrea a 3 meses",
    vigneta:
      "Usuaria 30 años consulta en SAPU por dolor pélvico intenso y sangrado aumentado desde su última menstruación. TCu380A insertado hace 3 meses. Tº 37°C. OCE con sangrado escaso. Hilos visibles. TV: dolor leve a movilización cervical. Relata que el dolor y sangrado son más fuertes que antes.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Ante dolor pélvico intenso y sangrado aumentado en una portadora reciente de DIU de cobre, ¿cuál es la conducta inicial más razonable en SAPU?",
        opciones: [
          { id: "a", texto: "Retirar el DIU de inmediato sin evaluación adicional", explicacion: "Retirar sin evaluación puede obviar causas tratables; primero valorar y descartar EPI o malposición." },
          { id: "b", texto: "Manejo sintomático (AINE), evaluar hemoglobina, solicitar ecografía transvaginal y considerar pruebas para EPI según hallazgos", esCorrecta: true, explicacion: "Abordaje escalonado y dirigido según hallazgos evita decisiones precipitadas." },
          { id: "c", texto: "Aconsejar reposo y seguimiento en 1 mes", explicacion: "No apropiado ante dolor intenso y sangrado significativo." }
        ]
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "Si la ecografía muestra DIU en posición intrauterina correcta pero la paciente mantiene sangrado marcado, ¿qué intervención médica es razonable intentar inicialmente?",
        opciones: [
          { id: "a", texto: "Retirar el DIU inmediatamente", explicacion: "Si no hay otra causa y los síntomas son intolerables, retiro puede considerarse; evaluar anemia y alternativas." },
          { id: "b", texto: "Iniciar tratamiento para control de sangrado (AINE o tranexámico) y seguimiento", esCorrecta: true, explicacion: "Manejo médico puede controlar síntomas; decisión de retiro depende de respuesta y preferencia." },
          { id: "c", texto: "Enviar a casa sin tratamiento", explicacion: "No es adecuado." }
        ]
      },
      {
        id: "p3",
        tipo: "short",
        enunciado: "Escribe dos criterios que te harían sospechar EPI en una portadora de DIU y que requerirían tratamiento urgente.",
        guia: "Fiebre, dolor pélvico intenso con dolor a movilización cervical, secreción purulenta o signos sistémicos."
      },
      {
        id: "p4",
        tipo: "short",
        enunciado: "Describe dos recomendaciones de seguimiento y educación para esta paciente tras la evaluación inicial en SAPU.",
        guia: "Control de hemoglobina si sangrado significativo, analgesia adecuada, cuándo volver, y opciones anticonceptivas si se retira el DIU."
      }
    ],
    referencias: ["Manejo de HMB y dolor con DIU; descartar EPI y malposición."]
  },

  // =============== AC 6 — DMPA: amenorrea y aumento de peso ===============
  {
    id: "ac-dmpa-amenorrea-peso",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "DMPA: amenorrea e incremento ponderal percibido",
    vigneta:
      "Usuaria 19 años en DMPA 150 mg IM; 2 dosis (última hace 2 meses). FUR ausente desde hace 4 meses. Test de embarazo negativo. Sobrepeso (IMC 28). Refiere temor por amenorrea y aumento de peso.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Tu primer paso hoy debería ser:",
        opciones: [
          { id: "a", texto: "Suspender DMPA y cambiar a ACO por amenorrea", explicacion: "La amenorrea es un efecto esperado y no indica suspender por sí sola." },
          { id: "b", texto: "Educar: amenorrea esperable con DMPA; reforzar calendario de inyecciones", esCorrecta: true, explicacion: "Reasegurar, educar, valorar estilo de vida y alternativas si el EA es molesto." },
          { id: "c", texto: "Indicar diuréticos por aumento de peso", explicacion: "No corresponde como manejo inicial." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Dos mensajes de consejería para seguimiento con DMPA.",
        guia: "Calendario, EA esperables, signos de alarma, opciones si EA afecta calidad de vida."
      }
    ],
    referencias: ["Efectos esperables con DMPA; consejería centrada en paciente."]
  },

  // =============== AC 7 — AE en ventana fértil (moco filante) ===============
  {
    id: "ac-ae-ventana-fertil",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Anticoncepción de emergencia en probable ovulación",
    vigneta:
      "Usuaria 26 años solicita AE. Métodos naturales (Ogino/Billings). FUR hace 16 días; ciclos 28–30 días. Relaciones sin protección ayer (día 15). Describe moco 'claro y elástico'.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Dado el patrón de riesgo (día 15 y moco filante), ¿qué opción de anticoncepción de emergencia tiene mayor probabilidad de eficacia en esta paciente?",
        opciones: [
          { id: "a", texto: "Levonorgestrel 1.5 mg oral", explicacion: "Eficaz si se administra pronto, pero su eficacia disminuye cerca de la ovulación." },
          { id: "b", texto: "Ulipristal 30 mg oral", esCorrecta: true, explicacion: "Mayor eficacia en la ventana cercana a la ovulación; valorar contraindicaciones y lactancia." },
          { id: "c", texto: "DIU de cobre insertado dentro de 5 días", esCorrecta: true, explicacion: "Opción de máxima eficacia y con beneficio anticonceptivo continuo si paciente acepta inserción." }
        ]
      },
      {
        id: "p2",
        tipo: "mcq",
        enunciado: "¿Cuál es el límite temporal aproximado para la efectividad de levonorgestrel y de ulipristal como AE tras una relación sin protección?",
        opciones: [
          { id: "a", texto: "Levonorgestrel hasta 72 horas; ulipristal hasta 120 horas", esCorrecta: true, explicacion: "LNG es menos efectivo después de 72 h; ulipristal mantiene eficacia hasta 120 h." },
          { id: "b", texto: "Ambos hasta 24 horas solamente", explicacion: "Incorrecto; los rangos son mayores." },
          { id: "c", texto: "DIU de cobre no tiene límite temporal", explicacion: "Falso; DIU de cobre es efectivo hasta 5 días tras relación según guía." }
        ]
      },
      {
        id: "p3",
        tipo: "mcq",
        enunciado: "Si la paciente está en lactancia, ¿qué consideraciones debes tener al elegir AE?",
        opciones: [
          { id: "a", texto: "Ulipristal está contraindicado en lactancia inmediata y se debe evitar siempre", explicacion: "Ulipristal se excreta en leche; valorar alternativa o posponer la lactancia temporalmente según recomendación." },
          { id: "b", texto: "Levonorgestrel oral puede usarse en lactancia con precaución", esCorrecta: true, explicacion: "LNG se considera aceptable; reforzar información y ofrecer DIU si es apropiado." },
          { id: "c", texto: "No hay restricciones en lactancia para ninguna AE", explicacion: "Falso; hay consideraciones según el fármaco." }
        ]
      },
      {
        id: "p4",
        tipo: "short",
        enunciado: "Describe un plan de continuidad y seguimiento tras administrar AE en esta paciente joven.",
        guia: "Ofrecer método eficaz de continuación (LARC si acepta), consejería sobre uso dual, test de embarazo si corresponde y cita de seguimiento para consejería y cribado ITS si procede."
      }
    ],
    referencias: ["AE: ulipristal vs LNG; DIU cobre como AE."]
  },

  // =============== AC 8 — DIU Cu 10 años, sin hilos visibles ===============
  {
    id: "ac-diu-cu-sin-hilos",
    modulo: "Anticoncepción",
    dificultad: "Alta",
    titulo: "Recambio de DIU con hilos no visibles",
    vigneta:
      "Usuaria 42 años, TCu380A con 10 años de uso. IMC 31, PA 130/80 (HTA controlada con losartán). G3P3. OCE entreabierto, no se visualizan hilos. Se solicita ecografía transvaginal para confirmar posición.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Cuál es el siguiente paso MÁS adecuado?",
        opciones: [
          { id: "a", texto: "Retirar a ciegas con pinza en policlínico", explicacion: "Riesgo si no confirmas posición." },
          { id: "b", texto: "Confirmar posición por ecografía y planificar extracción guiada", esCorrecta: true, explicacion: "Buenas prácticas: confirmar intrauterino, planificar técnica." },
          { id: "c", texto: "Asumir expulsión y colocar uno nuevo hoy", explicacion: "Necesitas confirmar; podría estar intrauterino." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Menciona dos opciones para extracción si el DIU está intrauterino pero sin hilos.",
        guia: "Pinza de Pozzi + cánula/instrumental bajo visión; histeroscopía si falla; derivación según recursos."
      }
    ],
    referencias: ["Manejo de hilos no visibles; extracción segura."]
  },

  // =============== AC 9 — Post-AMEU: LARC inmediato antes del alta ===============
  {
    id: "ac-post-ameu-larc",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Postaborto inmediato: oportunidad de LARC",
    vigneta:
      "Usuaria 20 años post-AMEU por aborto incompleto de 9 semanas, sin incidentes. Estable. MAC previo: condón inconsistente. Solicita método LARC 'ojalá el implante' antes del alta.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué estrategia es adecuada HOY?",
        opciones: [
          { id: "a", texto: "Diferir MAC y citar en 4 semanas", explicacion: "Se pierde oportunidad; mayor riesgo de abandono." },
          { id: "b", texto: "Ofrecer LARC inmediato (DIU LNG/DIU Cu/implante) si no hay signos de infección", esCorrecta: true, explicacion: "Mayor continuidad y eficacia si se inicia hoy." },
          { id: "c", texto: "Solo condón + educación", explicacion: "Menor eficacia; no asegura continuidad." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Escribe dos mensajes de consejería clave postaborto.",
        guia: "Signos de alarma; control; cribado ITS; uso dual; elección informada."
      }
    ],
    referencias: ["Inicio inmediato postaborto; continuidad y eficacia."]
  },

  // =============== ITS 10 — Cervicitis adolescente (síndrome) ===============
  {
    id: "its-cervicitis-adolescente",
    modulo: "ITS",
    dificultad: "Alta",
    titulo: "Cervicitis en adolescente: manejo sindrómico y prevención",
    vigneta:
      "Usuaria 16 años con disuria y flujo de mal olor 1 semana. OH(+), tabaco(+). Nuligesta. ACO combinados con olvidos frecuentes, no usa preservativo. 3 parejas en el último año. GE irritados. Especuloscopía: cervicitis mucopurulenta con flujo amarillo-verdoso espumoso. Se toman cultivos y se indica manejo sindrómico.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "Conducta inicial MÁS adecuada en APS:",
        opciones: [
          { id: "a", texto: "Solo analgesia y control", explicacion: "Riesgo de progresión; no apropiado." },
          { id: "b", texto: "Tratamiento empírico para GC/CT/Trichomonas según guías + manejo de pareja(s) + educación", esCorrecta: true, explicacion: "Manejo sindrómico; corta transmisión y complicaciones." },
          { id: "c", texto: "Derivar sin tratar hasta PCR", explicacion: "Demora innecesaria; iniciar empírico si alta sospecha." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Indica dos mensajes de educación para cortar cadena de transmisión en adolescentes.",
        guia: "Abstinencia temporal, uso dual, tratar pareja(s), control clínico."
      }
    ],
    referencias: ["Manejo sindrómico en adolescentes; prevención y notificación a parejas."]
  },

  // =============== AC 11 — SUA perimenopausia con opción terapéutica ===============
  {
    id: "ac-sua-perimenopausia",
    modulo: "Anticoncepción",
    dificultad: "Media",
    titulo: "Sangrado uterino anormal en perimenopausia: opción con LNG-IUS",
    vigneta:
      "Usuaria 44 años con reglas muy abundantes y dismenorrea 6 meses. Bochornos. AMF: madre Ca mama a los 60. IMC 27, PA 125/80. G2P2. Ligadura tubaria hace 10 años. FUR hace 5 días (muy abundante). TV: útero normal. Se considera manejo de SUA perimenopáusico, incluyendo DIU-LNG como terapia.",
    pasos: [
      {
        id: "p1",
        tipo: "mcq",
        enunciado: "¿Qué opción terapéutica anticonceptiva/terapéutica considerarías primero?",
        opciones: [
          { id: "a", texto: "DIU de cobre", explicacion: "Puede aumentar el sangrado." },
          { id: "b", texto: "LNG-IUS (Mirena)", esCorrecta: true, explicacion: "Reduce HMB y dismenorrea; útil en SUA." },
          { id: "c", texto: "Implante", explicacion: "No es tratamiento de elección para HMB." },
        ],
      },
      {
        id: "p2",
        tipo: "short",
        enunciado: "Nombra un estudio o criterio que debes evaluar antes de colocar LNG-IUS en este contexto.",
        guia: "Descartar causas estructurales (eco/biopsia según criterio), citología, riesgo endometrial."
      }
    ],
    referencias: ["SUA: rol del LNG-IUS como manejo de primera línea."]
  },



];
