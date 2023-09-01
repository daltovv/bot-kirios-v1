
const { createBot,
    createProvider,
    createFlow,
    addKeyword,
    EVENTS } = require('@bot-whatsapp/bot')
  
  const QRPortalWeb = require('@bot-whatsapp/portal')
  const BaileysProvider = require('@bot-whatsapp/provider/baileys')
  const MockAdapter = require('@bot-whatsapp/database/mock')
  const { Client } = require('pg')
  
  const obtenerEstado = async () => {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "kiriosprueba",
      password: "Sc-11057",
      port: 5432
    })
  
    await client.connect()
    let opcion = "select * from consultas"
    const res = await client.query(opcion)
    const result = res.rows
    await client.end()
  
    return result
  }
  
  const obtenerOfertas = async () => {
    const client = new Client({
      user: "postgres",
      host: "localhost",
      database: "kiriosprueba",
      password: "Sc-11057",
      port: 5432
    })
  
    await client.connect()
    let opcion = "select * from ofertas"
    const res = await client.query(opcion)
    const result = res.rows
    await client.end()
  
    return result
  }

  const flujoMarketing = addKeyword(["Publicidad, Marketing, 1"])
  .addAnswer("Enviando al Area de publicidad ")

  const flujoSoftware = addKeyword(["3, Software"])
  .addAnswer("Enviando al Area Software ")

  const flujoVentas = addKeyword(["ventas, 4"])
  .addAnswer("Enviando al Area de Soporte Y Mantenimiento ")


  const flujoMantenimiento = addKeyword(["Mantenimiento, 2 "])
    .addAnswer("Enviando al Area de Soporte Y Mantenimiento ")
  
  
  
  const flujoEstado = addKeyword(["estado"])
    .addAnswer("*Ingresa el número de orden: 🔍*",
      {
        capture: true
      },
      async (ctx, { flowDynamic }) => {
        obtenerEstado().then((result) => {
          let resultado = ""
          for (let i = 0; i < result.length; i++) {
            if (ctx.body.toString().toUpperCase() === result[i].orden) {
              resultado = `Hola, *${result[i].nombre}*, tu equipo está ${result[i].estado}.`
              break
            } else {
              resultado = `Lo sentimos, el número de orden: *${ctx.body.toUpperCase()}*, no se encuentra registrado`
            }
          }
          flowDynamic([{ body: resultado }])
        })
      }
    )
  
  const flujoInformacion = addKeyword(["KinetPOS"])
    .addAnswer("En el siguiente enlace → https://www.kinetpos.com/ podras obtener toda la información que necesitas sobre KinetPOS.")
  
  const flujoHorario = addKeyword(["horario"])
    .addAnswer("Horario de Atención ⏳\n*Lunes* a *Viernes* → 9:00 – 13:00, 15:00 – 19:00\n*Sabado* → 9:00 – 13:00\n*Domingo* → Cerrado")
  
  const flujoOferta = addKeyword(["ofertas, 4"])
    .addAnswer("Estos son los productos en oferta... 👀\n",
      (ctx, { flowDynamic }) => {
        obtenerOfertas().then((result) => {
          let tabla = ""
          for (let i = 0; i < result.length; i++) {
            tabla += `${result[i].producto}\n\t\t a tan solo *${result[i].precio}*\n\t\t\t Link del producto *→* ${result[i].linkproducto}`;
            if (i !== result.length - 1) {
              tabla += "\n"
            }
          }
          flowDynamic([{ body: tabla }])
        })
      }
    )
  
  const flujoRedes = addKeyword(["redes"])
    .addAnswer("Estas son nuestras redes sociales: 📡\n*Instagram*:\n\thttps://www.instagram.com/kiriosnet/?hl=es\n*Facebook*:\n\thttps://www.facebook.com/kiriosnet/?locale=es_LA\n*LinkedIn:*\n\thttps://ec.linkedin.com/company/kiriosnet\n*TikTok*\n\thttps://www.tiktok.com/@kirios.ec")
  
  const flujoSalir = addKeyword(["salir"])
    .addAnswer("Hasta pronto... 👋")
  
  const flujoSaludo = addKeyword(EVENTS.WELCOME)
    .addAnswer('¡Bienvenid@ a *KIRIOS!* 👋\n_Somos Soluciones_ 💻\nSoy *Kiri* el asistente virtual de Kirios 🤖', {
      media: 'https://i.imgur.com/CSPINPo.png'
    })
    .addAnswer('¿En qué puedo ayudarte? 🤔', {
      buttons: [
        {
          body: "\n\t*3* - Publicidad y Marketing"
        },
        {
          body: "*2* Soporte y Mantenimiento 📟"
        },
        {
          body: "*3* Area de Software"
        },
        {
          body: "*4* Ventas"
        },
        {
          body: " KinetPOS 📰 "
        },
        {
          body: "Horario de Atención ⏳"
        },
        {
          body: "Productos en Oferta 💰"
        },
        {
          body: "Redes sociales 📡"
        },
        {
          body: "Salir 🏃‍♂️"
        }
      ]
    })
  
  const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoSaludo, flujoEstado, flujoInformacion, flujoHorario, flujoOferta, flujoRedes, flujoSalir, flujoMantenimiento, flujoMarketing, flujoVentas, flujoSoftware])
    const adapterProvider = createProvider(BaileysProvider)
  
    createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    })
  
    QRPortalWeb()
  }
  
  main()