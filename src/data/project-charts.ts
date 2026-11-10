/**
 * Charts for the four projects that have no screenshots: ECG, both Cabify
 * parts, and retail forecasting.
 *
 * Every number here already appears in the prose of `portfolio-data.ts`, which
 * came from the wiki's facts file. Nothing is computed, rounded or filled in to
 * make a chart look better: where the source says "about 0.81", the bar is
 * labelled "≈ 0,81" so the approximation travels with the figure. Where a whole
 * project is simulated, the caption says so.
 *
 * `max` is authored rather than taken from the bars, because auto-scaling to the
 * tallest bar is what makes a 0.98 and a 0.93 look like a landslide.
 *
 * `reference: true` marks a bar that is context rather than a result: a
 * baseline, a floor, a naive estimate, the thing being argued against. Those are
 * drawn in neutral ink. It is deliberately not a second series colour, so the
 * eye lands on the measured value first.
 */
export interface ProjectChartBar {
  label: { en: string; es: string };
  value: number;
  /** Printed on the bar, so decimal commas and "≈" survive translation. */
  display: { en: string; es: string };
  reference?: boolean;
}

export interface ProjectChart {
  title: { en: string; es: string };
  caption: { en: string; es: string };
  /** Axis maximum, authored. */
  max: number;
  bars: ProjectChartBar[];
}

export const projectCharts: Record<string, ProjectChart[]> = {
  "missed-call-agent": [
    {
      title: { en: "14 September to 7 November 2026", es: "Del 14 de septiembre al 7 de noviembre de 2026" },
      caption: {
        en: "One restaurant, read from the production database. The 15 held back are the system's brakes at work (repeat callers, opt-outs), not failures. These are calls and callers, not bookings: how many conversations ended in a table is not counted.",
        es: "Un solo restaurante, leído de la base de datos de producción. Las 15 retenidas son los frenos del sistema funcionando (quien vuelve a llamar, bajas), no fallos. Son llamadas y personas, no reservas: cuántas conversaciones acabaron en mesa no se cuenta.",
      },
      max: 160,
      bars: [
        {
          label: { en: "Missed calls followed up", es: "Llamadas perdidas rescatadas" },
          value: 140,
          display: { en: "140", es: "140" },
        },
        {
          label: { en: "Missed calls registered", es: "Llamadas perdidas registradas" },
          value: 157,
          display: { en: "157", es: "157" },
          reference: true,
        },
        {
          label: { en: "Distinct numbers", es: "Números distintos" },
          value: 113,
          display: { en: "113", es: "113" },
          reference: true,
        },
        {
          label: { en: "Held back on purpose", es: "Retenidas a propósito" },
          value: 15,
          display: { en: "15", es: "15" },
          reference: true,
        },
        {
          label: { en: "Failed after retries", es: "Fallidas tras reintentos" },
          value: 2,
          display: { en: "2", es: "2" },
          reference: true,
        },
      ],
    },
    {
      title: {
        en: "Seconds from the call reaching the server to the send order",
        es: "Segundos de la llegada al servidor a la orden de envío",
      },
      caption: {
        en: "The 140 calls followed up. The 90 s wait is deliberate, a margin for the team to call back; the rest is the minute cron. ManyChat sends no delivery receipt, so the last hop is not measured.",
        es: "Las 140 llamadas rescatadas. Los 90 s de espera son a propósito, margen para que el equipo devuelva la llamada; el resto es el cron de cada minuto. ManyChat no devuelve acuse de entrega, así que el último tramo no está medido.",
      },
      max: 180,
      bars: [
        {
          label: { en: "Fastest", es: "Más rápida" },
          value: 92,
          display: { en: "92 s", es: "92 s" },
        },
        {
          label: { en: "Mean", es: "Media" },
          value: 122,
          display: { en: "122 s", es: "122 s" },
        },
        {
          label: { en: "Median", es: "Mediana" },
          value: 124,
          display: { en: "124 s", es: "124 s" },
        },
        {
          label: { en: "Slowest", es: "Más lenta" },
          value: 151,
          display: { en: "151 s", es: "151 s" },
        },
        {
          label: { en: "Courtesy wait", es: "Espera de cortesía" },
          value: 90,
          display: { en: "90 s", es: "90 s" },
          reference: true,
        },
      ],
    },
  ],
  "ecg-heartbeat-categorization": [
    {
      title: {
        en: "macro-F1 on the MIT-BIH test set",
        es: "macro-F1 en el test de MIT-BIH",
      },
      caption: {
        en: "21,892 held-out beats. The floor is the model that always answers \"normal\": it scores 82.8% accuracy on the same data, which is why accuracy is not the metric here.",
        es: "21.892 latidos held-out. El suelo es el modelo que siempre responde «normal»: saca un 82,8 % de accuracy sobre los mismos datos, y por eso aquí la métrica no es accuracy.",
      },
      max: 1,
      bars: [
        {
          label: { en: "Residual 1-D CNN", es: "CNN 1-D residual" },
          value: 0.9166,
          display: { en: "0.9166", es: "0,9166" },
        },
        {
          label: { en: "Best Spark ML baseline", es: "Mejor baseline de Spark ML" },
          value: 0.8323,
          display: { en: "0.8323", es: "0,8323" },
          reference: true,
        },
        {
          label: { en: "Majority-class floor", es: "Suelo de clase mayoritaria" },
          value: 0.1811,
          display: { en: "0.1811", es: "0,1811" },
          reference: true,
        },
      ],
    },
    {
      title: {
        en: "Transfer to PTB, macro-F1 over three seeds",
        es: "Transferencia a PTB, macro-F1 con tres semillas",
      },
      caption: {
        en: "Full PTB. Standard deviations are 0.0017, 0.0040 and 0.0074: at this dataset size fine-tuning neither helps nor hurts, and the two top ranges overlap.",
        es: "PTB completo. Las desviaciones típicas son 0,0017, 0,0040 y 0,0074: a este tamaño el fine-tuning ni ayuda ni perjudica, y los dos rangos de arriba se solapan.",
      },
      max: 1,
      bars: [
        {
          label: { en: "From scratch", es: "Desde cero" },
          value: 0.9854,
          display: { en: "0.9854", es: "0,9854" },
        },
        {
          label: { en: "Fine-tuned", es: "Fine-tuning" },
          value: 0.9835,
          display: { en: "0.9835", es: "0,9835" },
        },
        {
          label: { en: "Frozen backbone", es: "Backbone congelado" },
          value: 0.9339,
          display: { en: "0.9339", es: "0,9339" },
          reference: true,
        },
      ],
    },
  ],

  "cabify-route-divergence": [
    {
      title: {
        en: "How the annotators voted",
        es: "Cómo votaron los anotadores",
      },
      caption: {
        en: "3,027 annotations over 2,386 journeys. 2,212 resolve to a decisive consensus label; 174 stay genuinely ambiguous and are kept in training as half a vote to each side.",
        es: "3.027 anotaciones sobre 2.386 trayectos. 2.212 resuelven a una etiqueta de consenso decisiva; 174 quedan genuinamente ambiguos y se mantienen en entrenamiento como medio voto a cada lado.",
      },
      max: 100,
      bars: [
        {
          label: { en: "\"Differ\"", es: "«Difieren»" },
          value: 54,
          display: { en: "54%", es: "54 %" },
        },
        {
          label: { en: "\"Same\"", es: "«Iguales»" },
          value: 39,
          display: { en: "39%", es: "39 %" },
        },
        {
          label: { en: "\"Don't know\"", es: "«No lo sé»" },
          value: 7,
          display: { en: "7%", es: "7 %" },
          reference: true,
        },
      ],
    },
    {
      title: {
        en: "Brier score, lower is better",
        es: "Brier score, más bajo es mejor",
      },
      caption: {
        en: "A single geometric feature already reaches ROC-AUC 0.9887, so ranking is not what the model adds. Calibration is: 0.0402 against 0.1397.",
        es: "Una sola feature geométrica ya alcanza un ROC-AUC de 0,9887, así que lo que añade el modelo no es ordenar. Es calibrar: 0,0402 frente a 0,1397.",
      },
      max: 0.15,
      bars: [
        {
          label: { en: "Calibrated logistic regression", es: "Regresión logística calibrada" },
          value: 0.0402,
          display: { en: "0.0402", es: "0,0402" },
        },
        {
          label: { en: "Single geometric feature", es: "Una sola feature geométrica" },
          value: 0.1397,
          display: { en: "0.1397", es: "0,1397" },
          reference: true,
        },
      ],
    },
  ],

  "cabify-experiment-design": [
    {
      title: {
        en: "The same effect, measured three ways",
        es: "El mismo efecto, medido de tres formas",
      },
      caption: {
        en: "All simulated. Selection bias reports a true +8% as +60.6%; difference-in-differences recovers it to +13.9%, which is still not the true value.",
        es: "Todo simulado. El sesgo de selección reporta un efecto real de +8 % como +60,6 %; diferencias en diferencias lo recupera hasta +13,9 %, que sigue sin ser el valor real.",
      },
      max: 65,
      bars: [
        {
          label: { en: "Naive estimate", es: "Estimación ingenua" },
          value: 60.6,
          display: { en: "+60.6%", es: "+60,6 %" },
          reference: true,
        },
        {
          label: { en: "Difference-in-differences", es: "Diferencias en diferencias" },
          value: 13.9,
          display: { en: "+13.9%", es: "+13,9 %" },
        },
        {
          label: { en: "True effect", es: "Efecto real" },
          value: 8,
          display: { en: "+8%", es: "+8 %" },
          reference: true,
        },
      ],
    },
    {
      title: {
        en: "What the unit of randomisation costs",
        es: "Lo que cuesta la unidad de aleatorización",
      },
      caption: {
        en: "All simulated. A restaurant-level A/B test reports +11.9% where the cluster as a whole gains +3.7%, a 3.2× overstatement no amount of statistical care at the restaurant level can fix.",
        es: "Todo simulado. Un A/B a nivel de restaurante reporta +11,9 % donde el clúster completo gana +3,7 %, una sobreestimación de 3,2× que ningún cuidado estadístico a nivel de restaurante puede arreglar.",
      },
      max: 14,
      bars: [
        {
          label: { en: "Restaurant-level A/B test", es: "A/B a nivel de restaurante" },
          value: 11.9,
          display: { en: "+11.9%", es: "+11,9 %" },
          reference: true,
        },
        {
          label: { en: "Gain across the cluster", es: "Ganancia del clúster completo" },
          value: 3.7,
          display: { en: "+3.7%", es: "+3,7 %" },
        },
      ],
    },
  ],

  "time-series-forecasting": [
    {
      title: {
        en: "The linear models, weighted and not",
        es: "Los modelos lineales, ponderados y sin ponderar",
      },
      caption: {
        en: "Held-out December 2015. They do fine on the many small series and badly on the few that carry the revenue, and only the volume-weighted metric shows it. Both figures are the source's own approximations.",
        es: "Diciembre de 2015 held-out. Van bien en las muchas series pequeñas y mal en las pocas que llevan la facturación, y solo la métrica ponderada por volumen lo enseña. Las dos cifras son aproximaciones del propio informe.",
      },
      max: 1.3,
      bars: [
        {
          label: { en: "RMSSE7, unweighted", es: "RMSSE7, sin ponderar" },
          value: 0.81,
          display: { en: "≈ 0.81", es: "≈ 0,81" },
        },
        {
          label: { en: "RMSSE7, volume-weighted", es: "RMSSE7, ponderado por volumen" },
          value: 1.14,
          display: { en: "> 1.14", es: "> 1,14" },
          reference: true,
        },
      ],
    },
    {
      title: {
        en: "Days with zero units sold",
        es: "Días con cero unidades vendidas",
      },
      caption: {
        en: "The model predicts a conditional mean and does not reproduce intermittency. The gap is a modelling-class problem, not a tuning one: it needs Croston/TSB, a hurdle model or quantile forecasts.",
        es: "El modelo predice una media condicional y no reproduce la intermitencia. La diferencia es un problema de clase de modelo, no de tuning: pide Croston/TSB, un modelo hurdle o previsiones por cuantiles.",
      },
      max: 32,
      bars: [
        {
          label: { en: "In the history", es: "En el histórico" },
          value: 29.4,
          display: { en: "29.4%", es: "29,4 %" },
          reference: true,
        },
        {
          label: { en: "Forecast by the model", es: "Previsto por el modelo" },
          value: 2.1,
          display: { en: "2.1%", es: "2,1 %" },
        },
      ],
    },
  ],
};
